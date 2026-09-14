<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useI18n } from '@/composables/useI18n'

const router = useRouter()
const { t } = useI18n()

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

// Mode: 'phone' or 'email'
const authMode = ref('phone')

// Step: 'input' or 'otp'
const step = ref('input')

// Form fields
const phoneNumber = ref('')
const emailAddress = ref('')
const otpCode = ref('')

// State
const countdown = ref(0)
const errorMessage = ref('')
const successMessage = ref('')
const localOtpNotification = ref(null)
let timer = null

function toggleMode() {
  authMode.value = authMode.value === 'phone' ? 'email' : 'phone'
  errorMessage.value = ''
  successMessage.value = ''
}

// Request OTP in local
function handleRequestOtp() {
  errorMessage.value = ''
  successMessage.value = ''

  const contact = authMode.value === 'phone' ? phoneNumber.value.trim() : emailAddress.value.trim()

  if (!contact) {
    errorMessage.value = authMode.value === 'phone'
      ? t('auth.phoneRequired', 'Please enter your phone number')
      : t('auth.emailRequired', 'Please enter your email address')
    return
  }

  if (authMode.value === 'email' && !contact.includes('@')) {
    errorMessage.value = t('auth.validEmailRequired', 'Please enter a valid email address')
    return
  }

  // Generate 6-digit random code
  const code = Math.floor(100000 + Math.random() * 900000).toString()
  const expiry = Date.now() + 5 * 60 * 1000

  // Save in localStorage for verification
  try {
    const pending = JSON.parse(localStorage.getItem('homeall_pending_otp') || '{}')
    pending[contact.toLowerCase()] = { code, expiry, type: authMode.value }
    localStorage.setItem('homeall_pending_otp', JSON.stringify(pending))
  } catch (e) {
    console.warn(e)
  }

  // Display floating simulated notification
  localOtpNotification.value = {
    contact,
    code,
    type: authMode.value
  }

  // Countdown timer
  countdown.value = 60
  if (timer) clearInterval(timer)
  timer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
    } else {
      clearInterval(timer)
    }
  }, 1000)

  // Transition to OTP step
  step.value = 'otp'
}

function handleAutoFillOtp() {
  if (localOtpNotification.value && localOtpNotification.value.code) {
    otpCode.value = localOtpNotification.value.code
  }
}

function handleVerifyOtp() {
  errorMessage.value = ''
  successMessage.value = ''

  if (!otpCode.value.trim()) {
    errorMessage.value = t('auth.otpRequired', 'Please enter the 6-digit OTP code')
    return
  }

  const contact = authMode.value === 'phone' ? phoneNumber.value.trim() : emailAddress.value.trim()

  try {
    const pending = JSON.parse(localStorage.getItem('homeall_pending_otp') || '{}')
    const record = pending[contact.toLowerCase()]

    if (!record) {
      errorMessage.value = t('auth.otpNotFound', 'No OTP request found. Please request a new code.')
      return
    }

    if (Date.now() > record.expiry) {
      errorMessage.value = t('auth.otpExpired', 'OTP code has expired. Please request a new code.')
      return
    }

    if (record.code !== otpCode.value.trim()) {
      errorMessage.value = t('auth.otpIncorrect', 'Incorrect OTP code. Please try again.')
      return
    }

    // Success! Save user to localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('homeall_registered_users') || '[]')
    const existing = registeredUsers.find((u) => u.contact === contact || u.email === contact)

    let user = existing
    if (!user) {
      user = {
        id: Date.now().toString(),
        contact: contact,
        email: authMode.value === 'email' ? contact : '',
        phone: authMode.value === 'phone' ? contact : '',
        name: contact.includes('@') ? contact.split('@')[0] : contact,
        createdAt: new Date().toISOString()
      }
      registeredUsers.push(user)
      localStorage.setItem('homeall_registered_users', JSON.stringify(registeredUsers))
    }

    localStorage.setItem('homeall_current_user', JSON.stringify(user))

    successMessage.value = t('auth.verifySuccess', 'Verified successfully! Redirecting...')
    setTimeout(() => {
      router.push('/')
    }, 1000)
  } catch (e) {
    console.error(e)
    errorMessage.value = 'An error occurred during verification'
  }
}

function handleGoogleSignIn() {
  const googleUser = {
    id: 'google-' + Date.now(),
    name: 'Google User',
    email: 'user.google@gmail.com',
    provider: 'google',
    createdAt: new Date().toISOString()
  }

  try {
    const registeredUsers = JSON.parse(localStorage.getItem('homeall_registered_users') || '[]')
    if (!registeredUsers.some((u) => u.email === googleUser.email)) {
      registeredUsers.push(googleUser)
      localStorage.setItem('homeall_registered_users', JSON.stringify(registeredUsers))
    }
    localStorage.setItem('homeall_current_user', JSON.stringify(googleUser))
  } catch (e) {
    console.warn(e)
  }

  successMessage.value = t('auth.googleSuccess', 'Google sign-in successful! Redirecting...')
  setTimeout(() => {
    router.push('/')
  }, 900)
}

function handleBackToInput() {
  step.value = 'input'
  otpCode.value = ''
  errorMessage.value = ''
  successMessage.value = ''
}
</script>

<template>
  <div class="register-page">
    <!-- Back to Home Link -->
    <RouterLink to="/" class="register-page_home-link" :title="t('auth.backHome', 'Home')">
      &larr; {{ t('auth.backHome', 'Home') }}
    </RouterLink>

    <!-- Left Illustration Area (Old Mint Artwork Background) -->
    <div class="register-page_visual" aria-hidden="true">
      <!-- Background Diagonal Mint Shape -->
      <svg class="register-page_bg-shape" viewBox="0 0 700 900" preserveAspectRatio="none">
        <polygon points="0,0 260,0 580,900 0,900" fill="#daf2ed" />
      </svg>

      <!-- Vector Artwork (Cabinet, Plant, Folders, Picture Frame) -->
      <svg class="register-page_artwork" viewBox="0 0 600 700" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Picture Frame on Wall -->
        <rect x="30" y="80" width="120" height="150" rx="4" fill="#ffffff" stroke="#134e4a" stroke-width="4" />
        <rect x="42" y="96" width="96" height="118" fill="#f8faf9" stroke="#134e4a" stroke-width="3" />
        <!-- Picture Lines -->
        <line x1="56" y1="124" x2="110" y2="124" stroke="#134e4a" stroke-width="3" stroke-linecap="round" />
        <line x1="56" y1="138" x2="124" y2="138" stroke="#134e4a" stroke-width="3" stroke-linecap="round" />
        <line x1="56" y1="152" x2="124" y2="152" stroke="#134e4a" stroke-width="3" stroke-linecap="round" />
        <line x1="56" y1="166" x2="100" y2="166" stroke="#134e4a" stroke-width="3" stroke-linecap="round" />
        <!-- Frame Shelf/Ledge -->
        <path d="M20 230 H160 V236 H20 Z" fill="#ffffff" stroke="#134e4a" stroke-width="3" />

        <!-- 3 File Binders on Shelf -->
        <!-- Binder 1 -->
        <rect x="30" y="300" width="40" height="150" rx="3" fill="#e8f7f4" stroke="#134e4a" stroke-width="4" />
        <line x1="30" y1="340" x2="70" y2="340" stroke="#134e4a" stroke-width="3" />
        <circle cx="50" cy="425" r="9" fill="#ffffff" stroke="#134e4a" stroke-width="3" />
        <!-- Binder 2 -->
        <rect x="74" y="300" width="40" height="150" rx="3" fill="#e8f7f4" stroke="#134e4a" stroke-width="4" />
        <line x1="74" y1="340" x2="114" y2="340" stroke="#134e4a" stroke-width="3" />
        <circle cx="94" cy="425" r="9" fill="#ffffff" stroke="#134e4a" stroke-width="3" />
        <!-- Binder 3 -->
        <rect x="118" y="300" width="40" height="150" rx="3" fill="#e8f7f4" stroke="#134e4a" stroke-width="4" />
        <line x1="118" y1="340" x2="158" y2="340" stroke="#134e4a" stroke-width="3" />
        <circle cx="138" cy="425" r="9" fill="#ffffff" stroke="#134e4a" stroke-width="3" />

        <!-- Stack of Books -->
        <rect x="175" y="415" width="145" height="18" rx="3" fill="#ffffff" stroke="#134e4a" stroke-width="3.5" />
        <rect x="170" y="433" width="155" height="17" rx="3" fill="#ffffff" stroke="#134e4a" stroke-width="3.5" />

        <!-- Potted Plant -->
        <path d="M375 410 C340 330 320 220 375 160 C400 240 395 350 375 410 Z" fill="#d1fae5" stroke="#134e4a" stroke-width="3.5" />
        <path d="M365 410 C300 350 250 270 305 200 C340 260 360 350 365 410 Z" fill="#0d9488" stroke="#134e4a" stroke-width="3.5" />
        <line x1="335" y1="305" x2="365" y2="410" stroke="#134e4a" stroke-width="2.5" />

        <path d="M350 420 C270 390 200 370 230 330 C290 350 330 390 350 420 Z" fill="#5eead4" stroke="#134e4a" stroke-width="3.5" />
        <line x1="260" y1="350" x2="350" y2="420" stroke="#134e4a" stroke-width="2.5" />

        <path d="M380 410 C380 300 385 180 410 140 C425 220 415 320 380 410 Z" fill="#009688" stroke="#134e4a" stroke-width="3.5" />
        <line x1="395" y1="275" x2="380" y2="410" stroke="#134e4a" stroke-width="2.5" />

        <path d="M390 410 C420 330 450 240 470 190 C470 260 440 350 390 410 Z" fill="#99f6e4" stroke="#134e4a" stroke-width="3.5" />
        <line x1="430" y1="300" x2="390" y2="410" stroke="#134e4a" stroke-width="2.5" />

        <path d="M395 420 C460 380 500 320 520 280 C490 340 450 400 395 420 Z" fill="#ffffff" stroke="#134e4a" stroke-width="3.5" />
        <line x1="457" y1="350" x2="395" y2="420" stroke="#134e4a" stroke-width="2.5" />

        <!-- Plant Pot -->
        <rect x="330" y="420" width="115" height="14" rx="2" fill="#ffffff" stroke="#134e4a" stroke-width="3.5" />
        <path d="M338 434 L348 505 Q350 515 365 515 H410 Q425 515 427 505 L437 434 Z" fill="#ffffff" stroke="#134e4a" stroke-width="3.5" />

        <!-- Desk / Cabinet Top Surface -->
        <rect x="0" y="450" width="560" height="24" fill="#ffffff" stroke="#134e4a" stroke-width="4" />

        <!-- Cabinet Body -->
        <rect x="0" y="474" width="530" height="226" fill="#e5f5f1" stroke="#134e4a" stroke-width="4" />
        <!-- Drawer 1 -->
        <rect x="0" y="480" width="525" height="100" fill="#e5f5f1" stroke="#134e4a" stroke-width="3" />
        <rect x="190" y="520" width="90" height="18" rx="9" fill="#ffffff" stroke="#134e4a" stroke-width="3.5" />

        <!-- Drawer 2 -->
        <rect x="0" y="585" width="525" height="115" fill="#e5f5f1" stroke="#134e4a" stroke-width="3" />
        <rect x="190" y="630" width="90" height="18" rx="9" fill="#ffffff" stroke="#134e4a" stroke-width="3.5" />
      </svg>
    </div>

    <!-- Floating Local OTP Simulation Notification -->
    <transition name="toast-fade">
      <div v-if="localOtpNotification" class="local-otp-toast" role="alert">
        <div class="local-otp-toast_header">
          <span class="local-otp-toast_badge">
            {{ localOtpNotification.type === 'email' ? t('auth.emailService', '📧 Email Service') : t('auth.smsService', '📱 SMS Service') }} (Local)
          </span>
          <button type="button" class="local-otp-toast_close" @click="localOtpNotification = null">✕</button>
        </div>
        <p class="local-otp-toast_body">
          {{ t('auth.codeFor', 'Verification code for') }} <strong>{{ localOtpNotification.contact }}</strong>:
          <span class="local-otp-toast_code">{{ localOtpNotification.code }}</span>
        </p>
        <button type="button" class="local-otp-toast_autofill" @click="handleAutoFillOtp">
          {{ t('auth.autoFill', '⚡ Auto-fill Code') }}
        </button>
      </div>
    </transition>

    <!-- Right Content Area with Register / OTP Card -->
    <div class="register-page_content">
      <div class="register-card">
        <!-- Step 1: Input Contact (Phone or Email) -->
        <div v-if="step === 'input'" class="register-form-wrap">
          <h1 class="register-card_title">
            {{ authMode === 'phone' ? t('auth.signInWithPhone', 'Sign In With Phone Number') : t('auth.signInWithEmail', 'Sign In With Email') }}
          </h1>

          <form @submit.prevent="handleRequestOtp" class="register-card_form">
            <div class="register-input-group">
              <input
                v-if="authMode === 'phone'"
                v-model="phoneNumber"
                type="tel"
                class="register-input"
                :placeholder="t('auth.phonePlaceholder', 'Please enter phone number')"
                required
                autocomplete="tel"
                autofocus
              />
              <input
                v-else
                v-model="emailAddress"
                type="email"
                class="register-input"
                :placeholder="t('auth.emailPlaceholder', 'Please enter email')"
                required
                autocomplete="email"
                autofocus
              />
            </div>

            <!-- Error / Success Feedback -->
            <p v-if="errorMessage" class="register-card_error">{{ errorMessage }}</p>
            <p v-if="successMessage" class="register-card_success">{{ successMessage }}</p>

            <!-- Primary Action Button: Request OTP (English) / ស្នើសុំលេខកូដ OTP (Khmer) -->
            <button type="submit" class="register-btn-primary">
              {{ t('auth.requestOtpBtn', 'Request OTP') }}
            </button>
          </form>

          <!-- Toggle between Phone & Email -->
          <div class="register-secondary-action">
            <button type="button" class="register-link-btn" @click="toggleMode">
              {{ authMode === 'phone' ? t('auth.switchToEmail', 'Sign In With Email') : t('auth.switchToPhone', 'Sign In With Phone Number') }}
            </button>
          </div>

          <!-- Divider: or / ឬ -->
          <div class="register-divider">
            <span class="register-divider_line"></span>
            <span class="register-divider_text">{{ t('auth.orDivider', 'or') }}</span>
            <span class="register-divider_line"></span>
          </div>

          <!-- Social Button: Google -->
          <div class="register-social-row">
            <button
              type="button"
              class="register-social-btn"
              title="Google"
              @click="handleGoogleSignIn"
            >
              <svg class="google-icon" viewBox="0 0 24 24" width="22" height="22">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.94 0 12s.46 3.84 1.26 5.42l4.02-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.25 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
            </button>
          </div>

          <!-- Link to Sign In -->
          <div class="register-existing-account">
            <span>{{ t('auth.haveAccount', 'Already have an account?') }}</span>
            <RouterLink to="/sign-in" class="register-signin-link">{{ t('auth.signInLink', 'Sign In') }}</RouterLink>
          </div>
        </div>

        <!-- Step 2: OTP Verification -->
        <div v-else class="register-form-wrap">
          <h1 class="register-card_title">
            {{ t('auth.confirmOtpTitle', 'Confirm OTP Code') }}
          </h1>
          <p class="register-card_desc">
            {{ t('auth.confirmOtpDesc', 'Please enter the 6-digit code sent to') }}
            <strong>{{ authMode === 'phone' ? phoneNumber : emailAddress }}</strong>
          </p>

          <form @submit.prevent="handleVerifyOtp" class="register-card_form">
            <div class="register-input-group otp-input-group">
              <input
                v-model="otpCode"
                type="text"
                class="register-input otp-code-input"
                placeholder="• • • • • •"
                maxlength="6"
                required
                autocomplete="one-time-code"
                autofocus
              />
            </div>

            <!-- Error / Success Feedback -->
            <p v-if="errorMessage" class="register-card_error">{{ errorMessage }}</p>
            <p v-if="successMessage" class="register-card_success">{{ successMessage }}</p>

            <button type="submit" class="register-btn-primary">
              {{ t('auth.verifyBtn', 'Verify & Complete') }}
            </button>
          </form>

          <div class="register-otp-actions">
            <button
              type="button"
              class="register-resend-btn"
              :disabled="countdown > 0"
              @click="handleRequestOtp"
            >
              {{ countdown > 0 ? `${t('auth.resendOtp', 'Resend OTP')} (${countdown}s)` : t('auth.resendCode', 'Resend Code') }}
            </button>
            <button type="button" class="register-back-btn" @click="handleBackToInput">
              {{ authMode === 'phone' ? t('auth.changePhone', 'Change Phone') : t('auth.changeEmail', 'Change Email') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Copyright -->
    <footer class="register-footer">
      Copyright ©2026 HomeAll
    </footer>
  </div>
</template>

<style scoped>
.register-page {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  overflow: hidden;
  font-family: 'Kantumruy Pro', 'Battambang', 'Hanuman', 'Noto Sans Khmer', system-ui, sans-serif;
}

/* Back to Home Link */
.register-page_home-link {
  position: absolute;
  top: 24px;
  right: 28px;
  z-index: 10;
  font-size: 14px;
  font-weight: 600;
  color: #0d9488;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(4px);
  padding: 6px 14px;
  border-radius: 20px;
  border: 1px solid #cce5e0;
  transition: all 0.2s ease;
}

.register-page_home-link:hover {
  background: #0d9488;
  color: #ffffff;
}

/* Left Illustration Container (Old Background) */
.register-page_visual {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.register-page_bg-shape {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.register-page_artwork {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  max-width: 580px;
  height: auto;
  max-height: 90vh;
}

/* Right Content Area with Register Card */
.register-page_content {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: flex-end;
  padding: 0 12% 0 0;
  box-sizing: border-box;
}

/* Register Card matching Sign In card */
.register-card {
  width: 100%;
  max-width: 380px;
  background: #ffffff;
  border: 1.5px solid #a4e0d6;
  border-radius: 12px;
  padding: 38px 30px 32px;
  box-shadow: 0 10px 28px rgba(0, 77, 64, 0.06);
  box-sizing: border-box;
}

.register-form-wrap {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.register-card_title {
  font-family: var(--font-family-title, 'Khmer OS', 'Khmer OS System', 'Khmer OS Muol Light', 'Khmer', 'Kantumruy Pro', 'Battambang', sans-serif);
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 20px 0;
  letter-spacing: 0.01em;
  line-height: 1.35;
}

.register-card_desc {
  font-size: 13px;
  color: #6b7280;
  text-align: center;
  line-height: 1.5;
  margin: -8px 0 20px;
}

.register-card_desc strong {
  color: #1f2937;
}

.register-card_form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
}

/* Single Outline Input Group */
.register-input-group {
  display: flex;
  align-items: center;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 0 14px;
  height: 44px;
  background-color: #ffffff;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.register-input-group:focus-within {
  border-color: #2643f8;
  box-shadow: 0 0 0 3px rgba(38, 67, 248, 0.15);
}

.register-input {
  flex: 1;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  color: #1f2937;
  font-family: inherit;
  width: 100%;
}

.register-input::placeholder {
  color: #9ca3af;
  font-size: 13.5px;
  }

.otp-input-group {
  height: 48px;
}

.otp-code-input {
  text-align: center;
  font-size: 22px;
  letter-spacing: 6px;
  font-weight: 700;
  color: #111827;
}

/* Primary Blue Button matching reference */
.register-btn-primary {
  width: 100%;
  height: 42px;
  background-color: #2643f8;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  margin-top: 2px;
  transition: background-color 0.2s ease, transform 0.1s ease, box-shadow 0.2s ease;
  box-shadow: 0 2px 8px rgba(38, 67, 248, 0.25);
}

.register-btn-primary:hover {
  background-color: #1d35d8;
  box-shadow: 0 4px 12px rgba(38, 67, 248, 0.35);
}

.register-btn-primary:active {
  transform: scale(0.985);
}

/* Toggle mode link */
.register-secondary-action {
  display: flex;
  justify-content: center;
  margin-top: 14px;
}

.register-link-btn {
  background: none;
  border: none;
  color: #2563eb;
  font-size: 13.5px;
  font-weight: 500;
  cursor: pointer;
  padding: 4px 8px;
  font-family: inherit;
  transition: color 0.15s ease, text-decoration 0.15s ease;
}

.register-link-btn:hover {
  color: #1d4ed8;
  text-decoration: underline;
}

/* Divider with 'or' */
.register-divider {
  display: flex;
  align-items: center;
  margin: 18px 0;
  width: 100%;
}

.register-divider_line {
  flex: 1;
  height: 1px;
  background-color: #e5e7eb;
}

.register-divider_text {
  padding: 0 12px;
  font-size: 13px;
  color: #9ca3af;
  text-transform: lowercase;
}

/* Social Buttons row */
.register-social-row {
  display: flex;
  justify-content: center;
  align-items: center;
}

.register-social-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
}

.register-social-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
  border-color: #d1d5db;
}

.register-social-btn:active {
  transform: translateY(0);
}

/* Already have an account row */
.register-existing-account {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin-top: 20px;
  font-size: 13px;
  color: #6b7280;
}

.register-signin-link {
  color: #0d9488;
  text-decoration: none;
  font-weight: 600;
}

.register-signin-link:hover {
  text-decoration: underline;
}

/* OTP Secondary Actions */
.register-otp-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
}

.register-resend-btn,
.register-back-btn {
  background: none;
  border: none;
  font-size: 13px;
  font-family: inherit;
  cursor: pointer;
  padding: 4px;
  color: #2563eb;
  font-weight: 500;
}

.register-resend-btn:hover:not(:disabled),
.register-back-btn:hover {
  text-decoration: underline;
}

.register-resend-btn:disabled {
  color: #9ca3af;
  cursor: not-allowed;
}

/* Messages */
.register-card_error {
  color: #dc2626;
  font-size: 12.5px;
  margin: -6px 0 0;
  text-align: center;
}

.register-card_success {
  color: #059669;
  font-size: 12.5px;
  margin: -6px 0 0;
  text-align: center;
}

/* Floating Local OTP Notification Toast */
.local-otp-toast {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  width: 90%;
  max-width: 440px;
  background: #ffffff;
  border: 1.5px solid #10b981;
  border-radius: 12px;
  padding: 14px 16px;
  box-shadow: 0 10px 30px rgba(16, 185, 129, 0.2);
}

.local-otp-toast_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.local-otp-toast_badge {
  font-size: 12px;
  font-weight: 700;
  color: #047857;
  background: #ecfdf5;
  padding: 2px 8px;
  border-radius: 10px;
}

.local-otp-toast_close {
  background: none;
  border: none;
  color: #9ca3af;
  font-size: 14px;
  cursor: pointer;
}

.local-otp-toast_body {
  font-size: 13px;
  color: #374151;
  margin: 0 0 10px;
}

.local-otp-toast_code {
  display: inline-block;
  font-size: 16px;
  font-weight: 800;
  letter-spacing: 2px;
  color: #059669;
  background: #f0fdf4;
  padding: 2px 8px;
  border-radius: 4px;
  margin-left: 6px;
}

.local-otp-toast_autofill {
  width: 100%;
  padding: 7px 12px;
  font-size: 12.5px;
  font-weight: 600;
  background: #059669;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.15s ease;
}

.local-otp-toast_autofill:hover {
  background: #047857;
}

/* Toast animations */
.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.25s ease;
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -15px);
}

/* Bottom Footer */
.register-footer {
  position: absolute;
  bottom: 20px;
  left: 0;
  width: 100%;
  text-align: center;
  font-size: 13px;
  color: #9ca3af;
  z-index: 2;
}

/* Mobile & Tablet Responsiveness */
@media (max-width: 900px) {
  .register-page {
    flex-direction: column;
    justify-content: center;
    padding: 30px 16px;
  }

  .register-page_visual {
    display: none;
  }

  .register-page_content {
    justify-content: center;
    padding: 0;
  }

  .register-card {
    max-width: 360px;
  }
}
</style>
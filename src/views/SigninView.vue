<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useI18n } from '@/composables/useI18n'

const router = useRouter()
const { t } = useI18n()

const username = ref('')
const password = ref('')
const errorMessage = ref('')

function handleLogin() {
  if (!username.value || !password.value) {
    errorMessage.value = t('auth.loginRequired', 'Please enter username and password')
    return
  }
  errorMessage.value = ''
  console.log('Logging in with:', { username: username.value, password: password.value })
  // Simulate login & redirect to home
  router.push('/')
}
</script>

<template>
  <div class="signin-page">
    <!-- Back to Home Link -->
    <RouterLink to="/" class="signin-page_home-link" :title="t('auth.backHome', 'Home')">
      &larr; {{ t('auth.backHome', 'Home') }}
    </RouterLink>

    <!-- Left Illustration Area -->
    <div class="signin-page_visual" aria-hidden="true">
      <!-- Background Diagonal Mint Shape -->
      <svg class="signin-page_bg-shape" viewBox="0 0 700 900" preserveAspectRatio="none">
        <polygon points="0,0 260,0 580,900 0,900" fill="#daf2ed" />
      </svg>

      <!-- Vector Artwork (Cabinet, Plant, Folders, Picture Frame) -->
      <svg class="signin-page_artwork" viewBox="0 0 600 700" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        <rect x="30" y="300" width="40" height="150" rx="3" fill="#e8f7f4" stroke="#134e4a" stroke-width="4" />
        <line x1="30" y1="340" x2="70" y2="340" stroke="#134e4a" stroke-width="3" />
        <circle cx="50" cy="425" r="9" fill="#ffffff" stroke="#134e4a" stroke-width="3" />

        <rect x="74" y="300" width="40" height="150" rx="3" fill="#e8f7f4" stroke="#134e4a" stroke-width="4" />
        <line x1="74" y1="340" x2="114" y2="340" stroke="#134e4a" stroke-width="3" />
        <circle cx="94" cy="425" r="9" fill="#ffffff" stroke="#134e4a" stroke-width="3" />

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
        <rect x="0" y="480" width="525" height="100" fill="#e5f5f1" stroke="#134e4a" stroke-width="3" />
        <rect x="190" y="520" width="90" height="18" rx="9" fill="#ffffff" stroke="#134e4a" stroke-width="3.5" />

        <rect x="0" y="585" width="525" height="115" fill="#e5f5f1" stroke="#134e4a" stroke-width="3" />
        <rect x="190" y="630" width="90" height="18" rx="9" fill="#ffffff" stroke="#134e4a" stroke-width="3.5" />
      </svg>
    </div>

    <!-- Right Login Card Area -->
    <div class="signin-page_content">
      <div class="signin-card">
        <h1 class="signin-card_title">{{ t('auth.signInTitle', 'Sign In') }}</h1>

        <form class="signin-card_form" @submit.prevent="handleLogin">
          <!-- Username / Account input -->
          <div class="signin-input-group">
            <span class="signin-input-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </span>
            <input
              v-model="username"
              type="text"
              class="signin-input"
              :placeholder="t('auth.usernamePlaceholder', 'Username or Email')"
              required
              autocomplete="username"
            />
          </div>

          <!-- Password input -->
          <div class="signin-input-group">
            <span class="signin-input-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </span>
            <input
              v-model="password"
              type="password"
              class="signin-input"
              :placeholder="t('auth.passwordPlaceholder', 'Password')"
              required
              autocomplete="current-password"
            />
          </div>

          <!-- Error Feedback if any -->
          <p v-if="errorMessage" class="signin-card_error">{{ errorMessage }}</p>

          <!-- Submit Button -->
          <div class="signin-card_btn-wrap">
            <button type="submit" class="signin-btn">
              {{ t('auth.signInBtn', 'Sign In') }}
            </button>
          </div>

          <!-- Don't have an account link -->
          <div class="signin-bottom-prompt">
            <span>{{ t('auth.noAccount', "Don't have an account?") }}</span>
            <RouterLink to="/register" class="signin-register-link">
              {{ t('auth.registerLink', 'Register') }}
            </RouterLink>
          </div>
        </form>
      </div>
    </div>

    <!-- Footer Copyright -->
    <footer class="signin-footer">
      Copyright ©2026 HomeAll
    </footer>
  </div>
</template>

<style scoped>
.signin-page {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  overflow: hidden;
  font-family: 'Kantumruy Pro', 'Battambang', 'Hanuman', 'Noto Sans Khmer', system-ui, sans-serif;
  font-family: 'Battambang', 'Siemreap', system-ui, sans-serif;
}

/* Back to Home Link */
.signin-page_home-link {
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

.signin-page_home-link:hover {
  background: #0d9488;
  color: #ffffff;
}

/* Left Illustration Container */
.signin-page_visual {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.signin-page_bg-shape {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.signin-page_artwork {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  max-width: 580px;
  height: auto;
  max-height: 90vh;
}

/* Right Content Area with Login Card */
.signin-page_content {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: flex-end;
  padding: 0 12% 0 0;
  box-sizing: border-box;
}

/* Login Card */
.signin-card {
  width: 100%;
  max-width: 380px;
  background: #ffffff;
  border: 1.5px solid #a4e0d6;
  border-radius: 12px;
  padding: 38px 30px 32px;
  box-shadow: 0 10px 28px rgba(0, 77, 64, 0.06);
  box-sizing: border-box;
}

.signin-card_title {
  font-family: var(--font-family-title, 'Khmer OS', 'Khmer OS System', 'Khmer OS Muol Light', 'Khmer', 'Kantumruy Pro', 'Battambang', sans-serif);
  font-family: var(--font-family-title, 'Siemreap', 'Battambang', sans-serif);
  text-align: center;
  font-size: 26px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 24px 0;
  letter-spacing: 0.01em;
  line-height: 1.35;
}

.signin-card_form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Input Group with Icon */
.signin-input-group {
  display: flex;
  align-items: center;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 0 12px;
  height: 44px;
  background-color: #ffffff;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.signin-input-group:focus-within {
  border-color: #009688;
  box-shadow: 0 0 0 3px rgba(0, 150, 136, 0.15);
}

.signin-input-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  margin-right: 10px;
}

.signin-input {
  flex: 1;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  color: #1f2937;
  font-family: inherit;
}

.signin-input::placeholder {
  color: #9ca3af;
}

.signin-card_error {
  color: #dc2626;
  font-size: 12.5px;
  margin: -6px 0 0;
  text-align: center;
}

/* Submit Button Wrap */
.signin-card_btn-wrap {
  display: flex;
  justify-content: center;
  margin-top: 6px;
}

.signin-btn {
  width: 170px;
  height: 40px;
  background-color: #009688;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
}

.signin-btn:hover {
  background-color: #00796b;
}

.signin-btn:active {
  transform: scale(0.98);
}

/* Bottom Prompt */
.signin-bottom-prompt {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 13px;
  color: #6b7280;
  margin-top: 14px;
}

.signin-register-link {
  color: #009688;
  text-decoration: none;
  font-weight: 600;
}

.signin-register-link:hover {
  text-decoration: underline;
}

/* Bottom Footer */
.signin-footer {
  position: absolute;
  bottom: 24px;
  left: 0;
  width: 100%;
  text-align: center;
  font-size: 13px;
  color: #9ca3af;
  z-index: 2;
}

/* Mobile & Tablet Responsiveness */
@media (max-width: 900px) {
  .signin-page {
    flex-direction: column;
    justify-content: center;
    padding: 30px 16px;
    min-height: auto;
  }

  .signin-page_visual {
    display: none;
  }

  .signin-page_content {
    justify-content: center;
    padding: 0;
  }

  .signin-card {
    max-width: 360px;
    max-width: 400px;
    width: 100%;
  }

  .signin-footer {
    position: static;
    margin-top: 24px;
  }
}

@media (max-width: 480px) {
  .signin-card {
    padding: 24px 18px;
    border-radius: 12px;
  }
}
</style>
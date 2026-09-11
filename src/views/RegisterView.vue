<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'

const router = useRouter()

const email = ref('')
const code = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const countdown = ref(0)
let timer = null

function handleGetCode() {
  if (!email.value) {
    errorMessage.value = 'សូមបញ្ចូលអាសយដ្ឋានអ៊ីមែលជាមុនសិន'
    return
  }
  errorMessage.value = ''
  countdown.value = 60
  timer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
    } else {
      clearInterval(timer)
    }
  }, 1000)
}

function handleSubmit() {
  if (!email.value || !code.value || !newPassword.value || !confirmPassword.value) {
    errorMessage.value = 'សូមបំពេញព័ត៌មានទាំងអស់'
    return
  }
  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = 'លេខសម្ងាត់ទាំងពីរមិនត្រូវគ្នាទេ'
    return
  }
  errorMessage.value = ''
  successMessage.value = 'កំណត់លេខសម្ងាត់បានជោគជ័យ!'
  setTimeout(() => {
    router.push('/sign-in')
  }, 1200)
}
</script>

<template>
  <div class="register-page">
    <!-- Back to Home Link -->
    <RouterLink to="/" class="register-page__home-link" title="ត្រឡប់ទៅទំព័រដើម">
      &larr; ទំព័រដើម
    </RouterLink>

    <!-- Left Illustration Area -->
    <div class="register-page__visual" aria-hidden="true">
      <!-- Background Diagonal Mint Shape -->
      <svg class="register-page__bg-shape" viewBox="0 0 700 900" preserveAspectRatio="none">
        <polygon points="0,0 260,0 580,900 0,900" fill="#daf2ed" />
      </svg>

      <!-- Vector Artwork (Cabinet, Plant, Folders, Picture Frame) -->
      <svg class="register-page__artwork" viewBox="0 0 600 700" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        <!-- Leaves behind -->
        <path d="M375 410 C340 330 320 220 375 160 C400 240 395 350 375 410 Z" fill="#d1fae5" stroke="#134e4a" stroke-width="3.5" />
        <path d="M365 410 C300 350 250 270 305 200 C340 260 360 350 365 410 Z" fill="#0d9488" stroke="#134e4a" stroke-width="3.5" />
        <line x1="335" y1="305" x2="365" y2="410" stroke="#134e4a" stroke-width="2.5" />

        <!-- Leftmost Spreading Leaf -->
        <path d="M350 420 C270 390 200 370 230 330 C290 350 330 390 350 420 Z" fill="#5eead4" stroke="#134e4a" stroke-width="3.5" />
        <line x1="260" y1="350" x2="350" y2="420" stroke="#134e4a" stroke-width="2.5" />

        <!-- Center Tall Leaf -->
        <path d="M380 410 C380 300 385 180 410 140 C425 220 415 320 380 410 Z" fill="#009688" stroke="#134e4a" stroke-width="3.5" />
        <line x1="395" y1="275" x2="380" y2="410" stroke="#134e4a" stroke-width="2.5" />

        <!-- Right Slanted Leaf -->
        <path d="M390 410 C420 330 450 240 470 190 C470 260 440 350 390 410 Z" fill="#99f6e4" stroke="#134e4a" stroke-width="3.5" />
        <line x1="430" y1="300" x2="390" y2="410" stroke="#134e4a" stroke-width="2.5" />

        <!-- Right Lower Leaf -->
        <path d="M395 420 C460 380 500 320 520 280 C490 340 450 400 395 420 Z" fill="#ffffff" stroke="#134e4a" stroke-width="3.5" />
        <line x1="457" y1="350" x2="395" y2="420" stroke="#134e4a" stroke-width="2.5" />

        <!-- Plant Pot -->
        <!-- Pot Rim -->
        <rect x="330" y="420" width="115" height="14" rx="2" fill="#ffffff" stroke="#134e4a" stroke-width="3.5" />
        <!-- Pot Body -->
        <path d="M338 434 L348 505 Q350 515 365 515 H410 Q425 515 427 505 L437 434 Z" fill="#ffffff" stroke="#134e4a" stroke-width="3.5" />

        <!-- Desk / Cabinet Top Surface -->
        <rect x="0" y="450" width="560" height="24" fill="#ffffff" stroke="#134e4a" stroke-width="4" />

        <!-- Cabinet Body -->
        <rect x="0" y="474" width="530" height="226" fill="#e5f5f1" stroke="#134e4a" stroke-width="4" />
        <!-- Drawer 1 -->
        <rect x="0" y="480" width="525" height="100" fill="#e5f5f1" stroke="#134e4a" stroke-width="3" />
        <!-- Handle 1 -->
        <rect x="190" y="520" width="90" height="18" rx="9" fill="#ffffff" stroke="#134e4a" stroke-width="3.5" />

        <!-- Drawer 2 -->
        <rect x="0" y="585" width="525" height="115" fill="#e5f5f1" stroke="#134e4a" stroke-width="3" />
        <!-- Handle 2 -->
        <rect x="190" y="630" width="90" height="18" rx="9" fill="#ffffff" stroke="#134e4a" stroke-width="3.5" />
      </svg>
    </div>

    <!-- Right Reset/Register Card Area -->
    <div class="register-page__content">
      <div class="register-card">
        <!-- Top Lock Icon Badge -->
        <div class="register-card__badge" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#009688" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>

        <h1 class="register-card__title">កំណត់លេខសម្ងាត់ថ្មី</h1>
        <p class="register-card__desc">
          បញ្ចូលអ៊ីមែលរបស់អ្នក ដើម្បីទទួលបានលេខកូដ ៦ ខ្ទង់ រួចកំណត់លេខសម្ងាត់ថ្មី។
        </p>

        <form class="register-card__form" @submit.prevent="handleSubmit">
          <!-- 1. Email input -->
          <div class="register-input-group">
            <span class="register-input-icon" aria-hidden="true">
              <!-- Envelope Icon -->
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </span>
            <input
              v-model="email"
              type="email"
              class="register-input"
              placeholder="បញ្ចូលអាសយដ្ឋានអ៊ីមែល"
              required
              autocomplete="email"
            />
          </div>

          <!-- 2. Code input with Get Code button -->
          <div class="register-input-group register-input-group--code">
            <span class="register-input-icon" aria-hidden="true">
              <!-- Message Bubble Icon -->
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </span>
            <input
              v-model="code"
              type="text"
              class="register-input"
              placeholder="បញ្ចូលលេខកូដ ៦ ខ្ទង់"
              required
              maxlength="6"
            />
            <button
              type="button"
              class="register-input-btn"
              :disabled="countdown > 0"
              @click="handleGetCode"
            >
              {{ countdown > 0 ? `${countdown}s` : 'យកលេខកូដ' }}
            </button>
          </div>

          <!-- 3. New Password input -->
          <div class="register-input-group">
            <span class="register-input-icon" aria-hidden="true">
              <!-- Lock Icon -->
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </span>
            <input
              v-model="newPassword"
              type="password"
              class="register-input"
              placeholder="បញ្ចូលលេខសម្ងាត់ថ្មី"
              required
              autocomplete="new-password"
            />
          </div>

          <!-- 4. Confirm Password input -->
          <div class="register-input-group">
            <span class="register-input-icon" aria-hidden="true">
              <!-- Lock Icon -->
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </span>
            <input
              v-model="confirmPassword"
              type="password"
              class="register-input"
              placeholder="បញ្ជាក់លេខសម្ងាត់ថ្មី"
              required
              autocomplete="new-password"
            />
          </div>

          <!-- Error / Success Feedback -->
          <p v-if="errorMessage" class="register-card__error">{{ errorMessage }}</p>
          <p v-if="successMessage" class="register-card__success">{{ successMessage }}</p>

          <!-- Submit Button -->
          <div class="register-card__btn-wrap">
            <button type="submit" class="register-btn">
              ប្ដូរលេខសម្ងាត់
            </button>
          </div>
        </form>

        <!-- Link back to Sign In -->
        <p class="register-card__bottom-link">
          ចាំបានហើយ?
          <RouterLink to="/sign-in" class="register-card__link-text">
            ត្រឡប់ទៅចូលប្រើប្រាស់
          </RouterLink>
        </p>
      </div>
    </div>

    <!-- Footer Copyright -->
    <footer class="register-footer">
      Copyright ©2026
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
.register-page__home-link {
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

.register-page__home-link:hover {
  background: #0d9488;
  color: #ffffff;
}

/* Left Illustration Container */
.register-page__visual {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.register-page__bg-shape {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.register-page__artwork {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  max-width: 580px;
  height: auto;
  max-height: 90vh;
}

/* Right Content Area with Card */
.register-page__content {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: flex-end;
  padding: 0 12% 0 0;
  box-sizing: border-box;
}

/* Register / Reset Card */
.register-card {
  width: 100%;
  max-width: 390px;
  background: #ffffff;
  border: 1.5px solid #a4e0d6;
  border-radius: 12px;
  padding: 32px 28px 28px;
  box-shadow: 0 10px 28px rgba(0, 77, 64, 0.05);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Badge with Lock Icon */
.register-card__badge {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background-color: #e0f2f1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
}

.register-card__title {
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 10px 0;
}

.register-card__desc {
  text-align: center;
  font-size: 13px;
  line-height: 1.6;
  color: #6b7280;
  margin: 0 0 20px 0;
}

.register-card__form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 13px;
}

/* Input Group */
.register-input-group {
  display: flex;
  align-items: center;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 0 12px;
  height: 42px;
  background-color: #ffffff;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.register-input-group:focus-within {
  border-color: #009688;
  box-shadow: 0 0 0 3px rgba(0, 150, 136, 0.15);
}

.register-input-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  margin-right: 10px;
}

.register-input {
  flex: 1;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: 13.5px;
  color: #1f2937;
  font-family: inherit;
  min-width: 0;
}

.register-input::placeholder {
  color: #9ca3af;
}

/* Code button inside input */
.register-input-btn {
  background: none;
  border: none;
  color: #009688;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding-left: 8px;
  white-space: nowrap;
  font-family: inherit;
  transition: color 0.15s ease;
}

.register-input-btn:hover:not(:disabled) {
  color: #00796b;
  text-decoration: underline;
}

.register-input-btn:disabled {
  color: #9ca3af;
  cursor: not-allowed;
}

.register-card__error {
  color: #dc2626;
  font-size: 12.5px;
  margin: -2px 0 0;
  text-align: center;
}

.register-card__success {
  color: #059669;
  font-size: 12.5px;
  margin: -2px 0 0;
  text-align: center;
}

/* Submit Button Wrap */
.register-card__btn-wrap {
  display: flex;
  justify-content: center;
  margin-top: 6px;
}

.register-btn {
  width: 170px;
  height: 38px;
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

.register-btn:hover {
  background-color: #00796b;
}

.register-btn:active {
  transform: scale(0.98);
}

/* Bottom Sign In Link */
.register-card__bottom-link {
  font-size: 13px;
  color: #6b7280;
  margin: 18px 0 0 0;
  text-align: center;
}

.register-card__link-text {
  color: #009688;
  text-decoration: none;
  font-weight: 600;
  margin-left: 4px;
}

.register-card__link-text:hover {
  text-decoration: underline;
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

  .register-page__visual {
    display: none;
  }

  .register-page__content {
    justify-content: center;
    padding: 0;
  }

  .register-card {
    max-width: 360px;
  }
}
</style>
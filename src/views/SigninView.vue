<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'

const router = useRouter()

const username = ref('')
const password = ref('')
const errorMessage = ref('')

function handleLogin() {
  if (!username.value || !password.value) {
    errorMessage.value = 'សូមបញ្ចូលគណនី និងលេខសម្ងាត់'
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
    <RouterLink to="/" class="signin-page__home-link" title="ត្រឡប់ទៅទំព័រដើម">
      &larr; ទំព័រដើម
    </RouterLink>

    <!-- Left Illustration Area -->
    <div class="signin-page__visual" aria-hidden="true">
      <!-- Background Diagonal Mint Shape -->
      <svg class="signin-page__bg-shape" viewBox="0 0 700 900" preserveAspectRatio="none">
        <polygon points="0,0 260,0 580,900 0,900" fill="#daf2ed" />
      </svg>

      <!-- Vector Artwork (Cabinet, Plant, Folders, Picture Frame) -->
      <svg class="signin-page__artwork" viewBox="0 0 600 700" fill="none" xmlns="http://www.w3.org/2000/svg">
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

    <!-- Right Login Card Area -->
    <div class="signin-page__content">
      <div class="signin-card">
        <h1 class="signin-card__title">ចូល​គណនី</h1>

        <form class="signin-card__form" @submit.prevent="handleLogin">
          <!-- Username / Account input -->
          <div class="signin-input-group">
            <span class="signin-input-icon" aria-hidden="true">
              <!-- User Icon -->
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </span>
            <input
              v-model="username"
              type="text"
              class="signin-input"
              placeholder="គណនី"
              required
              autocomplete="username"
            />
          </div>

          <!-- Password input -->
          <div class="signin-input-group">
            <span class="signin-input-icon" aria-hidden="true">
              <!-- Lock Icon -->
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </span>
            <input
              v-model="password"
              type="password"
              class="signin-input"
              placeholder="លេខសម្ងាត់"
              required
              autocomplete="current-password"
            />
          </div>

          <!-- Error Feedback if any -->
          <p v-if="errorMessage" class="signin-card__error">{{ errorMessage }}</p>

          <!-- Submit Button -->
          <div class="signin-card__btn-wrap">
            <button type="submit" class="signin-btn">
              ចូលប្រើប្រាស់
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Footer Copyright -->
    <footer class="signin-footer">
      Copyright ©2026
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
}

/* Back to Home Link */
.signin-page__home-link {
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

.signin-page__home-link:hover {
  background: #0d9488;
  color: #ffffff;
}

/* Left Illustration Container */
.signin-page__visual {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.signin-page__bg-shape {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.signin-page__artwork {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  max-width: 580px;
  height: auto;
  max-height: 90vh;
}

/* Right Content Area with Login Card */
.signin-page__content {
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
  padding: 42px 32px 36px;
  box-shadow: 0 10px 28px rgba(0, 77, 64, 0.05);
  box-sizing: border-box;
}

.signin-card__title {
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 32px 0;
  letter-spacing: 0.02em;
}

.signin-card__form {
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
  font-size: 15px;
  color: #1f2937;
  font-family: inherit;
}

.signin-input::placeholder {
  color: #9ca3af;
}

.signin-card__error {
  color: #dc2626;
  font-size: 13px;
  margin: -4px 0 0;
  text-align: center;
}

/* Submit Button Wrap */
.signin-card__btn-wrap {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.signin-btn {
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

.signin-btn:hover {
  background-color: #00796b;
}

.signin-btn:active {
  transform: scale(0.98);
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
  }

  .signin-page__visual {
    display: none;
  }

  .signin-page__content {
    justify-content: center;
    padding: 0;
  }

  .signin-card {
    max-width: 360px;
  }
}
</style>
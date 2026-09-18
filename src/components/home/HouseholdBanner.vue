<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from '@/composables/useI18n'
import familyImg from '@/assets/images/household-family.jpg'

const { t, currentLocale } = useI18n()
const isKhmer = computed(() => currentLocale.value === 'km')
</script>

<template>
  <section class="household-banner" aria-label="Household Essentials Banner">
    <div class="container">
      <div class="household-banner_card">
        <!-- Left Text Copy -->
        <div class="household-banner_content">
          <h2 class="household-banner_title" :class="{ 'household-banner_title--km': isKhmer }">
            <template v-if="isKhmer">
              <strong>គ្រប់</strong>របស់របរប្រើប្រាស់ក្នុងផ្ទះ <strong>គុណភាពខ្ពស់</strong> និងតម្លៃសមរម្យ
            </template>
            <template v-else>
              <strong>Every</strong> household essential, <strong>great quality</strong>,<br class="hide-mobile" /> great value
            </template>
          </h2>

          <p class="household-banner_sub" :class="{ 'household-banner_sub--km': isKhmer }">
            <template v-if="isKhmer">
              ទំនិញប្រើប្រាស់ក្នុងផ្ទះ — គុណភាពខ្ពស់ តម្លៃដែលអ្នកពេញចិត្ត
            </template>
            <template v-else>
              Household goods — great quality, prices you'll love
            </template>
          </p>

          <div class="household-banner_action">
            <RouterLink to="/products" class="household-banner_btn">
              {{ isKhmer ? 'ទិញឥឡូវនេះ' : 'Shop now' }}
            </RouterLink>
          </div>
        </div>

        <!-- Right Family Photo (From assets/images/household-family.png) -->
        <div class="household-banner_image-wrap">
          <img
            :src="familyImg"
            alt="Every household essential, great quality, great value"
            class="household-banner_img"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.household-banner {
  padding: 12px 0 28px 0;
  width: 100%;
}

.household-banner_card {
  background-color: #f2f5f9;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 0 44px;
  min-height: 216px;
  box-sizing: border-box;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.04);
}

/* Left Content Area */
.household-banner_content {
  flex: 1;
  max-width: 520px;
  padding: 24px 0;
  z-index: 2;
}

.household-banner_title {
  margin: 0 0 10px 0;
  font-size: 26px;
  line-height: 1.25;
  font-weight: 400;
  color: #111827;
  letter-spacing: -0.01em;
}

.household-banner_title strong {
  font-weight: 700;
}

.household-banner_title--km {
  font-family: 'Kantumruy Pro', 'Battambang', 'Siemreap', 'Khmer OS', sans-serif;
  font-size: 22px;
  line-height: 1.45;
}

.household-banner_sub {
  margin: 0 0 20px 0;
  font-size: 14px;
  line-height: 1.4;
  color: #4b5563;
}

.household-banner_sub--km {
  font-family: 'Kantumruy Pro', 'Battambang', 'Siemreap', 'Khmer OS', sans-serif;
  font-size: 13.5px;
  line-height: 1.5;
}

.household-banner_action {
  display: flex;
  align-items: center;
}

.household-banner_btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 18px;
  min-height: 34px;
  border: 1.5px solid #111827;
  border-radius: 6px;
  background-color: #ffffff;
  color: #111827;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.household-banner_btn:hover {
  background-color: #111827;
  color: #ffffff;
  transform: translateY(-1px);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
}

.household-banner_btn:active {
  transform: translateY(0);
}

/* Right Image Area */
.household-banner_image-wrap {
  flex-shrink: 0;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  height: 100%;
  max-width: 520px;
}

.household-banner_img {
  max-height: 216px;
  width: auto;
  object-fit: contain;
  object-position: bottom right;
  display: block;
}

/* Responsive Rules */
@media (max-width: 1024px) {
  .household-banner_card {
    padding-left: 28px;
  }

  .household-banner_title {
    font-size: 22px;
  }

  .household-banner_sub {
    font-size: 13px;
    margin-bottom: 16px;
  }

  .household-banner_img {
    max-height: 190px;
  }
}

@media (max-width: 768px) {
  .household-banner {
    padding: 8px 0 20px 0;
  }

  .household-banner_card {
    flex-direction: column;
    align-items: flex-start;
    padding: 24px 20px 0 20px;
  }

  .household-banner_content {
    max-width: 100%;
    padding: 0 0 16px 0;
  }

  .household-banner_title {
    font-size: 20px;
  }

  .hide-mobile {
    display: none;
  }

  .household-banner_image-wrap {
    width: 100%;
    justify-content: center;
    max-width: 100%;
  }

  .household-banner_img {
    max-height: 180px;
    width: 100%;
    max-width: 380px;
    object-position: center bottom;
  }
}

@media (max-width: 480px) {
  .household-banner_title {
    font-size: 18px;
  }

  .household-banner_sub {
    font-size: 12.5px;
  }

  .household-banner_btn {
    width: 100%;
    text-align: center;
  }
}
</style>

<!-- Non-scoped dark mode support -->
<style>
:root[data-theme="dark"] .household-banner,
body.dark .household-banner {
  background: transparent !important;
}

:root[data-theme="dark"] .household-banner_card,
body.dark .household-banner_card {
  background-color: #1e293b !important;
  border: 1px solid #334155 !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
}

:root[data-theme="dark"] .household-banner_title,
body.dark .household-banner_title {
  color: #ffffff !important;
}

:root[data-theme="dark"] .household-banner_sub,
body.dark .household-banner_sub {
  color: #cbd5e1 !important;
}

:root[data-theme="dark"] .household-banner_btn,
body.dark .household-banner_btn {
  background-color: #ffffff !important;
  border-color: #ffffff !important;
  color: #000000 !important;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
}

:root[data-theme="dark"] .household-banner_btn:hover,
body.dark .household-banner_btn:hover {
  background-color: #f1f5f9 !important;
  border-color: #f1f5f9 !important;
  color: #000000 !important;
}
</style>


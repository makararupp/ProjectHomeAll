<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
import CategoryNav from '@/components/layout/CategoryNav.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import aboutImage from '@/assets/images/slide1.jpg' // Single static image
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
</script>

<template>
  <div class="about-page">
    <AppHeader />
    <CategoryNav />

    <!-- Full-Width Blue Top Banner -->
    <div class="about-banner">
      <h1 class="about-banner_title">{{ t('about.title', 'About Us') }}</h1>
    </div>

    <!-- Main Section with 1 Static Image (No Background Image) -->
    <main class="about-main">
      <div class="about-container">
        <!-- Single Image: Static (No Hover / No Action) -->
        <div class="about-image-col">
          <img
            :src="aboutImage"
            alt="About HomeAll facility"
            class="about-img"
          />
        </div>

        <!-- Right Column: Text Information -->
        <div class="about-text-col">
          <p class="about-paragraph">
            <strong>{{ t('about.company', 'HomeAll (Cambodia) Co., Ltd') }}</strong> {{ t('about.p1', 'is dedicated to delivering excellence in construction materials, home products, and industrial solutions. We recognize that customer satisfaction and product reliability are the foundation for building trustworthy, long-lasting business relationships with our clients and partners.') }}
          </p>

          <p class="about-paragraph">
            {{ t('about.p2', 'Our mission is designed to provide businesses and consumers with direct access to certified suppliers, transparent pricing, and comprehensive product catalogs. Regardless of whether you are a contractor, commercial developer, or individual homeowner, we attach great importance to quality assurance, timely delivery, and dependable customer support.') }}
          </p>

          <p class="about-paragraph">
            {{ t('about.p3', 'We adhere strictly to international trade and product quality standards, ensuring that every order is handled with care and integrity. We look forward to partnering with you to bring your projects to life.') }}
          </p>
        </div>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.about-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg-page);
  font-family: var(--font-family-base);
}

/* Full-Width Blue Banner */
.about-banner {
  width: 100%;
  background-color: #ffffff;
  min-height: 60px;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.about-banner_title {
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin: 0;
  letter-spacing: 0.02em;
}

/* Main Content Area */
.about-main {
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px 24px;
  background-color: var(--color-bg-page);
  box-sizing: border-box;
}

/* Centered 2-Column Container */
.about-container {
  width: 100%;
  max-width: 1380px;
  display: grid;
  grid-template-columns: 1fr 1.35fr;
  gap: 50px;
  align-items: center;
}

/* Single Static Image (No Hover Action / No Click) */
.about-image-col {
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--color-border);
  background-color: #ffffff;
}

.about-img {
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  object-position: center;
  display: block;
  pointer-events: none; /* Completely disables all hover and click actions */
  user-select: none;
}

/* Right Text Column */
.about-text-col {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: var(--color-bg-surface);
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--color-border);
}

.about-paragraph {
  font-size: 16px;
  line-height: 1.8;
  color: #374151;
  margin: 0;
}

.about-paragraph strong {
  color: #111827;
  font-weight: 700;
}

/* Responsive */
@media (max-width: 960px) {
  .about-container {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .about-text-col {
    padding: 24px;
  }

  .about-main {
    padding: 30px 16px;
  }
}
</style>

<!-- Non-scoped so body.dark / :root[data-theme="dark"] ancestor selectors work -->
<style>
/* =====================================================
   About Us Page – Dark Mode Overrides
   ===================================================== */

/* Banner background */
:root[data-theme="dark"] .about-banner,
body.dark .about-banner {
  background-color: #1e293b;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

/* "About Us" title → white */
:root[data-theme="dark"] .about-banner_title,
body.dark .about-banner_title {
  color: #ffffff;
}

/* Paragraph text */
:root[data-theme="dark"] .about-paragraph,
body.dark .about-paragraph {
  color: #cbd5e1;
}

:root[data-theme="dark"] .about-paragraph strong,
body.dark .about-paragraph strong {
  color: #f1f5f9;
}

/* Image column border */
:root[data-theme="dark"] .about-image-col,
body.dark .about-image-col {
  background-color: #1e293b;
}
</style>


<script setup>
import { RouterLink } from 'vue-router'
import { categoryShowcase } from '@/data/categoryShowcase'
import { useI18n } from '@/composables/useI18n'

const { isKhmer } = useI18n()
</script>

<template>
  <section class="category-showcase" aria-label="Product categories showcase">
    <div class="container">
      <div class="category-showcase_grid">
        <component
          :is="item.href ? RouterLink : 'div'"
          v-for="item in categoryShowcase"
          :key="item.id"
          :to="item.href || undefined"
          class="category-item"
        >
          <!-- Thumbnail Image Container -->
          <div class="category-item_image-wrap">
            <img
              :src="item.image"
              :alt="item.title"
              class="category-item_img"
              loading="lazy"
              width="80"
              height="80"
            />
          </div>

          <!-- Category Title -->
          <span
            class="category-item_title"
            :class="{ 'category-item_title--km': isKhmer }"
            :lang="isKhmer ? 'km' : 'en'"
          >
            {{ isKhmer ? item.titleKm : item.title }}
          </span>
        </component>
      </div>
    </div>
  </section>
</template>

<style scoped>
.category-showcase {
  padding: 24px 0 16px 0;
  background-color: #ffffff;
}

.category-showcase_grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 16px 10px;
  align-items: start;
}

/* Individual Category Item */
.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Hover effect ONLY (don't click, just hover) */
.category-item:hover {
  transform: translateY(-4px);
}

/* Strictly NO active click state */
/* .category-item:active {
  transform: translateY(-4px) !important;
} */

/* Thumbnail Frame */
.category-item_image-wrap {
  width: 78px;
  height: 78px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04), 0 1px 2px rgba(15, 23, 42, 0.02);
  border: 1px solid rgba(226, 232, 240, 0.8);
  transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.28s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.28s ease;
}

.category-item:hover .category-item_image-wrap {
  transform: scale(1.06);
  box-shadow: 0 8px 18px -2px rgba(15, 23, 42, 0.1), 0 2px 6px rgba(15, 23, 42, 0.04);
  border-color: #cbd5e1;
}

.category-item_img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 5px 4px 3px 4px;
  padding-top: 5px;
  display: block;
  pointer-events: none;
  transition: transform 0.25s ease;
}

.category-item:hover .category-item_img {
  transform: scale(1.05);
}

/* Label text */
.category-item_title {
  margin-top: 8px;
  font-size: 12px;
  font-weight: 600;
  color: #1f2937;
  line-height: 1.35;
  letter-spacing: 0;
  text-align: center;
  word-break: break-word;
  overflow-wrap: break-word;
  max-width: 102px;
  min-height: 34px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.category-item:hover .category-item_title {
  color: #1f2937;
}

/* Khmer-specific title styling - prevents broken/clipped subscripts and vowels */
.category-item_title--km {
  font-family: 'Kantumruy Pro', 'Battambang', 'Siemreap', 'Khmer OS', sans-serif;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.6;
  letter-spacing: 0;
  margin-top: 6px;
  padding: 2px 2px 4px 2px;
  max-width: 106px;
  min-height: 40px;
  display: block;
  overflow: visible;
  -webkit-line-clamp: unset;
}

/* Responsive: 5 per row on tablets */
@media (max-width: 1024px) {
  .category-showcase_grid {
    grid-template-columns: repeat(5, 1fr);
    gap: 16px 12px;
  }

  .category-item_image-wrap {
    width: 72px;
    height: 72px;
  }

  .category-item_title {
    font-size: 11.5px;
    min-height: 32px;
  }

  .category-item_title--km {
    font-size: 11.5px;
    line-height: 1.55;
    min-height: 38px;
    max-width: 96px;
  }
}

/* Responsive: 4 per row on small tablets / large phones */
@media (max-width: 768px) {
  .category-showcase_grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 14px 10px;
  }

  .category-item_image-wrap {
    width: 68px;
    height: 68px;
  }

  .category-item_title {
    font-size: 11px;
    min-height: 30px;
  }

  .category-item_title--km {
    font-size: 11px;
    line-height: 1.5;
    min-height: 36px;
    max-width: 90px;
  }
}

/* Responsive: 3 per row on mobile phones */
@media (max-width: 480px) {
  .category-showcase {
    padding: 16px 0 10px 0;
  }

  .category-showcase_grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 12px 8px;
  }

  .category-item_image-wrap {
    width: 64px;
    height: 64px;
    border-radius: 10px;
  }

  .category-item_title {
    font-size: 10.5px;
    max-width: 85px;
    min-height: 28px;
  }

  .category-item_title--km {
    font-size: 10.5px;
    line-height: 1.48;
    min-height: 34px;
    max-width: 85px;
  }
}
</style>

<!-- Non-scoped so body.dark / :root[data-theme="dark"] ancestor selectors work -->
<style>
/* =====================================================
   Category Showcase (PromoBanners) – Dark Mode Overrides
   ===================================================== */

:root[data-theme="dark"] .category-showcase,
body.dark .category-showcase {
  background-color: transparent !important;
  background: transparent !important;
}

/* Category item thumbnail card in dark mode: white background matching the Hero card */
:root[data-theme="dark"] .category-item_image-wrap,
body.dark .category-item_image-wrap {
  background-color: #ffffff !important;
  border-color: rgba(255, 255, 255, 0.15) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}

:root[data-theme="dark"] .category-item:hover .category-item_image-wrap,
body.dark .category-item:hover .category-item_image-wrap {
  border-color: #ffffff !important;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
}

/* Category Title text → crisp white in dark mode (stays white even on hover) */
:root[data-theme="dark"] .category-item_title,
body.dark .category-item_title,
:root[data-theme="dark"] .category-item:hover .category-item_title,
body.dark .category-item:hover .category-item_title {
  color: #ffffff !important;
}
</style>


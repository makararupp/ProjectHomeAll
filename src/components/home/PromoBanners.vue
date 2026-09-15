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
          <span class="category-item_title">
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
  padding: 4px;
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
  font-weight: 700;
  color: #1f2937;
  line-height: 1.25;
  letter-spacing: 0.1px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  max-width: 95px;
}

.category-item:hover .category-item_title {
  color: #1f2937;
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
  }
}
</style>

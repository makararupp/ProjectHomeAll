<script setup>
import { categoryShowcase } from '@/data/categoryShowcase'
import { useI18n } from '@/composables/useI18n'

const { isKhmer } = useI18n()
</script>

<template>
  <section class="category-showcase" aria-label="Product categories showcase">
    <div class="container">
      <div class="category-showcase__grid">
        <div
          v-for="item in categoryShowcase"
          :key="item.id"
          class="category-item"
        >
          <!-- Thumbnail Image Container -->
          <div class="category-item__image-wrap">
            <img
              :src="item.image"
              :alt="item.title"
              class="category-item__img"
              loading="lazy"
              width="80"
              height="80"
            />
          </div>

          <!-- Category Title -->
          <span class="category-item__title">
            {{ isKhmer ? item.titleKm : item.title }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.category-showcase {
  padding: 24px 0 16px 0;
  background-color: var(--color-bg-page, #f7f8fa);
}

.category-showcase__grid {
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
  cursor: default;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Hover effect ONLY (don't click, just hover) */
.category-item:hover {
  transform: translateY(-4px);
}

/* Strictly NO active click state */
.category-item:active {
  transform: translateY(-4px) !important;
}

/* Thumbnail Frame */
.category-item__image-wrap {
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

.category-item:hover .category-item__image-wrap {
  transform: scale(1.06);
  box-shadow: 0 8px 18px -2px rgba(15, 23, 42, 0.1), 0 2px 6px rgba(15, 23, 42, 0.04);
  border-color: rgba(52, 199, 89, 0.5);
}

.category-item__img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 4px;
  display: block;
  pointer-events: none;
  transition: transform 0.25s ease;
}

.category-item:hover .category-item__img {
  transform: scale(1.05);
}

/* Label text */
.category-item__title {
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
  transition: color 0.2s ease;
}

.category-item:hover .category-item__title {
  color: var(--color-brand, #34c759);
}

/* Responsive: 5 per row on tablets */
@media (max-width: 1024px) {
  .category-showcase__grid {
    grid-template-columns: repeat(5, 1fr);
    gap: 16px 12px;
  }

  .category-item__image-wrap {
    width: 72px;
    height: 72px;
  }

  .category-item__title {
    font-size: 11.5px;
  }
}

/* Responsive: 4 per row on small tablets / large phones */
@media (max-width: 768px) {
  .category-showcase__grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 14px 10px;
  }

  .category-item__image-wrap {
    width: 68px;
    height: 68px;
  }

  .category-item__title {
    font-size: 11px;
  }
}

/* Responsive: 3 per row on mobile phones */
@media (max-width: 480px) {
  .category-showcase {
    padding: 16px 0 10px 0;
  }

  .category-showcase__grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 12px 8px;
  }

  .category-item__image-wrap {
    width: 64px;
    height: 64px;
    border-radius: 10px;
  }

  .category-item__title {
    font-size: 10.5px;
    max-width: 85px;
  }
}
</style>

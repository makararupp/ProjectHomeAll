<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import CategoryNav from '@/components/layout/CategoryNav.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { blogCategories, blogArticles } from '@/data/blogArticles'
import { useI18n } from '@/composables/useI18n'

const { t, isKhmer } = useI18n()

// Active category filter state
const activeCategory = ref('all')

// Filtered articles computed property
const filteredArticles = computed(() => {
  if (activeCategory.value === 'all') {
    return blogArticles
  }
  return blogArticles.filter(
    (article) => article.categoryId === activeCategory.value
  )
})

function setCategory(id) {
  activeCategory.value = id
}

// Modal reader state for "View More"
const selectedArticle = ref(null)
const isModalOpen = ref(false)

function openArticle(article) {
  selectedArticle.value = article
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  isModalOpen.value = false
  selectedArticle.value = null
  document.body.style.overflow = ''
}

function handleKeydown(e) {
  if (e.key === 'Escape' && isModalOpen.value) {
    closeModal()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="blog_page">
    <AppHeader />
    <CategoryNav />

    <main class="blog_main">
      <div class="container">
        <!-- Top Title & Breadcrumb Bar matching reference image -->
        <div class="blog_top-bar">
          <h1 class="blog_heading" :class="{ 'is-khmer': isKhmer }">
            {{ t('blog.title', 'Blog') }}
          </h1>

          <nav class="blog_breadcrumb" aria-label="Breadcrumb">
            <RouterLink to="/" class="blog_breadcrumb-link">
              {{ t('blog.home', 'Home') }}
            </RouterLink>
            <span class="blog_breadcrumb-sep" aria-hidden="true">/</span>
            <span class="blog_breadcrumb-current" aria-current="page">
              "{{ t('blog.title', 'Blog') }}"
            </span>
          </nav>
        </div>

        <!-- Two-Column Layout: Categories Sidebar + Blog Cards Grid -->
        <div class="blog_layout">
          <!-- Left Sidebar: All Categories -->
          <aside class="blog_sidebar" aria-label="Blog categories">
            <div class="category_card">
              <button
                type="button"
                class="category_title-btn"
                :class="{ 'is-active': activeCategory === 'all' }"
                @click="setCategory('all')"
              >
                {{ t('blog.allCategories', 'All Categories') }}
              </button>
              <div class="category_divider"></div>
              <ul class="category_list">
                <li
                  v-for="cat in blogCategories.filter((c) => c.id !== 'all')"
                  :key="cat.id"
                  class="category_item"
                >
                  <button
                    type="button"
                    class="category_btn"
                    :class="{ 'is-active': activeCategory === cat.id }"
                    @click="setCategory(cat.id)"
                  >
                    <span>{{ isKhmer ? cat.nameKm : cat.name }}</span>
                    <span
                      v-if="activeCategory === cat.id"
                      class="category_bullet"
                      aria-hidden="true"
                    >•</span>
                  </button>
                </li>
              </ul>
            </div>
          </aside>

          <!-- Right Content: Article Cards Grid (3 Columns) -->
          <section class="blog_content" aria-label="Blog articles list">
            <div class="blog_grid">
              <article
                v-for="article in filteredArticles"
                :key="article.id"
                class="blog_card"
              >
                <!-- Card Thumbnail Image -->
                <div class="blog_thumb-wrap">
                  <img
                    :src="article.image"
                    :alt="article.title"
                    class="blog_thumb-img"
                    loading="lazy"
                  />
                </div>

                <!-- Card Content -->
                <div class="blog_body">
                  <h2 class="blog_card-title" :title="article.title">
                    {{ article.title }}
                  </h2>
                  <p class="blog_card-desc">
                    {{ article.excerpt }}
                  </p>

                  <!-- View More Action Button -->
                  <div class="blog_action">
                    <button
                      type="button"
                      class="blog_view-btn"
                      @click="openArticle(article)"
                    >
                      {{ t('blog.viewMore', 'View More') }}
                    </button>
                  </div>
                </div>
              </article>
            </div>

            <!-- Empty State when no articles match -->
            <div v-if="filteredArticles.length === 0" class="blog_empty">
              <p>{{ t('blog.noArticles', 'No articles found in this category.') }}</p>
              <button
                type="button"
                class="blog_reset-btn"
                @click="setCategory('all')"
              >
                {{ t('blog.viewAll', 'View All Categories') }}
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>

    <!-- Modal Dialog to Read Full Article -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="isModalOpen && selectedArticle"
          class="modal_backdrop"
          @click.self="closeModal"
          role="dialog"
          aria-modal="true"
          :aria-label="selectedArticle.title"
        >
          <div class="modal_dialog">
            <button
              type="button"
              class="modal_close-btn"
              @click="closeModal"
              aria-label="Close article"
            >
              ✕
            </button>

            <div class="modal_header-img-wrap">
              <img
                :src="selectedArticle.image"
                :alt="selectedArticle.title"
                class="modal_header-img"
              />
            </div>

            <div class="modal_body">
              <div class="modal_meta">
                <span class="modal_badge">{{ selectedArticle.category }}</span>
                <span class="modal_meta-item">{{ selectedArticle.date }}</span>
                <span class="modal_meta-item" v-if="selectedArticle.author">• {{ selectedArticle.author }}</span>
                <span class="modal_meta-item" v-if="selectedArticle.readTime">• {{ selectedArticle.readTime }}</span>
              </div>

              <h2 class="modal_title">{{ selectedArticle.title }}</h2>

              <div class="modal_text">
                <p>{{ selectedArticle.content }}</p>
              </div>

              <div class="modal_footer">
                <button
                  type="button"
                  class="modal_dismiss-btn"
                  @click="closeModal"
                >
                  {{ t('blog.close', 'Close') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <AppFooter />
  </div>
</template>

<style scoped>
.blog_page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg-page);
  font-family: var(--font-family-base);
}

.blog_main {
  flex: 1;
  padding-top: var(--space-6);
  padding-bottom: var(--space-12);
}

/* Top Title & Breadcrumb bar */
.blog_top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-2);
}

.blog_heading {
  font-size: 26px;
  font-weight: 700;
  color: #111827;
  letter-spacing: -0.02em;
  margin: 0;
}

.blog_heading.is-khmer {
  font-family: var(--font-family-title);
  line-height: 1.5;
}

.blog_breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.blog_breadcrumb-link {
  color: var(--color-text-secondary);
  transition: color var(--transition-fast);
}

.blog_breadcrumb-link:hover {
  color: var(--color-brand);
}

.blog_breadcrumb-sep {
  color: var(--color-text-faint);
}

.blog_breadcrumb-current {
  color: #111827;
  font-weight: 600;
}

/* Main Layout: Sidebar + Grid */
.blog_layout {
  display: flex;
  align-items: flex-start;
  gap: var(--space-6);
}

/* Left Sidebar */
.blog_sidebar {
  width: 220px;
  flex-shrink: 0;
}

.category_card {
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 16px 18px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
}

.category_title-btn {
  display: block;
  width: 100%;
  text-align: left;
  font-size: 15px;
  font-weight: 700;
  color: #111827;
  padding: 2px 0;
  cursor: pointer;
  background: none;
  border: none;
  transition: color var(--transition-fast);
}

.category_title-btn.is-active,
.category_title-btn:hover {
  color: var(--color-brand);
}

.category_divider {
  height: 1px;
  background-color: var(--color-border-softer);
  margin: 12px 0 8px 0;
}

.category_list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.category_btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px 0;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
  background: none;
  border: none;
  text-align: left;
  transition: color var(--transition-fast);
}

.category_btn:hover {
  color: var(--color-brand);
}

.category_btn.is-active {
  color: var(--color-brand);
  font-weight: 600;
}

.category_bullet {
  color: var(--color-brand);
  font-size: 18px;
  line-height: 1;
}

/* Right Content: Grid of Cards */
.blog_content {
  flex: 1;
  min-width: 0;
}

.blog_grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-5);
}

/* Individual Card */
.blog_card {
  background: var(--color-bg-surface);
  border: 1px solid #eef1f5;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.blog_card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.07);
}

/* Card Image */
.blog_thumb-wrap {
  width: 100%;
  height: 170px;
  overflow: hidden;
  background-color: #f1f3f5;
}

.blog_thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.blog_card:hover .blog_thumb-img {
  transform: scale(1.03);
}

/* Card Body */
.blog_body {
  padding: 16px 16px 14px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.blog_card-title {
  font-size: 14.5px;
  font-weight: 700;
  color: #111827;
  line-height: 1.45;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 42px;
}

.blog_card-desc {
  font-size: 13px;
  color: #6b7280;
  line-height: 1.5;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-grow: 1;
}

/* View More Button matching reference styling */
.blog_action {
  margin-top: auto;
}

.blog_view-btn {
  display: block;
  width: 100%;
  background-color: #faebeb;
  color: #c53030;
  font-size: 13px;
  font-weight: 600;
  border-radius: 6px;
  padding: 9px 0;
  text-align: center;
  cursor: pointer;
  border: none;
  transition: background-color var(--transition-fast), color var(--transition-fast), transform var(--transition-fast);
}

.blog_view-btn:hover {
  background-color: #f5d6d6;
  color: #a82020;
  transform: translateY(-1px);
}

.blog_view-btn:active {
  transform: translateY(0);
}

/* Empty State */
.blog_empty {
  text-align: center;
  padding: 60px 20px;
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
}

.blog_reset-btn {
  margin-top: 14px;
  padding: 8px 18px;
  background: var(--color-brand);
  color: #ffffff;
  border-radius: var(--radius-sm);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.blog_reset-btn:hover {
  background: var(--color-brand-dark);
}

/* Modal Styling */
.modal_backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-4);
  z-index: 9999;
}

.modal_dialog {
  background: var(--color-bg-surface);
  width: 100%;
  max-width: 650px;
  max-height: 90vh;
  border-radius: 12px;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.2);
}

.modal_close-btn {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  border: none;
  z-index: 10;
  transition: background-color var(--transition-fast);
}

.modal_close-btn:hover {
  background: rgba(0, 0, 0, 0.85);
}

.modal_header-img-wrap {
  width: 100%;
  height: 260px;
  overflow: hidden;
  background-color: #1a1a1a;
}

.modal_header-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal_body {
  padding: 24px;
}

.modal_meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 12px;
  font-size: 13px;
  color: var(--color-text-secondary);
}

.modal_badge {
  background-color: #faebeb;
  color: #c53030;
  padding: 3px 8px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 12px;
}

.modal_title {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  line-height: 1.4;
  margin-bottom: 16px;
}

.modal_text {
  font-size: 15px;
  color: #374151;
  line-height: 1.65;
  margin-bottom: 24px;
}

.modal_footer {
  display: flex;
  justify-content: flex-end;
}

.modal_dismiss-btn {
  padding: 8px 22px;
  background: var(--color-bg-page);
  border: 1px solid var(--color-border);
  color: var(--color-text-primary);
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.modal_dismiss-btn:hover {
  background: #e9ecef;
}

/* Modal Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive Media Queries */
@media (max-width: 1024px) {
  .blog_grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .blog_layout {
    flex-direction: column;
  }

  .blog_sidebar {
    width: 100%;
  }

  .blog_grid {
    grid-template-columns: 1fr;
  }

  .blog_top-bar {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>
<script setup>
import { RouterView } from 'vue-router'
import ScrollToTop from '@/components/common/ScrollToTop.vue'
import PopupPromotion from '@/components/common/PopupPromotion.vue'
</script>

<template>
  <div class="app-layout">
    <RouterView />
    <ScrollToTop />
    <PopupPromotion />
  </div>
</template>


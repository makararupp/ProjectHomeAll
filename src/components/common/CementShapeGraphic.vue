<script setup>
defineProps({
  shape: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: 'Cement Product'
  }
})
</script>

<template>
  <div class="cement-graphic" :aria-label="alt">
    <!-- 1. Roughcast (TPI Kraft Brown Cement Sack) -->
    <svg v-if="shape === 'roughcast'" viewBox="0 0 100 120" class="svg-shape">
      <defs>
        <radialGradient id="c-shadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#0f172a" stop-opacity="0.22" />
          <stop offset="100%" stop-color="#0f172a" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="kraft-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#b89369" />
          <stop offset="30%" stop-color="#d4b48b" />
          <stop offset="85%" stop-color="#c6a378" />
          <stop offset="100%" stop-color="#9e7b52" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="108" rx="36" ry="6" fill="url(#c-shadow)" />
      <!-- Paper sack body -->
      <path d="M22,22 L78,22 L82,102 L18,102 Z" fill="url(#kraft-grad)" rx="4" />
      <!-- Top pinched fold -->
      <polygon points="20,22 80,22 75,18 25,18" fill="#a07d54" />
      <!-- Green circle logo -->
      <circle cx="50" cy="56" r="15" fill="none" stroke="#166534" stroke-width="2.5" />
      <text x="50" y="59" font-size="7" font-weight="bold" fill="#166534" text-anchor="middle">TPI</text>
      <text x="50" y="78" font-size="6" font-weight="600" fill="#3f2e18" text-anchor="middle">197 BRAND</text>
    </svg>

    <!-- 2. Structural Mortar (SCG Red Elephant Cement Sack) -->
    <svg v-else-if="shape === 'structural-mortar'" viewBox="0 0 100 120" class="svg-shape">
      <ellipse cx="50" cy="108" rx="36" ry="6" fill="url(#c-shadow)" />
      <!-- Cream sack body -->
      <rect x="20" y="20" width="60" height="84" rx="4" fill="#faf6ee" stroke="#e6dfd1" stroke-width="1" />
      <polygon points="20,20 80,20 75,16 25,16" fill="#e5dfd2" />
      <!-- Red SCG hexagon logo -->
      <polygon points="50,38 62,45 62,59 50,66 38,59 38,45" fill="none" stroke="#dc2626" stroke-width="2" />
      <circle cx="50" cy="52" r="6" fill="#dc2626" />
      <text x="50" y="76" font-size="8" font-weight="bold" fill="#dc2626" text-anchor="middle">SCG</text>
      <rect x="20" y="86" width="60" height="18" fill="#dc2626" rx="1" />
    </svg>

    <!-- 3. Ready-Mixed Mortar (Sua Green Sack) -->
    <svg v-else-if="shape === 'ready-mixed'" viewBox="0 0 100 120" class="svg-shape">
      <ellipse cx="50" cy="108" rx="36" ry="6" fill="url(#c-shadow)" />
      <!-- White sack with green header -->
      <rect x="20" y="20" width="60" height="84" rx="4" fill="#ffffff" stroke="#e2e8f0" stroke-width="1" />
      <polygon points="20,20 80,20 76,16 24,16" fill="#15803d" />
      <circle cx="50" cy="46" r="10" fill="none" stroke="#15803d" stroke-width="2" />
      <text x="50" y="50" font-size="8" font-weight="bold" fill="#15803d" text-anchor="middle">เสือ</text>
      <!-- Green bottom bar -->
      <rect x="20" y="74" width="60" height="30" fill="#15803d" rx="2" />
      <text x="50" y="92" font-size="7" font-weight="bold" fill="#ffffff" text-anchor="middle">ฉาบ</text>
    </svg>

    <!-- 4. Lightweight Brick Plaster (Sua Blue Sack) -->
    <svg v-else-if="shape === 'brick-plaster'" viewBox="0 0 100 120" class="svg-shape">
      <ellipse cx="50" cy="108" rx="36" ry="6" fill="url(#c-shadow)" />
      <rect x="20" y="20" width="60" height="84" rx="4" fill="#ffffff" stroke="#e2e8f0" stroke-width="1" />
      <polygon points="20,20 80,20 76,16 24,16" fill="#0284c7" />
      <circle cx="50" cy="46" r="10" fill="none" stroke="#0284c7" stroke-width="2" />
      <text x="50" y="50" font-size="8" font-weight="bold" fill="#0284c7" text-anchor="middle">เสือ</text>
      <!-- Blue bottom bar -->
      <rect x="20" y="74" width="60" height="30" fill="#0284c7" rx="2" />
      <text x="50" y="92" font-size="7" font-weight="bold" fill="#ffffff" text-anchor="middle">ฉาบ</text>
    </svg>

    <!-- 5. Lightweight Brick Masonry Mortar (Sua Lime Green Sack) -->
    <svg v-else-if="shape === 'masonry-mortar'" viewBox="0 0 100 120" class="svg-shape">
      <ellipse cx="50" cy="108" rx="36" ry="6" fill="url(#c-shadow)" />
      <!-- Lime green sack body -->
      <rect x="20" y="20" width="60" height="84" rx="4" fill="#84cc16" stroke="#65a30d" stroke-width="1" />
      <polygon points="20,20 80,20 76,16 24,16" fill="#4d7c0f" />
      <circle cx="50" cy="46" r="10" fill="#ffffff" />
      <text x="50" y="50" font-size="8" font-weight="bold" fill="#4d7c0f" text-anchor="middle">เสือ</text>
      <circle cx="50" cy="80" r="12" fill="none" stroke="#ffffff" stroke-width="1.8" />
      <text x="50" y="83" font-size="6" font-weight="bold" fill="#ffffff" text-anchor="middle">ก่อ</text>
    </svg>

    <!-- 6. Skim Coat (Crocodile Yellow/White Sack) -->
    <svg v-else-if="shape === 'skim-coat'" viewBox="0 0 100 120" class="svg-shape">
      <ellipse cx="50" cy="108" rx="36" ry="6" fill="url(#c-shadow)" />
      <!-- Yellow and white graphic sack -->
      <rect x="20" y="20" width="60" height="84" rx="4" fill="#ffffff" stroke="#eab308" stroke-width="1.2" />
      <!-- Yellow plumb-bob banner -->
      <polygon points="34,26 66,26 50,56" fill="#eab308" />
      <!-- Graphic blocks -->
      <rect x="26" y="64" width="22" height="34" fill="#eab308" rx="2" />
      <rect x="52" y="64" width="22" height="10" fill="#ca8a04" rx="1" />
      <rect x="52" y="76" width="22" height="10" fill="#ca8a04" rx="1" />
      <rect x="52" y="88" width="22" height="10" fill="#ca8a04" rx="1" />
    </svg>

    <!-- 7. White Cement (Sua White/Blue Sack) -->
    <svg v-else-if="shape === 'white-cement'" viewBox="0 0 100 120" class="svg-shape">
      <ellipse cx="50" cy="108" rx="36" ry="6" fill="url(#c-shadow)" />
      <!-- Pure white sack with blue base -->
      <rect x="20" y="20" width="60" height="84" rx="4" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1" />
      <polygon points="20,20 80,20 76,16 24,16" fill="#e2e8f0" />
      <circle cx="50" cy="46" r="10" fill="none" stroke="#2563eb" stroke-width="2" />
      <text x="50" y="50" font-size="8" font-weight="bold" fill="#2563eb" text-anchor="middle">เสือ</text>
      <text x="50" y="66" font-size="6.5" font-weight="600" fill="#1e293b" text-anchor="middle">เดคอร์</text>
      <!-- Blue wave base -->
      <path d="M20,84 Q50,76 80,84 L80,104 L20,104 Z" fill="#2563eb" />
    </svg>

    <!-- 8. Floor Screed Mortar 50 kg (Brown/Red Sack) -->
    <svg v-else-if="shape === 'floor-screed'" viewBox="0 0 100 120" class="svg-shape">
      <ellipse cx="50" cy="108" rx="36" ry="6" fill="url(#c-shadow)" />
      <!-- Brown sack body -->
      <rect x="20" y="20" width="60" height="84" rx="4" fill="#9a3412" stroke="#7c2d12" stroke-width="1" />
      <polygon points="20,20 80,20 76,16 24,16" fill="#7c2d12" />
      <rect x="20" y="20" width="60" height="24" fill="#84cc16" />
      <circle cx="50" cy="32" r="7" fill="#ffffff" />
      <text x="50" y="35" font-size="6" font-weight="bold" fill="#15803d" text-anchor="middle">เสือ</text>
      <!-- Screed trowel symbol -->
      <circle cx="50" cy="74" r="12" fill="none" stroke="#fed7aa" stroke-width="1.8" />
      <text x="50" y="78" font-size="7" font-weight="bold" fill="#fed7aa" text-anchor="middle">เท</text>
    </svg>

    <!-- 9. Plastering Masonry Tools (Putty Knife / Trowel) -->
    <svg v-else-if="shape === 'plastering-tools'" viewBox="0 0 100 120" class="svg-shape">
      <defs>
        <linearGradient id="blade-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#e2e8f0" />
          <stop offset="40%" stop-color="#94a3b8" />
          <stop offset="100%" stop-color="#64748b" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="106" rx="26" ry="5" fill="url(#c-shadow)" />
      <!-- Stainless steel blade trapezoid -->
      <polygon points="38,50 62,50 68,96 32,96" fill="url(#blade-grad)" stroke="#94a3b8" stroke-width="0.8" />
      <line x1="32" y1="96" x2="68" y2="96" stroke="#ffffff" stroke-width="1.5" />
      <!-- Black & Red Ergonomic Handle -->
      <rect x="44" y="24" width="12" height="32" rx="4" fill="#111827" />
      <!-- Red grip accent -->
      <rect x="46" y="26" width="8" height="14" rx="2" fill="#dc2626" />
      <!-- Hanging hole -->
      <circle cx="50" cy="20" r="2.5" fill="#374151" />
    </svg>

    <!-- Fallback Sack -->
    <svg v-else viewBox="0 0 100 120" class="svg-shape">
      <rect x="20" y="20" width="60" height="84" rx="4" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1" />
      <text x="50" y="66" font-size="8" font-weight="bold" fill="#475569" text-anchor="middle">CEMENT</text>
    </svg>
  </div>
</template>

<style scoped>
.cement-graphic {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.svg-shape {
  width: 100%;
  height: 100%;
  max-width: 90px;
  max-height: 90px;
  shape-rendering: geometricPrecision;
  transition: transform 0.2s ease;
}

.cement-graphic:hover .svg-shape {
  transform: scale(1.04);
}
</style>


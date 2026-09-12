<script setup>
defineProps({
  shape: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: 'Steel Product'
  }
})
</script>

<template>
  <div class="steel-graphic" :aria-label="alt">
    <!-- 1. Steel Tube (Glossy black square hollow section) -->
    <svg v-if="shape === 'steel-tube'" viewBox="0 0 120 120" class="svg-shape">
      <defs>
        <radialGradient id="shadow-1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#0f172a" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#0f172a" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="st-top" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#475569" />
          <stop offset="60%" stop-color="#334155" />
          <stop offset="100%" stop-color="#1e293b" />
        </linearGradient>
        <linearGradient id="st-side" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#334155" />
          <stop offset="100%" stop-color="#0f172a" />
        </linearGradient>
        <linearGradient id="st-front" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1e293b" />
          <stop offset="100%" stop-color="#090d16" />
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="106" rx="42" ry="7" fill="url(#shadow-1)" />
      <!-- Outer tube body in perspective -->
      <polygon points="18,52 64,22 104,40 58,70" fill="url(#st-top)" />
      <polygon points="58,70 104,40 104,72 58,102" fill="url(#st-side)" />
      <polygon points="18,52 58,70 58,102 18,84" fill="url(#st-front)" />
      <!-- Front hollow wall cut -->
      <polygon points="26,58 50,69 50,91 26,80" fill="#05080f" />
      <polygon points="50,69 94,50 94,72 50,91" fill="#090d14" opacity="0.9" />
      <!-- Specular top edge line -->
      <line x1="18" y1="52" x2="64" y2="22" stroke="#94a3b8" stroke-width="1" opacity="0.6" />
    </svg>

    <!-- 2. Rebars Reinforced Steel Bars (Bundle of ribbed rods) -->
    <svg v-else-if="shape === 'rebars'" viewBox="0 0 120 120" class="svg-shape">
      <defs>
        <radialGradient id="shadow-2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#0f172a" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#0f172a" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="rebar-rod" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#64748b" />
          <stop offset="35%" stop-color="#334155" />
          <stop offset="85%" stop-color="#1e293b" />
          <stop offset="100%" stop-color="#0f172a" />
        </linearGradient>
      </defs>
      <ellipse cx="62" cy="104" rx="44" ry="7" fill="url(#shadow-2)" />
      <!-- Rod 1 bottom left -->
      <path d="M12,88 L74,36 L86,44 L24,96 Z" fill="url(#rebar-rod)" />
      <ellipse cx="18" cy="92" rx="7" ry="4.5" fill="#334155" stroke="#64748b" stroke-width="0.8" />
      <!-- Rod 2 bottom right -->
      <path d="M32,88 L94,36 L106,44 L44,96 Z" fill="url(#rebar-rod)" />
      <ellipse cx="38" cy="92" rx="7" ry="4.5" fill="#334155" stroke="#64748b" stroke-width="0.8" />
      <!-- Rod 3 middle -->
      <path d="M22,74 L84,22 L96,30 L34,82 Z" fill="url(#rebar-rod)" />
      <ellipse cx="28" cy="78" rx="7" ry="4.5" fill="#475569" stroke="#94a3b8" stroke-width="0.8" />
      <!-- Deformation ribs -->
      <g stroke="#94a3b8" stroke-width="1.8" opacity="0.6">
        <line x1="36" y1="72" x2="42" y2="77" />
        <line x1="48" y1="62" x2="54" y2="67" />
        <line x1="60" y1="52" x2="66" y2="57" />
        <line x1="72" y1="42" x2="78" y2="47" />
      </g>
      <g stroke="#cbd5e1" stroke-width="1.5" opacity="0.7">
        <line x1="42" y1="58" x2="48" y2="63" />
        <line x1="54" y1="48" x2="60" y2="53" />
        <line x1="66" y1="38" x2="72" y2="43" />
        <line x1="78" y1="28" x2="84" y2="33" />
      </g>
    </svg>

    <!-- 3. Lip Channel (C-channel with lips) -->
    <svg v-else-if="shape === 'lip-channel'" viewBox="0 0 120 120" class="svg-shape">
      <defs>
        <radialGradient id="shadow-3" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#0f172a" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#0f172a" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="lc-steel" x1="0%" y1="0%" x2="100%" y2="50%">
          <stop offset="0%" stop-color="#1e293b" />
          <stop offset="40%" stop-color="#475569" />
          <stop offset="80%" stop-color="#1e293b" />
          <stop offset="100%" stop-color="#0f172a" />
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="105" rx="42" ry="7" fill="url(#shadow-3)" />
      <!-- C-channel outer web and flanges -->
      <polygon points="20,46 76,22 96,36 40,60" fill="#475569" />
      <polygon points="20,46 40,60 40,84 20,70" fill="#1e293b" />
      <polygon points="40,60 96,36 96,60 40,84" fill="url(#lc-steel)" />
      <polygon points="40,84 96,60 96,70 40,94" fill="#334155" />
      <!-- Inward return lips -->
      <polygon points="20,46 25,49 25,55 20,52" fill="#64748b" />
      <polygon points="25,49 81,25 81,31 25,55" fill="#334155" />
      <polygon points="40,84 44,81 44,75 40,78" fill="#64748b" />
      <polygon points="44,81 100,57 100,63 44,87" fill="#1e293b" />
    </svg>

    <!-- 4. H Beam Steel -->
    <svg v-else-if="shape === 'h-beam'" viewBox="0 0 120 120" class="svg-shape">
      <defs>
        <radialGradient id="shadow-4" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#0f172a" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#0f172a" stop-opacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="62" cy="106" rx="44" ry="7" fill="url(#shadow-4)" />
      <!-- Top flange -->
      <polygon points="24,42 70,18 106,34 60,58" fill="#64748b" />
      <polygon points="24,42 60,58 60,63 24,47" fill="#334155" />
      <!-- Web -->
      <polygon points="40,53 82,29 82,65 40,89" fill="#1e293b" />
      <!-- Bottom flange -->
      <polygon points="18,78 58,56 94,72 54,94" fill="#475569" />
      <polygon points="18,78 54,94 54,101 18,85" fill="#1e293b" />
      <polygon points="54,94 94,72 94,79 54,101" fill="#0f172a" />
      <!-- Specular edge -->
      <line x1="24" y1="42" x2="70" y2="18" stroke="#cbd5e1" stroke-width="1.2" opacity="0.7" />
    </svg>

    <!-- 5. Round Pipe (Bundle of black steel pipes) -->
    <svg v-else-if="shape === 'round-pipe'" viewBox="0 0 120 120" class="svg-shape">
      <defs>
        <radialGradient id="shadow-5" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#0f172a" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#0f172a" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="pipe-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#64748b" />
          <stop offset="25%" stop-color="#94a3b8" />
          <stop offset="60%" stop-color="#1e293b" />
          <stop offset="100%" stop-color="#090d16" />
        </linearGradient>
      </defs>
      <ellipse cx="62" cy="105" rx="44" ry="7" fill="url(#shadow-5)" />
      <!-- Pipe 1 -->
      <path d="M22,76 L80,24 L94,33 L36,85 Z" fill="url(#pipe-grad)" />
      <ellipse cx="29" cy="81" rx="11" ry="7.5" fill="#1e293b" stroke="#64748b" stroke-width="1.2" />
      <ellipse cx="29" cy="81" rx="7.5" ry="5" fill="#090d14" />
      <!-- Pipe 2 -->
      <path d="M40,76 L98,24 L112,33 L54,85 Z" fill="url(#pipe-grad)" />
      <ellipse cx="47" cy="81" rx="11" ry="7.5" fill="#1e293b" stroke="#64748b" stroke-width="1.2" />
      <ellipse cx="47" cy="81" rx="7.5" ry="5" fill="#090d14" />
      <!-- Pipe 3 on top -->
      <path d="M31,58 L89,6 L103,15 L45,67 Z" fill="url(#pipe-grad)" />
      <ellipse cx="38" cy="63" rx="11" ry="7.5" fill="#334155" stroke="#94a3b8" stroke-width="1.5" />
      <ellipse cx="38" cy="63" rx="7.5" ry="5" fill="#090d14" />
    </svg>

    <!-- 6. Angle Steel (L-beam) -->
    <svg v-else-if="shape === 'angle-steel'" viewBox="0 0 120 120" class="svg-shape">
      <defs>
        <radialGradient id="shadow-6" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#0f172a" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#0f172a" stop-opacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="106" rx="42" ry="7" fill="url(#shadow-6)" />
      <!-- Vertical Leg -->
      <polygon points="22,34 76,14 76,38 22,58" fill="#475569" />
      <polygon points="22,58 76,38 76,78 22,98" fill="#1e293b" />
      <!-- Horizontal Leg -->
      <polygon points="22,98 76,78 100,90 46,110" fill="#334155" />
      <polygon points="46,110 100,90 100,96 46,116" fill="#0f172a" />
      <!-- Front profile edge -->
      <polygon points="18,37 22,34 22,96 44,107 44,113 18,102" fill="#0f172a" stroke="#64748b" stroke-width="0.5" />
      <line x1="22" y1="34" x2="76" y2="14" stroke="#94a3b8" stroke-width="1" opacity="0.8" />
    </svg>

    <!-- 7. Steel Sheet (Plate) -->
    <svg v-else-if="shape === 'steel-sheet'" viewBox="0 0 120 120" class="svg-shape">
      <defs>
        <radialGradient id="shadow-7" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#0f172a" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#0f172a" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="sheet-grad" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stop-color="#64748b" />
          <stop offset="35%" stop-color="#334155" />
          <stop offset="70%" stop-color="#475569" />
          <stop offset="100%" stop-color="#1e293b" />
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="104" rx="38" ry="6" fill="url(#shadow-7)" />
      <!-- Standing steel plate -->
      <polygon points="40,22 92,30 76,98 24,90" fill="url(#sheet-grad)" stroke="#64748b" stroke-width="0.8" />
      <!-- Bottom & side edge thickness -->
      <polygon points="24,90 76,98 76,102 24,94" fill="#0f172a" />
      <polygon points="76,98 92,30 94,31 76,102" fill="#1e293b" />
      <!-- Gloss reflection line -->
      <line x1="45" y1="28" x2="32" y2="88" stroke="#cbd5e1" stroke-width="1.5" opacity="0.3" />
    </svg>

    <!-- 8. Prefabricated Steel (Stirrup ties stack) -->
    <svg v-else-if="shape === 'prefabricated-steel'" viewBox="0 0 120 120" class="svg-shape">
      <defs>
        <radialGradient id="shadow-8" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#0f172a" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#0f172a" stop-opacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="105" rx="40" ry="7" fill="url(#shadow-8)" />
      <!-- Stack of square steel ties -->
      <g fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <rect x="26" y="28" width="58" height="58" rx="7" transform="rotate(-12 55 57)" stroke="#64748b" />
        <rect x="29" y="31" width="58" height="58" rx="7" transform="rotate(-6 58 60)" stroke="#475569" />
        <rect x="32" y="34" width="58" height="58" rx="7" stroke="#334155" />
        <rect x="35" y="37" width="58" height="58" rx="7" stroke="#1e293b" />
      </g>
      <!-- Banding wire strap -->
      <line x1="32" y1="24" x2="46" y2="98" stroke="#cbd5e1" stroke-width="2.5" />
      <line x1="82" y1="26" x2="94" y2="100" stroke="#cbd5e1" stroke-width="2.5" />
    </svg>

    <!-- 9. Flat Bars Steel -->
    <svg v-else-if="shape === 'flat-bar'" viewBox="0 0 120 120" class="svg-shape">
      <defs>
        <radialGradient id="shadow-9" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#0f172a" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#0f172a" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="fb-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#94a3b8" />
          <stop offset="40%" stop-color="#475569" />
          <stop offset="100%" stop-color="#1e293b" />
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="104" rx="44" ry="7" fill="url(#shadow-9)" />
      <!-- Top surface -->
      <polygon points="14,70 82,24 104,36 36,82" fill="url(#fb-grad)" />
      <!-- Side edge -->
      <polygon points="14,70 36,82 36,88 14,76" fill="#1e293b" />
      <!-- Long edge -->
      <polygon points="36,82 104,36 104,42 36,88" fill="#0f172a" />
      <!-- Highlight -->
      <line x1="14" y1="70" x2="82" y2="24" stroke="#e2e8f0" stroke-width="1.2" opacity="0.8" />
    </svg>

    <!-- 10. Channel Steel (U-channel) -->
    <svg v-else-if="shape === 'channel-steel'" viewBox="0 0 120 120" class="svg-shape">
      <defs>
        <radialGradient id="shadow-10" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#0f172a" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#0f172a" stop-opacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="105" rx="42" ry="7" fill="url(#shadow-10)" />
      <!-- U-Channel -->
      <polygon points="18,56 64,28 104,42 58,70" fill="#64748b" />
      <polygon points="18,56 58,70 58,92 18,78" fill="#1e293b" />
      <polygon points="58,70 104,42 104,64 58,92" fill="#334155" />
      <!-- Inner cutout -->
      <polygon points="26,60 55,70 55,86 26,76" fill="#090d14" />
      <polygon points="55,70 96,48 96,64 55,86" fill="#1e293b" />
      <line x1="18" y1="56" x2="64" y2="28" stroke="#cbd5e1" stroke-width="1.2" />
    </svg>

    <!-- 11. Wiremesh (Roll of galvanized mesh) -->
    <svg v-else-if="shape === 'wiremesh'" viewBox="0 0 120 120" class="svg-shape">
      <defs>
        <radialGradient id="shadow-11" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#0f172a" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#0f172a" stop-opacity="0" />
        </radialGradient>
        <pattern id="wire-grid" width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#64748b" stroke-width="1" />
        </pattern>
      </defs>
      <ellipse cx="60" cy="105" rx="40" ry="7" fill="url(#shadow-11)" />
      <!-- Roll container -->
      <rect x="24" y="26" width="72" height="68" rx="8" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5" />
      <rect x="24" y="26" width="72" height="68" rx="8" fill="url(#wire-grid)" />
      <ellipse cx="60" cy="26" rx="36" ry="9" fill="#e2e8f0" stroke="#64748b" stroke-width="1.2" />
      <ellipse cx="60" cy="26" rx="14" ry="4" fill="#0f172a" />
    </svg>

    <!-- 12. Expanded Metal (Diamond mesh sheet) -->
    <svg v-else-if="shape === 'expanded-metal'" viewBox="0 0 120 120" class="svg-shape">
      <defs>
        <radialGradient id="shadow-12" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#0f172a" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#0f172a" stop-opacity="0" />
        </radialGradient>
        <pattern id="diamond-pat" width="18" height="12" patternUnits="userSpaceOnUse">
          <polygon points="9,1 17,6 9,11 1,6" fill="none" stroke="#1e293b" stroke-width="2" />
        </pattern>
      </defs>
      <ellipse cx="60" cy="106" rx="42" ry="7" fill="url(#shadow-12)" />
      <rect x="18" y="20" width="84" height="78" rx="6" fill="#0f172a" stroke="#475569" stroke-width="2" />
      <rect x="20" y="22" width="80" height="74" fill="url(#diamond-pat)" />
    </svg>

    <!-- 13. Steel Bending Wire (Coil spool) -->
    <svg v-else-if="shape === 'tie-wire'" viewBox="0 0 120 120" class="svg-shape">
      <defs>
        <radialGradient id="shadow-13" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#0f172a" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#0f172a" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="wire-coil">
          <stop offset="35%" stop-color="#0f172a" />
          <stop offset="65%" stop-color="#334155" />
          <stop offset="88%" stop-color="#1e293b" />
          <stop offset="100%" stop-color="#475569" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="104" rx="44" ry="7" fill="url(#shadow-13)" />
      <!-- Coiled donut wire -->
      <circle cx="60" cy="58" r="40" fill="none" stroke="url(#wire-coil)" stroke-width="22" />
      <circle cx="60" cy="58" r="46" fill="none" stroke="#64748b" stroke-width="1" stroke-dasharray="8 4" opacity="0.6" />
      <circle cx="60" cy="58" r="38" fill="none" stroke="#475569" stroke-width="1" stroke-dasharray="6 3" opacity="0.6" />
      <circle cx="60" cy="58" r="30" fill="none" stroke="#94a3b8" stroke-width="1" opacity="0.5" />
      <path d="M58,16 Q72,8 86,16" fill="none" stroke="#64748b" stroke-width="2.5" />
    </svg>

    <!-- 14. Steel Welding Tools (Electrode boxes & rods) -->
    <svg v-else-if="shape === 'welding-tools'" viewBox="0 0 120 120" class="svg-shape">
      <defs>
        <radialGradient id="shadow-14" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#0f172a" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#0f172a" stop-opacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="105" rx="42" ry="7" fill="url(#shadow-14)" />
      <!-- Box 1 -->
      <polygon points="22,50 64,28 92,44 50,66" fill="#ef4444" />
      <polygon points="50,66 92,44 92,56 50,78" fill="#b91c1c" />
      <polygon points="22,50 50,66 50,78 22,62" fill="#dc2626" />
      <text x="40" y="50" fill="#ffffff" font-size="8" font-weight="bold" transform="rotate(-15 40 50)">FT-51</text>
      <!-- Box 2 behind -->
      <polygon points="30,64 72,42 100,58 58,80" fill="#ef4444" />
      <polygon points="58,80 100,58 100,70 58,92" fill="#b91c1c" />
      <polygon points="30,64 58,80 58,92 30,76" fill="#dc2626" />
      <!-- Steel welding rods extending -->
      <line x1="58" y1="84" x2="108" y2="100" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round" />
      <line x1="62" y1="87" x2="112" y2="103" stroke="#cbd5e1" stroke-width="2.2" stroke-linecap="round" />
      <line x1="60" y1="89" x2="106" y2="104" stroke="#64748b" stroke-width="2.5" stroke-linecap="round" />
    </svg>

    <!-- 15. Steel Grating and Caps (Cast round cover) -->
    <svg v-else-if="shape === 'grating-cap'" viewBox="0 0 120 120" class="svg-shape">
      <defs>
        <radialGradient id="shadow-15" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#0f172a" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#0f172a" stop-opacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="104" rx="44" ry="7" fill="url(#shadow-15)" />
      <!-- Circular manhole grating -->
      <ellipse cx="60" cy="68" rx="44" ry="28" fill="#0f172a" />
      <ellipse cx="60" cy="64" rx="42" ry="26" fill="#1e293b" stroke="#475569" stroke-width="1.8" />
      <ellipse cx="60" cy="64" rx="32" ry="20" fill="#334155" />
      <!-- Radial spokes and center hub -->
      <circle cx="60" cy="64" r="10" fill="#1e293b" />
      <path d="M28,64 L92,64 M60,44 L60,84 M37,50 L83,78 M37,78 L83,50" stroke="#475569" stroke-width="2" />
    </svg>

    <!-- 16. Multi Purposes Steel (Galvanized light C-stud) -->
    <svg v-else-if="shape === 'c-stud'" viewBox="0 0 120 120" class="svg-shape">
      <defs>
        <radialGradient id="shadow-16" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#0f172a" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#0f172a" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="galv-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#e2e8f0" />
          <stop offset="50%" stop-color="#cbd5e1" />
          <stop offset="100%" stop-color="#94a3b8" />
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="105" rx="42" ry="7" fill="url(#shadow-16)" />
      <polygon points="22,54 74,26 96,38 44,66" fill="url(#galv-grad)" />
      <polygon points="22,54 44,66 44,88 22,76" fill="#94a3b8" />
      <polygon points="44,66 96,38 96,60 44,88" fill="#cbd5e1" />
      <!-- Service knockout -->
      <ellipse cx="62" cy="62" rx="5" ry="9" fill="#475569" />
      <line x1="22" y1="54" x2="74" y2="26" stroke="#ffffff" stroke-width="1.5" opacity="0.7" />
    </svg>

    <!-- 17. Pipe System Work (Flange, elbow & tee) -->
    <svg v-else-if="shape === 'pipe-fittings'" viewBox="0 0 120 120" class="svg-shape">
      <defs>
        <radialGradient id="shadow-17" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#0f172a" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#0f172a" stop-opacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="105" rx="42" ry="7" fill="url(#shadow-17)" />
      <!-- 90 deg elbow pipe -->
      <path d="M28,48 Q28,84 64,84 L64,70 Q42,70 42,48 Z" fill="#1e293b" stroke="#475569" stroke-width="1.8" />
      <!-- Bolted flange -->
      <ellipse cx="80" cy="62" rx="16" ry="26" fill="#334155" stroke="#64748b" stroke-width="2.5" />
      <ellipse cx="80" cy="62" rx="8" ry="14" fill="#0f172a" />
      <!-- Bolts around flange -->
      <circle cx="80" cy="42" r="2.5" fill="#e2e8f0" />
      <circle cx="80" cy="82" r="2.5" fill="#e2e8f0" />
      <circle cx="92" cy="62" r="2.5" fill="#e2e8f0" />
      <circle cx="68" cy="62" r="2.5" fill="#e2e8f0" />
    </svg>

    <!-- 18. Steel Chain (Heavy links) -->
    <svg v-else-if="shape === 'steel-chain'" viewBox="0 0 120 120" class="svg-shape">
      <defs>
        <radialGradient id="shadow-18" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#0f172a" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#0f172a" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="chain-metal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#94a3b8" />
          <stop offset="40%" stop-color="#475569" />
          <stop offset="100%" stop-color="#1e293b" />
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="104" rx="40" ry="7" fill="url(#shadow-18)" />
      <!-- Link 1 -->
      <rect x="26" y="28" width="34" height="52" rx="17" fill="none" stroke="url(#chain-metal)" stroke-width="9" transform="rotate(-32 43 54)" />
      <!-- Link 2 interlocking -->
      <rect x="52" y="44" width="34" height="52" rx="17" fill="none" stroke="url(#chain-metal)" stroke-width="9" transform="rotate(28 69 70)" />
      <!-- Highlights -->
      <ellipse cx="46" cy="44" rx="4" ry="6" fill="#cbd5e1" opacity="0.8" />
      <ellipse cx="72" cy="62" rx="4" ry="6" fill="#cbd5e1" opacity="0.8" />
    </svg>

    <!-- 19. Hot Rolled Structural Steel (Heavy beam) -->
    <svg v-else-if="shape === 'hot-rolled-beam'" viewBox="0 0 120 120" class="svg-shape">
      <defs>
        <radialGradient id="shadow-19" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#0f172a" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#0f172a" stop-opacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="106" rx="44" ry="7" fill="url(#shadow-19)" />
      <!-- Top flange -->
      <polygon points="22,38 68,14 104,30 58,54" fill="#334155" />
      <polygon points="22,38 58,54 58,60 22,44" fill="#1e293b" />
      <!-- Web -->
      <polygon points="38,50 82,26 82,62 38,86" fill="#0f172a" />
      <!-- Bottom flange -->
      <polygon points="18,74 56,52 94,68 56,90" fill="#334155" />
      <polygon points="18,74 56,90 56,97 18,81" fill="#090d14" />
      <polygon points="56,90 94,68 94,75 56,97" fill="#1e293b" />
    </svg>

    <!-- 20. Square Steel (Bundle with painted cyan ends) -->
    <svg v-else-if="shape === 'square-steel'" viewBox="0 0 120 120" class="svg-shape">
      <defs>
        <radialGradient id="shadow-20" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#0f172a" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#0f172a" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="cyan-end" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#38bdf8" />
          <stop offset="100%" stop-color="#0284c7" />
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="106" rx="42" ry="7" fill="url(#shadow-20)" />
      <!-- Stack of square steel bars with cyan painted ends -->
      <g stroke="#1e293b" stroke-width="0.8">
        <!-- Bar 1 bottom left -->
        <polygon points="18,66 56,40 68,48 30,74" fill="#475569" />
        <polygon points="30,74 68,48 68,64 30,90" fill="#1e293b" />
        <polygon points="18,66 30,74 30,90 18,82" fill="url(#cyan-end)" />
        
        <!-- Bar 2 bottom right -->
        <polygon points="36,66 74,40 86,48 48,74" fill="#475569" />
        <polygon points="48,74 86,48 86,64 48,90" fill="#1e293b" />
        <polygon points="36,66 48,74 48,90 36,82" fill="url(#cyan-end)" />

        <!-- Bar 3 on top -->
        <polygon points="27,50 65,24 77,32 39,58" fill="#64748b" />
        <polygon points="39,58 77,32 77,48 39,74" fill="#334155" />
        <polygon points="27,50 39,58 39,74 27,66" fill="url(#cyan-end)" />
      </g>
    </svg>

    <!-- Fallback generic steel shape -->
    <svg v-else viewBox="0 0 120 120" class="svg-shape">
      <polygon points="24,48 66,24 102,42 60,66" fill="#64748b" />
      <polygon points="24,48 60,66 60,90 24,72" fill="#1e293b" />
      <polygon points="60,66 102,42 102,66 60,90" fill="#334155" />
    </svg>
  </div>
</template>

<style scoped>
.steel-graphic {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.svg-shape {
  width: 100%;
  height: 100%;
  max-width: 96px;
  max-height: 96px;
  shape-rendering: geometricPrecision;
  transition: transform 0.2s ease;
}

.steel-graphic:hover .svg-shape {
  transform: scale(1.04);
}
</style>

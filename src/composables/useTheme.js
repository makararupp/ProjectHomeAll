import { ref } from 'vue'

const isDark = ref(false)

function applyTheme(dark) {
  isDark.value = dark
  if (typeof document !== 'undefined') {
    if (dark) {
      document.documentElement.setAttribute('data-theme', 'dark')
      document.documentElement.classList.add('dark')
      document.body.classList.add('dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
      document.documentElement.classList.remove('dark')
      document.body.classList.remove('dark')
    }
  }
  try {
    localStorage.setItem('app_theme', dark ? 'dark' : 'light')
  } catch (e) {
    // ignore
  }
}

// Initialize theme from storage
if (typeof window !== 'undefined') {
  try {
    const saved = localStorage.getItem('app_theme')
    if (saved === 'dark') {
      applyTheme(true)
    } else {
      applyTheme(false)
    }
  } catch (e) {
    applyTheme(false)
  }
}

export function useTheme() {
  function toggleTheme() {
    applyTheme(!isDark.value)
  }

  return {
    isDark,
    toggleTheme,
    setTheme: applyTheme
  }
}


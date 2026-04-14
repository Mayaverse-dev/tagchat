export interface ThemeColors {
  background: string
  foreground: string
  card: string
  cardForeground: string
  primary: string
  primaryForeground: string
  secondary: string
  secondaryForeground: string
  muted: string
  mutedForeground: string
  accent: string
  accentForeground: string
  destructive: string
  destructiveForeground: string
  border: string
  input: string
  ring: string
}

export interface ThemeDefinition {
  id: string
  name: string
  emoji: string
  isDark: boolean
  colors: ThemeColors
}

const DARK_BASE: Partial<ThemeColors> = {
  destructive: '0 72% 51%',
  destructiveForeground: '0 0% 100%',
}

const LIGHT_BASE: Partial<ThemeColors> = {
  destructive: '0 72% 51%',
  destructiveForeground: '0 0% 100%',
}

export const THEMES: ThemeDefinition[] = [
  {
    id: 'obsidian',
    name: 'Obsidian',
    emoji: '🌑',
    isDark: true,
    colors: {
      ...DARK_BASE as ThemeColors,
      background: '228 25% 6%',
      foreground: '220 15% 93%',
      card: '228 22% 9%',
      cardForeground: '220 15% 93%',
      primary: '262 52% 65%',
      primaryForeground: '0 0% 100%',
      secondary: '228 20% 13%',
      secondaryForeground: '220 15% 80%',
      muted: '228 18% 16%',
      mutedForeground: '220 12% 58%',
      accent: '262 52% 65%',
      accentForeground: '0 0% 100%',
      border: '228 18% 14%',
      input: '228 18% 14%',
      ring: '262 52% 65%',
    },
  },
  {
    id: 'pearl',
    name: 'Pearl',
    emoji: '🤍',
    isDark: false,
    colors: {
      ...LIGHT_BASE as ThemeColors,
      background: '0 0% 99%',
      foreground: '228 20% 12%',
      card: '220 20% 97%',
      cardForeground: '228 20% 12%',
      primary: '262 52% 52%',
      primaryForeground: '0 0% 100%',
      secondary: '220 14% 93%',
      secondaryForeground: '228 15% 30%',
      muted: '220 14% 95%',
      mutedForeground: '228 10% 46%',
      accent: '262 52% 52%',
      accentForeground: '0 0% 100%',
      border: '220 14% 89%',
      input: '220 14% 89%',
      ring: '262 52% 52%',
    },
  },
  {
    id: 'sapphire',
    name: 'Sapphire',
    emoji: '💎',
    isDark: true,
    colors: {
      ...DARK_BASE as ThemeColors,
      background: '222 40% 5%',
      foreground: '215 20% 93%',
      card: '222 36% 8%',
      cardForeground: '215 20% 93%',
      primary: '210 100% 56%',
      primaryForeground: '0 0% 100%',
      secondary: '222 30% 13%',
      secondaryForeground: '215 20% 80%',
      muted: '222 25% 16%',
      mutedForeground: '215 15% 55%',
      accent: '195 90% 48%',
      accentForeground: '0 0% 100%',
      border: '222 25% 14%',
      input: '222 25% 14%',
      ring: '210 100% 56%',
    },
  },
  {
    id: 'ember',
    name: 'Ember',
    emoji: '🔥',
    isDark: true,
    colors: {
      ...DARK_BASE as ThemeColors,
      background: '15 20% 5%',
      foreground: '30 15% 92%',
      card: '15 18% 9%',
      cardForeground: '30 15% 92%',
      primary: '25 95% 55%',
      primaryForeground: '0 0% 100%',
      secondary: '15 15% 13%',
      secondaryForeground: '30 15% 78%',
      muted: '15 12% 16%',
      mutedForeground: '20 10% 55%',
      accent: '15 90% 50%',
      accentForeground: '0 0% 100%',
      border: '15 12% 14%',
      input: '15 12% 14%',
      ring: '25 95% 55%',
    },
  },
  {
    id: 'forest',
    name: 'Forest',
    emoji: '🌲',
    isDark: true,
    colors: {
      ...DARK_BASE as ThemeColors,
      background: '160 20% 5%',
      foreground: '150 12% 92%',
      card: '160 18% 8%',
      cardForeground: '150 12% 92%',
      primary: '152 70% 45%',
      primaryForeground: '0 0% 100%',
      secondary: '160 15% 12%',
      secondaryForeground: '150 12% 78%',
      muted: '160 12% 15%',
      mutedForeground: '150 8% 52%',
      accent: '142 60% 42%',
      accentForeground: '0 0% 100%',
      border: '160 12% 13%',
      input: '160 12% 13%',
      ring: '152 70% 45%',
    },
  },
  {
    id: 'arctic',
    name: 'Arctic',
    emoji: '❄️',
    isDark: false,
    colors: {
      ...LIGHT_BASE as ThemeColors,
      background: '210 30% 98%',
      foreground: '215 25% 15%',
      card: '210 25% 96%',
      cardForeground: '215 25% 15%',
      primary: '205 90% 48%',
      primaryForeground: '0 0% 100%',
      secondary: '210 20% 92%',
      secondaryForeground: '215 20% 32%',
      muted: '210 18% 94%',
      mutedForeground: '215 15% 48%',
      accent: '195 85% 45%',
      accentForeground: '0 0% 100%',
      border: '210 18% 88%',
      input: '210 18% 88%',
      ring: '205 90% 48%',
    },
  },
  {
    id: 'sand',
    name: 'Sand',
    emoji: '🏜️',
    isDark: false,
    colors: {
      ...LIGHT_BASE as ThemeColors,
      background: '40 25% 97%',
      foreground: '30 20% 14%',
      card: '38 22% 94%',
      cardForeground: '30 20% 14%',
      primary: '35 90% 48%',
      primaryForeground: '0 0% 100%',
      secondary: '38 18% 90%',
      secondaryForeground: '30 18% 30%',
      muted: '38 16% 92%',
      mutedForeground: '30 12% 48%',
      accent: '28 85% 52%',
      accentForeground: '0 0% 100%',
      border: '38 16% 86%',
      input: '38 16% 86%',
      ring: '35 90% 48%',
    },
  },
  {
    id: 'midnight',
    name: 'Midnight',
    emoji: '🌌',
    isDark: true,
    colors: {
      ...DARK_BASE as ThemeColors,
      background: '240 15% 4%',
      foreground: '240 10% 92%',
      card: '240 14% 7%',
      cardForeground: '240 10% 92%',
      primary: '270 60% 62%',
      primaryForeground: '0 0% 100%',
      secondary: '240 12% 12%',
      secondaryForeground: '240 10% 78%',
      muted: '240 10% 15%',
      mutedForeground: '240 8% 52%',
      accent: '280 55% 58%',
      accentForeground: '0 0% 100%',
      border: '240 10% 13%',
      input: '240 10% 13%',
      ring: '270 60% 62%',
    },
  },
]

export function getThemeById(id: string): ThemeDefinition | undefined {
  return THEMES.find((t) => t.id === id)
}

export function getSystemTheme(): ThemeDefinition {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? THEMES[0] : THEMES[1]
}

function camelToKebab(s: string): string {
  return s.replace(/([A-Z])/g, '-$1').toLowerCase()
}

export function applyTheme(theme: ThemeDefinition) {
  const root = document.documentElement
  root.classList.toggle('dark', theme.isDark)
  localStorage.setItem('tc-theme-dark', String(theme.isDark))

  for (const [key, value] of Object.entries(theme.colors)) {
    root.style.setProperty(`--${camelToKebab(key)}`, value)
  }
}

export function hexToHSL(hex: string): string {
  let r = parseInt(hex.slice(1, 3), 16) / 255
  let g = parseInt(hex.slice(3, 5), 16) / 255
  let b = parseInt(hex.slice(5, 7), 16) / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
}

export function hslStringToHex(hsl: string): string {
  const parts = hsl.match(/[\d.]+/g)
  if (!parts || parts.length < 3) return '#7c5cff'
  const h = parseFloat(parts[0]) / 360
  const s = parseFloat(parts[1]) / 100
  const l = parseFloat(parts[2]) / 100
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
    return p
  }
  let r: number, g: number, b: number
  if (s === 0) {
    r = g = b = l
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }
  const toHex = (x: number) => Math.round(x * 255).toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

export function buildCustomTheme(isDark: boolean, accentHex: string, bgHex: string): ThemeDefinition {
  const accentHSL = hexToHSL(accentHex)
  const bgHSL = hexToHSL(bgHex)
  const bgParts = bgHSL.match(/[\d.]+/g)!.map(Number)
  const h = bgParts[0]
  const base = isDark ? {
    foreground: `${h} 12% 92%`,
    card: `${h} ${Math.max(bgParts[1] - 3, 0)}% ${Math.min(bgParts[2] + 3, 100)}%`,
    secondary: `${h} ${Math.max(bgParts[1] - 5, 0)}% ${Math.min(bgParts[2] + 7, 100)}%`,
    secondaryForeground: `${h} 12% 80%`,
    muted: `${h} ${Math.max(bgParts[1] - 8, 0)}% ${Math.min(bgParts[2] + 10, 100)}%`,
    mutedForeground: `${h} 10% 55%`,
    border: `${h} ${Math.max(bgParts[1] - 6, 0)}% ${Math.min(bgParts[2] + 8, 100)}%`,
  } : {
    foreground: `${h} 18% 12%`,
    card: `${h} ${Math.max(bgParts[1] - 4, 0)}% ${Math.max(bgParts[2] - 2, 0)}%`,
    secondary: `${h} ${Math.max(bgParts[1] - 6, 0)}% ${Math.max(bgParts[2] - 5, 0)}%`,
    secondaryForeground: `${h} 15% 30%`,
    muted: `${h} ${Math.max(bgParts[1] - 8, 0)}% ${Math.max(bgParts[2] - 3, 0)}%`,
    mutedForeground: `${h} 10% 48%`,
    border: `${h} ${Math.max(bgParts[1] - 8, 0)}% ${Math.max(bgParts[2] - 8, 0)}%`,
  }

  return {
    id: 'custom',
    name: 'Custom',
    emoji: '🎨',
    isDark,
    colors: {
      background: bgHSL,
      foreground: base.foreground,
      card: base.card,
      cardForeground: base.foreground,
      primary: accentHSL,
      primaryForeground: '0 0% 100%',
      secondary: base.secondary,
      secondaryForeground: base.secondaryForeground,
      muted: base.muted,
      mutedForeground: base.mutedForeground,
      accent: accentHSL,
      accentForeground: '0 0% 100%',
      destructive: '0 72% 51%',
      destructiveForeground: '0 0% 100%',
      border: base.border,
      input: base.border,
      ring: accentHSL,
    },
  }
}

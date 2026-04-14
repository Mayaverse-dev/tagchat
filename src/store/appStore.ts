import { create } from 'zustand'
import type { View, Channel, Message, Task, CalendarEvent } from '../types'
import { CHANNELS, CALENDAR_EVENTS, TASKS, SEED_MESSAGES } from '../data/maya-timeline'
import type { ThemeDefinition } from '../lib/themes'
import { THEMES, getSystemTheme, getThemeById, applyTheme, buildCustomTheme, hslStringToHex } from '../lib/themes'
import { platform } from '../lib/platform'
import type { Platform } from '../lib/platform'

interface AppState {
  platform: Platform
  currentView: View
  selectedChannelId: string
  channels: Channel[]
  messages: Message[]
  tasks: Task[]
  calendarEvents: CalendarEvent[]
  sidebarCollapsed: boolean

  themeId: string
  activeTheme: ThemeDefinition
  customDark: boolean
  customAccent: string
  customBg: string

  setView: (view: View) => void
  selectChannel: (id: string) => void
  addMessage: (msg: Omit<Message, 'id' | 'timestamp'>) => void
  updateTaskStatus: (id: string, status: Task['status']) => void
  toggleSidebar: () => void
  setTheme: (id: string) => void
  setCustomTheme: (isDark: boolean, accent: string, bg: string) => void
}

function loadInitialTheme(): { themeId: string; activeTheme: ThemeDefinition; customDark: boolean; customAccent: string; customBg: string } {
  const stored = localStorage.getItem('tc-theme-id') || 'system'
  const customDark = localStorage.getItem('tc-custom-dark') === 'true'
  const customAccent = localStorage.getItem('tc-custom-accent') || '#7c5cff'
  const customBg = localStorage.getItem('tc-custom-bg') || '#0b0d14'

  let theme: ThemeDefinition
  if (stored === 'system') {
    theme = getSystemTheme()
  } else if (stored === 'custom') {
    theme = buildCustomTheme(customDark, customAccent, customBg)
  } else {
    theme = getThemeById(stored) || THEMES[0]
  }

  applyTheme(theme)
  return { themeId: stored, activeTheme: theme, customDark, customAccent, customBg }
}

const initial = loadInitialTheme()

export const useAppStore = create<AppState>((set) => ({
  platform,
  currentView: 'dashboard',
  selectedChannelId: 'general',
  channels: CHANNELS,
  messages: SEED_MESSAGES,
  tasks: TASKS,
  calendarEvents: CALENDAR_EVENTS,
  sidebarCollapsed: false,

  themeId: initial.themeId,
  activeTheme: initial.activeTheme,
  customDark: initial.customDark,
  customAccent: initial.customAccent,
  customBg: initial.customBg,

  setView: (view) => set({ currentView: view }),

  selectChannel: (id) => set({ selectedChannelId: id, currentView: 'chat' }),

  addMessage: (msg) =>
    set((state) => ({
      messages: [
        ...state.messages,
        { ...msg, id: `m-${Date.now()}`, timestamp: new Date() },
      ],
    })),

  updateTaskStatus: (id, status) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, status } : t)),
    })),

  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

  setTheme: (id) => {
    localStorage.setItem('tc-theme-id', id)
    let theme: ThemeDefinition
    if (id === 'system') {
      theme = getSystemTheme()
    } else if (id === 'custom') {
      const customDark = localStorage.getItem('tc-custom-dark') === 'true'
      const customAccent = localStorage.getItem('tc-custom-accent') || '#7c5cff'
      const customBg = localStorage.getItem('tc-custom-bg') || '#0b0d14'
      theme = buildCustomTheme(customDark, customAccent, customBg)
    } else {
      theme = getThemeById(id) || THEMES[0]
    }
    applyTheme(theme)
    set({ themeId: id, activeTheme: theme })
  },

  setCustomTheme: (isDark, accent, bg) => {
    localStorage.setItem('tc-theme-id', 'custom')
    localStorage.setItem('tc-custom-dark', String(isDark))
    localStorage.setItem('tc-custom-accent', accent)
    localStorage.setItem('tc-custom-bg', bg)
    const theme = buildCustomTheme(isDark, accent, bg)
    applyTheme(theme)
    set({ themeId: 'custom', activeTheme: theme, customDark: isDark, customAccent: accent, customBg: bg })
  },
}))

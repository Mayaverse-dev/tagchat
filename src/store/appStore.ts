import { create } from 'zustand'
import type { View, Channel, Message, Task, CalendarEvent } from '../types'
import { CHANNELS, CALENDAR_EVENTS, TASKS, SEED_MESSAGES } from '../data/maya-timeline'

interface AppState {
  currentView: View
  selectedChannelId: string
  channels: Channel[]
  messages: Message[]
  tasks: Task[]
  calendarEvents: CalendarEvent[]
  sidebarCollapsed: boolean

  setView: (view: View) => void
  selectChannel: (id: string) => void
  addMessage: (msg: Omit<Message, 'id' | 'timestamp'>) => void
  updateTaskStatus: (id: string, status: Task['status']) => void
  toggleSidebar: () => void
}

export const useAppStore = create<AppState>((set) => ({
  currentView: 'dashboard',
  selectedChannelId: 'general',
  channels: CHANNELS,
  messages: SEED_MESSAGES,
  tasks: TASKS,
  calendarEvents: CALENDAR_EVENTS,
  sidebarCollapsed: false,

  setView: (view) => set({ currentView: view }),

  selectChannel: (id) => set({ selectedChannelId: id, currentView: 'chat' }),

  addMessage: (msg) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          ...msg,
          id: `m-${Date.now()}`,
          timestamp: new Date(),
        },
      ],
    })),

  updateTaskStatus: (id, status) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, status } : t)),
    })),

  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
}))

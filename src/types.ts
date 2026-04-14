export type View = 'dashboard' | 'chat' | 'calendar' | 'tasks' | 'files' | 'meetings' | 'settings'

export interface Channel {
  id: string
  name: string
  icon: string
  unread: number
  description: string
}

export interface Message {
  id: string
  channelId: string
  author: string
  avatar: string
  content: string
  timestamp: Date
  reactions?: { emoji: string; count: number }[]
  attachments?: { name: string; url: string; type: string }[]
}

export interface CalendarEvent {
  id: string
  title: string
  date: Date
  endDate?: Date
  category: EventCategory
  description: string
  owner: 'AE' | 'DOL' | 'Both'
  priority: 'critical' | 'high' | 'medium' | 'low'
}

export type EventCategory =
  | 'conference'
  | 'deadline'
  | 'giveaway'
  | 'marketing'
  | 'review'
  | 'asset'
  | 'milestone'

export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done'

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  owner: 'AE' | 'DOL' | 'Both'
  category: string
  priority: 'critical' | 'high' | 'medium' | 'low'
  dueDate?: Date
}

export interface DashboardMetric {
  label: string
  value: string
  trend?: 'up' | 'down' | 'neutral'
  detail?: string
}

import { useEffect } from 'react'
import { useAppStore } from './store/appStore'
import { Sidebar } from './components/Sidebar'
import { ChatView } from './components/ChatView'
import { DashboardView } from './components/DashboardView'
import { CalendarView } from './components/CalendarView'
import { TasksView } from './components/TasksView'
import { SettingsView } from './components/SettingsView'
import { FilesView } from './components/FilesView'
import { MeetingsView } from './components/MeetingsView'
import { getSystemTheme, applyTheme } from './lib/themes'

export default function App() {
  const currentView = useAppStore((s) => s.currentView)
  const themeId = useAppStore((s) => s.themeId)

  useEffect(() => {
    if (themeId !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => applyTheme(getSystemTheme())
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [themeId])

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 overflow-hidden flex flex-col tc-fade-in">
        {currentView === 'dashboard' && <DashboardView />}
        {currentView === 'chat' && <ChatView />}
        {currentView === 'calendar' && <CalendarView />}
        {currentView === 'tasks' && <TasksView />}
        {currentView === 'files' && <FilesView />}
        {currentView === 'meetings' && <MeetingsView />}
        {currentView === 'settings' && <SettingsView />}
      </main>
    </div>
  )
}

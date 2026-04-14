import { useAppStore } from './store/appStore'
import { Sidebar } from './components/Sidebar'
import { ChatView } from './components/ChatView'
import { DashboardView } from './components/DashboardView'
import { CalendarView } from './components/CalendarView'
import { TasksView } from './components/TasksView'

export default function App() {
  const currentView = useAppStore((s) => s.currentView)

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg-primary)]">
      <Sidebar />
      <main className="flex-1 overflow-hidden flex flex-col">
        {currentView === 'chat' && <ChatView />}
        {currentView === 'dashboard' && <DashboardView />}
        {currentView === 'calendar' && <CalendarView />}
        {currentView === 'tasks' && <TasksView />}
      </main>
    </div>
  )
}

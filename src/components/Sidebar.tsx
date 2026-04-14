import { useAppStore } from '../store/appStore'
import {
  LayoutDashboard,
  MessageCircle,
  Calendar,
  ListTodo,
  Hash,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import type { View } from '../types'

const NAV_ITEMS: { view: View; label: string; Icon: typeof LayoutDashboard }[] = [
  { view: 'dashboard', label: 'Dashboard', Icon: LayoutDashboard },
  { view: 'chat', label: 'Chat', Icon: MessageCircle },
  { view: 'calendar', label: 'Calendar', Icon: Calendar },
  { view: 'tasks', label: 'Tasks', Icon: ListTodo },
]

export function Sidebar() {
  const {
    currentView,
    setView,
    channels,
    selectedChannelId,
    selectChannel,
    sidebarCollapsed,
    toggleSidebar,
  } = useAppStore()

  return (
    <aside
      className={`flex flex-col border-r border-border bg-[var(--bg-secondary)] transition-all duration-200 select-none ${
        sidebarCollapsed ? 'w-[60px]' : 'w-[260px]'
      }`}
      style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
    >
      {/* Header */}
      <div className="h-14 px-4 flex items-center justify-between border-b border-border shrink-0">
        {!sidebarCollapsed && (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white font-bold text-base shrink-0">
              M
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-foreground leading-tight">TagChat</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">MAYA Publishing Hub</span>
            </div>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
        >
          {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Nav */}
      <nav
        className="p-2 flex flex-col gap-0.5"
        style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
      >
        {NAV_ITEMS.map(({ view, label, Icon }) => (
          <button
            key={view}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all w-full text-left ${
              currentView === view
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            } ${sidebarCollapsed ? 'justify-center px-2.5' : ''}`}
            onClick={() => setView(view)}
            title={label}
          >
            <Icon size={18} />
            {!sidebarCollapsed && <span>{label}</span>}
          </button>
        ))}
      </nav>

      {/* Channels */}
      {!sidebarCollapsed && (
        <div
          className="flex-1 overflow-y-auto px-2 pb-2"
          style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
        >
          <div className="px-3 pt-4 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Channels
          </div>
          {channels.map((ch) => (
            <button
              key={ch.id}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] w-full text-left transition-all ${
                selectedChannelId === ch.id && currentView === 'chat'
                  ? 'bg-secondary text-foreground'
                  : 'text-muted-foreground hover:bg-secondary/60 hover:text-muted-foreground'
              }`}
              onClick={() => selectChannel(ch.id)}
            >
              <Hash size={14} className="shrink-0" />
              <span className="flex-1 truncate">{ch.name}</span>
              {ch.unread > 0 && (
                <span className="text-[11px] font-semibold bg-primary text-primary-foreground rounded-full px-1.5 min-w-[18px] text-center">
                  {ch.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Footer */}
      <div
        className="px-4 py-3 border-t border-border shrink-0"
        style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
      >
        {!sidebarCollapsed && (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-xs font-semibold text-white shrink-0">
              DL
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-medium text-foreground">Dept of Lore</span>
              <span className="text-[11px] text-emerald-500">● Online</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

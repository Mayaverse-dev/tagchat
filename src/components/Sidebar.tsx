import { useAppStore } from '../store/appStore'
import {
  LayoutDashboard,
  MessageCircle,
  Calendar,
  ListTodo,
  FolderOpen,
  Video,
  Settings,
  Hash,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
} from 'lucide-react'
import type { View } from '../types'

const NAV: { view: View; label: string; Icon: typeof LayoutDashboard; demo?: boolean }[] = [
  { view: 'dashboard', label: 'Dashboard', Icon: LayoutDashboard },
  { view: 'chat', label: 'Chat', Icon: MessageCircle },
  { view: 'calendar', label: 'Calendar', Icon: Calendar },
  { view: 'tasks', label: 'Tasks', Icon: ListTodo },
  { view: 'files', label: 'Files', Icon: FolderOpen, demo: true },
  { view: 'meetings', label: 'Meetings', Icon: Video, demo: true },
]

export function Sidebar() {
  const {
    currentView, setView, channels, selectedChannelId, selectChannel,
    sidebarCollapsed, toggleSidebar, activeTheme, themeId, setTheme,
  } = useAppStore()

  const toggleThemeQuick = () => {
    if (themeId === 'system') {
      setTheme(activeTheme.isDark ? 'pearl' : 'obsidian')
    } else {
      setTheme(activeTheme.isDark ? 'pearl' : 'obsidian')
    }
  }

  return (
    <aside
      className={`flex flex-col border-r border-border bg-card/60 backdrop-blur-xl select-none shrink-0 transition-all duration-native ease-native ${
        sidebarCollapsed ? 'w-[56px]' : 'w-[240px]'
      }`}
    >
      <div className="h-12 px-3 flex items-center justify-between shrink-0 drag-region">
        {!sidebarCollapsed && (
          <div className="flex items-center gap-2 no-drag">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-bold text-xs shrink-0">
              M
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[13px] font-semibold text-foreground">TagChat</span>
              <span className="text-[9px] text-muted-foreground uppercase tracking-[0.08em]">MAYA Hub</span>
            </div>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="tc-btn-ghost p-1.5 no-drag"
        >
          {sidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      <nav className="px-2 py-1 flex flex-col gap-0.5 no-drag">
        {NAV.map(({ view, label, Icon, demo }) => (
          <button
            key={view}
            className={`tc-nav-item ${currentView === view ? 'active' : ''} ${sidebarCollapsed ? 'justify-center !px-0' : ''}`}
            onClick={() => setView(view)}
            title={label}
          >
            <Icon size={16} className="shrink-0" />
            {!sidebarCollapsed && (
              <>
                <span className="flex-1">{label}</span>
                {demo && <span className="tc-badge-phase2">P2</span>}
              </>
            )}
          </button>
        ))}
      </nav>

      {!sidebarCollapsed && currentView === 'chat' && (
        <div className="flex-1 overflow-y-auto px-2 no-drag">
          <div className="px-2 pt-3 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            Channels
          </div>
          {channels.map((ch) => (
            <button
              key={ch.id}
              className={`flex items-center gap-2 px-2 py-1.5 w-full text-left text-[13px] transition-all duration-native-fast ease-native ${
                selectedChannelId === ch.id
                  ? 'text-foreground bg-secondary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
              }`}
              style={{ borderRadius: 'var(--p-radius-sm)' }}
              onClick={() => selectChannel(ch.id)}
            >
              <Hash size={13} className="shrink-0 opacity-50" />
              <span className="flex-1 truncate">{ch.name}</span>
              {ch.unread > 0 && (
                <span className="text-[10px] font-bold bg-primary text-primary-foreground rounded-full px-1.5 min-w-[16px] text-center leading-[16px]">
                  {ch.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {!sidebarCollapsed && currentView !== 'chat' && <div className="flex-1" />}
      {sidebarCollapsed && <div className="flex-1" />}

      <div className="px-2 py-2 flex flex-col gap-0.5 border-t border-border no-drag">
        <button
          onClick={toggleThemeQuick}
          className={`tc-nav-item ${sidebarCollapsed ? 'justify-center !px-0' : ''}`}
          title={activeTheme.isDark ? 'Light mode' : 'Dark mode'}
        >
          {activeTheme.isDark ? <Sun size={16} /> : <Moon size={16} />}
          {!sidebarCollapsed && <span>{activeTheme.isDark ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>
        <button
          className={`tc-nav-item ${currentView === 'settings' ? 'active' : ''} ${sidebarCollapsed ? 'justify-center !px-0' : ''}`}
          onClick={() => setView('settings')}
          title="Settings"
        >
          <Settings size={16} />
          {!sidebarCollapsed && <span>Settings</span>}
        </button>
      </div>

      <div className="px-3 py-2.5 border-t border-border no-drag">
        {!sidebarCollapsed ? (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
              DL
            </div>
            <div className="flex flex-col leading-none min-w-0">
              <span className="text-[12px] font-medium text-foreground truncate">Dept of Lore</span>
              <span className="text-[10px] text-emerald-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                Online
              </span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-[10px] font-bold text-white">
              DL
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

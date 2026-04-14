import { useState } from 'react'
import { useAppStore } from '../store/appStore'
import { GripVertical, Filter } from 'lucide-react'
import type { Task, TaskStatus } from '../types'

const COLS: { status: TaskStatus; label: string; dot: string }[] = [
  { status: 'todo', label: 'To Do', dot: 'bg-slate-500' },
  { status: 'in-progress', label: 'In Progress', dot: 'bg-blue-500' },
  { status: 'review', label: 'Review', dot: 'bg-orange-500' },
  { status: 'done', label: 'Done', dot: 'bg-emerald-500' },
]

const PRIO_DOT: Record<string, string> = { critical: 'bg-red-500', high: 'bg-orange-400', medium: 'bg-yellow-400', low: 'bg-slate-500' }
const OWNERS: Record<string, string> = { AE: 'Authors Equity', DOL: 'Dept of Lore', Both: 'Joint' }
const OWNER_BG: Record<string, string> = { AE: 'bg-blue-500 text-white', DOL: 'bg-orange-500 text-white', Both: 'bg-violet-500 text-white' }

type OwnerFilter = 'all' | 'AE' | 'DOL' | 'Both'

export function TasksView() {
  const { tasks, updateTaskStatus } = useAppStore()
  const [ownerFilter, setOwnerFilter] = useState<OwnerFilter>('all')
  const [catFilter, setCatFilter] = useState('all')
  const [dragged, setDragged] = useState<string | null>(null)

  const cats = ['all', ...new Set(tasks.map((t) => t.category))]
  const filtered = tasks.filter((t) => {
    if (ownerFilter !== 'all' && t.owner !== ownerFilter) return false
    if (catFilter !== 'all' && t.category !== catFilter) return false
    return true
  })

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <header className="h-12 px-6 flex items-center justify-between border-b border-border shrink-0 drag-region">
        <h1 className="text-[15px] font-semibold text-foreground no-drag">Task Board</h1>
        <div className="flex items-center gap-2 no-drag">
          <Filter size={13} className="text-muted-foreground" />
          <select
            value={ownerFilter}
            onChange={(e) => setOwnerFilter(e.target.value as OwnerFilter)}
            className="tc-input !py-1 !px-2 !text-[11px]"
          >
            <option value="all">All Owners</option>
            <option value="AE">Authors Equity</option>
            <option value="DOL">Dept of Lore</option>
            <option value="Both">Joint</option>
          </select>
          <select
            value={catFilter}
            onChange={(e) => setCatFilter(e.target.value)}
            className="tc-input !py-1 !px-2 !text-[11px]"
          >
            {cats.map((c) => (
              <option key={c} value={c}>{c === 'all' ? 'All Categories' : c}</option>
            ))}
          </select>
        </div>
      </header>

      <div className="flex gap-3 px-5 py-4 flex-1 overflow-x-auto overflow-y-hidden">
        {COLS.map(({ status, label, dot }) => {
          const col = filtered.filter((t) => t.status === status)
          return (
            <div
              key={status}
              className="flex-1 min-w-[240px] flex flex-col tc-card overflow-hidden"
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => { if (dragged) { updateTaskStatus(dragged, status); setDragged(null) } }}
            >
              <div className="flex items-center gap-2 px-3 py-2.5 border-b border-border shrink-0">
                <div className={`w-2 h-2 rounded-full ${dot}`} />
                <h3 className="text-[12px] font-semibold flex-1">{label}</h3>
                <span className="text-[10px] font-bold text-muted-foreground bg-secondary px-1.5 rounded-full">{col.length}</span>
              </div>
              <div className="flex-1 overflow-y-auto p-1.5 flex flex-col gap-1">
                {col.map((task) => (
                  <div
                    key={task.id}
                    className="bg-secondary/50 border border-border/50 p-2.5 cursor-grab active:cursor-grabbing hover:border-primary/20 hover:bg-secondary transition-all duration-native-fast group"
                    style={{ borderRadius: 'var(--p-radius-sm)' }}
                    draggable
                    onDragStart={() => setDragged(task.id)}
                  >
                    <div className="flex items-center gap-1 mb-1.5">
                      <GripVertical size={12} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className={`w-1.5 h-1.5 rounded-full ${PRIO_DOT[task.priority]}`} />
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-medium">{task.priority}</span>
                    </div>
                    <h4 className="text-[12px] font-medium text-foreground mb-1 leading-snug">{task.title}</h4>
                    <p className="text-[10px] text-muted-foreground leading-relaxed line-clamp-2 mb-2">{task.description}</p>
                    <div className="flex gap-1 flex-wrap">
                      <span className={`text-[9px] px-1.5 py-px rounded font-medium ${OWNER_BG[task.owner]}`}>{OWNERS[task.owner]}</span>
                      <span className="text-[9px] px-1.5 py-px rounded bg-secondary text-muted-foreground">{task.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

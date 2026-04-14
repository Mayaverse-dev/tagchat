import { useState } from 'react'
import { useAppStore } from '../store/appStore'
import { GripVertical, Filter } from 'lucide-react'
import type { Task, TaskStatus } from '../types'

const STATUS_COLUMNS: { status: TaskStatus; label: string; dotColor: string }[] = [
  { status: 'todo', label: 'To Do', dotColor: 'bg-slate-500' },
  { status: 'in-progress', label: 'In Progress', dotColor: 'bg-blue-500' },
  { status: 'review', label: 'Review', dotColor: 'bg-orange-500' },
  { status: 'done', label: 'Done', dotColor: 'bg-emerald-500' },
]

const PRIORITY_DOT: Record<string, string> = {
  critical: 'bg-red-500',
  high: 'bg-orange-500',
  medium: 'bg-yellow-500',
  low: 'bg-slate-500',
}

const OWNER_LABELS: Record<string, string> = { AE: 'Authors Equity', DOL: 'Dept of Lore', Both: 'Joint' }

const OWNER_BADGE: Record<string, string> = {
  AE: 'bg-blue-500 text-white',
  DOL: 'bg-orange-500 text-white',
  Both: 'bg-violet-500 text-white',
}

type OwnerFilter = 'all' | 'AE' | 'DOL' | 'Both'

export function TasksView() {
  const { tasks, updateTaskStatus } = useAppStore()
  const [ownerFilter, setOwnerFilter] = useState<OwnerFilter>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [draggedTask, setDraggedTask] = useState<string | null>(null)

  const categories = ['all', ...new Set(tasks.map((t) => t.category))]

  const filtered = tasks.filter((t) => {
    if (ownerFilter !== 'all' && t.owner !== ownerFilter) return false
    if (categoryFilter !== 'all' && t.category !== categoryFilter) return false
    return true
  })

  function tasksForStatus(status: TaskStatus) {
    return filtered.filter((t) => t.status === status)
  }

  function handleDragStart(taskId: string) {
    setDraggedTask(taskId)
  }

  function handleDrop(status: TaskStatus) {
    if (draggedTask) {
      updateTaskStatus(draggedTask, status)
      setDraggedTask(null)
    }
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <header className="flex items-start justify-between px-8 pt-6 pb-4">
        <h1 className="text-2xl font-bold text-foreground">Task Board</h1>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Filter size={16} />
          <select
            value={ownerFilter}
            onChange={(e) => setOwnerFilter(e.target.value as OwnerFilter)}
            className="bg-secondary border border-border text-muted-foreground px-3 py-1.5 rounded-lg text-xs focus:border-primary outline-none"
          >
            <option value="all">All Owners</option>
            <option value="AE">Authors Equity</option>
            <option value="DOL">Dept of Lore</option>
            <option value="Both">Joint</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-secondary border border-border text-muted-foreground px-3 py-1.5 rounded-lg text-xs focus:border-primary outline-none"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c === 'all' ? 'All Categories' : c}</option>
            ))}
          </select>
        </div>
      </header>

      {/* Kanban */}
      <div className="flex gap-4 px-8 pb-6 flex-1 overflow-x-auto overflow-y-hidden">
        {STATUS_COLUMNS.map(({ status, label, dotColor }) => {
          const columnTasks = tasksForStatus(status)
          return (
            <div
              key={status}
              className="flex-1 min-w-[260px] flex flex-col bg-[var(--bg-secondary)] rounded-xl border border-border overflow-hidden"
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(status)}
            >
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border shrink-0">
                <div className={`w-2 h-2 rounded-full ${dotColor}`} />
                <h3 className="text-[13px] font-semibold flex-1">{label}</h3>
                <span className="text-xs font-semibold text-muted-foreground bg-secondary px-1.5 rounded-full">{columnTasks.length}</span>
              </div>
              <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-1.5">
                {columnTasks.map((task) => (
                  <TaskCard key={task.id} task={task} onDragStart={handleDragStart} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function TaskCard({ task, onDragStart }: { task: Task; onDragStart: (id: string) => void }) {
  return (
    <div
      className="bg-secondary border border-border rounded-lg p-3 cursor-grab active:cursor-grabbing hover:border-border/80 hover:bg-[var(--bg-elevated)] transition-all group"
      draggable
      onDragStart={() => onDragStart(task.id)}
    >
      <div className="flex items-center gap-1.5 mb-2">
        <GripVertical size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className={`w-1.5 h-1.5 rounded-full ${PRIORITY_DOT[task.priority]}`} />
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{task.priority}</span>
      </div>
      <h4 className="text-[13px] font-medium text-foreground mb-1.5 leading-snug">{task.title}</h4>
      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-2.5">{task.description}</p>
      <div className="flex gap-1.5 flex-wrap">
        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${OWNER_BADGE[task.owner]}`}>
          {OWNER_LABELS[task.owner]}
        </span>
        <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">{task.category}</span>
      </div>
    </div>
  )
}

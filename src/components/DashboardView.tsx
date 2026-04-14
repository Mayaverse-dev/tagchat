import { useAppStore } from '../store/appStore'
import { METRICS, PUB_DATE } from '../data/maya-timeline'
import {
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  Clock,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'
import { format, differenceInDays } from 'date-fns'
import type { Task } from '../types'

const OWNER_LABELS: Record<string, string> = {
  AE: 'Authors Equity',
  DOL: 'Dept of Lore',
  Both: 'Joint',
}

function TrendIcon({ trend }: { trend?: string }) {
  if (trend === 'up') return <TrendingUp size={14} className="text-emerald-500" />
  if (trend === 'down') return <TrendingDown size={14} className="text-red-500" />
  return <Minus size={14} className="text-muted-foreground" />
}

function statusCounts(tasks: Task[]) {
  return {
    todo: tasks.filter((t) => t.status === 'todo').length,
    inProgress: tasks.filter((t) => t.status === 'in-progress').length,
    review: tasks.filter((t) => t.status === 'review').length,
    done: tasks.filter((t) => t.status === 'done').length,
  }
}

const PRIORITY_BG: Record<string, string> = {
  critical: 'bg-red-500',
  high: 'bg-orange-500',
  medium: 'bg-yellow-500',
  low: 'bg-muted-foreground',
}

export function DashboardView() {
  const { tasks, calendarEvents, setView } = useAppStore()
  const counts = statusCounts(tasks)
  const daysToPub = differenceInDays(PUB_DATE, new Date())

  const criticalTasks = tasks.filter((t) => t.priority === 'critical' && t.status !== 'done')
  const upcomingEvents = calendarEvents
    .filter((e) => e.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 6)

  const dolTasks = tasks.filter((t) => (t.owner === 'DOL' || t.owner === 'Both') && t.status !== 'done')
  const aeTasks = tasks.filter((t) => (t.owner === 'AE' || t.owner === 'Both') && t.status !== 'done')

  const EVENT_DOT: Record<string, string> = {
    conference: 'bg-orange-500',
    deadline: 'bg-red-500',
    giveaway: 'bg-violet-500',
    marketing: 'bg-blue-500',
    review: 'bg-cyan-500',
    asset: 'bg-emerald-500',
    milestone: 'bg-amber-500',
  }

  return (
    <div className="overflow-y-auto px-8 py-6">
      {/* Header */}
      <header className="flex items-start justify-between mb-6 pt-2">
        <div>
          <h1 className="text-2xl font-bold text-foreground">MAYA: Seed Takes Root</h1>
          <p className="text-sm text-muted-foreground mt-1">Authors Equity × Dept of Lore — Publishing Dashboard</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-4xl font-bold text-primary leading-none">{daysToPub}</span>
          <span className="text-xs text-muted-foreground uppercase tracking-wider">days to pub</span>
          <span className="text-xs text-muted-foreground mt-0.5">{format(PUB_DATE, 'MMM d, yyyy')}</span>
        </div>
      </header>

      {/* Metrics Grid */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3 mb-6">
        {METRICS.map((m) => (
          <div key={m.label} className="bg-[var(--bg-secondary)] border border-border rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">{m.label}</span>
              <TrendIcon trend={m.trend} />
            </div>
            <div className="text-xl font-bold text-foreground leading-tight">{m.value}</div>
            {m.detail && <div className="text-xs text-muted-foreground mt-1">{m.detail}</div>}
          </div>
        ))}
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Critical Actions */}
        <div className="bg-[var(--bg-secondary)] border border-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4 text-muted-foreground">
            <AlertTriangle size={16} />
            <h3 className="text-sm font-semibold flex-1">Critical Actions</h3>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-red-500 text-white">{criticalTasks.length}</span>
          </div>
          <ul className="flex flex-col gap-2">
            {criticalTasks.map((t) => (
              <li key={t.id} className="flex items-center gap-2.5 p-2.5 bg-secondary rounded-lg">
                <div className={`w-1 h-7 rounded-sm shrink-0 ${PRIORITY_BG[t.priority]}`} />
                <div className="flex flex-col min-w-0">
                  <span className="text-[13px] font-medium text-foreground truncate">{t.title}</span>
                  <span className="text-[11px] text-muted-foreground">{OWNER_LABELS[t.owner]}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Upcoming Events */}
        <div className="bg-[var(--bg-secondary)] border border-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4 text-muted-foreground">
            <Clock size={16} />
            <h3 className="text-sm font-semibold flex-1">Upcoming Events</h3>
            <button onClick={() => setView('calendar')} className="flex items-center gap-1 text-primary text-xs font-medium hover:brightness-110">
              View all <ArrowRight size={14} />
            </button>
          </div>
          <ul className="flex flex-col gap-2">
            {upcomingEvents.map((e) => (
              <li key={e.id} className="flex items-center gap-2.5 p-2.5 bg-secondary rounded-lg">
                <div className={`w-2 h-2 rounded-full shrink-0 ${EVENT_DOT[e.category]}`} />
                <div className="text-xs font-medium text-muted-foreground w-[60px] shrink-0">{format(e.date, 'MMM d')}</div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[13px] font-medium text-foreground truncate">{e.title}</span>
                  <span className="text-[11px] text-muted-foreground">{OWNER_LABELS[e.owner]}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Task Progress */}
        <div className="bg-[var(--bg-secondary)] border border-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4 text-muted-foreground">
            <CheckCircle2 size={16} />
            <h3 className="text-sm font-semibold flex-1">Task Progress</h3>
            <button onClick={() => setView('tasks')} className="flex items-center gap-1 text-primary text-xs font-medium hover:brightness-110">
              View all <ArrowRight size={14} />
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {[
              { label: 'To Do', count: counts.todo, color: 'bg-slate-500' },
              { label: 'In Progress', count: counts.inProgress, color: 'bg-blue-500' },
              { label: 'Review', count: counts.review, color: 'bg-orange-500' },
              { label: 'Done', count: counts.done, color: 'bg-emerald-500' },
            ].map((row) => (
              <div key={row.label} className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="w-20 shrink-0">{row.label}</span>
                <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${row.color} transition-all duration-500`} style={{ width: `${(row.count / tasks.length) * 100}%` }} />
                </div>
                <span className="w-6 text-right font-semibold">{row.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Ownership Split */}
        <div className="bg-[var(--bg-secondary)] border border-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-sm font-semibold text-muted-foreground">Ownership Split</h3>
          </div>
          <div className="flex gap-4">
            <div className="flex-1 p-4 bg-secondary rounded-lg text-center">
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground block mb-2">DOL Open Tasks</span>
              <span className="text-3xl font-bold text-foreground">{dolTasks.length}</span>
            </div>
            <div className="flex-1 p-4 bg-secondary rounded-lg text-center">
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground block mb-2">AE Open Tasks</span>
              <span className="text-3xl font-bold text-foreground">{aeTasks.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ISBN Registry */}
      <div className="bg-[var(--bg-secondary)] border border-border rounded-xl p-5">
        <h3 className="text-sm font-semibold text-muted-foreground mb-4">ISBN Registry</h3>
        <div className="flex gap-4">
          {[
            { fmt: 'Paperback', isbn: '978-9-893311-891' },
            { fmt: 'eBook', isbn: '978-9-893311-778' },
            { fmt: 'Audio', isbn: '978-1-668157-992' },
          ].map((item) => (
            <div key={item.fmt} className="flex-1 p-3 bg-secondary rounded-lg flex flex-col gap-1">
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">{item.fmt}</span>
              <code className="font-mono text-sm text-primary">{item.isbn}</code>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

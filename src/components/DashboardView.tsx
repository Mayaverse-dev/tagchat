import { useAppStore } from '../store/appStore'
import { METRICS, PUB_DATE } from '../data/maya-timeline'
import {
  TrendingUp, TrendingDown, Minus, AlertTriangle,
  Clock, CheckCircle2, ArrowRight, Search, Bell,
} from 'lucide-react'
import { format, differenceInDays } from 'date-fns'
import type { Task } from '../types'

const OWNER_LABELS: Record<string, string> = { AE: 'Authors Equity', DOL: 'Dept of Lore', Both: 'Joint' }

function TrendIcon({ trend }: { trend?: string }) {
  if (trend === 'up') return <TrendingUp size={13} className="text-emerald-500" />
  if (trend === 'down') return <TrendingDown size={13} className="text-red-400" />
  return <Minus size={13} className="text-muted-foreground" />
}

function statusCounts(tasks: Task[]) {
  return {
    todo: tasks.filter((t) => t.status === 'todo').length,
    inProgress: tasks.filter((t) => t.status === 'in-progress').length,
    review: tasks.filter((t) => t.status === 'review').length,
    done: tasks.filter((t) => t.status === 'done').length,
  }
}

const PRIORITY_BAR: Record<string, string> = {
  critical: 'bg-red-500',
  high: 'bg-orange-400',
  medium: 'bg-yellow-400',
  low: 'bg-muted-foreground',
}

const EVENT_DOT: Record<string, string> = {
  conference: 'bg-orange-500',
  deadline: 'bg-red-500',
  giveaway: 'bg-violet-500',
  marketing: 'bg-blue-500',
  review: 'bg-cyan-500',
  asset: 'bg-emerald-500',
  milestone: 'bg-amber-500',
}

export function DashboardView() {
  const { tasks, calendarEvents, setView } = useAppStore()
  const counts = statusCounts(tasks)
  const daysToPub = differenceInDays(PUB_DATE, new Date())

  const criticalTasks = tasks.filter((t) => t.priority === 'critical' && t.status !== 'done')
  const upcomingEvents = calendarEvents
    .filter((e) => e.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5)

  const dolOpen = tasks.filter((t) => (t.owner === 'DOL' || t.owner === 'Both') && t.status !== 'done').length
  const aeOpen = tasks.filter((t) => (t.owner === 'AE' || t.owner === 'Both') && t.status !== 'done').length

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <header className="h-12 px-6 flex items-center justify-between border-b border-border shrink-0 drag-region">
        <h1 className="text-[15px] font-semibold text-foreground no-drag">Dashboard</h1>
        <div className="flex items-center gap-1 no-drag">
          <button className="tc-btn-ghost p-2" title="Search (Phase 2)">
            <Search size={15} />
          </button>
          <button className="tc-btn-ghost p-2 relative" title="Notifications (Phase 2)">
            <Bell size={15} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1200px] mx-auto px-6 py-5">
          <div className="flex items-start justify-between mb-5 tc-slide-up">
            <div>
              <h2 className="text-xl font-bold text-foreground">MAYA: Seed Takes Root</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Authors Equity × Dept of Lore</p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-3xl font-bold text-primary leading-none tabular-nums">{daysToPub}</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">days to pub</span>
              <span className="text-[10px] text-muted-foreground">{format(PUB_DATE, 'MMM d, yyyy')}</span>
            </div>
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-2.5 mb-5">
            {METRICS.map((m, i) => (
              <div
                key={m.label}
                className="tc-card p-3.5 tc-slide-up"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{m.label}</span>
                  <TrendIcon trend={m.trend} />
                </div>
                <div className="text-lg font-bold text-foreground leading-tight">{m.value}</div>
                {m.detail && <div className="text-[11px] text-muted-foreground mt-0.5">{m.detail}</div>}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="tc-card p-4 tc-slide-up" style={{ animationDelay: '120ms' }}>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={14} className="text-red-400" />
                <h3 className="text-[13px] font-semibold text-foreground flex-1">Critical Actions</h3>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-red-500/15 text-red-400">{criticalTasks.length}</span>
              </div>
              <ul className="flex flex-col gap-1.5">
                {criticalTasks.map((t) => (
                  <li key={t.id} className="flex items-center gap-2 p-2 bg-secondary/50 rounded-sm">
                    <div className={`w-0.5 h-5 rounded-full shrink-0 ${PRIORITY_BAR[t.priority]}`} />
                    <div className="min-w-0 flex-1">
                      <span className="text-[12px] font-medium text-foreground block truncate">{t.title}</span>
                      <span className="text-[10px] text-muted-foreground">{OWNER_LABELS[t.owner]}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="tc-card p-4 tc-slide-up" style={{ animationDelay: '160ms' }}>
              <div className="flex items-center gap-2 mb-3">
                <Clock size={14} className="text-muted-foreground" />
                <h3 className="text-[13px] font-semibold text-foreground flex-1">Upcoming Events</h3>
                <button onClick={() => setView('calendar')} className="flex items-center gap-0.5 text-primary text-[11px] font-medium hover:brightness-110">
                  All <ArrowRight size={12} />
                </button>
              </div>
              <ul className="flex flex-col gap-1.5">
                {upcomingEvents.map((e) => (
                  <li key={e.id} className="flex items-center gap-2 p-2 bg-secondary/50 rounded-sm">
                    <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${EVENT_DOT[e.category]}`} />
                    <span className="text-[11px] font-medium text-muted-foreground w-[52px] shrink-0">{format(e.date, 'MMM d')}</span>
                    <div className="min-w-0 flex-1">
                      <span className="text-[12px] font-medium text-foreground block truncate">{e.title}</span>
                      <span className="text-[10px] text-muted-foreground">{OWNER_LABELS[e.owner]}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="tc-card p-4 tc-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 size={14} className="text-muted-foreground" />
                <h3 className="text-[13px] font-semibold text-foreground flex-1">Task Progress</h3>
                <button onClick={() => setView('tasks')} className="flex items-center gap-0.5 text-primary text-[11px] font-medium hover:brightness-110">
                  Board <ArrowRight size={12} />
                </button>
              </div>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: 'To Do', count: counts.todo, color: 'bg-slate-500' },
                  { label: 'In Progress', count: counts.inProgress, color: 'bg-blue-500' },
                  { label: 'Review', count: counts.review, color: 'bg-orange-500' },
                  { label: 'Done', count: counts.done, color: 'bg-emerald-500' },
                ].map((row) => (
                  <div key={row.label} className="flex items-center gap-2.5 text-[11px]">
                    <span className="w-16 text-muted-foreground shrink-0">{row.label}</span>
                    <div className="flex-1 h-1 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${row.color} transition-all duration-700 ease-out`}
                        style={{ width: `${tasks.length ? (row.count / tasks.length) * 100 : 0}%` }}
                      />
                    </div>
                    <span className="w-4 text-right font-semibold text-muted-foreground tabular-nums">{row.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="tc-card p-4 tc-slide-up" style={{ animationDelay: '240ms' }}>
              <h3 className="text-[13px] font-semibold text-foreground mb-3">Ownership</h3>
              <div className="flex gap-3">
                <div className="flex-1 p-3 bg-secondary/50 rounded-sm text-center">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">DOL Open</span>
                  <span className="text-2xl font-bold text-foreground tabular-nums">{dolOpen}</span>
                </div>
                <div className="flex-1 p-3 bg-secondary/50 rounded-sm text-center">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">AE Open</span>
                  <span className="text-2xl font-bold text-foreground tabular-nums">{aeOpen}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="tc-card p-4 tc-slide-up" style={{ animationDelay: '280ms' }}>
            <h3 className="text-[13px] font-semibold text-foreground mb-3">ISBN Registry</h3>
            <div className="flex gap-3">
              {[
                { fmt: 'Paperback', isbn: '978-9-893311-891' },
                { fmt: 'eBook', isbn: '978-9-893311-778' },
                { fmt: 'Audio', isbn: '978-1-668157-992' },
              ].map((item) => (
                <div key={item.fmt} className="flex-1 p-3 bg-secondary/50 rounded-sm flex flex-col gap-0.5">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{item.fmt}</span>
                  <code className="font-mono text-[13px] text-primary">{item.isbn}</code>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

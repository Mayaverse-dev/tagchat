import { useState } from 'react'
import { useAppStore } from '../store/appStore'
import {
  format, startOfMonth, endOfMonth, eachDayOfInterval,
  isSameMonth, isSameDay, addMonths, subMonths, getDay, isWithinInterval,
} from 'date-fns'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { CalendarEvent, EventCategory } from '../types'

const CAT_BORDER: Record<EventCategory, string> = {
  conference: 'border-l-orange-500',
  deadline: 'border-l-red-500',
  giveaway: 'border-l-violet-500',
  marketing: 'border-l-blue-500',
  review: 'border-l-cyan-500',
  asset: 'border-l-emerald-500',
  milestone: 'border-l-amber-500',
}

const CAT_DOT: Record<EventCategory, string> = {
  conference: 'bg-orange-500',
  deadline: 'bg-red-500',
  giveaway: 'bg-violet-500',
  marketing: 'bg-blue-500',
  review: 'bg-cyan-500',
  asset: 'bg-emerald-500',
  milestone: 'bg-amber-500',
}

const CAT_ACCENT: Record<EventCategory, string> = {
  conference: '#f97316', deadline: '#ef4444', giveaway: '#8b5cf6',
  marketing: '#3b82f6', review: '#06b6d4', asset: '#22c55e', milestone: '#f59e0b',
}

const OWNERS: Record<string, string> = { AE: 'Authors Equity', DOL: 'Dept of Lore', Both: 'Joint' }

const PRIO_STYLE: Record<string, string> = {
  critical: 'bg-red-500/15 text-red-400',
  high: 'bg-orange-500/15 text-orange-400',
  medium: 'bg-yellow-500/15 text-yellow-400',
  low: 'bg-secondary text-muted-foreground',
}

export function CalendarView() {
  const { calendarEvents } = useAppStore()
  const [month, setMonth] = useState(new Date())
  const [selected, setSelected] = useState<CalendarEvent | null>(null)

  const start = startOfMonth(month)
  const end = endOfMonth(month)
  const days = eachDayOfInterval({ start, end })
  const pad = getDay(start)

  const eventsOn = (day: Date) =>
    calendarEvents.filter(
      (e) => isSameDay(e.date, day) || (e.endDate && isWithinInterval(day, { start: e.date, end: e.endDate }))
    )

  const upcoming = calendarEvents
    .filter((e) => e.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <header className="h-12 px-6 flex items-center justify-between border-b border-border shrink-0 drag-region">
        <h1 className="text-[15px] font-semibold text-foreground no-drag">Calendar</h1>
        <div className="flex items-center gap-3 no-drag">
          <button onClick={() => setMonth(subMonths(month, 1))} className="tc-btn-ghost p-1.5">
            <ChevronLeft size={16} />
          </button>
          <span className="text-[13px] font-semibold min-w-[140px] text-center">{format(month, 'MMMM yyyy')}</span>
          <button onClick={() => setMonth(addMonths(month, 1))} className="tc-btn-ghost p-1.5">
            <ChevronRight size={16} />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden px-5 py-4 gap-4">
        <div className="flex-1 flex flex-col overflow-auto">
          <div className="grid grid-cols-7 mb-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
              <div key={d} className="p-1.5 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-px flex-1">
            {Array.from({ length: pad }).map((_, i) => (
              <div key={`p-${i}`} className="min-h-[88px]" />
            ))}
            {days.map((day) => {
              const ev = eventsOn(day)
              const today = isSameDay(day, new Date())
              return (
                <div
                  key={day.toISOString()}
                  className={`min-h-[88px] p-1 border border-border/50 transition-colors ${
                    today ? 'border-primary/40 bg-primary/[0.03]' : 'bg-card/40'
                  } ${!isSameMonth(day, month) ? 'opacity-30' : ''}`}
                  style={{ borderRadius: 'var(--p-radius-sm)' }}
                >
                  <span className={`text-[11px] font-medium block mb-0.5 px-0.5 ${today ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
                    {format(day, 'd')}
                  </span>
                  <div className="flex flex-col gap-px">
                    {ev.slice(0, 2).map((e) => (
                      <button
                        key={e.id}
                        className={`text-[9px] px-1 py-px bg-secondary/70 border-l-2 text-muted-foreground text-left truncate w-full hover:text-foreground hover:bg-secondary ${CAT_BORDER[e.category]}`}
                        style={{ borderRadius: '2px' }}
                        onClick={() => setSelected(e)}
                      >
                        {e.title.length > 16 ? e.title.slice(0, 16) + '…' : e.title}
                      </button>
                    ))}
                    {ev.length > 2 && <span className="text-[9px] text-muted-foreground px-1">+{ev.length - 2}</span>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <aside className="w-[260px] shrink-0 overflow-y-auto flex flex-col gap-4">
          {selected ? (
            <div className="tc-card p-4 relative overflow-hidden tc-slide-up">
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: CAT_ACCENT[selected.category] }} />
              <div className="flex items-start justify-between mt-0.5">
                <h3 className="text-[14px] font-semibold text-foreground pr-6 leading-snug">{selected.title}</h3>
                <button onClick={() => setSelected(null)} className="tc-btn-ghost p-1 -mr-1 -mt-0.5"><X size={14} /></button>
              </div>
              <div className="text-[12px] text-muted-foreground mt-1.5 mb-2">
                {format(selected.date, 'MMM d, yyyy')}
                {selected.endDate && ` — ${format(selected.endDate, 'MMM d, yyyy')}`}
              </div>
              <p className="text-[12px] text-muted-foreground leading-relaxed mb-3">{selected.description}</p>
              <div className="flex gap-1 flex-wrap">
                <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-secondary text-muted-foreground capitalize">{selected.category}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-primary/10 text-primary">{OWNERS[selected.owner]}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-sm ${PRIO_STYLE[selected.priority]}`}>{selected.priority}</span>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-[12px] font-semibold text-muted-foreground mb-2">Upcoming</h3>
              <div className="flex flex-col gap-0.5">
                {upcoming.map((e) => (
                  <button
                    key={e.id}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-sm text-left w-full hover:bg-secondary transition-colors"
                    onClick={() => { setSelected(e); setMonth(startOfMonth(e.date)) }}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${CAT_DOT[e.category]}`} />
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] text-muted-foreground block">{format(e.date, 'MMM d')}</span>
                      <span className="text-[11px] text-foreground truncate block">{e.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="pt-3 border-t border-border">
            <h4 className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">Categories</h4>
            {(Object.entries(CAT_DOT) as [EventCategory, string][]).map(([cat, cls]) => (
              <div key={cat} className="flex items-center gap-2 py-0.5 text-[11px] text-muted-foreground capitalize">
                <div className={`w-1.5 h-1.5 rounded-full ${cls}`} /> {cat}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}

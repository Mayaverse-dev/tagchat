import { useState } from 'react'
import { useAppStore } from '../store/appStore'
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  getDay,
  isWithinInterval,
} from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { CalendarEvent, EventCategory } from '../types'

const CAT_COLOR: Record<EventCategory, string> = {
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
  conference: '#f97316',
  deadline: '#ef4444',
  giveaway: '#8b5cf6',
  marketing: '#3b82f6',
  review: '#06b6d4',
  asset: '#22c55e',
  milestone: '#f59e0b',
}

const OWNER_LABELS: Record<string, string> = { AE: 'Authors Equity', DOL: 'Dept of Lore', Both: 'Joint' }

const PRIORITY_STYLES: Record<string, string> = {
  critical: 'bg-red-500/15 text-red-400',
  high: 'bg-orange-500/15 text-orange-400',
  medium: 'bg-yellow-500/15 text-yellow-400',
  low: 'bg-secondary text-muted-foreground',
}

export function CalendarView() {
  const { calendarEvents } = useAppStore()
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })
  const startPadding = getDay(monthStart)

  function eventsForDay(day: Date) {
    return calendarEvents.filter(
      (e) =>
        isSameDay(e.date, day) ||
        (e.endDate && isWithinInterval(day, { start: e.date, end: e.endDate }))
    )
  }

  const upcomingList = calendarEvents
    .filter((e) => e.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <header className="flex items-start justify-between px-8 pt-6 pb-4">
        <h1 className="text-2xl font-bold text-foreground">Calendar</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="w-8 h-8 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80"
          >
            <ChevronLeft size={18} />
          </button>
          <h2 className="text-base font-semibold min-w-[160px] text-center">{format(currentMonth, 'MMMM yyyy')}</h2>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="w-8 h-8 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden px-8 pb-6 gap-5">
        {/* Calendar Grid */}
        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-7 border-b border-border mb-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
              <div key={d} className="p-2 text-center text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-px">
            {Array.from({ length: startPadding }).map((_, i) => (
              <div key={`pad-${i}`} className="min-h-[100px] bg-[var(--bg-primary)]" />
            ))}
            {days.map((day) => {
              const dayEvents = eventsForDay(day)
              const isToday = isSameDay(day, new Date())
              return (
                <div
                  key={day.toISOString()}
                  className={`min-h-[100px] p-1.5 border border-border rounded-sm ${
                    isToday ? 'border-primary bg-primary/5' : 'bg-[var(--bg-secondary)]'
                  } ${!isSameMonth(day, currentMonth) ? 'opacity-40' : ''}`}
                >
                  <span className={`text-xs font-medium block mb-1 ${isToday ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
                    {format(day, 'd')}
                  </span>
                  <div className="flex flex-col gap-0.5">
                    {dayEvents.slice(0, 3).map((e) => (
                      <button
                        key={e.id}
                        className={`text-[10px] px-1.5 py-0.5 bg-secondary border-l-[3px] rounded-sm text-muted-foreground text-left truncate w-full hover:text-foreground hover:bg-secondary/80 ${CAT_COLOR[e.category]}`}
                        onClick={() => setSelectedEvent(e)}
                        title={e.title}
                      >
                        {e.title.length > 18 ? e.title.slice(0, 18) + '…' : e.title}
                      </button>
                    ))}
                    {dayEvents.length > 3 && (
                      <span className="text-[10px] text-muted-foreground px-1.5">+{dayEvents.length - 3} more</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-[280px] shrink-0 overflow-y-auto flex flex-col gap-5">
          {selectedEvent ? (
            <div className="bg-[var(--bg-secondary)] border border-border rounded-xl p-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: CAT_ACCENT[selectedEvent.category] }} />
              <h3 className="text-base font-semibold mb-2 mt-1">{selectedEvent.title}</h3>
              <div className="text-sm text-muted-foreground mb-3">
                {format(selectedEvent.date, 'MMM d, yyyy')}
                {selectedEvent.endDate && ` — ${format(selectedEvent.endDate, 'MMM d, yyyy')}`}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">{selectedEvent.description}</p>
              <div className="flex gap-1.5 flex-wrap mb-3">
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-secondary text-muted-foreground capitalize">{selectedEvent.category}</span>
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-primary/10 text-primary">{OWNER_LABELS[selectedEvent.owner]}</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-md ${PRIORITY_STYLES[selectedEvent.priority]}`}>{selectedEvent.priority}</span>
              </div>
              <button onClick={() => setSelectedEvent(null)} className="text-xs text-muted-foreground bg-secondary border border-border rounded-md px-4 py-1.5 hover:bg-secondary/80">
                Close
              </button>
            </div>
          ) : (
            <>
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">Upcoming</h3>
                <div className="flex flex-col gap-1">
                  {upcomingList.map((e) => (
                    <button
                      key={e.id}
                      className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left w-full text-muted-foreground hover:bg-secondary"
                      onClick={() => {
                        setSelectedEvent(e)
                        setCurrentMonth(startOfMonth(e.date))
                      }}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${CAT_DOT[e.category]}`} />
                      <div className="flex flex-col min-w-0">
                        <span className="text-[11px] font-medium text-muted-foreground">{format(e.date, 'MMM d')}</span>
                        <span className="text-xs truncate">{e.title}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="pt-4 border-t border-border">
            <h4 className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">Categories</h4>
            {(Object.entries(CAT_DOT) as [EventCategory, string][]).map(([cat, cls]) => (
              <div key={cat} className="flex items-center gap-2 py-0.5 text-xs text-muted-foreground capitalize">
                <div className={`w-2 h-2 rounded-full ${cls}`} />
                <span>{cat}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}

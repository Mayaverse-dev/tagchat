import { Video, Phone, Calendar, Users, Mic, Monitor as ScreenShare, Clock } from 'lucide-react'

const UPCOMING = [
  { title: 'Cover Art Review', time: 'Today, 3:00 PM', attendees: 'Sarah (AE), Don (DOL)', type: 'video' },
  { title: 'Marketing Sync', time: 'Tomorrow, 11:00 AM', attendees: 'Full team', type: 'video' },
  { title: 'SDCC Planning', time: 'Apr 18, 2:00 PM', attendees: 'DOL + Production', type: 'phone' },
  { title: 'Audiobook Status', time: 'Apr 21, 10:00 AM', attendees: 'AE + Audio team', type: 'phone' },
]

export function MeetingsView() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <header className="h-12 px-6 flex items-center justify-between border-b border-border shrink-0 drag-region">
        <div className="flex items-center gap-2 no-drag">
          <h1 className="text-[15px] font-semibold text-foreground">Meetings</h1>
          <span className="tc-badge-phase2">Phase 2</span>
        </div>
        <div className="flex items-center gap-1.5 no-drag">
          <button className="tc-btn-primary px-3 py-1.5 text-[12px] gap-1.5"><Video size={13} /> New Meeting</button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-[800px] mx-auto">
          <p className="text-[12px] text-muted-foreground mb-5">
            Video and voice calls with screen sharing, recordings, and calendar integration.
            Uses native WebRTC for lowest-latency connections.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-5">
            <button className="tc-card p-5 text-center hover:border-primary/30 transition-all group">
              <Video size={28} className="mx-auto mb-2 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-[13px] font-semibold text-foreground block">Video Call</span>
              <span className="text-[10px] text-muted-foreground">HD video with up to 20 participants</span>
            </button>
            <button className="tc-card p-5 text-center hover:border-primary/30 transition-all group">
              <Phone size={28} className="mx-auto mb-2 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-[13px] font-semibold text-foreground block">Voice Call</span>
              <span className="text-[10px] text-muted-foreground">Low-bandwidth audio calls</span>
            </button>
          </div>

          <div className="tc-card overflow-hidden mb-5">
            <div className="px-4 py-2.5 border-b border-border flex items-center gap-2">
              <Calendar size={14} className="text-muted-foreground" />
              <h3 className="text-[12px] font-semibold text-foreground">Scheduled</h3>
            </div>
            {UPCOMING.map((m) => (
              <div key={m.title} className="flex items-center gap-3 px-4 py-3 border-b border-border/50 hover:bg-secondary/40 transition-colors">
                {m.type === 'video' ? <Video size={16} className="text-primary shrink-0" /> : <Phone size={16} className="text-muted-foreground shrink-0" />}
                <div className="flex-1 min-w-0">
                  <span className="text-[13px] font-medium text-foreground block">{m.title}</span>
                  <span className="text-[11px] text-muted-foreground">{m.attendees}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground shrink-0">
                  <Clock size={12} /> {m.time}
                </div>
              </div>
            ))}
          </div>

          <div className="tc-card p-4">
            <h3 className="text-[13px] font-semibold text-foreground mb-2">Phase 2 — Meeting Features</h3>
            <ul className="flex flex-col gap-1 text-[11px] text-muted-foreground">
              {[
                'Native WebRTC video/voice (no third-party SDK)',
                'Screen sharing via native OS screen capture API',
                'Meeting recordings saved locally or to cloud',
                'Calendar integration (Google, Apple, Outlook)',
                'In-meeting chat and reactions',
                'Noise cancellation (native audio processing)',
                'Virtual backgrounds using native GPU acceleration',
                'Meeting transcription (on-device ML)',
              ].map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">●</span> {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { useAppStore } from '../store/appStore'
import { THEMES, hslStringToHex } from '../lib/themes'
import { platform } from '../lib/platform'
import { Check, Monitor, Palette, User, Bell, Plug, Keyboard, Info } from 'lucide-react'

export function SettingsView() {
  const { themeId, setTheme, activeTheme, customDark, customAccent, customBg, setCustomTheme } = useAppStore()
  const [section, setSection] = useState('appearance')

  const [localDark, setLocalDark] = useState(customDark)
  const [localAccent, setLocalAccent] = useState(customAccent)
  const [localBg, setLocalBg] = useState(customBg)

  const applyCustom = () => setCustomTheme(localDark, localAccent, localBg)

  const SECTIONS = [
    { id: 'appearance', label: 'Appearance', Icon: Palette },
    { id: 'profile', label: 'Profile', Icon: User, demo: true },
    { id: 'notifications', label: 'Notifications', Icon: Bell, demo: true },
    { id: 'integrations', label: 'Integrations', Icon: Plug, demo: true },
    { id: 'shortcuts', label: 'Shortcuts', Icon: Keyboard, demo: true },
    { id: 'about', label: 'About', Icon: Info },
  ]

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <header className="h-12 px-6 flex items-center border-b border-border shrink-0 drag-region">
        <h1 className="text-[15px] font-semibold text-foreground no-drag">Settings</h1>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <nav className="w-[200px] shrink-0 border-r border-border p-2 overflow-y-auto">
          {SECTIONS.map(({ id, label, Icon, demo }) => (
            <button
              key={id}
              className={`tc-nav-item w-full ${section === id ? 'active' : ''}`}
              onClick={() => setSection(id)}
            >
              <Icon size={15} />
              <span className="flex-1">{label}</span>
              {demo && <span className="tc-badge-phase2">P2</span>}
            </button>
          ))}
        </nav>

        <div className="flex-1 overflow-y-auto p-6">
          {section === 'appearance' && (
            <div className="max-w-[640px] tc-slide-up">
              <h2 className="text-[16px] font-semibold text-foreground mb-1">Appearance</h2>
              <p className="text-[12px] text-muted-foreground mb-5">Choose a theme or create your own.</p>

              <div className="mb-6">
                <button
                  onClick={() => setTheme('system')}
                  className={`tc-card p-3 flex items-center gap-3 w-full text-left mb-3 ${themeId === 'system' ? '!border-primary' : ''}`}
                >
                  <Monitor size={18} className="text-muted-foreground shrink-0" />
                  <div className="flex-1">
                    <span className="text-[13px] font-medium text-foreground">System Default</span>
                    <span className="text-[11px] text-muted-foreground block">Follows your OS dark/light preference</span>
                  </div>
                  {themeId === 'system' && <Check size={16} className="text-primary" />}
                </button>

                <div className="grid grid-cols-4 gap-2">
                  {THEMES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t.id)}
                      className={`tc-card p-3 text-center transition-all ${themeId === t.id ? '!border-primary ring-1 ring-primary/30' : ''}`}
                    >
                      <div
                        className="w-full h-10 rounded-sm mb-2 border border-white/5"
                        style={{ background: `hsl(${t.colors.background})` }}
                      >
                        <div
                          className="w-4 h-4 rounded-full mt-3 ml-auto mr-auto"
                          style={{ background: `hsl(${t.colors.primary})` }}
                        />
                      </div>
                      <span className="text-[11px] font-medium">{t.emoji} {t.name}</span>
                      <span className="text-[9px] text-muted-foreground block">{t.isDark ? 'Dark' : 'Light'}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="tc-card p-4">
                <h3 className="text-[14px] font-semibold text-foreground mb-1 flex items-center gap-2">
                  <Palette size={15} /> Custom Theme
                </h3>
                <p className="text-[11px] text-muted-foreground mb-4">Pick your own colors.</p>

                <div className="flex gap-4 mb-4">
                  <label className="flex items-center gap-2 text-[12px] text-foreground cursor-pointer">
                    <input
                      type="radio" name="base" checked={localDark}
                      onChange={() => setLocalDark(true)}
                      className="accent-primary"
                    />
                    Dark
                  </label>
                  <label className="flex items-center gap-2 text-[12px] text-foreground cursor-pointer">
                    <input
                      type="radio" name="base" checked={!localDark}
                      onChange={() => setLocalDark(false)}
                      className="accent-primary"
                    />
                    Light
                  </label>
                </div>

                <div className="flex gap-4 mb-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium block mb-1.5">Accent</label>
                    <input
                      type="color"
                      value={localAccent}
                      onChange={(e) => setLocalAccent(e.target.value)}
                      className="w-10 h-10 rounded-sm cursor-pointer border border-border bg-transparent"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium block mb-1.5">Background</label>
                    <input
                      type="color"
                      value={localBg}
                      onChange={(e) => setLocalBg(e.target.value)}
                      className="w-10 h-10 rounded-sm cursor-pointer border border-border bg-transparent"
                    />
                  </div>
                  <div className="flex-1 flex items-end">
                    <button onClick={applyCustom} className="tc-btn-primary px-4 py-2">
                      Apply Custom Theme
                    </button>
                  </div>
                </div>

                <div
                  className="p-3 rounded-sm border border-white/5"
                  style={{ background: localBg }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded-full" style={{ background: localAccent }} />
                    <span className="text-[11px] font-medium" style={{ color: localDark ? '#e4e4ef' : '#1a1a2e' }}>Preview</span>
                  </div>
                  <div className="h-1 rounded-full w-3/4" style={{ background: localAccent, opacity: 0.7 }} />
                </div>
              </div>
            </div>
          )}

          {section === 'profile' && (
            <DemoSection
              title="Profile"
              description="Manage your name, avatar, and status. Syncs across devices."
              features={['Display name & avatar', 'Custom status', 'Availability toggle', 'Timezone setting']}
            />
          )}

          {section === 'notifications' && (
            <DemoSection
              title="Notifications"
              description="Control how and when you receive alerts."
              features={['Push notifications (native OS)', 'Per-channel mute', 'Quiet hours', 'Sound customization', 'Badge count on dock/taskbar']}
            />
          )}

          {section === 'integrations' && (
            <DemoSection
              title="Integrations"
              description="Connect TagChat with your existing tools."
              features={[
                'Slack — Bi-directional message sync',
                'Discord — Channel bridging',
                'GitHub — Issue & PR notifications',
                'Figma — Design file previews',
                'Notion — Linked page embeds',
                'Google Calendar — Event sync',
                'Jira / Linear — Task mirroring',
              ]}
            />
          )}

          {section === 'shortcuts' && (
            <DemoSection
              title="Keyboard Shortcuts"
              description="Navigate faster with keyboard shortcuts."
              features={[
                '⌘K — Quick search',
                '⌘1-7 — Switch views',
                '⌘N — New message',
                '⌘⇧T — Toggle theme',
                '⌘[ / ] — Navigate channels',
                'Esc — Close panel',
              ]}
            />
          )}

          {section === 'about' && (
            <div className="max-w-[480px] tc-slide-up">
              <h2 className="text-[16px] font-semibold text-foreground mb-1">About TagChat</h2>
              <p className="text-[12px] text-muted-foreground mb-4">
                Native desktop collaboration hub for MAYA: Seed Takes Root.
              </p>
              <div className="tc-card p-4 flex flex-col gap-2">
                <Row label="Version" value="1.0.0" />
                <Row label="Platform" value={platform} />
                <Row label="Runtime" value="Tauri v2 + native WebView" />
                <Row label="Theme" value={`${activeTheme.name} (${activeTheme.isDark ? 'Dark' : 'Light'})`} />
                <Row label="Publisher" value="Dept of Lore" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-[12px]">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground font-medium">{value}</span>
    </div>
  )
}

function DemoSection({ title, description, features }: { title: string; description: string; features: string[] }) {
  return (
    <div className="max-w-[480px] tc-slide-up">
      <div className="flex items-center gap-2 mb-1">
        <h2 className="text-[16px] font-semibold text-foreground">{title}</h2>
        <span className="tc-badge-phase2">Phase 2</span>
      </div>
      <p className="text-[12px] text-muted-foreground mb-4">{description}</p>
      <div className="tc-card p-4">
        <h3 className="text-[12px] font-semibold text-foreground mb-2">Planned Features</h3>
        <ul className="flex flex-col gap-1.5">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-[12px] text-muted-foreground">
              <span className="text-primary mt-0.5">●</span>
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

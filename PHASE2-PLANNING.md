# TagChat — Phase 2 Planning

> Full-native desktop collaboration hub for MAYA: Seed Takes Root
> Authors Equity × Dept of Lore

---

## Architecture

| Layer | macOS | Windows | Shared |
|-------|-------|---------|--------|
| Runtime | Tauri v2 / WebKit (native) | Tauri v2 / WebView2 (native) | Rust backend |
| UI | -apple-system font, 10px radius, spring animations | Segoe UI, 6px radius, ease-out animations | React + Tailwind CSS |
| Storage | SQLite via native Tauri plugin | SQLite via native Tauri plugin | Zustand state |
| Notifications | macOS UserNotifications API | Windows Toast API | tauri-plugin-notification |
| File access | NSOpenPanel / NSDocument | Win32 IFileDialog | tauri-plugin-dialog |
| Auto-update | macOS Sparkle-compatible | Windows NSIS updater | tauri-plugin-updater |
| Build | .app → .dmg (5MB) | .exe NSIS + .msi (3-5MB) | GitHub Actions CI |

---

## Feature Inventory

### 1. Dashboard (v1 — functional)
- KPI metrics grid with trend indicators
- Critical actions panel
- Upcoming events panel
- Task progress bars
- Ownership split (DOL vs AE)
- ISBN registry
- **Phase 2 additions:** Live activity feed, interactive charts (native Canvas/SVG), quick actions bar

### 2. Chat (v1 — functional)
- Channel-based messaging
- Real-time message display
- Message composition with keyboard shortcuts
- Avatar and timestamp display
- Attachment link display
- **Phase 2 additions:**
  - Thread/reply support
  - @mention with autocomplete
  - Emoji reactions (native emoji picker via OS)
  - File attachment upload (native file dialog)
  - Voice messages (native audio recording API)
  - Message search (full-text via SQLite FTS5)
  - Pinned messages
  - Message editing and deletion
  - Read receipts
  - Typing indicators

### 3. Calendar (v1 — functional)
- Monthly calendar grid
- Event display with color-coded categories
- Event detail sidebar
- Upcoming events list
- Multi-day event spanning
- **Phase 2 additions:**
  - Drag-to-create events
  - Recurring event support
  - Calendar sync: Apple Calendar (macOS), Outlook (Windows), Google Calendar
  - Native OS calendar integration via platform APIs
  - RSVP and attendee management

### 4. Tasks (v1 — functional)
- Kanban board with 4 columns
- Drag-and-drop task status changes
- Owner and category filtering
- Priority indicators
- **Phase 2 additions:**
  - Task creation modal
  - Subtask support
  - Due date picker (native date picker)
  - Assignee avatars
  - Task comments/activity log
  - Integration with Linear/Jira for mirroring
  - Bulk operations

### 5. Files (Phase 2 — demo UI ready)
- File browser with list/grid view
- Native drag-and-drop from Finder/Explorer
- In-app preview (images, PDFs, video) using native renderers
- Version history with diff view
- Folder organization with team permissions
- Integration with Hightail, Dropbox, Google Drive
- Automatic backup to configured storage

**Native APIs:**
- macOS: NSFileManager, Quick Look, NSItemProvider
- Windows: IStorageFile, Windows.Storage.Pickers
- Tauri: tauri-plugin-dialog, tauri-plugin-fs

### 6. Meetings (Phase 2 — demo UI ready)
- Video calls (native WebRTC)
- Voice calls
- Screen sharing via native OS screen capture
- Meeting recordings (local or cloud)
- Calendar integration
- In-meeting chat and reactions
- Noise cancellation (native audio processing)
- Virtual backgrounds (GPU-accelerated)
- Meeting transcription (on-device ML)

**Native APIs:**
- macOS: AVFoundation (camera/mic), CGWindowListCopyWindowInfo (screen capture), ScreenCaptureKit
- Windows: Windows.Media.Capture, DXGI Desktop Duplication, MediaCapture
- Shared: WebRTC (native in WebKit/WebView2), Web Audio API

### 7. Settings (v1 — theme system functional, rest demo)
- **Appearance** (functional): 8 preset themes + custom theme creator with native OS color picker
- **Profile** (Phase 2): Name, avatar, status, timezone
- **Notifications** (Phase 2): Per-channel mute, quiet hours, sound customization
- **Integrations** (Phase 2): Slack, Discord, GitHub, Figma, Notion, Google Calendar, Jira/Linear
- **Shortcuts** (Phase 2): Customizable keyboard shortcuts
- **About** (functional): Version, platform, runtime info

---

## Theme System (v1 — fully functional)

| Theme | Mode | Accent |
|-------|------|--------|
| System | Auto (follows OS) | OS default |
| Obsidian | Dark | Purple |
| Pearl | Light | Purple |
| Sapphire | Dark | Blue |
| Ember | Dark | Orange |
| Forest | Dark | Green |
| Arctic | Light | Ice Blue |
| Sand | Light | Amber |
| Midnight | Dark | Violet |
| Custom | User picks | User picks |

Custom theme creator uses native `<input type="color">` which opens macOS NSColorPanel / Windows ColorDialog.

---

## Platform-Native Design Adaptations

### Typography
- **macOS:** -apple-system, BlinkMacSystemFont, SF Pro Text
- **Windows:** Segoe UI Variable, Segoe UI
- **macOS** has -0.01em letter-spacing for SF Pro

### Corner Radius
- **macOS:** 10px base, 8px small, 14px large (matches macOS Sonoma+)
- **Windows:** 6px base, 4px small, 8px large (matches Windows 11)

### Animations
- **macOS:** Spring curves `cubic-bezier(0.2, 0.9, 0.3, 1.0)`, 320ms duration
- **Windows:** Ease-out curves `cubic-bezier(0.1, 0.9, 0.2, 1.0)`, 250ms duration

### Scrollbars
- **macOS:** 8px width, 4px border-radius (matches system overlay scrollbars)
- **Windows:** 6px width, 3px border-radius (compact)

### Shadows
- **macOS:** Diffuse, multi-layer (matches NSVisualEffectView)
- **Windows:** Sharper, single-layer (matches WinUI elevation)

---

## Native Library Usage Plan

### Current (v1)
| Component | Native | Third-party |
|-----------|--------|-------------|
| Window management | Tauri/WebKit/WebView2 | — |
| Auto-updater | tauri-plugin-updater | — |
| Shell commands | tauri-plugin-shell | — |
| State management | — | Zustand (lightweight) |
| UI framework | — | React (via native WebView) |
| Date handling | — | date-fns |
| Icons | — | lucide-react |
| CSS | — | Tailwind CSS (build-time) |

### Phase 2 — Add Native Plugins
| Feature | Tauri Plugin | macOS Native | Windows Native |
|---------|-------------|--------------|----------------|
| Notifications | tauri-plugin-notification | NSUserNotification | Windows.UI.Notifications |
| File dialogs | tauri-plugin-dialog | NSOpenPanel/NSSavePanel | IFileOpenDialog |
| Clipboard | tauri-plugin-clipboard | NSPasteboard | Windows.ApplicationModel.DataTransfer |
| Global shortcuts | tauri-plugin-global-shortcut | NSEvent | RegisterHotKey |
| Window state | tauri-plugin-window-state | NSWindow restoration | Win32 GetWindowPlacement |
| Autostart | tauri-plugin-autostart | LSSharedFileList | HKCU\Run |
| Persistent storage | tauri-plugin-store | — (SQLite) | — (SQLite) |
| OS info | tauri-plugin-os | sysctl | GetVersionEx |

---

## Backend / Server Requirements (Phase 2)

### Realtime Server
- **Protocol:** WebSocket (Socket.IO or native WS)
- **Framework:** Fastify 5 (from reference project)
- **Database:** SQLite (dev) → PostgreSQL (production)
- **Auth:** JWT with refresh tokens
- **File storage:** S3-compatible (Backblaze B2 or native OS storage)

### API Endpoints
```
POST   /auth/login
POST   /auth/register
GET    /channels
POST   /channels/:id/messages
GET    /channels/:id/messages?before=&limit=
POST   /files/upload
GET    /files/:id
GET    /tasks
PATCH  /tasks/:id
GET    /events
WebSocket /realtime
```

### Sync Architecture
```
Client (Tauri) ←→ WebSocket ←→ Server ←→ PostgreSQL
                                    ↕
                              File Storage (S3)
```

- **Offline-first:** All data cached locally in SQLite via tauri-plugin-store
- **Conflict resolution:** Last-write-wins with vector clocks for critical data
- **Multi-device sync:** Via server, with BroadcastChannel for multi-window

---

## Integration Pipelines

### Slack Integration
```
TagChat Channel ←→ Slack Bot API ←→ Slack Channel
- Bi-directional message sync
- Thread mapping
- File sharing
```

### GitHub Integration
```
GitHub Webhooks → TagChat Server → Push to client
- PR/Issue notifications
- Code review comments in chat
- CI status updates
```

### Calendar Sync
```
macOS: EventKit → EKEventStore ←→ iCloud Calendar
Windows: Windows.ApplicationModel.Appointments ←→ Outlook
Cross-platform: Google Calendar API ←→ TagChat events
```

---

## OS-Specific Limitations

### macOS
- App Store distribution requires Apple Developer Program ($99/yr) and app review
- Direct distribution requires notarization (already handled by Tauri build)
- Minimum macOS 10.15 (Catalina) for WebKit features
- Universal binary required for both Apple Silicon and Intel

### Windows
- Microsoft Store distribution requires Partner Center registration
- Direct distribution via NSIS/MSI (current approach)
- Minimum Windows 10 1803 for WebView2
- SmartScreen warning on unsigned EXE (code signing certificate ~$200/yr)
- No native vibrancy/Mica support in WebView2 (simulated via CSS)

### Cross-Platform
- No shared iCloud/OneDrive integration across platforms
- Push notifications require separate native implementations
- Camera/mic permissions handled differently per OS
- File paths and conventions differ (/, \, ~, %USERPROFILE%)

---

## Build & Distribution

| Artifact | macOS (arm64) | macOS (x64) | Windows (x64) |
|----------|--------------|-------------|----------------|
| App | TagChat.app (5MB) | TagChat.app (5MB) | TagChat.exe (3.3MB) |
| Installer | .dmg (5MB) | .dmg (5.2MB) | .exe NSIS (3.3MB) |
| Alt installer | — | — | .msi (4.8MB) |
| Update bundle | .app.tar.gz + .sig | .app.tar.gz + .sig | .nsis.zip + .sig |

### CI/CD Pipeline
```
git tag v1.x.x → push → GitHub Actions
  ├── macOS arm64 build (macos-latest)
  ├── macOS x64 build (macos-latest)
  ├── Windows x64 build (windows-latest)
  ├── GitHub Release (auto-created with all artifacts)
  ├── latest.json updater manifest
  └── GitHub Pages deploy (download page)
```

### Auto-Update Flow
```
App launch → fetch latest.json from GitHub Releases
  → compare versions
  → download signed bundle
  → verify Ed25519 signature
  → install and restart
```

---

## Daily Backup System

```
launchd (macOS) runs at 03:00 daily:
  1. rsync project source → /Volumes/artemis/Backups/tagchat/daily/YYYY-MM-DD/
  2. Copy latest release binaries
  3. Backup signing keys
  4. Prune backups older than 30 days
```

---

## Size Budget

Target app sizes (comparable to native apps):
- **macOS:** ~8-12MB DMG (currently 5MB — under budget)
- **Windows:** ~5-8MB EXE (currently 3.3MB — under budget)

For reference:
- Apple Notes: ~15MB
- Windows Notepad: ~8MB
- Slack (Electron): ~300MB
- Discord (Electron): ~250MB

TagChat is 20-50x smaller than Electron alternatives.

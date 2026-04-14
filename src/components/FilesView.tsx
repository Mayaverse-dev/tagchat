import { FolderOpen, Image, FileText, Film, Music, Upload, Search } from 'lucide-react'

const DEMO_FILES = [
  { name: 'Final Cover', icon: Image, type: 'PNG', size: '14.2 MB', date: 'Apr 10' },
  { name: 'Marketing Brief', icon: FileText, type: 'PDF', size: '2.1 MB', date: 'Apr 8' },
  { name: 'Book Trailer v3', icon: Film, type: 'MP4', size: '128 MB', date: 'Apr 5' },
  { name: 'Hugo Weaving Sample', icon: Music, type: 'MP3', size: '8.4 MB', date: 'Apr 3' },
  { name: 'Character Art Pack', icon: FolderOpen, type: 'Folder', size: '45 files', date: 'Mar 28' },
  { name: 'World Map HD', icon: Image, type: 'PNG', size: '22.8 MB', date: 'Mar 25' },
  { name: 'Press Kit', icon: FolderOpen, type: 'Folder', size: '12 files', date: 'Mar 20' },
  { name: 'ISBN Documentation', icon: FileText, type: 'PDF', size: '340 KB', date: 'Mar 15' },
]

export function FilesView() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <header className="h-12 px-6 flex items-center justify-between border-b border-border shrink-0 drag-region">
        <div className="flex items-center gap-2 no-drag">
          <h1 className="text-[15px] font-semibold text-foreground">Files</h1>
          <span className="tc-badge-phase2">Phase 2</span>
        </div>
        <div className="flex items-center gap-1.5 no-drag">
          <button className="tc-btn-ghost p-2"><Search size={14} /></button>
          <button className="tc-btn-primary px-3 py-1.5 text-[12px] gap-1.5"><Upload size={13} /> Upload</button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-[800px] mx-auto">
          <div className="mb-4">
            <p className="text-[12px] text-muted-foreground">
              Shared file storage with versioning, previews, and team permissions.
              Files sync across all connected devices using native OS file APIs.
            </p>
          </div>

          <div className="tc-card overflow-hidden">
            <div className="grid grid-cols-[1fr_80px_80px_80px] px-4 py-2 border-b border-border text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              <span>Name</span>
              <span>Type</span>
              <span>Size</span>
              <span>Modified</span>
            </div>
            {DEMO_FILES.map((f) => (
              <div
                key={f.name}
                className="grid grid-cols-[1fr_80px_80px_80px] px-4 py-2.5 border-b border-border/50 hover:bg-secondary/40 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <f.icon size={16} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                  <span className="text-[13px] text-foreground font-medium truncate">{f.name}</span>
                </div>
                <span className="text-[11px] text-muted-foreground self-center">{f.type}</span>
                <span className="text-[11px] text-muted-foreground self-center tabular-nums">{f.size}</span>
                <span className="text-[11px] text-muted-foreground self-center">{f.date}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 tc-card p-4">
            <h3 className="text-[13px] font-semibold text-foreground mb-2">Phase 2 — File Management</h3>
            <ul className="flex flex-col gap-1 text-[11px] text-muted-foreground">
              {[
                'Native file drag-and-drop from OS Finder/Explorer',
                'In-app image, PDF, and video preview',
                'Version history with diff view',
                'Folder organization with team permissions',
                'Integration with Hightail, Dropbox, Google Drive',
                'Automatic backup to configured storage (Artemis SSD)',
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

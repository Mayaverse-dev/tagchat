import { useState, useRef, useEffect } from 'react'
import { useAppStore } from '../store/appStore'
import { Send, Paperclip, Smile, AtSign, Search, Pin, Phone, Video } from 'lucide-react'
import { format } from 'date-fns'

export function ChatView() {
  const { messages, selectedChannelId, channels, addMessage } = useAppStore()
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const channel = channels.find((c) => c.id === selectedChannelId)
  const channelMessages = messages.filter((m) => m.channelId === selectedChannelId)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [channelMessages.length])

  const handleSend = () => {
    const text = input.trim()
    if (!text) return
    addMessage({ channelId: selectedChannelId, author: 'You (DOL)', avatar: 'DL', content: text })
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-full">
      <header className="h-12 px-4 flex items-center justify-between border-b border-border shrink-0 drag-region">
        <div className="no-drag min-w-0">
          <h2 className="text-[14px] font-semibold text-foreground leading-none"># {channel?.name}</h2>
          <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{channel?.description}</p>
        </div>
        <div className="flex items-center gap-0.5 no-drag shrink-0">
          <button className="tc-btn-ghost p-2" title="Search messages (Phase 2)"><Search size={14} /></button>
          <button className="tc-btn-ghost p-2" title="Pinned (Phase 2)"><Pin size={14} /></button>
          <button className="tc-btn-ghost p-2" title="Voice call (Phase 2)"><Phone size={14} /></button>
          <button className="tc-btn-ghost p-2" title="Video call (Phase 2)"><Video size={14} /></button>
          <span className="text-[10px] text-muted-foreground bg-secondary px-2 py-0.5 rounded-full ml-1 font-medium">AE × DOL</span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-3">
        {channelMessages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center gap-2 tc-fade-in">
            <div className="text-4xl opacity-40">{channel?.icon}</div>
            <h3 className="text-base text-foreground font-medium">Welcome to #{channel?.name}</h3>
            <p className="text-[12px] text-muted-foreground max-w-[320px]">{channel?.description}</p>
          </div>
        )}

        {channelMessages.map((msg, i) => {
          const showHeader = i === 0 || channelMessages[i - 1].author !== msg.author
          return (
            <div
              key={msg.id}
              className={`pl-[44px] relative group hover:bg-secondary/30 -mx-2 px-2 py-0.5 transition-colors duration-native-fast rounded-sm ${showHeader ? 'mt-3 pt-1' : ''}`}
            >
              {showHeader && (
                <div className="flex items-center gap-2 mb-0.5 relative">
                  <div
                    className={`absolute -left-[44px] w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${
                      msg.author === 'System'
                        ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-sm'
                        : 'bg-gradient-to-br from-primary to-primary/60'
                    }`}
                  >
                    {msg.avatar}
                  </div>
                  <span className="font-semibold text-[13px] text-foreground">{msg.author}</span>
                  <span className="text-[10px] text-muted-foreground">{format(msg.timestamp, 'h:mm a')}</span>
                </div>
              )}
              <p className="text-[13px] text-foreground/80 leading-relaxed">{msg.content}</p>
              {msg.attachments?.map((att) => (
                <a
                  key={att.url}
                  href={att.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-1 px-2 py-1 bg-secondary border border-border rounded-sm text-primary text-[11px] no-underline hover:bg-secondary/80 transition-colors"
                >
                  🔗 {att.name}
                </a>
              ))}
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="px-4 pb-3 pt-2 border-t border-border shrink-0">
        <div className="flex items-center gap-1 mb-1.5">
          <button className="tc-btn-ghost p-1.5" title="Attach file (Phase 2)"><Paperclip size={15} /></button>
          <button className="tc-btn-ghost p-1.5" title="Mention (Phase 2)"><AtSign size={15} /></button>
        </div>
        <div
          className="flex items-end gap-2 bg-secondary border border-input px-3 py-2 focus-within:border-primary focus-within:ring-1 focus-within:ring-ring/30 transition-all duration-native-fast"
          style={{ borderRadius: 'var(--p-radius-sm)' }}
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Message #${channel?.name}...`}
            rows={1}
            className="flex-1 bg-transparent border-none text-foreground text-[13px] leading-relaxed resize-none outline-none placeholder:text-muted-foreground min-h-[20px] max-h-[100px]"
          />
          <div className="flex items-center gap-1">
            <button className="tc-btn-ghost p-1.5"><Smile size={15} /></button>
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:brightness-110 transition-all disabled:opacity-20 disabled:pointer-events-none"
            >
              <Send size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

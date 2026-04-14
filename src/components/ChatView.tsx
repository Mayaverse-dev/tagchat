import { useState, useRef, useEffect } from 'react'
import { useAppStore } from '../store/appStore'
import { Send, Paperclip, Smile, AtSign } from 'lucide-react'
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
    addMessage({
      channelId: selectedChannelId,
      author: 'You (DOL)',
      avatar: 'DL',
      content: text,
    })
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
      {/* Header */}
      <header
        className="h-14 px-5 flex items-center justify-between border-b border-border bg-[var(--bg-secondary)] shrink-0"
        style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
      >
        <div style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}>
          <h2 className="text-[15px] font-semibold text-foreground"># {channel?.name}</h2>
          <p className="text-xs text-muted-foreground">{channel?.description}</p>
        </div>
        <span
          className="text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-md"
          style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
        >
          AE × DOL
        </span>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {channelMessages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center gap-2">
            <div className="text-5xl opacity-50">{channel?.icon}</div>
            <h3 className="text-lg text-muted-foreground">Welcome to #{channel?.name}</h3>
            <p className="text-sm text-muted-foreground max-w-[360px]">{channel?.description}</p>
          </div>
        )}

        {channelMessages.map((msg, i) => {
          const showHeader = i === 0 || channelMessages[i - 1].author !== msg.author
          return (
            <div key={msg.id} className={`pl-[52px] relative ${showHeader ? 'mt-4' : 'mt-0.5'}`}>
              {showHeader && (
                <div className="flex items-center gap-2 mb-1 relative">
                  <div
                    className={`absolute -left-[52px] w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold text-white ${
                      msg.author === 'System'
                        ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-base'
                        : 'bg-gradient-to-br from-primary to-purple-500'
                    }`}
                  >
                    {msg.avatar}
                  </div>
                  <span className="font-semibold text-sm text-foreground">{msg.author}</span>
                  <span className="text-[11px] text-muted-foreground">
                    {format(msg.timestamp, 'h:mm a')}
                  </span>
                </div>
              )}
              <div>
                <p className="text-sm text-muted-foreground leading-relaxed">{msg.content}</p>
                {msg.attachments?.map((att) => (
                  <a
                    key={att.url}
                    href={att.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-1.5 px-2.5 py-1 bg-secondary border border-border rounded-md text-primary text-xs no-underline hover:bg-secondary/80"
                  >
                    🔗 {att.name}
                  </a>
                ))}
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-5 pb-4 pt-3 border-t border-border shrink-0">
        <div className="flex gap-1 mb-1.5">
          <button className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-secondary">
            <Paperclip size={18} />
          </button>
          <button className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-secondary">
            <AtSign size={18} />
          </button>
        </div>
        <div className="flex items-end gap-2 bg-secondary border border-border rounded-lg px-3 py-2 focus-within:border-primary transition-colors">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Message #${channel?.name}...`}
            rows={1}
            className="flex-1 bg-transparent border-none text-foreground text-sm leading-relaxed resize-none outline-none placeholder:text-muted-foreground min-h-[20px] max-h-[120px]"
          />
          <div className="flex items-center gap-1">
            <button className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-secondary/80">
              <Smile size={18} />
            </button>
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:brightness-110 transition-all disabled:opacity-30 disabled:pointer-events-none"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

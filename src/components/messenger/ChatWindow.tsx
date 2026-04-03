import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Smile, Phone, MoreVertical, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar } from './Avatar';
import { messages, users, chats, type Message } from '@/data/mockData';
import { motion } from 'framer-motion';

interface ChatWindowProps { chatId: string; onBack?: () => void; }

export function ChatWindow({ chatId, onBack }: ChatWindowProps) {
  const chat = chats.find(c => c.id === chatId);
  const [localMessages, setLocalMessages] = useState<Message[]>(messages[chatId] || []);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setLocalMessages(messages[chatId] || []); }, [chatId]);
  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' }); }, [localMessages]);

  if (!chat) return null;

  const otherUser = users.find(u => chat.participants.includes(u.id) && u.id !== 'me');
  const chatName = chat.name || otherUser?.name || 'Unknown';
  const isOnline = otherUser?.online;
  const statusText = chat.type === 'group' ? `${chat.participants.length} участников` : isOnline ? 'в сети' : `был(а) ${otherUser?.lastSeen || 'давно'}`;

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg: Message = { id: `new-${Date.now()}`, chatId, senderId: 'me', text: input.trim(), timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }), read: false };
    setLocalMessages(prev => [...prev, newMsg]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-chat-bg">
      <div className="flex items-center gap-3 px-4 py-3 bg-card border-b border-border">
        {onBack && (<button onClick={onBack} className="p-1 hover:bg-muted rounded-lg transition-colors mr-1"><ArrowLeft className="w-5 h-5 text-muted-foreground" /></button>)}
        <Avatar name={chatName} size="md" online={chat.type === 'private' ? isOnline : undefined} />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm text-foreground truncate">{chatName}</h3>
          <p className={cn('text-xs', isOnline ? 'text-online' : 'text-muted-foreground')}>{statusText}</p>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-muted rounded-lg transition-colors"><Phone className="w-4 h-4 text-muted-foreground" /></button>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors"><MoreVertical className="w-4 h-4 text-muted-foreground" /></button>
        </div>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
        {localMessages.map((msg, i) => {
          const isOwn = msg.senderId === 'me'; const sender = users.find(u => u.id === msg.senderId);
          const showAvatar = !isOwn && chat.type === 'group' && (i === 0 || localMessages[i - 1].senderId !== msg.senderId);
          return (
            <motion.div key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15 }}
              className={cn('flex', isOwn ? 'justify-end' : 'justify-start')}>
              {!isOwn && chat.type === 'group' && (<div className="w-8 mr-2 flex-shrink-0">{showAvatar && sender && <Avatar name={sender.name} size="sm" />}</div>)}
              <div className={cn('max-w-[75%] px-3.5 py-2 text-sm', isOwn ? 'chat-bubble-own' : 'chat-bubble-other')}>
                {!isOwn && chat.type === 'group' && showAvatar && sender && (<p className="text-xs font-medium text-primary mb-0.5">{sender.name}</p>)}
                <p className="leading-relaxed">{msg.text}</p>
                <p className={cn('text-[10px] mt-1 text-right', isOwn ? 'text-primary-foreground/60' : 'text-muted-foreground')}>{msg.timestamp}{isOwn && ' ✓✓'}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="px-4 py-3 bg-card border-t border-border">
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-muted rounded-lg transition-colors"><Paperclip className="w-5 h-5 text-muted-foreground" /></button>
          <div className="flex-1 relative">
            <input type="text" placeholder="Сообщение..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()}
              className="w-full bg-muted rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring" />
          </div>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors"><Smile className="w-5 h-5 text-muted-foreground" /></button>
          <button onClick={handleSend} disabled={!input.trim()} className={cn('p-2 rounded-lg transition-all', input.trim() ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'text-muted-foreground')}>
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

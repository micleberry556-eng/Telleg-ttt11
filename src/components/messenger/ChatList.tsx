import { useState } from 'react';
import { Search, Menu, Settings, Users, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar } from './Avatar';
import { chats, users, type Chat } from '@/data/mockData';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatListProps { activeChatId: string | null; onSelectChat: (chatId: string) => void; onOpenSettings: () => void; onOpenAdmin: () => void; }

function getChatName(chat: Chat) { if (chat.name) return chat.name; const other = chat.participants.find(p => p !== 'me'); return users.find(u => u.id === other)?.name ?? 'Unknown'; }
function getChatUser(chat: Chat) { const other = chat.participants.find(p => p !== 'me'); return users.find(u => u.id === other); }

export function ChatList({ activeChatId, onSelectChat, onOpenSettings, onOpenAdmin }: ChatListProps) {
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const filtered = chats.filter(chat => getChatName(chat).toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col h-full bg-card border-r border-border">
      <div className="p-3 flex items-center gap-2 border-b border-border">
        <div className="relative">
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <Menu className="w-5 h-5 text-muted-foreground" />
          </button>
          <AnimatePresence>
            {menuOpen && (
              <motion.div initial={{ opacity: 0, scale: 0.95, y: -4 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -4 }}
                className="absolute left-0 top-full mt-1 z-50 w-56 bg-popover border border-border rounded-xl shadow-xl overflow-hidden">
                <button onClick={() => { onOpenSettings(); setMenuOpen(false); }} className="flex items-center gap-3 w-full px-4 py-3 text-sm hover:bg-muted transition-colors text-foreground">
                  <Settings className="w-4 h-4 text-muted-foreground" />Настройки
                </button>
                <button onClick={() => { onOpenAdmin(); setMenuOpen(false); }} className="flex items-center gap-3 w-full px-4 py-3 text-sm hover:bg-muted transition-colors text-foreground">
                  <Users className="w-4 h-4 text-muted-foreground" />Админ-панель
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input type="text" placeholder="Поиск..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full bg-muted rounded-lg pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {filtered.map(chat => {
          const name = getChatName(chat); const user = getChatUser(chat); const isActive = chat.id === activeChatId; const lastMsg = chat.lastMessage;
          return (
            <button key={chat.id} onClick={() => onSelectChat(chat.id)}
              className={cn('w-full flex items-center gap-3 px-3 py-3 transition-colors text-left', isActive ? 'bg-chat-active' : 'hover:bg-chat-hover')}>
              <Avatar name={name} size="lg" online={chat.type === 'private' ? user?.online : undefined} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className={cn('font-medium text-sm truncate', isActive ? 'text-chat-active-foreground' : 'text-foreground')}>{name}</span>
                  <span className={cn('text-xs flex-shrink-0 ml-2', isActive ? 'text-chat-active-foreground/70' : 'text-muted-foreground')}>{lastMsg?.timestamp}</span>
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  <p className={cn('text-xs truncate', isActive ? 'text-chat-active-foreground/70' : 'text-muted-foreground')}>
                    {lastMsg?.senderId === 'me' && <span className="text-primary">Вы: </span>}{lastMsg?.text}
                  </p>
                  {chat.unreadCount > 0 && (
                    <span className="ml-2 flex-shrink-0 bg-primary text-primary-foreground text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">{chat.unreadCount}</span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
            <MessageCircle className="w-8 h-8 mb-2 opacity-50" /><p className="text-sm">Чаты не найдены</p>
          </div>
        )}
      </div>
    </div>
  );
}

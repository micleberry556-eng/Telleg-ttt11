import { useState } from 'react';
import { Search, Menu, Settings, Users, MessageCircle, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar } from './Avatar';
import { chats as defaultChats, users, type Chat } from '@/data/mockData';
import { motion, AnimatePresence } from 'framer-motion';

type Tab = 'chats' | 'groups';

interface ChatListProps {
  activeChatId: string | null;
  onSelectChat: (chatId: string) => void;
  onOpenSettings: () => void;
  onOpenAdmin: () => void;
  onCreateGroup: () => void;
  extraChats?: Chat[];
}

function getChatName(chat: Chat) {
  if (chat.name) return chat.name;
  const other = chat.participants.find(p => p !== 'me');
  return users.find(u => u.id === other)?.name ?? 'Unknown';
}

function getChatUser(chat: Chat) {
  const other = chat.participants.find(p => p !== 'me');
  return users.find(u => u.id === other);
}

export function ChatList({
  activeChatId,
  onSelectChat,
  onOpenSettings,
  onOpenAdmin,
  onCreateGroup,
  extraChats = [],
}: ChatListProps) {
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [tab, setTab] = useState<Tab>('chats');

  const allChats = [...defaultChats, ...extraChats];

  const visibleChats = allChats.filter(chat => {
    const matchesSearch = getChatName(chat).toLowerCase().includes(search.toLowerCase());
    if (tab === 'groups') return chat.type === 'group' && matchesSearch;
    return matchesSearch;
  });

  return (
    <div className="flex flex-col h-full bg-card border-r border-border">
      {/* Header */}
      <div className="p-3 flex items-center gap-2 border-b border-border">
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <Menu className="w-5 h-5 text-muted-foreground" />
          </button>
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -4 }}
                className="absolute left-0 top-full mt-1 z-50 w-56 bg-popover border border-border rounded-xl shadow-xl overflow-hidden"
              >
                <button
                  onClick={() => { onCreateGroup(); setMenuOpen(false); }}
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm hover:bg-muted transition-colors text-foreground"
                >
                  <Plus className="w-4 h-4 text-muted-foreground" />
                  Новая группа
                </button>
                <button
                  onClick={() => { onOpenSettings(); setMenuOpen(false); }}
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm hover:bg-muted transition-colors text-foreground"
                >
                  <Settings className="w-4 h-4 text-muted-foreground" />
                  Настройки
                </button>
                <button
                  onClick={() => { onOpenAdmin(); setMenuOpen(false); }}
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm hover:bg-muted transition-colors text-foreground"
                >
                  <Users className="w-4 h-4 text-muted-foreground" />
                  Админ-панель
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Поиск..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-muted rounded-lg pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setTab('chats')}
          className={cn(
            'flex-1 py-2.5 text-sm font-medium transition-colors relative',
            tab === 'chats' ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
          )}
        >
          Чаты
          {tab === 'chats' && (
            <motion.div
              layoutId="tab-indicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
            />
          )}
        </button>
        <button
          onClick={() => setTab('groups')}
          className={cn(
            'flex-1 py-2.5 text-sm font-medium transition-colors relative',
            tab === 'groups' ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
          )}
        >
          Группы
          {tab === 'groups' && (
            <motion.div
              layoutId="tab-indicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
            />
          )}
        </button>
      </div>

      {/* Chat items */}
      <div className="flex-1 overflow-y-auto">
        {/* Create group button (groups tab only) */}
        {tab === 'groups' && (
          <button
            onClick={onCreateGroup}
            className="w-full flex items-center gap-3 px-3 py-3 hover:bg-chat-hover transition-colors text-left border-b border-border/50"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Plus className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-primary">Создать группу</p>
              <p className="text-xs text-muted-foreground">Добавьте участников</p>
            </div>
          </button>
        )}

        {visibleChats.map(chat => {
          const name = getChatName(chat);
          const user = getChatUser(chat);
          const isActive = chat.id === activeChatId;
          const lastMsg = chat.lastMessage;
          const isGroup = chat.type === 'group';

          return (
            <button
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-3 transition-colors text-left',
                isActive ? 'bg-chat-active' : 'hover:bg-chat-hover',
              )}
            >
              {isGroup ? (
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                </div>
              ) : (
                <Avatar
                  name={name}
                  size="lg"
                  online={user?.online}
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      'font-medium text-sm truncate',
                      isActive ? 'text-chat-active-foreground' : 'text-foreground',
                    )}
                  >
                    {name}
                  </span>
                  <span
                    className={cn(
                      'text-xs flex-shrink-0 ml-2',
                      isActive ? 'text-chat-active-foreground/70' : 'text-muted-foreground',
                    )}
                  >
                    {lastMsg?.timestamp}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  <p
                    className={cn(
                      'text-xs truncate',
                      isActive ? 'text-chat-active-foreground/70' : 'text-muted-foreground',
                    )}
                  >
                    {isGroup && lastMsg?.senderId && (
                      <span className="text-primary">
                        {lastMsg.senderId === 'me'
                          ? 'Вы: '
                          : `${users.find(u => u.id === lastMsg.senderId)?.name?.split(' ')[0] || ''}: `}
                      </span>
                    )}
                    {!isGroup && lastMsg?.senderId === 'me' && (
                      <span className="text-primary">Вы: </span>
                    )}
                    {lastMsg?.text}
                  </p>
                  {chat.unreadCount > 0 && (
                    <span className="ml-2 flex-shrink-0 bg-primary text-primary-foreground text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}

        {visibleChats.length === 0 && (
          <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
            {tab === 'groups' ? (
              <>
                <Users className="w-8 h-8 mb-2 opacity-50" />
                <p className="text-sm">Групп пока нет</p>
                <p className="text-xs mt-1">Создайте первую группу</p>
              </>
            ) : (
              <>
                <MessageCircle className="w-8 h-8 mb-2 opacity-50" />
                <p className="text-sm">Чаты не найдены</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

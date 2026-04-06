import { useState } from 'react';
import {
  Search, LayoutGrid, SlidersHorizontal, UsersRound, MessageCircle,
  Plus, Radio, FolderOpen, Shield, Sparkles, Megaphone, Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar } from './Avatar';
import { chats as defaultChats, users, type Chat, type Channel, type ChatFolder } from '@/data/mockData';
import { useTheme } from '@/contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

type Tab = 'chats' | 'groups' | 'channels';

interface ChatListProps {
  activeChatId: string | null;
  activeChannelId: string | null;
  onSelectChat: (chatId: string) => void;
  onSelectChannel: (channelId: string) => void;
  onOpenSettings: () => void;
  onOpenAdmin: () => void;
  onCreateGroup: () => void;
  onCreateChannel: () => void;
  onManageFolders: () => void;
  extraChats?: Chat[];
  channels?: Channel[];
  folders?: ChatFolder[];
  /** Slot for stories bar rendered above folder tabs. */
  storiesSlot?: React.ReactNode;
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

/** Check if a chat matches a folder's filter criteria. */
function chatMatchesFolder(chat: Chat, folder: ChatFolder): boolean {
  if (folder.excludeChatIds.includes(chat.id)) return false;
  if (folder.includeChatIds.includes(chat.id)) return true;
  if (folder.includeTypes.length > 0 && folder.includeTypes.includes(chat.type)) return true;
  return false;
}

/** Gradient icon wrapper — small colored circle behind an icon. */
function GradientIcon({ gradient, children, className }: { gradient: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br shadow-lg', gradient, className)}>
      {children}
    </div>
  );
}

export function ChatList({
  activeChatId,
  activeChannelId,
  onSelectChat,
  onSelectChannel,
  onOpenSettings,
  onOpenAdmin,
  onCreateGroup,
  onCreateChannel,
  onManageFolders,
  extraChats = [],
  channels = [],
  folders = [],
  storiesSlot,
}: ChatListProps) {
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [tab, setTab] = useState<Tab>('chats');
  const [activeFolderId, setActiveFolderId] = useState<string | null>(null);
  const { surfaceClass, headerClass, iconAnimClass } = useTheme();

  const allChats = [...defaultChats, ...extraChats];
  const activeFolder = activeFolderId ? folders.find(f => f.id === activeFolderId) : null;

  const folderFilteredChats = activeFolder
    ? allChats.filter(chat => chatMatchesFolder(chat, activeFolder))
    : allChats;

  const folderFilteredChannels = activeFolder
    ? channels.filter(ch =>
        activeFolder.includeChannels ||
        activeFolder.includeChatIds.includes(ch.id),
      )
    : channels;

  const visibleChats = folderFilteredChats.filter(chat => {
    const matchesSearch = getChatName(chat).toLowerCase().includes(search.toLowerCase());
    if (tab === 'groups') return chat.type === 'group' && matchesSearch;
    return matchesSearch;
  });

  const visibleChannels = folderFilteredChannels.filter(ch =>
    ch.name.toLowerCase().includes(search.toLowerCase()),
  );

  const showChannelsTab = !activeFolderId || folderFilteredChannels.length > 0;
  const showGroupsTab = !activeFolderId || folderFilteredChats.some(c => c.type === 'group');

  const tabDefs: { key: Tab; label: string; icon: React.ReactNode; visible: boolean }[] = [
    { key: 'chats', label: 'Личные', icon: <MessageCircle className="w-3.5 h-3.5" />, visible: true },
    { key: 'groups', label: 'Группы', icon: <Users className="w-3.5 h-3.5" />, visible: showGroupsTab },
    { key: 'channels', label: 'Каналы', icon: <Megaphone className="w-3.5 h-3.5" />, visible: showChannelsTab },
  ];

  const visibleTabs = tabDefs.filter(t => t.visible);
  const effectiveTab = visibleTabs.find(t => t.key === tab) ? tab : 'chats';

  return (
    <div className="flex flex-col h-full bg-card border-r border-border">
      {/* Header */}
      <div className={cn('p-3 flex items-center gap-2 border-b border-border', headerClass)}>
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 hover:from-primary/30 hover:to-accent/20 transition-all"
          >
            <LayoutGrid className={cn('w-5 h-5 text-primary', iconAnimClass)} />
          </button>
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -8 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className={cn('absolute left-0 top-full mt-2 z-50 w-60 rounded-2xl shadow-2xl overflow-hidden', surfaceClass)}
              >
                <div className="p-2 space-y-0.5">
                  <button
                    onClick={() => { onCreateGroup(); setMenuOpen(false); }}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm hover:bg-muted/60 transition-all text-foreground group"
                  >
                    <GradientIcon gradient="from-blue-500 to-cyan-400 shadow-blue-500/25">
                      <Users className={cn('w-4 h-4 text-white', iconAnimClass)} />
                    </GradientIcon>
                    <span className="font-medium">Новая группа</span>
                  </button>
                  <button
                    onClick={() => { onCreateChannel(); setMenuOpen(false); }}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm hover:bg-muted/60 transition-all text-foreground group"
                  >
                    <GradientIcon gradient="from-violet-500 to-fuchsia-500 shadow-violet-500/25">
                      <Megaphone className={cn('w-4 h-4 text-white', iconAnimClass)} />
                    </GradientIcon>
                    <span className="font-medium">Новый канал</span>
                  </button>
                  <button
                    onClick={() => { onManageFolders(); setMenuOpen(false); }}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm hover:bg-muted/60 transition-all text-foreground group"
                  >
                    <GradientIcon gradient="from-amber-500 to-orange-400 shadow-amber-500/25">
                      <FolderOpen className={cn('w-4 h-4 text-white', iconAnimClass)} />
                    </GradientIcon>
                    <span className="font-medium">Папки чатов</span>
                  </button>
                  <div className="h-px bg-border/50 my-1" />
                  <button
                    onClick={() => { onOpenSettings(); setMenuOpen(false); }}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm hover:bg-muted/60 transition-all text-foreground group"
                  >
                    <GradientIcon gradient="from-emerald-500 to-teal-400 shadow-emerald-500/25">
                      <SlidersHorizontal className={cn('w-4 h-4 text-white', iconAnimClass)} />
                    </GradientIcon>
                    <span className="font-medium">Настройки</span>
                  </button>
                  <button
                    onClick={() => { onOpenAdmin(); setMenuOpen(false); }}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm hover:bg-muted/60 transition-all text-foreground group"
                  >
                    <GradientIcon gradient="from-rose-500 to-pink-500 shadow-rose-500/25">
                      <Shield className={cn('w-4 h-4 text-white', iconAnimClass)} />
                    </GradientIcon>
                    <span className="font-medium">Админ-панель</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex-1 relative">
          <Search className={cn('absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60', iconAnimClass)} />
          <input
            type="text"
            placeholder="Поиск..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-muted/50 rounded-xl pl-9 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 border border-border/30 focus:border-primary/40 transition-all"
          />
        </div>
      </div>

      {/* Stories bar */}
      {storiesSlot}

      {/* Folder tabs (horizontal scroll) */}
      {folders.length > 0 && (
        <div className="flex items-center gap-1.5 px-2 py-2 border-b border-border overflow-x-auto scrollbar-none">
          <button
            onClick={() => { setActiveFolderId(null); setTab('chats'); }}
            className={cn(
              'flex-shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all',
              !activeFolderId
                ? 'bg-gradient-to-r from-primary to-accent text-white shadow-md shadow-primary/20'
                : 'text-muted-foreground hover:bg-muted/60 border border-border/30',
            )}
          >
            Все
          </button>
          {folders.map(folder => (
            <button
              key={folder.id}
              onClick={() => { setActiveFolderId(folder.id); setTab('chats'); }}
              className={cn(
                'flex-shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all',
                activeFolderId === folder.id
                  ? 'bg-gradient-to-r from-primary to-accent text-white shadow-md shadow-primary/20'
                  : 'text-muted-foreground hover:bg-muted/60 border border-border/30',
              )}
            >
              <span className="text-sm">{folder.icon}</span>
              {folder.name}
            </button>
          ))}
        </div>
      )}

      {/* Type tabs — with icons */}
      <div className="flex border-b border-border px-1 gap-0.5">
        {visibleTabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              'flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold transition-all relative rounded-t-lg',
              effectiveTab === t.key
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/30',
            )}
          >
            <span className={cn(effectiveTab === t.key && iconAnimClass)}>{t.icon}</span>
            {t.label}
            {effectiveTab === t.key && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 left-2 right-2 h-[2.5px] rounded-full bg-gradient-to-r from-primary to-accent"
              />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* ── Channels tab ── */}
        {effectiveTab === 'channels' && (
          <>
            <button
              onClick={onCreateChannel}
              className="w-full flex items-center gap-3 px-3 py-3 hover:bg-muted/30 transition-all text-left border-b border-border/30"
            >
              <GradientIcon gradient="from-violet-500 to-fuchsia-500 shadow-violet-500/20">
                <Plus className={cn('w-5 h-5 text-white', iconAnimClass)} />
              </GradientIcon>
              <div>
                <p className="text-sm font-semibold text-primary">Создать канал</p>
                <p className="text-[11px] text-muted-foreground">Публикуйте контент</p>
              </div>
            </button>

            {visibleChannels.map(ch => {
              const isActive = ch.id === activeChannelId;
              return (
                <button
                  key={ch.id}
                  onClick={() => onSelectChannel(ch.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-3 transition-all text-left',
                    isActive ? 'bg-chat-active' : 'hover:bg-muted/30',
                  )}
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center border border-violet-500/10">
                      <Megaphone className={cn('w-6 h-6 text-violet-400', iconAnimClass)} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={cn('font-semibold text-sm truncate', isActive ? 'text-chat-active-foreground' : 'text-foreground')}>
                        {ch.name}
                      </span>
                      {ch.isOwner && (
                        <span className="text-[9px] bg-gradient-to-r from-primary/20 to-accent/20 text-primary px-2 py-0.5 rounded-full font-bold flex-shrink-0 ml-1">
                          мой
                        </span>
                      )}
                    </div>
                    <p className={cn('text-[11px] truncate mt-0.5', isActive ? 'text-chat-active-foreground/70' : 'text-muted-foreground')}>
                      {ch.subscriberCount.toLocaleString('ru-RU')} подписчик(ов)
                    </p>
                  </div>
                </button>
              );
            })}

            {visibleChannels.length === 0 && (
              <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                <Megaphone className={cn('w-8 h-8 mb-2 opacity-40', iconAnimClass)} />
                <p className="text-sm">Каналов пока нет</p>
              </div>
            )}
          </>
        )}

        {/* ── Groups tab ── */}
        {effectiveTab === 'groups' && (
          <button
            onClick={onCreateGroup}
            className="w-full flex items-center gap-3 px-3 py-3 hover:bg-muted/30 transition-all text-left border-b border-border/30"
          >
            <GradientIcon gradient="from-blue-500 to-cyan-400 shadow-blue-500/20">
              <Plus className={cn('w-5 h-5 text-white', iconAnimClass)} />
            </GradientIcon>
            <div>
              <p className="text-sm font-semibold text-primary">Создать группу</p>
              <p className="text-[11px] text-muted-foreground">Добавьте участников</p>
            </div>
          </button>
        )}

        {/* ── Chats / Groups list ── */}
        {effectiveTab !== 'channels' && (
          <>
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
                    'w-full flex items-center gap-3 px-3 py-3 transition-all text-left',
                    isActive ? 'bg-chat-active' : 'hover:bg-muted/30',
                  )}
                >
                  {isGroup ? (
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-400/20 flex items-center justify-center border border-blue-500/10">
                        <UsersRound className={cn('w-6 h-6 text-blue-400', iconAnimClass)} />
                      </div>
                    </div>
                  ) : (
                    <Avatar name={name} size="lg" online={user?.online} />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={cn('font-semibold text-sm truncate', isActive ? 'text-chat-active-foreground' : 'text-foreground')}>
                        {name}
                      </span>
                      <span className={cn('text-[11px] flex-shrink-0 ml-2', isActive ? 'text-chat-active-foreground/70' : 'text-muted-foreground')}>
                        {lastMsg?.timestamp}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <p className={cn('text-[11px] truncate', isActive ? 'text-chat-active-foreground/70' : 'text-muted-foreground')}>
                        {isGroup && lastMsg?.senderId && (
                          <span className="text-primary font-medium">
                            {lastMsg.senderId === 'me'
                              ? 'Вы: '
                              : `${users.find(u => u.id === lastMsg.senderId)?.name?.split(' ')[0] || ''}: `}
                          </span>
                        )}
                        {!isGroup && lastMsg?.senderId === 'me' && (
                          <span className="text-primary font-medium">Вы: </span>
                        )}
                        {lastMsg?.text}
                      </p>
                      {chat.unreadCount > 0 && (
                        <span className="ml-2 flex-shrink-0 bg-gradient-to-r from-primary to-accent text-white text-[10px] font-bold rounded-full min-w-[20px] h-[20px] flex items-center justify-center px-1.5 shadow-md shadow-primary/25">
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
                {effectiveTab === 'groups' ? (
                  <>
                    <UsersRound className={cn('w-8 h-8 mb-2 opacity-40', iconAnimClass)} />
                    <p className="text-sm">Групп пока нет</p>
                  </>
                ) : (
                  <>
                    <Sparkles className={cn('w-8 h-8 mb-2 opacity-40', iconAnimClass)} />
                    <p className="text-sm">Чаты не найдены</p>
                  </>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

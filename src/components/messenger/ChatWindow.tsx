import { useState, useRef, useEffect, useMemo } from 'react';
import { SendHorizontal, Paperclip, Smile, PhoneCall, Ellipsis, ArrowLeft, Users, Hash, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar } from './Avatar';
import { EmojiPicker } from './EmojiPicker';
import { messages, users, chats as defaultChats, type Message, type Chat } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { getFontSizeClass, getBubbleClasses, getBackgroundClass } from '@/components/settings/AppearanceSettings';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatWindowProps {
  chatId: string;
  onBack?: () => void;
  onOpenGroupInfo?: () => void;
  extraChats?: Chat[];
  /** When set, the window shows a topic thread instead of the main chat. */
  topicId?: string;
  topicName?: string;
  topicIcon?: string;
  /** External messages for topics (managed by parent). */
  topicMessages?: Message[];
  onTopicMessageSent?: (msg: Message) => void;
}

export function ChatWindow({
  chatId,
  onBack,
  onOpenGroupInfo,
  extraChats = [],
  topicId,
  topicName,
  topicIcon,
  topicMessages,
  onTopicMessageSent,
}: ChatWindowProps) {
  const allChats = [...defaultChats, ...extraChats];
  const chat = allChats.find(c => c.id === chatId);
  const { appearance } = useAuth();
  const { headerClass, iconAnimClass, surfaceClass } = useTheme();
  const bubbleCls = getBubbleClasses(appearance.bubbleStyle);
  const fontCls = getFontSizeClass(appearance.fontSize);
  const bgCls = getBackgroundClass(appearance.chatBackground);

  // For regular chats, use local state from mock data.
  // For topics, use the externally-provided topicMessages.
  const [localMessages, setLocalMessages] = useState<Message[]>(messages[chatId] || []);
  const [input, setInput] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isTopic = !!topicId;
  const displayMessages = useMemo(
    () => (isTopic ? (topicMessages || []) : localMessages),
    [isTopic, topicMessages, localMessages],
  );

  useEffect(() => {
    if (!isTopic) setLocalMessages(messages[chatId] || []);
  }, [chatId, isTopic]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [displayMessages]);

  if (!chat) return null;

  const otherUser = users.find(u => chat.participants.includes(u.id) && u.id !== 'me');
  const chatName = chat.name || otherUser?.name || 'Unknown';
  const isOnline = otherUser?.online;
  const isGroup = chat.type === 'group';

  // Header text depends on whether we're in a topic or the main chat.
  const headerTitle = isTopic ? topicName || 'Тема' : chatName;
  const headerSubtitle = isTopic
    ? chatName
    : isGroup
      ? `${chat.participants.length} участник(ов)`
      : isOnline ? 'в сети' : `был(а) ${otherUser?.lastSeen || 'давно'}`;

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg: Message = {
      id: `new-${Date.now()}`,
      chatId: topicId || chatId,
      senderId: 'me',
      text: input.trim(),
      timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      read: false,
    };

    if (isTopic && onTopicMessageSent) {
      onTopicMessageSent(newMsg);
    } else {
      setLocalMessages(prev => [...prev, newMsg]);
    }
    setInput('');
    setShowEmoji(false);
  };

  const handleEmojiSelect = (emoji: string) => {
    setInput(prev => prev + emoji);
  };

  const handleHeaderClick = () => {
    if (!isTopic && isGroup && onOpenGroupInfo) onOpenGroupInfo();
  };

  return (
    <div className={cn('flex flex-col h-full bg-chat-bg', bgCls)}>
      {/* Header — themed */}
      <div className={cn('flex items-center gap-3 px-4 py-3 border-b border-border', headerClass)}>
        {onBack && (
          <button onClick={onBack} className="p-1 hover:bg-muted rounded-lg transition-colors mr-1">
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </button>
        )}

        <div
          className={cn('flex items-center gap-3 flex-1 min-w-0', !isTopic && isGroup && 'cursor-pointer')}
          onClick={handleHeaderClick}
        >
          {isTopic ? (
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-400/20 flex items-center justify-center flex-shrink-0 border border-amber-500/10">
              {topicIcon ? <span className="text-lg">{topicIcon}</span> : <Hash className={cn('w-5 h-5 text-amber-400', iconAnimClass)} />}
            </div>
          ) : isGroup ? (
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-400/20 flex items-center justify-center border border-blue-500/10">
                <Users className={cn('w-5 h-5 text-blue-400', iconAnimClass)} />
              </div>
            </div>
          ) : (
            <Avatar name={chatName} size="md" online={isOnline} />
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm text-foreground truncate">{headerTitle}</h3>
            <p className={cn('text-xs', !isTopic && !isGroup && isOnline ? 'text-online' : 'text-muted-foreground')}>
              {headerSubtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {!isGroup && !isTopic && (
            <button className="p-2 rounded-xl hover:bg-primary/10 transition-all">
              <PhoneCall className={cn('w-4 h-4 text-primary/70', iconAnimClass)} />
            </button>
          )}
          <button className="p-2 rounded-xl hover:bg-primary/10 transition-all">
            <Ellipsis className={cn('w-4 h-4 text-primary/70', iconAnimClass)} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
        {displayMessages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            {isTopic ? (
              <>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-400/10 flex items-center justify-center mb-3 border border-amber-500/10">
                  <Hash className={cn('w-8 h-8 text-amber-400/50', iconAnimClass)} />
                </div>
                <p className="text-sm font-medium">Нет сообщений в теме</p>
              </>
            ) : (
              <>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-3 border border-primary/10">
                  <Sparkles className={cn('w-8 h-8 text-primary/50', iconAnimClass)} />
                </div>
                <p className="text-sm font-medium">Нет сообщений</p>
              </>
            )}
            <p className="text-xs mt-1 text-muted-foreground/70">Напишите первое сообщение!</p>
          </div>
        )}
        {displayMessages.map((msg, i) => {
          const isOwn = msg.senderId === 'me';
          const sender = users.find(u => u.id === msg.senderId);
          const showGroupAvatar = isGroup || isTopic;
          const showAvatar = !isOwn && showGroupAvatar && (i === 0 || displayMessages[i - 1].senderId !== msg.senderId);
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15 }}
              className={cn('flex', isOwn ? 'justify-end' : 'justify-start')}
            >
              {!isOwn && showGroupAvatar && (
                <div className="w-8 mr-2 flex-shrink-0">
                  {showAvatar && sender && <Avatar name={sender.name} size="sm" />}
                </div>
              )}
              <div className={cn('max-w-[75%] px-3.5 py-2', fontCls, isOwn ? cn('bg-primary text-primary-foreground', bubbleCls.own) : cn('bg-[hsl(var(--chat-bubble-other))] text-[hsl(var(--chat-bubble-other-foreground))]', bubbleCls.other))}>
                {!isOwn && showGroupAvatar && showAvatar && sender && (
                  <p className="text-xs font-medium text-primary mb-0.5">{sender.name}</p>
                )}
                <p className="leading-relaxed">{msg.text}</p>
                <p className={cn('text-[10px] mt-1 text-right', isOwn ? 'text-primary-foreground/60' : 'text-muted-foreground')}>
                  {msg.timestamp}{isOwn && ' ✓✓'}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Input — themed */}
      <div className={cn('px-4 py-3 border-t border-border', surfaceClass)}>
        <div className="flex items-center gap-2">
          <button className="p-2.5 rounded-xl hover:bg-primary/10 transition-all">
            <Paperclip className={cn('w-5 h-5 text-primary/60', iconAnimClass)} />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder={isTopic ? `Сообщение в "${topicName}"...` : 'Сообщение...'}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              className="w-full bg-muted/50 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 border border-border/30 focus:border-primary/40 transition-all"
            />
          </div>
          <div className="relative">
            <button
              onClick={() => setShowEmoji(!showEmoji)}
              className={cn('p-2.5 rounded-xl transition-all', showEmoji ? 'bg-primary/15 text-primary' : 'hover:bg-primary/10 text-primary/60')}
            >
              <Smile className={cn('w-5 h-5', iconAnimClass)} />
            </button>
            <AnimatePresence>
              {showEmoji && (
                <EmojiPicker
                  onSelect={handleEmojiSelect}
                  onClose={() => setShowEmoji(false)}
                />
              )}
            </AnimatePresence>
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className={cn(
              'p-2.5 rounded-xl transition-all',
              input.trim()
                ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30'
                : 'text-muted-foreground/40',
            )}
          >
            <SendHorizontal className={cn('w-5 h-5', iconAnimClass)} />
          </button>
        </div>
      </div>
    </div>
  );
}

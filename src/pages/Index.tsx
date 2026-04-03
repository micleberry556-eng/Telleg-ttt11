import { useState } from 'react';
import { ChatList } from '@/components/messenger/ChatList';
import { ChatWindow } from '@/components/messenger/ChatWindow';
import { EmptyChat } from '@/components/messenger/EmptyChat';
import { ProfileSettings } from '@/components/settings/ProfileSettings';
import { AdminPanel } from '@/components/admin/AdminPanel';
import { useIsMobile } from '@/hooks/use-mobile';
import { AnimatePresence } from 'framer-motion';

type View = 'chat' | 'settings' | 'admin';

const Index = () => {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [view, setView] = useState<View>('chat');
  const isMobile = useIsMobile();
  const showChatList = !isMobile || !activeChatId;
  const showChatWindow = !isMobile || !!activeChatId;

  return (
    <div className="h-screen flex overflow-hidden relative">
      {showChatList && (
        <div className={isMobile ? 'w-full' : 'w-80 xl:w-96 flex-shrink-0'}>
          <ChatList activeChatId={activeChatId} onSelectChat={setActiveChatId} onOpenSettings={() => setView('settings')} onOpenAdmin={() => setView('admin')} />
        </div>
      )}
      {showChatWindow && (
        <div className="flex-1 min-w-0">
          {activeChatId ? <ChatWindow chatId={activeChatId} onBack={isMobile ? () => setActiveChatId(null) : undefined} /> : <EmptyChat />}
        </div>
      )}
      <AnimatePresence>
        {view === 'settings' && <ProfileSettings onBack={() => setView('chat')} />}
        {view === 'admin' && <AdminPanel onBack={() => setView('chat')} />}
      </AnimatePresence>
    </div>
  );
};

export default Index;

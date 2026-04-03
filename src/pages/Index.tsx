import { useState } from 'react';
import { ChatList } from '@/components/messenger/ChatList';
import { ChatWindow } from '@/components/messenger/ChatWindow';
import { EmptyChat } from '@/components/messenger/EmptyChat';
import { ProfileSettings } from '@/components/settings/ProfileSettings';
import { AdminPanel } from '@/components/admin/AdminPanel';
import { CreateGroup } from '@/components/groups/CreateGroup';
import { GroupInfo } from '@/components/groups/GroupInfo';
import { useIsMobile } from '@/hooks/use-mobile';
import { chats as defaultChats, type Chat } from '@/data/mockData';
import { AnimatePresence } from 'framer-motion';

type View = 'chat' | 'settings' | 'admin' | 'create-group' | 'group-info';

const Index = () => {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [view, setView] = useState<View>('chat');
  const [createdGroups, setCreatedGroups] = useState<Chat[]>([]);
  const isMobile = useIsMobile();
  const showChatList = !isMobile || !activeChatId;
  const showChatWindow = !isMobile || !!activeChatId;

  const allChats = [...defaultChats, ...createdGroups];
  const activeChat = activeChatId ? allChats.find(c => c.id === activeChatId) : null;

  const handleGroupCreated = (newChat: Chat) => {
    setCreatedGroups(prev => [...prev, newChat]);
    setActiveChatId(newChat.id);
    setView('chat');
  };

  const handleLeaveGroup = (chatId: string) => {
    setCreatedGroups(prev => prev.filter(c => c.id !== chatId));
    if (activeChatId === chatId) setActiveChatId(null);
    setView('chat');
  };

  return (
    <div className="h-screen flex overflow-hidden relative">
      {showChatList && (
        <div className={isMobile ? 'w-full' : 'w-80 xl:w-96 flex-shrink-0'}>
          <ChatList
            activeChatId={activeChatId}
            onSelectChat={setActiveChatId}
            onOpenSettings={() => setView('settings')}
            onOpenAdmin={() => setView('admin')}
            onCreateGroup={() => setView('create-group')}
            extraChats={createdGroups}
          />
        </div>
      )}
      {showChatWindow && (
        <div className="flex-1 min-w-0">
          {activeChatId ? (
            <ChatWindow
              chatId={activeChatId}
              onBack={isMobile ? () => setActiveChatId(null) : undefined}
              onOpenGroupInfo={
                activeChat?.type === 'group' ? () => setView('group-info') : undefined
              }
              extraChats={createdGroups}
            />
          ) : (
            <EmptyChat />
          )}
        </div>
      )}
      <AnimatePresence>
        {view === 'settings' && <ProfileSettings onBack={() => setView('chat')} />}
        {view === 'admin' && <AdminPanel onBack={() => setView('chat')} />}
        {view === 'create-group' && (
          <CreateGroup
            onBack={() => setView('chat')}
            onCreated={handleGroupCreated}
          />
        )}
        {view === 'group-info' && activeChat?.type === 'group' && (
          <GroupInfo
            chat={activeChat}
            onBack={() => setView('chat')}
            onLeave={handleLeaveGroup}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;

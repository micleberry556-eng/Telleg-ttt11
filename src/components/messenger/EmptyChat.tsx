import { MessageCircle } from 'lucide-react';

export function EmptyChat() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-chat-bg text-muted-foreground">
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
        <MessageCircle className="w-10 h-10 opacity-50" />
      </div>
      <h3 className="text-lg font-medium text-foreground mb-1">Выберите чат</h3>
      <p className="text-sm">Выберите чат из списка слева для начала общения</p>
    </div>
  );
}

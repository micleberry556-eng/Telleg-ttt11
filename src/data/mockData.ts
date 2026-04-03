export interface User { id: string; name: string; online: boolean; lastSeen?: string; avatar?: string; }
export interface Message { id: string; chatId: string; senderId: string; text: string; timestamp: string; read: boolean; }
export interface Chat { id: string; type: 'private' | 'group'; name?: string; participants: string[]; lastMessage?: { text: string; timestamp: string; senderId: string; }; unreadCount: number; }

export const users: User[] = [
  { id: 'me', name: 'Я', online: true },
  { id: 'user1', name: 'Алексей Иванов', online: true, lastSeen: '12:30' },
  { id: 'user2', name: 'Мария Петрова', online: false, lastSeen: '11:45' },
  { id: 'user3', name: 'Дмитрий Сидоров', online: true, lastSeen: '13:00' },
  { id: 'user4', name: 'Елена Козлова', online: false, lastSeen: 'вчера' },
  { id: 'user5', name: 'Андрей Новиков', online: true, lastSeen: '14:20' },
  { id: 'user6', name: 'Ольга Морозова', online: false, lastSeen: '2 дня назад' },
];

export const chats: Chat[] = [
  { id: 'chat1', type: 'private', participants: ['me', 'user1'], lastMessage: { text: 'Привет! Как дела?', timestamp: '14:30', senderId: 'user1' }, unreadCount: 2 },
  { id: 'chat2', type: 'private', participants: ['me', 'user2'], lastMessage: { text: 'Увидимся завтра!', timestamp: '13:15', senderId: 'me' }, unreadCount: 0 },
  { id: 'chat3', type: 'group', name: 'Рабочий чат', participants: ['me', 'user1', 'user3', 'user5'], lastMessage: { text: 'Встреча в 15:00', timestamp: '12:00', senderId: 'user3' }, unreadCount: 5 },
  { id: 'chat4', type: 'private', participants: ['me', 'user4'], lastMessage: { text: 'Спасибо за помощь!', timestamp: '11:30', senderId: 'user4' }, unreadCount: 1 },
  { id: 'chat5', type: 'group', name: 'Друзья', participants: ['me', 'user2', 'user4', 'user6'], lastMessage: { text: 'Кто идёт на выходных?', timestamp: '10:45', senderId: 'user6' }, unreadCount: 3 },
  { id: 'chat6', type: 'private', participants: ['me', 'user5'], lastMessage: { text: 'Отправил документы', timestamp: '09:20', senderId: 'me' }, unreadCount: 0 },
];

export const messages: Record<string, Message[]> = {
  chat1: [
    { id: 'm1', chatId: 'chat1', senderId: 'user1', text: 'Привет!', timestamp: '14:25', read: true },
    { id: 'm2', chatId: 'chat1', senderId: 'me', text: 'Привет! Как дела?', timestamp: '14:26', read: true },
    { id: 'm3', chatId: 'chat1', senderId: 'user1', text: 'Отлично! Работаю над проектом.', timestamp: '14:28', read: true },
    { id: 'm4', chatId: 'chat1', senderId: 'user1', text: 'Привет! Как дела?', timestamp: '14:30', read: false },
  ],
  chat2: [
    { id: 'm5', chatId: 'chat2', senderId: 'user2', text: 'Привет, можешь помочь?', timestamp: '13:00', read: true },
    { id: 'm6', chatId: 'chat2', senderId: 'me', text: 'Конечно, что нужно?', timestamp: '13:05', read: true },
    { id: 'm7', chatId: 'chat2', senderId: 'user2', text: 'Нужно обсудить проект', timestamp: '13:10', read: true },
    { id: 'm8', chatId: 'chat2', senderId: 'me', text: 'Увидимся завтра!', timestamp: '13:15', read: true },
  ],
  chat3: [
    { id: 'm9', chatId: 'chat3', senderId: 'user1', text: 'Всем привет!', timestamp: '11:30', read: true },
    { id: 'm10', chatId: 'chat3', senderId: 'user5', text: 'Привет!', timestamp: '11:35', read: true },
    { id: 'm11', chatId: 'chat3', senderId: 'me', text: 'Здравствуйте!', timestamp: '11:40', read: true },
    { id: 'm12', chatId: 'chat3', senderId: 'user3', text: 'Встреча в 15:00', timestamp: '12:00', read: false },
  ],
  chat4: [
    { id: 'm13', chatId: 'chat4', senderId: 'me', text: 'Вот файлы, которые ты просила', timestamp: '11:00', read: true },
    { id: 'm14', chatId: 'chat4', senderId: 'user4', text: 'Спасибо за помощь!', timestamp: '11:30', read: false },
  ],
  chat5: [
    { id: 'm15', chatId: 'chat5', senderId: 'user2', text: 'Планы на выходные?', timestamp: '10:00', read: true },
    { id: 'm16', chatId: 'chat5', senderId: 'user4', text: 'Можно в парк сходить', timestamp: '10:20', read: true },
    { id: 'm17', chatId: 'chat5', senderId: 'me', text: 'Я за!', timestamp: '10:30', read: true },
    { id: 'm18', chatId: 'chat5', senderId: 'user6', text: 'Кто идёт на выходных?', timestamp: '10:45', read: false },
  ],
  chat6: [
    { id: 'm19', chatId: 'chat6', senderId: 'user5', text: 'Можешь отправить документы?', timestamp: '09:00', read: true },
    { id: 'm20', chatId: 'chat6', senderId: 'me', text: 'Отправил документы', timestamp: '09:20', read: true },
  ],
};

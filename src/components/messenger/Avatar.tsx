import { cn } from '@/lib/utils';

interface AvatarProps { name: string; size?: 'sm' | 'md' | 'lg'; online?: boolean; }

const sizeClasses = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-12 h-12 text-base' };

function getInitials(name: string) { return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2); }

function getColor(name: string) {
  const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-yellow-500', 'bg-red-500', 'bg-indigo-500', 'bg-teal-500'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) { hash = name.charCodeAt(i) + ((hash << 5) - hash); }
  return colors[Math.abs(hash) % colors.length];
}

export function Avatar({ name, size = 'md', online }: AvatarProps) {
  return (
    <div className="relative flex-shrink-0">
      <div className={cn('rounded-full flex items-center justify-center text-white font-medium', sizeClasses[size], getColor(name))}>{getInitials(name)}</div>
      {online !== undefined && (
        <span className={cn('absolute bottom-0 right-0 block rounded-full border-2 border-card', online ? 'bg-green-500' : 'bg-gray-400', size === 'sm' ? 'w-2.5 h-2.5' : 'w-3 h-3')} />
      )}
    </div>
  );
}

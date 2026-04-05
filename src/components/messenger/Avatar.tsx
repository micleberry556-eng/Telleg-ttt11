import { cn } from '@/lib/utils';

interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  online?: boolean;
}

const sizeClasses = {
  sm: 'w-8 h-8 text-[10px]',
  md: 'w-10 h-10 text-xs',
  lg: 'w-12 h-12 text-sm',
};

const ringPadding = {
  sm: 'p-[1.5px]',
  md: 'p-[2px]',
  lg: 'p-[2px]',
};

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
}

/** Deterministic gradient based on name hash. */
function getGradient(name: string) {
  const gradients = [
    'from-violet-500 to-fuchsia-500',
    'from-blue-500 to-cyan-400',
    'from-emerald-500 to-teal-400',
    'from-rose-500 to-pink-400',
    'from-amber-500 to-orange-400',
    'from-indigo-500 to-violet-400',
    'from-sky-500 to-blue-400',
    'from-fuchsia-500 to-pink-400',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return gradients[Math.abs(hash) % gradients.length];
}

export function Avatar({ name, size = 'md', online }: AvatarProps) {
  return (
    <div className="relative flex-shrink-0">
      {/* Gradient ring wrapper */}
      <div className={cn(
        'rounded-full bg-gradient-to-br',
        getGradient(name),
        ringPadding[size],
      )}>
        <div
          className={cn(
            'rounded-full flex items-center justify-center font-semibold text-white bg-gradient-to-br',
            getGradient(name),
            'ring-2 ring-card',
            sizeClasses[size],
          )}
        >
          {getInitials(name)}
        </div>
      </div>
      {/* Online indicator */}
      {online !== undefined && (
        <span
          className={cn(
            'absolute bottom-0 right-0 block rounded-full border-2 border-card',
            online ? 'bg-emerald-400 pulse-online' : 'bg-gray-500',
            size === 'sm' ? 'w-2.5 h-2.5' : 'w-3 h-3',
          )}
        />
      )}
    </div>
  );
}

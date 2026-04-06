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

const outerSize = {
  sm: 'w-9 h-9',
  md: 'w-11 h-11',
  lg: 'w-[52px] h-[52px]',
};

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
}

/** 12 vibrant modern gradients — more variety than before. */
const GRADIENTS = [
  'from-violet-500 to-fuchsia-500',
  'from-blue-500 to-cyan-400',
  'from-emerald-500 to-teal-400',
  'from-rose-500 to-pink-400',
  'from-amber-500 to-orange-400',
  'from-indigo-500 to-violet-400',
  'from-sky-400 to-blue-500',
  'from-fuchsia-500 to-pink-400',
  'from-teal-400 to-emerald-500',
  'from-orange-400 to-red-500',
  'from-cyan-400 to-indigo-500',
  'from-pink-500 to-rose-400',
];

/** Shadow colors matching each gradient for the glow effect. */
const GLOW_SHADOWS = [
  'shadow-violet-500/30',
  'shadow-blue-500/30',
  'shadow-emerald-500/30',
  'shadow-rose-500/30',
  'shadow-amber-500/30',
  'shadow-indigo-500/30',
  'shadow-sky-500/30',
  'shadow-fuchsia-500/30',
  'shadow-teal-500/30',
  'shadow-orange-500/30',
  'shadow-cyan-500/30',
  'shadow-pink-500/30',
];

function hashName(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

function getGradient(name: string) {
  return GRADIENTS[hashName(name) % GRADIENTS.length];
}

function getGlow(name: string) {
  return GLOW_SHADOWS[hashName(name) % GLOW_SHADOWS.length];
}

export function Avatar({ name, size = 'md', online }: AvatarProps) {
  return (
    <div className="relative flex-shrink-0">
      {/* Outer glow ring */}
      <div className={cn(
        'rounded-2xl bg-gradient-to-br p-[2px] shadow-lg',
        getGradient(name),
        getGlow(name),
        outerSize[size],
      )}>
        {/* Inner avatar */}
        <div
          className={cn(
            'rounded-[14px] flex items-center justify-center font-bold text-white bg-gradient-to-br ring-2 ring-card',
            getGradient(name),
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
            online ? 'bg-emerald-400 pulse-online shadow-md shadow-emerald-400/40' : 'bg-gray-500',
            size === 'sm' ? 'w-2.5 h-2.5' : 'w-3.5 h-3.5',
          )}
        />
      )}
    </div>
  );
}

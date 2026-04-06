import { MessageCircle, Sparkles, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';

export function EmptyChat() {
  const { surfaceClass, iconAnimClass } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center h-full text-muted-foreground relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-56 h-56 bg-accent/5 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Main icon — layered gradient card */}
        <div className="relative mb-6">
          <div className={cn(
            'w-24 h-24 rounded-3xl flex items-center justify-center',
            surfaceClass,
          )}>
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/15 flex items-center justify-center border border-primary/10">
              <MessageCircle className={cn('w-10 h-10 text-primary/60', iconAnimClass)} />
            </div>
          </div>
          {/* Floating sparkle accents */}
          <Sparkles className={cn(
            'absolute -top-2 -right-2 w-5 h-5 text-amber-400/60',
            iconAnimClass,
          )} />
          <Zap className={cn(
            'absolute -bottom-1 -left-2 w-4 h-4 text-violet-400/50',
            iconAnimClass,
          )} />
        </div>

        <h3 className="text-lg font-bold text-foreground/85 mb-1.5">Выберите чат</h3>
        <p className="text-sm text-muted-foreground/70 text-center max-w-[220px]">
          Выберите чат из списка слева для начала общения
        </p>
      </motion.div>
    </div>
  );
}

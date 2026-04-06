import { useState } from 'react';
import { ArrowLeft, Check, Sparkles, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { THEMES, type FullTheme } from '@/data/themePresets';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';

interface ThemeGalleryProps {
  onBack: () => void;
}

function PreviewCard({ theme, isActive, onApply }: {
  theme: FullTheme;
  isActive: boolean;
  onApply: () => void;
}) {
  const hue = theme.vars['--primary']?.split(' ')[0] || '262';
  const primaryColor = `hsl(${theme.vars['--primary'] || '262 80% 55%'})`;
  const bgColor = `hsl(${theme.vars['--background'] || '0 0% 6%'})`;
  const cardColor = `hsl(${theme.vars['--card'] || '0 0% 9%'})`;
  const bubbleOtherColor = `hsl(${theme.vars['--chat-bubble-other'] || '0 0% 14%'})`;

  return (
    <div
      className={cn(
        'rounded-2xl overflow-hidden transition-all border',
        isActive ? 'ring-2 ring-primary border-primary/50' : 'border-border/50 hover:border-muted-foreground/30',
      )}
      style={{ background: cardColor }}
    >
      {/* Mini chat preview */}
      <div className="p-3 space-y-1.5 h-[110px] relative" style={{ background: bgColor }}>
        {/* Mini header */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-5 h-5 rounded-full" style={{ background: primaryColor, opacity: 0.3 }} />
          <div className="h-2 w-16 rounded-full" style={{ background: cardColor }} />
        </div>
        {/* Bubbles */}
        <div className="flex justify-start">
          <div
            className="px-2.5 py-1 text-[8px] text-white/80 max-w-[65%]"
            style={{ background: bubbleOtherColor, borderRadius: theme.bubbleOther, fontSize: '8px' }}
          >
            Привет!
          </div>
        </div>
        <div className="flex justify-end">
          <div
            className="px-2.5 py-1 text-[8px] text-white max-w-[65%]"
            style={{ background: primaryColor, borderRadius: theme.bubbleOwn, fontSize: '8px' }}
          >
            Как дела?
          </div>
        </div>
        <div className="flex justify-start">
          <div
            className="px-2.5 py-1 text-[8px] text-white/80 max-w-[65%]"
            style={{ background: bubbleOtherColor, borderRadius: theme.bubbleOther, fontSize: '8px' }}
          >
            Отлично!
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-3" style={{ background: cardColor }}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-base">{theme.emoji}</span>
          <h3 className="text-sm font-semibold text-foreground truncate flex-1">{theme.name}</h3>
          {isActive && <Check className="w-4 h-4 text-primary flex-shrink-0" />}
        </div>
        <p className="text-[10px] text-muted-foreground mb-3 line-clamp-1">{theme.description}</p>

        {/* Color dots */}
        <div className="flex gap-1 mb-3">
          <div className="w-4 h-4 rounded-full shadow-sm" style={{ background: primaryColor }} />
          <div className="w-4 h-4 rounded-full shadow-sm" style={{ background: `hsl(${theme.vars['--accent'] || theme.vars['--primary']})` }} />
          <div className="w-4 h-4 rounded-full shadow-sm" style={{ background: bgColor, border: '1px solid rgba(255,255,255,0.1)' }} />
          <div className="w-4 h-4 rounded-full shadow-sm" style={{ background: cardColor, border: '1px solid rgba(255,255,255,0.1)' }} />
        </div>

        <button
          onClick={onApply}
          className={cn(
            'w-full py-2 rounded-lg text-[11px] font-semibold transition-all',
            isActive
              ? 'bg-primary/15 text-primary'
              : 'text-white hover:opacity-90',
          )}
          style={!isActive ? { background: primaryColor } : undefined}
        >
          {isActive ? 'Активна' : 'Применить'}
        </button>
      </div>
    </div>
  );
}

export function ThemeGallery({ onBack }: ThemeGalleryProps) {
  const { themeId, setThemeId } = useTheme();
  const [search, setSearch] = useState('');

  const filtered = THEMES.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.description.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'tween', duration: 0.25 }}
      className="absolute inset-0 z-50 bg-background/90 backdrop-blur-md flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border glass">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-bold text-gradient">Темы оформления</h2>
          <p className="text-[11px] text-muted-foreground">{THEMES.length} уникальных тем</p>
        </div>
        <Sparkles className="w-5 h-5 text-primary" />
      </div>

      {/* Search */}
      <div className="px-4 py-2 border-b border-border">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Поиск тем..."
          className="w-full bg-muted/50 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 border border-border/50"
        />
      </div>

      {/* Reset to default */}
      {themeId && (
        <div className="px-4 pt-3">
          <button
            onClick={() => setThemeId(null)}
            className="w-full text-center text-xs text-muted-foreground hover:text-foreground py-2 border border-border/50 rounded-lg transition-colors"
          >
            Сбросить на стандартную тему
          </button>
        </div>
      )}

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-3">
          {filtered.map(theme => (
            <PreviewCard
              key={theme.id}
              theme={theme}
              isActive={themeId === theme.id}
              onApply={() => setThemeId(theme.id)}
            />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
            <Shield className="w-8 h-8 mb-2 opacity-50" />
            <p className="text-sm">Темы не найдены</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

import { ArrowLeft, Palette, Type, MessageSquare, Wallpaper, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

/* ── Types ── */

export type ColorTheme = 'blue' | 'green' | 'purple' | 'pink' | 'orange' | 'teal';
export type FontSize = 'small' | 'medium' | 'large';
export type BubbleStyle = 'rounded' | 'rect' | 'classic';
export type ChatBackground = 'default' | 'dots' | 'gradient' | 'mesh';

export interface AppearanceConfig {
  colorTheme: ColorTheme;
  fontSize: FontSize;
  bubbleStyle: BubbleStyle;
  chatBackground: ChatBackground;
}

export const DEFAULT_APPEARANCE: AppearanceConfig = {
  colorTheme: 'blue',
  fontSize: 'medium',
  bubbleStyle: 'rounded',
  chatBackground: 'default',
};

/* ── Theme definitions ── */

const COLOR_THEMES: Record<ColorTheme, { label: string; hue: string; color: string }> = {
  blue:   { label: 'Синяя',      hue: '210', color: 'bg-blue-500' },
  green:  { label: 'Зелёная',    hue: '152', color: 'bg-emerald-500' },
  purple: { label: 'Фиолетовая', hue: '262', color: 'bg-purple-500' },
  pink:   { label: 'Розовая',    hue: '330', color: 'bg-pink-500' },
  orange: { label: 'Оранжевая',  hue: '25',  color: 'bg-orange-500' },
  teal:   { label: 'Бирюзовая',  hue: '180', color: 'bg-teal-500' },
};

const FONT_SIZES: Record<FontSize, { label: string; desc: string; cls: string }> = {
  small:  { label: 'Маленький', desc: '13px', cls: 'text-xs' },
  medium: { label: 'Средний',   desc: '14px', cls: 'text-sm' },
  large:  { label: 'Большой',   desc: '16px', cls: 'text-base' },
};

const BUBBLE_STYLES: Record<BubbleStyle, { label: string; own: string; other: string }> = {
  rounded: { label: 'Скруглённые', own: 'rounded-[18px] rounded-br-[4px]', other: 'rounded-[18px] rounded-bl-[4px]' },
  rect:    { label: 'Прямоугольные', own: 'rounded-lg', other: 'rounded-lg' },
  classic: { label: 'Классические', own: 'rounded-2xl rounded-br-sm', other: 'rounded-2xl rounded-bl-sm' },
};

const BACKGROUNDS: Record<ChatBackground, { label: string; style: string }> = {
  default:  { label: 'Стандартный', style: '' },
  dots:     { label: 'Точки',      style: 'bg-[radial-gradient(circle,hsl(var(--muted))_1px,transparent_1px)] bg-[length:20px_20px]' },
  gradient: { label: 'Градиент',   style: 'bg-gradient-to-b from-background to-muted/30' },
  mesh:     { label: 'Сетка',      style: 'bg-[linear-gradient(hsl(var(--border))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border))_1px,transparent_1px)] bg-[length:40px_40px]' },
};

/* ── CSS variable generator ── */

export function getThemeCSSVars(config: AppearanceConfig): Record<string, string> {
  const h = COLOR_THEMES[config.colorTheme].hue;
  return {
    '--primary': `${h} 100% 52%`,
    '--primary-foreground': '0 0% 100%',
    '--accent': `${h} 100% 52%`,
    '--accent-foreground': '0 0% 100%',
    '--ring': `${h} 100% 52%`,
    '--chat-active': `${h} 100% 52%`,
    '--chat-active-foreground': '0 0% 100%',
    '--chat-bubble-own': `${h} 100% 52%`,
    '--chat-bubble-own-foreground': '0 0% 100%',
    '--sidebar-primary': `${h} 100% 52%`,
    '--sidebar-primary-foreground': '0 0% 100%',
    '--sidebar-ring': `${h} 100% 52%`,
    '--admin-accent': `${h} 83% 58%`,
  };
}

export function getFontSizeClass(size: FontSize): string {
  return FONT_SIZES[size].cls;
}

export function getBubbleClasses(style: BubbleStyle): { own: string; other: string } {
  return BUBBLE_STYLES[style];
}

export function getBackgroundClass(bg: ChatBackground): string {
  return BACKGROUNDS[bg].style;
}

/* ── Component ── */

interface AppearanceSettingsProps {
  config: AppearanceConfig;
  onBack: () => void;
  onChange: (config: AppearanceConfig) => void;
}

export function AppearanceSettings({ config, onBack, onChange }: AppearanceSettingsProps) {
  const update = (partial: Partial<AppearanceConfig>) => {
    onChange({ ...config, ...partial });
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'tween', duration: 0.25 }}
      className="absolute inset-0 z-50 bg-card flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-foreground">Оформление</h2>
        </div>
        <Palette className="w-5 h-5 text-primary" />
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* ── Preview ── */}
        <div className="px-4 pt-4 pb-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Предпросмотр</p>
          <div className={cn('rounded-xl border border-border p-4 space-y-2', getBackgroundClass(config.chatBackground))}>
            {/* Other's message */}
            <div className="flex justify-start">
              <div className={cn(
                'px-3.5 py-2 bg-[hsl(var(--chat-bubble-other))] text-[hsl(var(--chat-bubble-other-foreground))]',
                getBubbleClasses(config.bubbleStyle).other,
                getFontSizeClass(config.fontSize),
              )}>
                Привет! Как дела?
                <p className="text-[10px] mt-1 opacity-60">14:30</p>
              </div>
            </div>
            {/* Own message */}
            <div className="flex justify-end">
              <div className={cn(
                'px-3.5 py-2 bg-primary text-primary-foreground',
                getBubbleClasses(config.bubbleStyle).own,
                getFontSizeClass(config.fontSize),
              )}>
                Отлично! Работаю над проектом
                <p className="text-[10px] mt-1 opacity-60 text-right">14:31 ✓✓</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Color theme ── */}
        <div className="py-3">
          <div className="flex items-center gap-2 px-4 mb-3">
            <Palette className="w-4 h-4 text-muted-foreground" />
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Цветовая тема</p>
          </div>
          <div className="px-4 grid grid-cols-3 gap-2">
            {(Object.entries(COLOR_THEMES) as [ColorTheme, typeof COLOR_THEMES[ColorTheme]][]).map(([key, theme]) => {
              const isSelected = config.colorTheme === key;
              return (
                <button
                  key={key}
                  onClick={() => update({ colorTheme: key })}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2.5 rounded-xl border transition-all',
                    isSelected ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/50',
                  )}
                >
                  <div className={cn('w-5 h-5 rounded-full flex-shrink-0', theme.color)}>
                    {isSelected && (
                      <div className="w-full h-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <span className={cn('text-xs', isSelected ? 'text-primary font-medium' : 'text-foreground')}>
                    {theme.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Font size ── */}
        <div className="py-3">
          <div className="flex items-center gap-2 px-4 mb-3">
            <Type className="w-4 h-4 text-muted-foreground" />
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Размер шрифта</p>
          </div>
          <div className="px-4 flex gap-2">
            {(Object.entries(FONT_SIZES) as [FontSize, typeof FONT_SIZES[FontSize]][]).map(([key, fs]) => {
              const isSelected = config.fontSize === key;
              return (
                <button
                  key={key}
                  onClick={() => update({ fontSize: key })}
                  className={cn(
                    'flex-1 py-3 rounded-xl border text-center transition-all',
                    isSelected ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/50',
                  )}
                >
                  <p className={cn('font-medium', isSelected ? 'text-primary' : 'text-foreground', fs.cls)}>Аа</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{fs.label}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Bubble style ── */}
        <div className="py-3">
          <div className="flex items-center gap-2 px-4 mb-3">
            <MessageSquare className="w-4 h-4 text-muted-foreground" />
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Форма пузырей</p>
          </div>
          <div className="px-4 flex gap-2">
            {(Object.entries(BUBBLE_STYLES) as [BubbleStyle, typeof BUBBLE_STYLES[BubbleStyle]][]).map(([key, bs]) => {
              const isSelected = config.bubbleStyle === key;
              return (
                <button
                  key={key}
                  onClick={() => update({ bubbleStyle: key })}
                  className={cn(
                    'flex-1 py-3 rounded-xl border text-center transition-all',
                    isSelected ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/50',
                  )}
                >
                  <div className="flex justify-center mb-1.5">
                    <div className={cn('w-12 h-4 bg-primary', bs.own)} />
                  </div>
                  <p className={cn('text-[10px]', isSelected ? 'text-primary font-medium' : 'text-muted-foreground')}>
                    {bs.label}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Chat background ── */}
        <div className="py-3">
          <div className="flex items-center gap-2 px-4 mb-3">
            <Wallpaper className="w-4 h-4 text-muted-foreground" />
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Фон чата</p>
          </div>
          <div className="px-4 grid grid-cols-2 gap-2">
            {(Object.entries(BACKGROUNDS) as [ChatBackground, typeof BACKGROUNDS[ChatBackground]][]).map(([key, bg]) => {
              const isSelected = config.chatBackground === key;
              return (
                <button
                  key={key}
                  onClick={() => update({ chatBackground: key })}
                  className={cn(
                    'rounded-xl border overflow-hidden transition-all',
                    isSelected ? 'border-primary ring-1 ring-primary' : 'border-border hover:border-muted-foreground/30',
                  )}
                >
                  <div className={cn('h-16 bg-chat-bg', bg.style)} />
                  <div className="px-3 py-2">
                    <p className={cn('text-xs', isSelected ? 'text-primary font-medium' : 'text-foreground')}>
                      {bg.label}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Info */}
        <div className="px-4 py-4">
          <div className="bg-muted/30 rounded-xl p-4">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Настройки оформления применяются мгновенно ко всем чатам и сохраняются на вашем устройстве.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

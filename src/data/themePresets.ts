/**
 * 30 complete visual themes. Each theme overrides ALL CSS variables
 * so the entire app changes appearance when applied.
 *
 * Color palettes are designed for comfortable viewing — balanced contrast,
 * harmonious hues, modern 2026 aesthetics.
 */

export interface FullTheme {
  id: string;
  name: string;
  description: string;
  emoji: string;
  /** CSS custom properties applied to :root. */
  vars: Record<string, string>;
  /** Font family CSS value. */
  font: string;
  /** Border radius token (rem). */
  radius: string;
  /** Bubble style: own / other border-radius. */
  bubbleOwn: string;
  bubbleOther: string;
  /** Extra body background (gradient, pattern, etc.). */
  bodyBg: string;
  /** Background-size for repeating patterns. */
  bgSize?: string;
}

/** Helper to build a theme with sensible defaults. */
function t(
  id: string, name: string, desc: string, emoji: string,
  hue: number, vars: Record<string, string>,
  opts?: Partial<Pick<FullTheme, 'font' | 'radius' | 'bubbleOwn' | 'bubbleOther' | 'bodyBg' | 'bgSize'>>,
): FullTheme {
  const h = String(hue);
  const base: Record<string, string> = {
    '--background': `${h} 20% 6%`,
    '--foreground': '0 0% 93%',
    '--card': `${h} 15% 9%`,
    '--card-foreground': '0 0% 93%',
    '--popover': `${h} 18% 10%`,
    '--popover-foreground': '0 0% 93%',
    '--primary': `${h} 80% 55%`,
    '--primary-foreground': '0 0% 100%',
    '--secondary': `${h} 15% 13%`,
    '--secondary-foreground': '0 0% 80%',
    '--muted': `${h} 12% 14%`,
    '--muted-foreground': `${h} 8% 50%`,
    '--accent': `${h} 80% 55%`,
    '--accent-foreground': '0 0% 100%',
    '--destructive': '0 72% 51%',
    '--destructive-foreground': '0 0% 100%',
    '--border': `${h} 12% 16%`,
    '--input': `${h} 12% 16%`,
    '--ring': `${h} 80% 55%`,
    '--radius': opts?.radius || '1rem',
    '--sidebar-background': `${h} 20% 7%`,
    '--sidebar-foreground': '0 0% 85%',
    '--sidebar-primary': `${h} 80% 55%`,
    '--sidebar-primary-foreground': '0 0% 100%',
    '--sidebar-accent': `${h} 15% 13%`,
    '--sidebar-accent-foreground': '0 0% 93%',
    '--sidebar-border': `${h} 12% 13%`,
    '--sidebar-ring': `${h} 80% 55%`,
    '--chat-bg': `${h} 20% 7%`,
    '--chat-bubble-own': `${h} 80% 55%`,
    '--chat-bubble-own-foreground': '0 0% 100%',
    '--chat-bubble-other': `${h} 14% 14%`,
    '--chat-bubble-other-foreground': '0 0% 90%',
    '--online': '160 84% 44%',
    '--chat-hover': `${h} 14% 11%`,
    '--chat-active': `${h} 50% 22%`,
    '--chat-active-foreground': '0 0% 95%',
    '--admin-accent': `${h} 80% 58%`,
    '--admin-accent-foreground': '0 0% 100%',
    '--success': '160 84% 44%',
    '--warning': '38 92% 50%',
    ...vars,
  };
  return {
    id, name, description: desc, emoji, vars: base,
    font: opts?.font || "'Space Grotesk', system-ui, sans-serif",
    radius: opts?.radius || '1rem',
    bubbleOwn: opts?.bubbleOwn || '20px 20px 4px 20px',
    bubbleOther: opts?.bubbleOther || '20px 20px 20px 4px',
    bodyBg: opts?.bodyBg || `radial-gradient(ellipse at 15% 0%, hsl(${h} 80% 55% / 0.21) 0%, transparent 50%), radial-gradient(ellipse at 85% 100%, hsl(${(hue + 60) % 360} 70% 50% / 0.35) 0%, transparent 50%)`,
    bgSize: opts?.bgSize,
  };
}

export const THEMES: FullTheme[] = [
  // 1 — Midnight Violet — starfield dots
  t('midnight-violet', 'Полночный фиолет', 'Глубокий фиолетовый с мягким свечением', '🌌', 262, {}, {
    bodyBg: 'radial-gradient(1.5px 1.5px at 20px 30px, hsl(262 60% 60% / 0.38), transparent), radial-gradient(1px 1px at 60px 80px, hsl(280 50% 55% / 0.30), transparent), radial-gradient(1.5px 1.5px at 100px 40px, hsl(262 60% 60% / 0.1), transparent), radial-gradient(ellipse at 15% 0%, hsl(262 80% 55% / 0.25) 0%, transparent 50%), radial-gradient(ellipse at 85% 100%, hsl(322 70% 50% / 0.18) 0%, transparent 50%)',
  }),

  // 2 — Ocean Depths — wave lines
  t('ocean-depths', 'Глубины океана', 'Спокойный тёмно-синий как морская бездна', '🌊', 215, {
    '--background': '215 25% 7%', '--card': '215 20% 10%', '--muted': '215 15% 15%',
  }, { font: "'Inter', system-ui, sans-serif", bubbleOwn: '18px 18px 4px 18px', bubbleOther: '18px 18px 18px 4px',
    bodyBg: 'repeating-linear-gradient(0deg, transparent, transparent 60px, hsl(215 40% 30% / 0.35) 60px, hsl(215 40% 30% / 0.35) 61px), repeating-linear-gradient(90deg, transparent, transparent 80px, hsl(215 40% 30% / 0.25) 80px, hsl(215 40% 30% / 0.25) 81px), radial-gradient(ellipse at 50% 100%, hsl(215 60% 40% / 0.28) 0%, transparent 60%)',
  }),

  // 3 — Emerald Garden — leaf pattern
  t('emerald-garden', 'Изумрудный сад', 'Свежие зелёные тона природы', '🌿', 155, {
    '--background': '155 18% 6%', '--card': '155 14% 9%', '--primary': '155 70% 45%',
    '--accent': '155 70% 45%', '--ring': '155 70% 45%', '--chat-bubble-own': '155 70% 45%',
    '--sidebar-primary': '155 70% 45%', '--sidebar-ring': '155 70% 45%',
  }, { font: "'Roboto', system-ui, sans-serif", radius: '0.75rem',
    bodyBg: 'radial-gradient(circle at 20% 80%, hsl(155 50% 35% / 0.28) 0%, transparent 40%), radial-gradient(circle at 80% 20%, hsl(140 45% 30% / 0.21) 0%, transparent 35%), radial-gradient(circle at 50% 50%, hsl(155 40% 25% / 0.35) 0%, transparent 50%)',
  }),

  // 4 — Sakura Bloom — petal dots
  t('sakura-bloom', 'Цветение сакуры', 'Нежный розовый с тёплыми акцентами', '🌸', 335, {
    '--background': '335 12% 7%', '--card': '335 10% 10%', '--primary': '335 75% 60%',
    '--accent': '335 75% 60%', '--ring': '335 75% 60%', '--chat-bubble-own': '335 75% 60%',
    '--sidebar-primary': '335 75% 60%', '--sidebar-ring': '335 75% 60%',
    '--muted-foreground': '335 10% 55%',
  }, { font: "'Montserrat', system-ui, sans-serif", radius: '1.25rem', bubbleOwn: '24px', bubbleOther: '24px',
    bodyBg: 'radial-gradient(8px 8px at 15% 25%, hsl(335 60% 60% / 0.21), transparent 50%), radial-gradient(6px 6px at 75% 15%, hsl(335 55% 55% / 0.18), transparent 50%), radial-gradient(10px 10px at 45% 85%, hsl(335 50% 50% / 0.35), transparent 50%), radial-gradient(7px 7px at 85% 65%, hsl(340 55% 55% / 0.18), transparent 50%)',
  }),

  // 5 — Sunset Amber — horizon gradient
  t('sunset-amber', 'Янтарный закат', 'Тёплые оранжевые тона заходящего солнца', '🌅', 28, {
    '--background': '28 18% 6%', '--card': '28 14% 9%', '--primary': '28 85% 52%',
    '--accent': '28 85% 52%', '--ring': '28 85% 52%', '--chat-bubble-own': '28 85% 52%',
    '--sidebar-primary': '28 85% 52%', '--sidebar-ring': '28 85% 52%',
  }, {
    bodyBg: 'linear-gradient(180deg, hsl(28 30% 8% / 0) 0%, hsl(28 40% 12% / 0.28) 70%, hsl(15 50% 15% / 0.30) 100%), radial-gradient(ellipse at 50% 100%, hsl(28 80% 50% / 0.21) 0%, transparent 50%)',
  }),

  // 6 — Arctic Frost — ice crystals
  t('arctic-frost', 'Арктический мороз', 'Холодный минималистичный бирюзовый', '🧊', 185, {
    '--background': '185 15% 5%', '--card': '185 12% 8%', '--primary': '185 65% 48%',
    '--accent': '185 65% 48%', '--ring': '185 65% 48%', '--chat-bubble-own': '185 65% 48%',
    '--sidebar-primary': '185 65% 48%', '--sidebar-ring': '185 65% 48%',
    '--foreground': '185 5% 90%',
  }, { font: "'Inter', system-ui, sans-serif", radius: '0.5rem', bubbleOwn: '12px 12px 2px 12px', bubbleOther: '12px 12px 12px 2px',
    bodyBg: 'linear-gradient(135deg, hsl(185 20% 6% / 0) 0%, hsl(195 25% 10% / 0.21) 50%, hsl(185 20% 6% / 0) 100%), repeating-linear-gradient(60deg, transparent, transparent 40px, hsl(185 30% 40% / 0.07) 40px, hsl(185 30% 40% / 0.07) 41px)',
  }),

  // 7 — Crimson Blaze — ember particles
  t('crimson-blaze', 'Алое пламя', 'Дерзкий красный с тёмным фоном', '🔥', 0, {
    '--background': '0 12% 5%', '--card': '0 10% 8%', '--primary': '0 78% 52%',
    '--accent': '0 78% 52%', '--ring': '0 78% 52%', '--chat-bubble-own': '0 78% 52%',
    '--sidebar-primary': '0 78% 52%', '--sidebar-ring': '0 78% 52%',
  }, { font: "'Roboto', system-ui, sans-serif", radius: '0.375rem', bubbleOwn: '4px', bubbleOther: '4px',
    bodyBg: 'radial-gradient(2px 2px at 30% 20%, hsl(0 70% 50% / 0.1), transparent), radial-gradient(2px 2px at 70% 60%, hsl(20 80% 50% / 0.28), transparent), radial-gradient(3px 3px at 50% 90%, hsl(0 60% 45% / 0.21), transparent), radial-gradient(ellipse at 50% 100%, hsl(0 50% 20% / 0.1) 0%, transparent 50%)',
  }),

  // 8 — Royal Indigo — diamond grid
  t('royal-indigo', 'Королевский индиго', 'Благородный глубокий индиго', '👑', 245, {
    '--background': '245 22% 6%', '--card': '245 18% 9%', '--primary': '245 75% 58%',
    '--accent': '245 75% 58%', '--ring': '245 75% 58%', '--chat-bubble-own': '245 75% 58%',
    '--sidebar-primary': '245 75% 58%', '--sidebar-ring': '245 75% 58%',
  }, { font: "'Montserrat', system-ui, sans-serif", radius: '1.25rem',
    bodyBg: 'repeating-linear-gradient(45deg, transparent, transparent 30px, hsl(245 30% 25% / 0.25) 30px, hsl(245 30% 25% / 0.25) 31px), repeating-linear-gradient(-45deg, transparent, transparent 30px, hsl(245 30% 25% / 0.25) 30px, hsl(245 30% 25% / 0.25) 31px), radial-gradient(ellipse at 50% 0%, hsl(245 60% 50% / 0.18) 0%, transparent 50%)',
  }),

  // 9 — Cyber Neon — scan lines
  t('cyber-neon', 'Кибер-неон', 'Яркий киберпанк с неоновыми акцентами', '🤖', 190, {
    '--background': '190 20% 4%', '--card': '190 16% 7%', '--primary': '190 100% 50%',
    '--accent': '320 100% 55%', '--ring': '190 100% 50%', '--chat-bubble-own': '190 100% 45%',
    '--sidebar-primary': '190 100% 50%', '--sidebar-ring': '190 100% 50%',
    '--foreground': '190 5% 92%',
  }, { radius: '0rem', bubbleOwn: '0px', bubbleOther: '0px',
    bodyBg: 'repeating-linear-gradient(0deg, transparent, transparent 3px, hsl(190 100% 50% / 0.06) 3px, hsl(190 100% 50% / 0.06) 4px), radial-gradient(ellipse at 20% 0%, hsl(190 100% 50% / 0.28) 0%, transparent 40%), radial-gradient(ellipse at 80% 100%, hsl(320 100% 55% / 0.21) 0%, transparent 40%)',
  }),

  // 10 — Golden Luxury — subtle damask
  t('golden-luxury', 'Золотая роскошь', 'Элегантный золотой на тёмном бархате', '✨', 42, {
    '--background': '42 15% 5%', '--card': '42 12% 8%', '--primary': '42 90% 50%',
    '--accent': '42 90% 50%', '--ring': '42 90% 50%', '--chat-bubble-own': '42 85% 45%',
    '--sidebar-primary': '42 90% 50%', '--sidebar-ring': '42 90% 50%',
    '--foreground': '42 8% 90%',
  }, { font: "'Montserrat', system-ui, sans-serif",
    bodyBg: 'radial-gradient(circle at 25% 25%, hsl(42 50% 40% / 0.18) 0%, transparent 30%), radial-gradient(circle at 75% 75%, hsl(42 50% 40% / 0.18) 0%, transparent 30%), radial-gradient(circle at 75% 25%, hsl(42 40% 35% / 0.25) 0%, transparent 25%), radial-gradient(circle at 25% 75%, hsl(42 40% 35% / 0.25) 0%, transparent 25%)',
  }),

  // 11 — Monochrome — clean grid
  t('monochrome', 'Монохром', 'Чистый чёрно-белый минимализм', '⬜', 0, {
    '--background': '0 0% 5%', '--card': '0 0% 8%', '--primary': '0 0% 75%',
    '--accent': '0 0% 75%', '--ring': '0 0% 75%', '--chat-bubble-own': '0 0% 65%',
    '--sidebar-primary': '0 0% 75%', '--sidebar-ring': '0 0% 75%',
    '--muted': '0 0% 12%', '--muted-foreground': '0 0% 50%', '--border': '0 0% 15%',
    '--sidebar-background': '0 0% 6%', '--sidebar-border': '0 0% 12%',
  }, { font: "'Inter', system-ui, sans-serif", radius: '0.5rem', bubbleOwn: '8px', bubbleOther: '8px',
    bodyBg: 'repeating-linear-gradient(0deg, transparent, transparent 50px, hsl(0 0% 100% / 0.06) 50px, hsl(0 0% 100% / 0.06) 51px), repeating-linear-gradient(90deg, transparent, transparent 50px, hsl(0 0% 100% / 0.06) 50px, hsl(0 0% 100% / 0.06) 51px)',
  }),

  // 12 — Neon Pink — city lights
  t('neon-pink', 'Неоновый розовый', 'Яркий розовый неон ночного города', '🌃', 325, {
    '--background': '280 18% 5%', '--card': '280 14% 8%', '--primary': '325 90% 58%',
    '--accent': '325 90% 58%', '--ring': '325 90% 58%', '--chat-bubble-own': '325 85% 52%',
    '--sidebar-primary': '325 90% 58%', '--sidebar-ring': '325 90% 58%',
  }, { radius: '1.5rem', bubbleOwn: '28px', bubbleOther: '28px',
    bodyBg: 'radial-gradient(ellipse at 30% 0%, hsl(325 80% 55% / 0.28) 0%, transparent 35%), radial-gradient(ellipse at 70% 100%, hsl(280 70% 50% / 0.21) 0%, transparent 35%), linear-gradient(180deg, hsl(280 20% 6% / 0) 0%, hsl(300 15% 8% / 0.18) 100%)',
  }),

  // 13 — Earth Clay — terrain texture
  t('earth-clay', 'Глина земли', 'Тёплые натуральные тона глины', '🏺', 22, {
    '--background': '22 14% 7%', '--card': '22 11% 10%', '--primary': '22 60% 48%',
    '--accent': '22 60% 48%', '--ring': '22 60% 48%', '--chat-bubble-own': '22 55% 42%',
    '--sidebar-primary': '22 60% 48%', '--sidebar-ring': '22 60% 48%',
    '--muted-foreground': '22 8% 48%',
  }, { font: "'Roboto', system-ui, sans-serif", radius: '0.75rem',
    bodyBg: 'radial-gradient(circle at 40% 60%, hsl(22 30% 20% / 0.21) 0%, transparent 40%), radial-gradient(circle at 80% 30%, hsl(30 25% 18% / 0.18) 0%, transparent 35%), linear-gradient(180deg, hsl(22 15% 8% / 0) 0%, hsl(22 20% 10% / 0.35) 100%)',
  }),

  // 14 — Lavender Mist — fog layers
  t('lavender-mist', 'Лавандовый туман', 'Мягкий лавандовый с дымчатым фоном', '💜', 275, {
    '--background': '275 16% 7%', '--card': '275 12% 10%', '--primary': '275 65% 62%',
    '--accent': '275 65% 62%', '--ring': '275 65% 62%', '--chat-bubble-own': '275 60% 55%',
    '--sidebar-primary': '275 65% 62%', '--sidebar-ring': '275 65% 62%',
  }, { font: "'Montserrat', system-ui, sans-serif", radius: '1.25rem',
    bodyBg: 'radial-gradient(ellipse at 0% 50%, hsl(275 40% 30% / 0.28) 0%, transparent 50%), radial-gradient(ellipse at 100% 50%, hsl(275 35% 28% / 0.21) 0%, transparent 50%), linear-gradient(180deg, hsl(275 18% 8% / 0) 0%, hsl(280 15% 10% / 0.35) 100%)',
  }),

  // 15 — Matrix Code — falling code lines
  t('matrix-code', 'Код Матрицы', 'Зелёный терминал хакера', '💚', 120, {
    '--background': '120 15% 3%', '--card': '120 12% 6%', '--primary': '120 80% 42%',
    '--accent': '120 80% 42%', '--ring': '120 80% 42%', '--chat-bubble-own': '120 75% 35%',
    '--sidebar-primary': '120 80% 42%', '--sidebar-ring': '120 80% 42%',
    '--foreground': '120 10% 85%', '--muted': '120 10% 8%', '--border': '120 10% 10%',
  }, { font: "'Roboto', system-ui, sans-serif", radius: '0rem', bubbleOwn: '2px', bubbleOther: '2px',
    bodyBg: 'repeating-linear-gradient(90deg, transparent, transparent 18px, hsl(120 60% 35% / 0.25) 18px, hsl(120 60% 35% / 0.25) 19px), repeating-linear-gradient(0deg, transparent, transparent 24px, hsl(120 50% 30% / 0.07) 24px, hsl(120 50% 30% / 0.07) 25px)',
  }),

  // 16 — Coral Reef — underwater bubbles
  t('coral-reef', 'Коралловый риф', 'Подводные тёплые коралловые тона', '🐠', 12, {
    '--background': '12 15% 6%', '--card': '12 12% 9%', '--primary': '12 75% 55%',
    '--accent': '175 60% 45%', '--ring': '12 75% 55%', '--chat-bubble-own': '12 70% 50%',
    '--sidebar-primary': '12 75% 55%', '--sidebar-ring': '12 75% 55%',
  }, {
    bodyBg: 'radial-gradient(12px 12px at 20% 30%, hsl(175 40% 40% / 0.35), transparent 50%), radial-gradient(8px 8px at 60% 70%, hsl(12 50% 45% / 0.18), transparent 50%), radial-gradient(15px 15px at 80% 20%, hsl(175 35% 35% / 0.25), transparent 50%), radial-gradient(ellipse at 50% 100%, hsl(200 40% 25% / 0.21) 0%, transparent 50%)',
  }),

  // 17 — Deep Space — nebula clouds
  t('deep-space', 'Глубокий космос', 'Бескрайний космос с звёздными акцентами', '🚀', 240, {
    '--background': '240 25% 4%', '--card': '240 20% 7%', '--primary': '240 70% 60%',
    '--accent': '280 70% 60%', '--ring': '240 70% 60%', '--chat-bubble-own': '240 65% 52%',
    '--sidebar-primary': '240 70% 60%', '--sidebar-ring': '240 70% 60%',
  }, {
    bodyBg: 'radial-gradient(1.5px 1.5px at 10% 15%, hsl(0 0% 80% / 0.30), transparent), radial-gradient(1px 1px at 40% 60%, hsl(0 0% 70% / 0.1), transparent), radial-gradient(2px 2px at 70% 30%, hsl(0 0% 75% / 0.28), transparent), radial-gradient(1px 1px at 90% 85%, hsl(0 0% 70% / 0.1), transparent), radial-gradient(ellipse at 10% 20%, hsl(240 70% 60% / 0.25) 0%, transparent 40%), radial-gradient(ellipse at 90% 80%, hsl(280 70% 60% / 0.18) 0%, transparent 40%)',
  }),

  // 18 — Pastel Dream — soft circles
  t('pastel-dream', 'Пастельная мечта', 'Мягкие пастельные тона для уюта', '🎨', 200, {
    '--background': '200 12% 8%', '--card': '200 10% 11%', '--primary': '200 55% 58%',
    '--accent': '200 55% 58%', '--ring': '200 55% 58%', '--chat-bubble-own': '200 50% 50%',
    '--sidebar-primary': '200 55% 58%', '--sidebar-ring': '200 55% 58%',
    '--muted-foreground': '200 8% 52%',
  }, { font: "'Montserrat', system-ui, sans-serif", radius: '1.5rem', bubbleOwn: '24px', bubbleOther: '24px',
    bodyBg: 'radial-gradient(circle at 15% 85%, hsl(200 40% 40% / 0.18) 0%, transparent 30%), radial-gradient(circle at 85% 15%, hsl(180 35% 38% / 0.35) 0%, transparent 25%), radial-gradient(circle at 50% 50%, hsl(200 30% 35% / 0.25) 0%, transparent 40%)',
  }),

  // 19 — Terminal Dark — scanline
  t('terminal-dark', 'Тёмный терминал', 'Минималистичный терминал разработчика', '💻', 0, {
    '--background': '0 0% 3%', '--card': '0 0% 6%', '--primary': '130 70% 45%',
    '--accent': '130 70% 45%', '--ring': '130 70% 45%', '--chat-bubble-own': '130 65% 38%',
    '--sidebar-primary': '130 70% 45%', '--sidebar-ring': '130 70% 45%',
    '--foreground': '130 5% 82%', '--muted': '0 0% 8%', '--muted-foreground': '0 0% 45%',
    '--border': '0 0% 10%', '--sidebar-background': '0 0% 4%', '--sidebar-border': '0 0% 8%',
  }, { font: "'Roboto', system-ui, sans-serif", radius: '0.25rem', bubbleOwn: '4px', bubbleOther: '4px',
    bodyBg: 'repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(130 50% 40% / 0.12) 2px, hsl(130 50% 40% / 0.12) 3px)',
  }),

  // 20 — Aurora Borealis — northern lights
  t('aurora-borealis', 'Северное сияние', 'Переливы полярного сияния', '🌈', 195, {
    '--background': '195 20% 5%', '--card': '195 16% 8%', '--primary': '195 75% 52%',
    '--accent': '280 65% 55%', '--ring': '195 75% 52%', '--chat-bubble-own': '195 70% 45%',
    '--sidebar-primary': '195 75% 52%', '--sidebar-ring': '195 75% 52%',
  }, { radius: '1rem',
    bodyBg: 'radial-gradient(ellipse at 15% 0%, hsl(195 75% 52% / 0.28) 0%, transparent 45%), radial-gradient(ellipse at 50% 30%, hsl(160 60% 45% / 0.35) 0%, transparent 35%), radial-gradient(ellipse at 85% 100%, hsl(280 65% 55% / 0.21) 0%, transparent 45%)',
  }),

  // 21 — Volcanic Ash — lava cracks
  t('volcanic-ash', 'Вулканический пепел', 'Тёмный пепел с раскалёнными акцентами', '🌋', 5, {
    '--background': '5 10% 5%', '--card': '5 8% 8%', '--primary': '5 80% 50%',
    '--accent': '35 90% 50%', '--ring': '5 80% 50%', '--chat-bubble-own': '5 75% 45%',
    '--sidebar-primary': '5 80% 50%', '--sidebar-ring': '5 80% 50%',
  }, { font: "'Roboto', system-ui, sans-serif", radius: '0.5rem',
    bodyBg: 'radial-gradient(ellipse at 30% 90%, hsl(5 60% 30% / 0.28) 0%, transparent 40%), radial-gradient(ellipse at 70% 10%, hsl(35 70% 35% / 0.18) 0%, transparent 35%), linear-gradient(180deg, hsl(5 10% 5% / 0) 60%, hsl(5 30% 12% / 0.21) 100%)',
  }),

  // 22 — Mint Fresh — clean dots
  t('mint-fresh', 'Свежая мята', 'Освежающий мятный с чистыми линиями', '🍃', 168, {
    '--background': '168 14% 6%', '--card': '168 11% 9%', '--primary': '168 65% 48%',
    '--accent': '168 65% 48%', '--ring': '168 65% 48%', '--chat-bubble-own': '168 60% 42%',
    '--sidebar-primary': '168 65% 48%', '--sidebar-ring': '168 65% 48%',
  }, { radius: '1.25rem', bubbleOwn: '22px', bubbleOther: '22px',
    bodyBg: 'radial-gradient(circle, hsl(168 40% 40% / 0.35) 1px, transparent 1px), radial-gradient(ellipse at 80% 20%, hsl(168 50% 40% / 0.18) 0%, transparent 40%)',
  }),

  // 23 — Deep Blue — ocean floor
  t('deep-blue', 'Глубокий синий', 'Насыщенный тёмно-синий океан', '🐋', 220, {
    '--background': '220 22% 5%', '--card': '220 18% 8%', '--primary': '220 72% 55%',
    '--accent': '220 72% 55%', '--ring': '220 72% 55%', '--chat-bubble-own': '220 68% 48%',
    '--sidebar-primary': '220 72% 55%', '--sidebar-ring': '220 72% 55%',
  }, { font: "'Inter', system-ui, sans-serif",
    bodyBg: 'radial-gradient(ellipse at 50% 0%, hsl(220 50% 30% / 0.21) 0%, transparent 50%), linear-gradient(180deg, hsl(220 25% 6% / 0) 0%, hsl(220 30% 10% / 0.21) 100%)',
  }),

  // 24 — Rose Gold — shimmer
  t('rose-gold', 'Розовое золото', 'Элегантный розово-золотой', '🌹', 345, {
    '--background': '345 12% 6%', '--card': '345 10% 9%', '--primary': '345 65% 58%',
    '--accent': '30 70% 55%', '--ring': '345 65% 58%', '--chat-bubble-own': '345 60% 52%',
    '--sidebar-primary': '345 65% 58%', '--sidebar-ring': '345 65% 58%',
  }, { font: "'Montserrat', system-ui, sans-serif", radius: '1.25rem',
    bodyBg: 'radial-gradient(ellipse at 20% 0%, hsl(345 50% 40% / 0.21) 0%, transparent 40%), radial-gradient(ellipse at 80% 100%, hsl(30 50% 40% / 0.18) 0%, transparent 40%)',
  }),

  // 25 — Electric Storm — lightning bolts
  t('electric-storm', 'Электрический шторм', 'Грозовой жёлтый на тёмном небе', '⚡', 48, {
    '--background': '48 12% 5%', '--card': '48 10% 8%', '--primary': '48 90% 50%',
    '--accent': '48 90% 50%', '--ring': '48 90% 50%', '--chat-bubble-own': '48 85% 42%',
    '--sidebar-primary': '48 90% 50%', '--sidebar-ring': '48 90% 50%',
    '--foreground': '48 5% 90%',
  }, { radius: '0.375rem',
    bodyBg: 'radial-gradient(ellipse at 50% 0%, hsl(48 70% 40% / 0.21) 0%, transparent 40%), radial-gradient(ellipse at 20% 80%, hsl(48 50% 30% / 0.35) 0%, transparent 30%), linear-gradient(180deg, hsl(48 12% 5% / 0) 0%, hsl(240 15% 8% / 0.18) 100%)',
  }),

  // 26 — Zen Stone — minimal ripple
  t('zen-stone', 'Камень дзен', 'Спокойный серо-зелёный для медитации', '🎋', 150, {
    '--background': '150 8% 7%', '--card': '150 6% 10%', '--primary': '150 40% 48%',
    '--accent': '150 40% 48%', '--ring': '150 40% 48%', '--chat-bubble-own': '150 35% 40%',
    '--sidebar-primary': '150 40% 48%', '--sidebar-ring': '150 40% 48%',
    '--muted-foreground': '150 5% 48%',
  }, { font: "'Inter', system-ui, sans-serif", radius: '0.75rem',
    bodyBg: 'radial-gradient(circle at 50% 50%, hsl(150 20% 20% / 0.35) 0%, transparent 50%)',
  }),

  // 27 — Synthwave — retro grid
  t('synthwave', 'Синтвейв', 'Ретро-футуризм 80-х с неоном', '🎹', 290, {
    '--background': '290 18% 5%', '--card': '290 14% 8%', '--primary': '320 85% 58%',
    '--accent': '190 90% 50%', '--ring': '320 85% 58%', '--chat-bubble-own': '320 80% 50%',
    '--sidebar-primary': '320 85% 58%', '--sidebar-ring': '320 85% 58%',
  }, { radius: '1.5rem', bubbleOwn: '28px', bubbleOther: '28px',
    bodyBg: 'linear-gradient(180deg, hsl(290 20% 6% / 0) 0%, hsl(290 25% 10% / 0.21) 60%, hsl(320 30% 12% / 0.1) 100%), repeating-linear-gradient(90deg, transparent, transparent 40px, hsl(320 60% 50% / 0.07) 40px, hsl(320 60% 50% / 0.07) 41px), repeating-linear-gradient(0deg, transparent, transparent 40px, hsl(190 60% 45% / 0.07) 40px, hsl(190 60% 45% / 0.07) 41px)',
  }),

  // 28 — Carbon Dark — carbon fiber
  t('carbon-dark', 'Тёмный карбон', 'Технологичный углеродный стиль', '⚙️', 210, {
    '--background': '210 8% 5%', '--card': '210 6% 8%', '--primary': '210 55% 52%',
    '--accent': '210 55% 52%', '--ring': '210 55% 52%', '--chat-bubble-own': '210 50% 45%',
    '--sidebar-primary': '210 55% 52%', '--sidebar-ring': '210 55% 52%',
    '--muted': '210 5% 11%', '--border': '210 5% 13%',
  }, { font: "'Roboto', system-ui, sans-serif", radius: '0.5rem', bubbleOwn: '8px', bubbleOther: '8px',
    bodyBg: 'repeating-linear-gradient(45deg, transparent, transparent 5px, hsl(210 10% 10% / 0.35) 5px, hsl(210 10% 10% / 0.35) 6px), repeating-linear-gradient(-45deg, transparent, transparent 5px, hsl(210 10% 10% / 0.35) 5px, hsl(210 10% 10% / 0.35) 6px)',
  }),

  // 29 — Tropical Paradise — palm leaves
  t('tropical-paradise', 'Тропический рай', 'Яркие тропические краски', '🏝️', 18, {
    '--background': '18 16% 6%', '--card': '18 12% 9%', '--primary': '18 80% 55%',
    '--accent': '165 65% 45%', '--ring': '18 80% 55%', '--chat-bubble-own': '18 75% 48%',
    '--sidebar-primary': '18 80% 55%', '--sidebar-ring': '18 80% 55%',
  }, { font: "'Montserrat', system-ui, sans-serif", radius: '1rem',
    bodyBg: 'radial-gradient(ellipse at 0% 100%, hsl(165 50% 30% / 0.25) 0%, transparent 40%), radial-gradient(ellipse at 100% 0%, hsl(18 60% 40% / 0.21) 0%, transparent 40%), radial-gradient(ellipse at 50% 50%, hsl(165 40% 25% / 0.25) 0%, transparent 50%)',
  }),

  // 30 — Ice Crystal — frost pattern
  t('ice-crystal', 'Ледяной кристалл', 'Холодный голубой лёд с искрами', '❄️', 200, {
    '--background': '200 18% 5%', '--card': '200 14% 8%', '--primary': '200 70% 55%',
    '--accent': '230 65% 58%', '--ring': '200 70% 55%', '--chat-bubble-own': '200 65% 48%',
    '--sidebar-primary': '200 70% 55%', '--sidebar-ring': '200 70% 55%',
  }, { font: "'Inter', system-ui, sans-serif",
    bodyBg: 'radial-gradient(2px 2px at 15% 20%, hsl(200 50% 60% / 0.1), transparent), radial-gradient(1.5px 1.5px at 55% 45%, hsl(230 45% 55% / 0.28), transparent), radial-gradient(2px 2px at 85% 75%, hsl(200 50% 60% / 0.1), transparent), radial-gradient(ellipse at 50% 0%, hsl(200 50% 40% / 0.21) 0%, transparent 50%)',
  }),

  // 31 — Anime
  {
    id: 'anime',
    name: 'Аниме',
    description: 'Полный стиль аниме — неон, свечение, кавайные формы',
    emoji: '🌸',
    vars: {
      '--background': '270 22% 6%',
      '--foreground': '300 10% 93%',
      '--card': '275 18% 9%',
      '--card-foreground': '300 10% 93%',
      '--popover': '275 20% 10%',
      '--popover-foreground': '300 10% 93%',
      '--primary': '330 85% 58%',
      '--primary-foreground': '0 0% 100%',
      '--secondary': '275 15% 13%',
      '--secondary-foreground': '300 10% 80%',
      '--muted': '275 12% 14%',
      '--muted-foreground': '280 10% 52%',
      '--accent': '200 85% 55%',
      '--accent-foreground': '0 0% 100%',
      '--destructive': '0 72% 51%',
      '--destructive-foreground': '0 0% 100%',
      '--border': '275 12% 16%',
      '--input': '275 12% 16%',
      '--ring': '330 85% 58%',
      '--radius': '1.25rem',
      '--sidebar-background': '270 22% 7%',
      '--sidebar-foreground': '300 10% 85%',
      '--sidebar-primary': '330 85% 58%',
      '--sidebar-primary-foreground': '0 0% 100%',
      '--sidebar-accent': '275 15% 13%',
      '--sidebar-accent-foreground': '300 10% 93%',
      '--sidebar-border': '275 12% 13%',
      '--sidebar-ring': '330 85% 58%',
      '--chat-bg': '270 22% 7%',
      '--chat-bubble-own': '330 80% 52%',
      '--chat-bubble-own-foreground': '0 0% 100%',
      '--chat-bubble-other': '275 14% 14%',
      '--chat-bubble-other-foreground': '300 10% 90%',
      '--online': '160 84% 44%',
      '--chat-hover': '275 14% 11%',
      '--chat-active': '330 50% 22%',
      '--chat-active-foreground': '0 0% 95%',
      '--admin-accent': '330 85% 58%',
      '--admin-accent-foreground': '0 0% 100%',
      '--success': '160 84% 44%',
      '--warning': '38 92% 50%',
    },
    font: "'Montserrat', system-ui, sans-serif",
    radius: '1.25rem',
    bubbleOwn: '24px 24px 6px 24px',
    bubbleOther: '24px 24px 24px 6px',
    bodyBg: 'radial-gradient(ellipse at 10% 0%, hsl(300 80% 60% / 0.1) 0%, transparent 50%), radial-gradient(ellipse at 90% 20%, hsl(200 90% 60% / 0.28) 0%, transparent 40%), radial-gradient(ellipse at 50% 100%, hsl(330 85% 55% / 0.21) 0%, transparent 50%)',
  },
];

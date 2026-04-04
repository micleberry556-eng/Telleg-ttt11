import { useState, type FormEvent } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type ChatFolder } from '@/data/mockData';
import { motion } from 'framer-motion';

interface FolderEditorProps {
  /** Pass an existing folder to edit, or undefined to create a new one. */
  folder?: ChatFolder;
  onBack: () => void;
  onSave: (folder: ChatFolder) => void;
}

const ICON_OPTIONS = ['📁', '👤', '👥', '📢', '💼', '🏠', '⭐', '🔖', '🤖', '🎮', '📚', '🎵', '✈️', '🛒', '❤️', '🔔'];

const TYPE_OPTIONS: { key: 'private' | 'group'; label: string; icon: string }[] = [
  { key: 'private', label: 'Личные чаты', icon: '👤' },
  { key: 'group', label: 'Группы', icon: '👥' },
];

export function FolderEditor({ folder, onBack, onSave }: FolderEditorProps) {
  const isEditing = !!folder;
  const [name, setName] = useState(folder?.name || '');
  const [icon, setIcon] = useState(folder?.icon || '📁');
  const [includeTypes, setIncludeTypes] = useState<('private' | 'group')[]>(folder?.includeTypes || []);
  const [includeChannels, setIncludeChannels] = useState(folder?.includeChannels || false);

  const toggleType = (type: 'private' | 'group') => {
    setIncludeTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type],
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      id: folder?.id || `folder-${Date.now()}`,
      name: name.trim(),
      icon,
      includeTypes,
      includeChannels,
      includeChatIds: folder?.includeChatIds || [],
      excludeChatIds: folder?.excludeChatIds || [],
    });
  };

  const isValid = name.trim().length >= 1;
  const hasChanges = !isEditing || (
    name.trim() !== folder.name ||
    icon !== folder.icon ||
    JSON.stringify(includeTypes) !== JSON.stringify(folder.includeTypes) ||
    includeChannels !== folder.includeChannels
  );

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'tween', duration: 0.25 }}
      className="absolute inset-0 z-50 bg-card flex flex-col"
    >
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        <h2 className="text-lg font-semibold text-foreground">
          {isEditing ? 'Редактировать папку' : 'Новая папка'}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        <form onSubmit={handleSubmit} className="p-4 space-y-5">
          {/* Preview */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-3xl mb-2">
              {icon}
            </div>
          </div>

          {/* Icon picker */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Иконка</label>
            <div className="grid grid-cols-8 gap-2">
              {ICON_OPTIONS.map(emoji => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setIcon(emoji)}
                  className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all',
                    icon === emoji ? 'bg-primary/10 ring-2 ring-primary scale-110' : 'bg-muted hover:bg-muted/80',
                  )}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Название папки</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Например: Работа"
              autoFocus
              maxLength={30}
              className="w-full bg-muted rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
            />
          </div>

          {/* Include types */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Включить в папку</label>
            <div className="space-y-2">
              {TYPE_OPTIONS.map(opt => {
                const isSelected = includeTypes.includes(opt.key);
                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => toggleType(opt.key)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-left',
                      isSelected ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/50',
                    )}
                  >
                    <span className="text-lg">{opt.icon}</span>
                    <span className={cn('text-sm flex-1', isSelected ? 'text-primary font-medium' : 'text-foreground')}>
                      {opt.label}
                    </span>
                    <div className={cn(
                      'w-5 h-5 rounded border-2 flex items-center justify-center transition-colors',
                      isSelected ? 'bg-primary border-primary' : 'border-muted-foreground/30',
                    )}>
                      {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                    </div>
                  </button>
                );
              })}

              {/* Channels toggle */}
              <button
                type="button"
                onClick={() => setIncludeChannels(!includeChannels)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-left',
                  includeChannels ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/50',
                )}
              >
                <span className="text-lg">📢</span>
                <span className={cn('text-sm flex-1', includeChannels ? 'text-primary font-medium' : 'text-foreground')}>
                  Каналы
                </span>
                <div className={cn(
                  'w-5 h-5 rounded border-2 flex items-center justify-center transition-colors',
                  includeChannels ? 'bg-primary border-primary' : 'border-muted-foreground/30',
                )}>
                  {includeChannels && <Check className="w-3 h-3 text-primary-foreground" />}
                </div>
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isValid || (isEditing && !hasChanges)}
            className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-xl py-3 text-sm font-medium transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Check className="w-4 h-4" />
            {isEditing ? 'Сохранить' : 'Создать папку'}
          </button>
        </form>
      </div>
    </motion.div>
  );
}

import { ArrowLeft, Plus, Pencil, Trash2, FolderOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type ChatFolder } from '@/data/mockData';
import { motion } from 'framer-motion';

interface FolderManagerProps {
  folders: ChatFolder[];
  onBack: () => void;
  onCreateFolder: () => void;
  onEditFolder: (folderId: string) => void;
  onDeleteFolder: (folderId: string) => void;
}

export function FolderManager({ folders, onBack, onCreateFolder, onEditFolder, onDeleteFolder }: FolderManagerProps) {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'tween', duration: 0.25 }}
      className="absolute inset-0 z-50 bg-card/90 backdrop-blur-md flex flex-col"
    >
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-foreground">Папки чатов</h2>
        </div>
        <button
          onClick={onCreateFolder}
          className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Info */}
        <div className="px-4 py-3">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Создавайте папки для организации чатов. Папки отображаются как вкладки над списком чатов.
          </p>
        </div>

        {/* Folder list */}
        {folders.length > 0 ? (
          <div className="mx-3 bg-muted/30 rounded-xl overflow-hidden">
            {folders.map((folder, i) => (
              <div
                key={folder.id}
                className={cn('flex items-center gap-3 px-4 py-3.5', i > 0 && 'border-t border-border/50')}
              >
                <span className="text-xl flex-shrink-0">{folder.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{folder.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {folder.includeTypes.length > 0 && folder.includeTypes.map(t => t === 'private' ? 'Личные' : 'Группы').join(', ')}
                    {folder.includeChannels && (folder.includeTypes.length > 0 ? ', Каналы' : 'Каналы')}
                    {folder.includeChatIds.length > 0 && ` +${folder.includeChatIds.length} чат(ов)`}
                    {!folder.includeTypes.length && !folder.includeChannels && !folder.includeChatIds.length && 'Пустая папка'}
                  </p>
                </div>
                <button
                  onClick={() => onEditFolder(folder.id)}
                  className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDeleteFolder(folder.id)}
                  className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
            <FolderOpen className="w-8 h-8 mb-2 opacity-50" />
            <p className="text-sm">Нет папок</p>
            <button
              onClick={onCreateFolder}
              className="mt-2 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Создать первую папку
            </button>
          </div>
        )}

        {/* Recommended */}
        {folders.length > 0 && folders.length < 5 && (
          <div className="px-4 py-4">
            <button
              onClick={onCreateFolder}
              className="w-full flex items-center justify-center gap-2 bg-muted rounded-xl py-3 text-sm font-medium text-foreground hover:bg-muted/80 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Добавить папку
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

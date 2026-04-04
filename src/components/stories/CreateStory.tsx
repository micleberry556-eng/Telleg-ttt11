import { useState, useRef, type FormEvent } from 'react';
import { ArrowLeft, Send, Image, Type, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type StoryItem } from '@/data/mockData';
import { motion } from 'framer-motion';

interface CreateStoryProps {
  onBack: () => void;
  onCreated: (item: StoryItem) => void;
}

type StoryMode = 'text' | 'media';

const BG_OPTIONS = [
  'from-blue-500 to-purple-600',
  'from-green-500 to-teal-600',
  'from-orange-500 to-red-500',
  'from-pink-500 to-rose-600',
  'from-indigo-500 to-blue-600',
  'from-yellow-500 to-orange-500',
  'from-cyan-500 to-blue-500',
  'from-violet-500 to-purple-600',
];

export function CreateStory({ onBack, onCreated }: CreateStoryProps) {
  const [mode, setMode] = useState<StoryMode>('text');
  const [text, setText] = useState('');
  const [bgColor, setBgColor] = useState(BG_OPTIONS[0]);
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const isVideo = file.type.startsWith('video/');
    setMediaUrl(url);
    setMediaType(isVideo ? 'video' : 'image');
    setMode('media');
    e.target.value = '';
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (mode === 'text' && !text.trim()) return;
    if (mode === 'media' && !mediaUrl) return;

    setLoading(true);
    await new Promise(r => setTimeout(r, 400));

    const item: StoryItem = {
      id: `my-st-${Date.now()}`,
      type: mode === 'text' ? 'text' : mediaType,
      content: mode === 'text' ? text.trim() : mediaUrl!,
      bgColor: mode === 'text' ? bgColor : undefined,
      timestamp: 'только что',
      duration: 5,
    };

    onCreated(item);
    setLoading(false);
  };

  const clearMedia = () => {
    if (mediaUrl?.startsWith('blob:')) URL.revokeObjectURL(mediaUrl);
    setMediaUrl(null);
    setMode('text');
  };

  const hasContent = mode === 'text' ? text.trim().length > 0 : !!mediaUrl;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 z-10">
        <button onClick={onBack} className="p-2 text-white/80 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-white font-semibold flex-1">Новая история</h2>
        {hasContent && (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        )}
      </div>

      {/* Preview area */}
      <div className="flex-1 relative overflow-hidden">
        {mode === 'text' ? (
          <div className={cn('w-full h-full flex items-center justify-center bg-gradient-to-br p-8', bgColor)}>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Напишите что-нибудь..."
              autoFocus
              maxLength={200}
              className="w-full text-center text-2xl font-bold text-white placeholder:text-white/50 bg-transparent border-none outline-none resize-none leading-relaxed"
              rows={4}
            />
          </div>
        ) : mediaUrl ? (
          <div className="w-full h-full bg-black flex items-center justify-center relative">
            {mediaType === 'image' ? (
              <img src={mediaUrl} alt="" className="w-full h-full object-contain" />
            ) : (
              <video src={mediaUrl} className="w-full h-full object-contain" controls>
                <track kind="captions" />
              </video>
            )}
            <button
              onClick={clearMedia}
              className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className={cn('w-full h-full flex items-center justify-center bg-gradient-to-br', bgColor)}>
            <p className="text-white/50 text-lg">Выберите тип истории</p>
          </div>
        )}
      </div>

      {/* Bottom toolbar */}
      <div className="px-4 py-3 z-10">
        {/* Mode switcher */}
        <div className="flex items-center gap-2 mb-3">
          <button
            onClick={() => { clearMedia(); setMode('text'); }}
            className={cn(
              'flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors',
              mode === 'text' ? 'bg-white text-black' : 'bg-white/20 text-white',
            )}
          >
            <Type className="w-4 h-4" />
            Текст
          </button>
          <button
            onClick={() => fileRef.current?.click()}
            className={cn(
              'flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors',
              mode === 'media' ? 'bg-white text-black' : 'bg-white/20 text-white',
            )}
          >
            <Image className="w-4 h-4" />
            Фото/Видео
          </button>
        </div>

        {/* Background color picker (text mode only) */}
        {mode === 'text' && (
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            {BG_OPTIONS.map(bg => (
              <button
                key={bg}
                onClick={() => setBgColor(bg)}
                className={cn(
                  'w-8 h-8 rounded-full flex-shrink-0 bg-gradient-to-br transition-all',
                  bg,
                  bgColor === bg ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-110' : '',
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*,video/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </motion.div>
  );
}

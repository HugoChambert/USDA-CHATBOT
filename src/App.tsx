import { useState, useRef, useEffect } from 'react';
import { Send, Smile, Paperclip, X, ChevronDown, Globe, Upload } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { translations, Language } from './translations';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  fileUrl?: string;
  fileName?: string;
}

interface Program {
  title: string;
  description: string | null;
  url: string | null;
  category: string;
}

const USDA_KEYWORDS = [
  'housing', 'home', 'mortgage', 'rent', 'rental', 'loan', 'grant',
  'business', 'entrepreneur', 'small business', 'cooperative',
  'broadband', 'internet', 'telecommunications', 'connectivity',
  'energy', 'renewable', 'solar', 'efficiency', 'electric',
  'water', 'waste', 'wastewater', 'disposal', 'sanitation',
  'community', 'facilities', 'health', 'healthcare', 'hospital',
  'rural', 'farm', 'agriculture', 'farming', 'producer',
  'development', 'infrastructure', 'funding', 'finance',
  'usda', 'program', 'assistance', 'support', 'help'
];

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const languageMenuRef = useRef<HTMLDivElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const initialMsg: Message = {
      id: '1',
      role: 'assistant',
      content: translations[language].greeting,
      timestamp: new Date(),
    };
    setMessages([initialMsg]);
  }, [language]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setShowLanguageMenu(false);
      }
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const extractKeywords = (text: string): string[] => {
    const keywords: string[] = [];
    USDA_KEYWORDS.forEach(keyword => {
      if (text.toLowerCase().includes(keyword)) {
        keywords.push(keyword);
      }
    });
    return [...new Set(keywords)];
  };

  const isOnTopic = (text: string): boolean => {
    const keywords = extractKeywords(text);
    return keywords.length > 0;
  };

  const searchPrograms = async (keywords: string[]): Promise<Program[]> => {
    if (keywords.length === 0) return [];

    try {
      const searchConditions = keywords.map(keyword =>
        `title.ilike.%${keyword}%,description.ilike.%${keyword}%,category.ilike.%${keyword}%`
      ).join(',');

      const { data, error } = await supabase
        .from('usda_programs')
        .select('title, description, url, category')
        .or(searchConditions)
        .limit(5);

      if (error) {
        console.error('Search error:', error);
        return [];
      }
      return data || [];
    } catch (error) {
      console.error('Search error:', error);
      return [];
    }
  };

  const generateConversationalResponse = (
    query: string,
    keywords: string[],
    programs: Program[]
  ): string => {
    const t = translations[language];

    if (!isOnTopic(query)) {
      return t.offTopic;
    }

    if (programs.length === 0) {
      const mainKeyword = keywords[0] || 'that topic';
      return t.noResults.replace('{keyword}', mainKeyword);
    }

    const categoryGroups = programs.reduce((acc, program) => {
      if (!acc[program.category]) acc[program.category] = [];
      acc[program.category].push(program);
      return acc;
    }, {} as Record<string, Program[]>);

    const plural = programs.length > 1 ? 's' : '';
    const pluralVerb = language === 'es' && programs.length > 1 ? 'n' : '';
    let response = t.foundPrograms
      .replace('{count}', programs.length.toString())
      .replace('{plural}', plural)
      .replace('{pluralVerb}', pluralVerb) + '\n\n';

    Object.entries(categoryGroups).forEach(([category, categoryPrograms]) => {
      response += `${category}\n`;
      categoryPrograms.forEach((program) => {
        response += `\n• ${program.title}\n`;
        if (program.description) {
          const desc = program.description.substring(0, 150);
          response += `  ${desc}${program.description.length > 150 ? '...' : ''}\n`;
        }
        if (program.url) {
          response += `  Link: ${program.url}\n`;
        }
      });
      response += '\n';
    });

    response += t.moreDetails;
    return response;
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const keywords = extractKeywords(userMessage);
      const programs = await searchPrograms(keywords);
      const responseContent = generateConversationalResponse(userMessage, keywords, programs);

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      console.error('Error:', error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: translations[language].errorMessage,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingFile(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('chat-files')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('chat-files')
        .getPublicUrl(filePath);

      const fileMsg: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: `Uploaded file: ${file.name}`,
        timestamp: new Date(),
        fileUrl: publicUrl,
        fileName: file.name,
      };

      setMessages((prev) => [...prev, fileMsg]);

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: language === 'en'
          ? `I've received your file "${file.name}". How can I help you with this document?`
          : language === 'es'
          ? `He recibido tu archivo "${file.name}". ¿Cómo puedo ayudarte con este documento?`
          : language === 'zh'
          ? `我已收到您的文件"${file.name}"。我如何帮助您处理此文档？`
          : `Tôi đã nhận được tệp của bạn "${file.name}". Tôi có thể giúp gì về tài liệu này?`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      console.error('Upload error:', error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: translations[language].errorMessage,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setUploadingFile(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 300);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (chatContainerRef.current) {
      const rect = chatContainerRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    }
  };

  const emojis = ['😊', '👍', '❤️', '😂', '🎉', '👏', '🔥', '✨', '💯', '🙌', '😍', '🤔', '👋', '💪', '🌟', '😎'];

  const handleEmojiClick = (emoji: string) => {
    setInput(input + emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-100 flex items-center justify-center p-4">
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="fixed bottom-4 right-4 w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center shadow-lg hover:bg-slate-700 transition-colors animate-slide-up"
          title="Open chat"
        >
          <img src="/img/owl_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg" alt="Chat" className="w-8 h-8" />
        </button>
      )}
      {isOpen && (
        <div
          ref={chatContainerRef}
          className={`w-full max-w-md mx-auto sm:absolute ${isClosing ? 'animate-slide-down' : 'animate-slide-up'}`}
          style={{
            left: position.x || undefined,
            top: position.y || undefined,
            transform: position.x ? 'none' : undefined,
            cursor: isDragging ? 'grabbing' : 'auto',
          }}
        >
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col h-screen sm:h-[600px]">
          {/* Header */}
          <div
            className="bg-gradient-to-r from-slate-800 to-slate-700 px-4 py-3 flex items-center justify-between cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
          >
            <div className="flex items-center gap-2">
              <img src="/img/usda-logo-and-lockups/USDA v2 lockup/white/usda-v2-white-lockup.svg" alt="USDA" className="h-6 sm:h-8" />
            </div>
            <div className="flex items-center gap-2">
              <div className="relative" ref={languageMenuRef}>
                <button
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  className="text-white hover:text-gray-300 transition-colors p-1 rounded hover:bg-slate-600"
                  title="Change Language"
                >
                  <Globe size={20} />
                </button>
                {showLanguageMenu && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl py-2 z-50">
                    {(Object.keys(translations) as Language[]).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setLanguage(lang);
                          setShowLanguageMenu(false);
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors ${
                          language === lang ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                        }`}
                      >
                        {translations[lang].languages[lang]}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={handleClose}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="flex-shrink-0">
                    <div className="w-7 h-7 bg-slate-800 rounded-full flex items-center justify-center">
                      <img src="/img/owl_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg" alt="Bot" className="w-5 h-5" />
                    </div>
                  </div>
                )}
                <div
                  className={`max-w-[80%] sm:max-w-xs px-4 py-2 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-green-700 text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none shadow-sm border border-gray-200'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">
                    {message.content}
                  </p>
                  {message.fileUrl && message.fileName && (
                    <a
                      href={message.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-xs underline hover:no-underline"
                    >
                      <Paperclip size={12} />
                      {message.fileName}
                    </a>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-3 justify-start">
                <div className="flex-shrink-0">
                  <div className="w-7 h-7 bg-slate-800 rounded-full flex items-center justify-center">
                    <img src="/img/owl_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg" alt="Bot" className="w-5 h-5" />
                  </div>
                </div>
                <div className="bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={loading || uploadingFile}
                className="text-blue-600 hover:text-blue-700 disabled:text-gray-400 transition-colors p-2 rounded-full hover:bg-blue-50"
                title={translations[language].uploadFile}
              >
                {uploadingFile ? (
                  <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Upload size={20} />
                )}
              </button>
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={translations[language].placeholder}
                  disabled={loading}
                  className="w-full px-4 py-3 pr-20 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500 disabled:bg-gray-100 text-sm"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Smile size={20} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        </div>
      )}
    </div>
  );
}

export default App;

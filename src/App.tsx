import { useState, useRef, useEffect } from 'react';
import { Send, Smile, Paperclip, X, ChevronDown, Globe, Upload } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { translations, Language } from './translations';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  fileUrl?: string;
  fileName?: string;
  options?: MessageOption[];
}

interface MessageOption {
  id: string;
  label: string;
  type: 'program' | 'document' | 'faq';
  data: Program | Document | FAQ;
}

interface Program {
  id?: string;
  title: string;
  description: string | null;
  url: string | null;
  category: string;
  eligibility?: string | null;
  benefits?: string | null;
  application_process?: string | null;
}

interface Document {
  id: string;
  title: string;
  description: string | null;
  document_url: string;
  document_type: string;
  category: string | null;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string | null;
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

const ASSISTANCE_CATEGORIES = [
  { id: 'housing', icon: '🏠' },
  { id: 'business', icon: '💼' },
  { id: 'broadband', icon: '📡' },
  { id: 'energy', icon: '⚡' },
  { id: 'water', icon: '💧' },
  { id: 'community', icon: '🏛️' },
] as const;

function App() {
  console.log('App component loaded');
  console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
  console.log('Supabase client:', supabase ? 'initialized' : 'null');

  const [isOpen, setIsOpen] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
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
    if (keywords.length === 0 || !supabase) return [];

    try {
      let query = supabase
        .from('programs')
        .select('id, title, description, url, category, eligibility, benefits, application_process');

      // Build OR conditions for each keyword
      const conditions = keywords.map(keyword =>
        `title.ilike.%${keyword}%,description.ilike.%${keyword}%,category.ilike.%${keyword}%`
      ).join(',');

      const { data, error } = await query.or(conditions).limit(5);

      if (error) {
        console.error('Search error:', error);
        return [];
      }

      // Score and sort results by relevance
      const scored = (data || []).map(program => {
        let score = 0;
        const searchText = `${program.title} ${program.description} ${program.category}`.toLowerCase();
        keywords.forEach(keyword => {
          const lowerKeyword = keyword.toLowerCase();
          if (program.category?.toLowerCase() === lowerKeyword) score += 10;
          if (program.title?.toLowerCase().includes(lowerKeyword)) score += 5;
          if (program.description?.toLowerCase().includes(lowerKeyword)) score += 2;
        });
        return { ...program, score };
      });

      return scored.filter(p => p.score > 0).sort((a, b) => b.score - a.score).slice(0, 5);
    } catch (error) {
      console.error('Search error:', error);
      return [];
    }
  };

  const searchDocuments = async (keywords: string[]): Promise<Document[]> => {
    if (keywords.length === 0 || !supabase) return [];

    try {
      const conditions = keywords.map(keyword =>
        `title.ilike.%${keyword}%,description.ilike.%${keyword}%,category.ilike.%${keyword}%`
      ).join(',');

      const { data, error } = await supabase
        .from('documents')
        .select('id, title, description, document_url, document_type, category')
        .or(conditions)
        .limit(3);

      if (error) {
        console.error('Document search error:', error);
        return [];
      }

      // Score by relevance
      const scored = (data || []).map(doc => {
        let score = 0;
        keywords.forEach(keyword => {
          const lowerKeyword = keyword.toLowerCase();
          if (doc.category?.toLowerCase() === lowerKeyword) score += 10;
          if (doc.title?.toLowerCase().includes(lowerKeyword)) score += 5;
        });
        return { ...doc, score };
      });

      return scored.filter(d => d.score > 0).sort((a, b) => b.score - a.score).slice(0, 3);
    } catch (error) {
      console.error('Document search error:', error);
      return [];
    }
  };

  const searchFAQs = async (keywords: string[]): Promise<FAQ[]> => {
    if (keywords.length === 0 || !supabase) return [];

    try {
      const conditions = keywords.map(keyword =>
        `question.ilike.%${keyword}%,answer.ilike.%${keyword}%,category.ilike.%${keyword}%`
      ).join(',');

      const { data, error } = await supabase
        .from('faqs')
        .select('id, question, answer, category')
        .or(conditions)
        .limit(3);

      if (error) {
        console.error('FAQ search error:', error);
        return [];
      }

      // Score by relevance
      const scored = (data || []).map(faq => {
        let score = 0;
        keywords.forEach(keyword => {
          const lowerKeyword = keyword.toLowerCase();
          if (faq.category?.toLowerCase() === lowerKeyword) score += 10;
          if (faq.question?.toLowerCase().includes(lowerKeyword)) score += 5;
          if (faq.answer?.toLowerCase().includes(lowerKeyword)) score += 2;
        });
        return { ...faq, score };
      });

      return scored.filter(f => f.score > 0).sort((a, b) => b.score - a.score).slice(0, 3);
    } catch (error) {
      console.error('FAQ search error:', error);
      return [];
    }
  };

  const generateConversationalResponse = (
    query: string,
    keywords: string[],
    programs: Program[],
    documents: Document[],
    faqs: FAQ[]
  ): { content: string; options?: MessageOption[] } => {
    const t = translations[language];

    if (!isOnTopic(query)) {
      return {
        content: language === 'en' ? "I'm here to help with USDA Rural Development programs! I can provide detailed information about:\n\n🏠 Housing - Direct loans, guarantees, repair grants\n💼 Business - Financing, development grants, cooperatives\n📡 Broadband - ReConnect, Community Connect programs\n⚡ Energy - REAP grants, renewable energy systems\n💧 Water - Infrastructure loans and grants\n🏛️ Community - Healthcare, education, public facilities\n\nWhich area interests you most?" :
                 language === 'es' ? "¡Estoy aquí para ayudar con los programas de Desarrollo Rural del USDA! Puedo proporcionar información detallada sobre:\n\n🏠 Vivienda - Préstamos directos, garantías, subvenciones\n💼 Negocios - Financiamiento, subvenciones de desarrollo\n📡 Banda ancha - Programas ReConnect, Community Connect\n⚡ Energía - Subvenciones REAP, sistemas de energía renovable\n💧 Agua - Préstamos y subvenciones de infraestructura\n🏛️ Comunidad - Salud, educación, instalaciones públicas\n\n¿Qué área le interesa más?" :
                 language === 'zh' ? "我在这里帮助您了解美国农业部农村发展项目！我可以提供有关以下方面的详细信息：\n\n🏠 住房 - 直接贷款、担保、维修补助\n💼 商业 - 融资、发展补助、合作社\n📡 宽带 - ReConnect、Community Connect项目\n⚡ 能源 - REAP补助、可再生能源系统\n💧 水 - 基础设施贷款和补助\n🏛️ 社区 - 医疗、教育、公共设施\n\n您对哪个领域最感兴趣？" :
                 "Tôi ở đây để hỗ trợ các chương trình Phát triển Nông thôn USDA! Tôi có thể cung cấp thông tin chi tiết về:\n\n🏠 Nhà ở - Vay trực tiếp, bảo lãnh, trợ cấp sửa chữa\n💼 Kinh doanh - Tài chính, trợ cấp phát triển, hợp tác xã\n📡 Băng thông rộng - Chương trình ReConnect, Community Connect\n⚡ Năng lượng - Trợ cấp REAP, hệ thống năng lượng tái tạo\n💧 Nước - Vay và trợ cấp cơ sở hạ tầng\n🏛️ Cộng đồng - Y tế, giáo dục, cơ sở công cộng\n\nBạn quan tâm đến lĩnh vực nào nhất?"
      };
    }

    if (programs.length === 0 && documents.length === 0 && faqs.length === 0) {
      const mainKeyword = keywords[0] || 'that topic';
      return {
        content: language === 'en' ? `I understand you're interested in "${mainKeyword}". While I don't have specific matches right now, let me help you find what you need.\n\nCould you tell me more about:\n• Are you looking for loans or grants?\n• Is this for personal or business use?\n• What's your main goal?\n\nThis will help me find the best programs for you!` :
                 language === 'es' ? `Entiendo que está interesado en "${mainKeyword}". Aunque no tengo coincidencias específicas ahora mismo, permítame ayudarlo a encontrar lo que necesita.\n\n¿Podría decirme más sobre:\n• ¿Busca préstamos o subvenciones?\n• ¿Es para uso personal o comercial?\n• ¿Cuál es su objetivo principal?\n\n¡Esto me ayudará a encontrar los mejores programas para usted!` :
                 language === 'zh' ? `我明白您对"${mainKeyword}"感兴趣。虽然我现在没有具体匹配项，但让我帮您找到您需要的内容。\n\n您能告诉我更多关于：\n• 您在寻找贷款还是补助？\n• 这是用于个人还是商业用途？\n• 您的主要目标是什么？\n\n这将帮助我为您找到最好的项目！` :
                 `Tôi hiểu bạn quan tâm đến "${mainKeyword}". Mặc dù tôi không có kết quả phù hợp cụ thể ngay bây giờ, hãy để tôi giúp bạn tìm thấy những gì bạn cần.\n\nBạn có thể cho tôi biết thêm về:\n• Bạn đang tìm khoản vay hay trợ cấp?\n• Đây là cho mục đích cá nhân hay kinh doanh?\n• Mục tiêu chính của bạn là gì?\n\nĐiều này sẽ giúp tôi tìm các chương trình tốt nhất cho bạn!`
      };
    }

    const options: MessageOption[] = [];
    let response = '';

    // If only 1 FAQ matches, show full answer with personality
    if (faqs.length === 1) {
      const intro = language === 'en' ? 'Great question! Here\'s what I can tell you:\n\n' :
                    language === 'es' ? '¡Excelente pregunta! Esto es lo que puedo decirte:\n\n' :
                    language === 'zh' ? '很好的问题！这是我可以告诉你的：\n\n' :
                    'Câu hỏi hay! Đây là những gì tôi có thể nói với bạn:\n\n';
      response = intro + faqs[0].answer;
      if (programs.length > 0 || documents.length > 0) {
        response += '\n\n' + (language === 'en' ? '📚 I also found some helpful resources below that you might want to check out!' :
                               language === 'es' ? '📚 ¡También encontré algunos recursos útiles a continuación que quizás quieras revisar!' :
                               language === 'zh' ? '📚 我还找到了一些有用的资源，您可能想查看！' :
                               '📚 Tôi cũng tìm thấy một số tài nguyên hữu ích bên dưới mà bạn có thể muốn xem!');
      }
    } else if (faqs.length > 1) {
      response = language === 'en' ? 'I found several helpful answers for you! Click on any question below to see the full details:' :
                 language === 'es' ? '¡Encontré varias respuestas útiles para ti! Haz clic en cualquier pregunta a continuación para ver los detalles completos:' :
                 language === 'zh' ? '我为您找到了几个有用的答案！单击下面的任何问题以查看完整详细信息：' :
                 'Tôi tìm thấy một số câu trả lời hữu ích cho bạn! Nhấp vào bất kỳ câu hỏi nào bên dưới để xem chi tiết đầy đủ:';
    }

    // Add FAQs as options
    faqs.forEach((faq) => {
      options.push({
        id: faq.id,
        label: faq.question,
        type: 'faq',
        data: faq
      });
    });

    // If we have programs, add them as options with enthusiasm
    if (programs.length > 0) {
      if (!response) {
        response = language === 'en' ? `Perfect! I found ${programs.length} excellent program${programs.length > 1 ? 's' : ''} that ${programs.length > 1 ? 'match' : 'matches'} your needs. ${programs.length > 1 ? 'Click on any to learn more:' : 'Here\'s what I found:'}` :
                   language === 'es' ? `¡Perfecto! Encontré ${programs.length} programa${programs.length > 1 ? 's' : ''} excelente${programs.length > 1 ? 's' : ''} que ${programs.length > 1 ? 'coinciden' : 'coincide'} con tus necesidades. ${programs.length > 1 ? 'Haz clic en cualquiera para obtener más información:' : 'Esto es lo que encontré:'}` :
                   language === 'zh' ? `太好了！我找到了 ${programs.length} 个符合您需求的优秀项目。${programs.length > 1 ? '点击任何一个以了解更多信息：' : '这是我找到的：'}` :
                   `Tuyệt vời! Tôi tìm thấy ${programs.length} chương trình xuất sắc phù hợp với nhu cầu của bạn. ${programs.length > 1 ? 'Nhấp vào bất kỳ để tìm hiểu thêm:' : 'Đây là những gì tôi tìm thấy:'}`;
      }

      programs.forEach((program) => {
        options.push({
          id: program.id || program.title,
          label: program.title,
          type: 'program',
          data: program
        });
      });
    }

    // Add documents as options if any
    if (documents.length > 0) {
      documents.forEach((doc) => {
        options.push({
          id: doc.id,
          label: `${doc.title} (${doc.document_type})`,
          type: 'document',
          data: doc
        });
      });
    }

    return { content: response, options: options.length > 0 ? options : undefined };
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
      const [programs, documents, faqs] = await Promise.all([
        searchPrograms(keywords),
        searchDocuments(keywords),
        searchFAQs(keywords)
      ]);
      const { content: responseContent, options } = generateConversationalResponse(userMessage, keywords, programs, documents, faqs);

      // Simulate human-like typing delay
      const thinkingDelay = 800 + Math.random() * 700; // 800-1500ms
      await new Promise(resolve => setTimeout(resolve, thinkingDelay));

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date(),
        options,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setSelectedCategory(null);
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
    if (!file || !supabase) return;

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

      setLoading(true);

      // Simulate human-like thinking delay
      const thinkingDelay = 800 + Math.random() * 700; // 800-1500ms
      await new Promise(resolve => setTimeout(resolve, thinkingDelay));

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
      setLoading(false);
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

  const handleOptionClick = async (option: MessageOption) => {
    setLoading(true);

    // Simulate thinking delay
    const thinkingDelay = 600 + Math.random() * 400;
    await new Promise(resolve => setTimeout(resolve, thinkingDelay));

    let responseContent = '';

    if (option.type === 'faq') {
      const faq = option.data as FAQ;
      responseContent = faq.answer;
    } else if (option.type === 'program') {
      const program = option.data as Program;

      // Concise summary
      const desc = program.description || '';
      const shortDesc = desc.length > 200 ? desc.substring(0, 200) + '...' : desc;
      responseContent = `${program.title}\n\n${shortDesc}`;

      if (program.eligibility) {
        responseContent += `\n\n✓ Eligibility:\n${program.eligibility}`;
      }

      if (program.benefits) {
        responseContent += `\n\n🎯 Key Benefits:\n${program.benefits}`;
      }

      if (program.application_process) {
        responseContent += `\n\n📝 How to Apply:\n${program.application_process}`;
      }

      if (program.url) {
        responseContent += `\n\n🔗 Learn More: ${program.url}`;
      }

      responseContent += language === 'en' ? '\n\nNeed help with your application or have questions? Just ask!' :
                         language === 'es' ? '\n\n¿Necesitas ayuda con tu solicitud o tienes preguntas? ¡Sólo pregunta!' :
                         language === 'zh' ? '\n\n需要申请帮助或有问题吗？只管问！' :
                         '\n\nCần giúp đỡ với đơn đăng ký hoặc có câu hỏi? Cứ hỏi!';
    } else if (option.type === 'document') {
      const doc = option.data as Document;
      const intro = language === 'en' ? 'Here\'s the document you requested:\n\n' :
                    language === 'es' ? 'Aquí está el documento que solicitaste:\n\n' :
                    language === 'zh' ? '这是您请求的文档：\n\n' :
                    'Đây là tài liệu bạn yêu cầu:\n\n';
      responseContent = intro + `📄 ${doc.title}`;
      if (doc.description) {
        responseContent += `\n\n${doc.description}`;
      }
      responseContent += `\n\n⬇️ Download: ${doc.document_url}`;
      responseContent += language === 'en' ? '\n\nLet me know if you need help understanding any part of this document!' :
                         language === 'es' ? '\n\n¡Avísame si necesitas ayuda para entender alguna parte de este documento!' :
                         language === 'zh' ? '\n\n如果您需要帮助理解本文档的任何部分，请告诉我！' :
                         '\n\nHãy cho tôi biết nếu bạn cần giúp hiểu bất kỳ phần nào của tài liệu này!';
    }

    const assistantMsg: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: responseContent,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMsg]);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-100 flex items-center justify-center md:p-4">
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="fixed bottom-4 right-4 w-14 h-14 bg-slate-800 rounded-full flex items-center justify-center shadow-lg hover:bg-slate-700 transition-colors animate-slide-up"
          title="Open chat"
        >
          <img src="/img/owl_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg" alt="Chat" className="w-7 h-7" />
        </button>
      )}
      {isOpen && (
        <div
          ref={chatContainerRef}
          className={`w-full max-w-full md:max-w-md mx-auto md:absolute ${isClosing ? 'animate-slide-down' : 'animate-slide-up'}`}
          style={{
            left: position.x || undefined,
            top: position.y || undefined,
            transform: position.x ? 'none' : undefined,
            cursor: isDragging ? 'grabbing' : 'auto',
          }}
        >
          <div className="bg-white md:rounded-lg shadow-2xl overflow-hidden flex flex-col h-screen md:h-[600px] md:max-h-[90vh]">
          {/* Header */}
          <div
            className="bg-gradient-to-r from-slate-800 to-slate-700 px-3 py-2.5 flex items-center justify-between md:cursor-grab md:active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <img src="/img/usda-logo-and-lockups/USDA v2 lockup/white/usda-v2-white-lockup.svg" alt="USDA" className="h-5 md:h-6 max-w-[140px] md:max-w-none object-contain" />
            </div>
            <div className="flex items-center gap-1">
              <div className="relative" ref={languageMenuRef}>
                <button
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  className="text-white hover:text-gray-300 transition-colors p-1.5 rounded hover:bg-slate-600"
                  title="Change Language"
                >
                  <Globe size={18} className="w-[18px] h-[18px]" />
                </button>
                {showLanguageMenu && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl overflow-hidden z-50">
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
                className="text-white hover:text-gray-300 transition-colors p-1.5"
              >
                <X size={18} className="w-[18px] h-[18px]" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-3 space-y-4 md:space-y-3 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="flex-shrink-0">
                    <div className="w-7 h-7 bg-slate-800 rounded-full flex items-center justify-center">
                      <img src="/img/owl_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg" alt="Bot" className="w-4 h-4" />
                    </div>
                  </div>
                )}
                <div
                  className={`max-w-[85%] md:max-w-[75%] px-3 py-2 rounded-2xl relative ${
                    message.role === 'user'
                      ? 'bg-green-700 text-white'
                      : 'bg-white text-gray-800 shadow-sm border border-gray-200'
                  }`}
                  style={{
                    borderBottomRightRadius: message.role === 'user' ? '4px' : undefined,
                    borderBottomLeftRadius: message.role === 'assistant' ? '4px' : undefined,
                  }}
                >
                  <p className="text-sm whitespace-pre-wrap leading-relaxed break-words">
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
            {messages.length > 0 && messages[messages.length - 1].options && (
              <div className="flex flex-col gap-2 ml-8">
                {messages[messages.length - 1].options!.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleOptionClick(option)}
                    disabled={loading}
                    className="bg-white border-2 border-slate-800 text-slate-800 px-3 py-2 rounded-2xl text-sm text-left hover:bg-slate-800 hover:text-white transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed break-words"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
            {loading && (
              <div className="flex gap-2 justify-start">
                <div className="flex-shrink-0">
                  <div className="w-7 h-7 bg-slate-800 rounded-full flex items-center justify-center">
                    <img src="/img/owl_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg" alt="Bot" className="w-4 h-4" />
                  </div>
                </div>
                <div className="bg-white px-3 py-2 rounded-2xl shadow-sm border border-gray-200 relative" style={{ borderBottomLeftRadius: '4px' }}>
                  <div className="flex gap-1 items-end">
                    <div className="w-1.5 h-1.5 bg-slate-700 rounded-full thinking-dot"></div>
                    <div className="w-1.5 h-1.5 bg-slate-700 rounded-full thinking-dot"></div>
                    <div className="w-1.5 h-1.5 bg-slate-700 rounded-full thinking-dot"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Category Navigation Bar */}
          <div className="bg-white border-t border-gray-200 px-3 py-2 overflow-x-auto scrollbar-thin">
            <div className="flex gap-2 min-w-max">
              {ASSISTANCE_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={async () => {
                    if (loading) return;
                    setSelectedCategory(category.id);
                    const t = translations[language];
                    const categoryLabel = t.categories[category.id as keyof typeof t.categories];
                    const categoryQuery = `Tell me about ${categoryLabel.toLowerCase()} programs`;

                    const userMsg: Message = {
                      id: Date.now().toString(),
                      role: 'user',
                      content: categoryQuery,
                      timestamp: new Date(),
                    };

                    setMessages((prev) => [...prev, userMsg]);
                    setLoading(true);

                    try {
                      const keywords = extractKeywords(categoryQuery);
                      const [programs, documents, faqs] = await Promise.all([
                        searchPrograms(keywords),
                        searchDocuments(keywords),
                        searchFAQs(keywords)
                      ]);
                      const { content: responseContent, options } = generateConversationalResponse(categoryQuery, keywords, programs, documents, faqs);

                      const thinkingDelay = 800 + Math.random() * 700;
                      await new Promise(resolve => setTimeout(resolve, thinkingDelay));

                      const assistantMsg: Message = {
                        id: (Date.now() + 1).toString(),
                        role: 'assistant',
                        content: responseContent,
                        timestamp: new Date(),
                        options,
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
                  }}
                  disabled={loading}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                    selectedCategory === category.id
                      ? 'bg-slate-800 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed'
                  }`}
                >
                  <span className="text-base">{category.icon}</span>
                  <span>{translations[language].categories[category.id as keyof typeof translations[typeof language]['categories']]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-200">
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
                className="text-blue-600 hover:text-blue-700 disabled:text-gray-400 transition-colors p-1.5 rounded-full hover:bg-blue-50 flex-shrink-0"
                title={translations[language].uploadFile}
              >
                {uploadingFile ? (
                  <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Upload size={18} className="w-[18px] h-[18px]" />
                )}
              </button>
              <div className="flex-1 relative min-w-0">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={translations[language].placeholder}
                  disabled={loading}
                  className="w-full px-3 py-2 pr-10 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 text-sm"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="text-blue-600 hover:text-blue-700 disabled:text-gray-400 transition-colors"
                  >
                    <Send size={18} className="w-[18px] h-[18px]" />
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

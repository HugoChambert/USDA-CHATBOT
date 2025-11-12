export type Language = 'en' | 'es' | 'zh' | 'vi';

export interface Translations {
  greeting: string;
  placeholder: string;
  uploadFile: string;
  offTopic: string;
  noResults: string;
  foundPrograms: string;
  moreDetails: string;
  errorMessage: string;
  categories: {
    housing: string;
    business: string;
    broadband: string;
    energy: string;
    water: string;
    community: string;
  };
  languages: {
    en: string;
    es: string;
    zh: string;
    vi: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    greeting: 'Hello! I\'m your USDA Rural Development assistant.\n\nI can help you discover programs and resources for:\n• Housing loans and grants\n• Business financing and development\n• Broadband and telecommunications\n• Renewable energy programs\n• Water and wastewater systems\n• Community facilities\n\nUse the categories above or ask me anything!',
    placeholder: 'Message...',
    uploadFile: 'Upload File',
    offTopic: "I'm specifically designed to help with USDA Rural Development programs. I can answer questions about housing, business development, broadband, energy, water systems, and community facilities in rural areas. What would you like to know about these topics?",
    noResults: "I understand you're asking about {keyword}, but I couldn't find specific matching programs in my database. Here's what I can help you with:\n\n• Housing: Direct loans, loan guarantees, repair grants\n• Business: Loan guarantees, development grants, cooperatives\n• Broadband: ReConnect, Community Connect programs\n• Energy: Rural Energy for America Program (REAP)\n• Water: Water and waste disposal loans and grants\n• Community: Facilities loans and grants\n\nCould you rephrase your question or ask about one of these areas?",
    foundPrograms: 'Great question! I found {count} relevant program{plural} that might help:',
    moreDetails: '\n\nNeed more information? Just ask!',
    errorMessage: 'I apologize, but I encountered an error processing your question. Please try asking again.',
    categories: {
      housing: 'Housing',
      business: 'Business',
      broadband: 'Broadband',
      energy: 'Energy',
      water: 'Water',
      community: 'Community'
    },
    languages: {
      en: 'English',
      es: 'Español',
      zh: '中文',
      vi: 'Tiếng Việt'
    }
  },
  es: {
    greeting: '¡Hola! Soy tu asistente de Desarrollo Rural del USDA.\n\nPuedo ayudarte a descubrir programas y recursos para:\n• Préstamos y subvenciones de vivienda\n• Financiamiento y desarrollo empresarial\n• Banda ancha y telecomunicaciones\n• Programas de energía renovable\n• Sistemas de agua y aguas residuales\n• Instalaciones comunitarias\n\n¡Usa las categorías arriba o pregúntame lo que quieras!',
    placeholder: 'Mensaje...',
    uploadFile: 'Subir Archivo',
    offTopic: 'Estoy específicamente diseñado para ayudar con los programas de Desarrollo Rural del USDA. Puedo responder preguntas sobre vivienda, desarrollo empresarial, banda ancha, energía, sistemas de agua e instalaciones comunitarias en áreas rurales. ¿Qué te gustaría saber sobre estos temas?',
    noResults: 'Entiendo que preguntas sobre {keyword}, pero no pude encontrar programas específicos en mi base de datos. Esto es con lo que puedo ayudarte:\n\n• Vivienda: Préstamos directos, garantías de préstamos, subvenciones para reparaciones\n• Negocios: Garantías de préstamos, subvenciones de desarrollo, cooperativas\n• Banda ancha: Programas ReConnect, Community Connect\n• Energía: Programa de Energía Rural para América (REAP)\n• Agua: Préstamos y subvenciones para eliminación de agua y desechos\n• Comunidad: Préstamos y subvenciones para instalaciones\n\n¿Podrías reformular tu pregunta o preguntar sobre una de estas áreas?',
    foundPrograms: '¡Excelente pregunta! Encontré {count} programa{plural} relevante{plural} que podría{pluralVerb} ayudar:',
    moreDetails: '\n\n¿Necesitas más información? ¡Solo pregunta!',
    errorMessage: 'Me disculpo, pero encontré un error al procesar tu pregunta. Por favor intenta preguntar de nuevo.',
    categories: {
      housing: 'Vivienda',
      business: 'Negocios',
      broadband: 'Banda Ancha',
      energy: 'Energía',
      water: 'Agua',
      community: 'Comunidad'
    },
    languages: {
      en: 'English',
      es: 'Español',
      zh: '中文',
      vi: 'Tiếng Việt'
    }
  },
  zh: {
    greeting: '你好！我是你的美国农业部农村发展助手。\n\n我可以帮助您发现以下项目和资源：\n• 住房贷款和补助\n• 商业融资和发展\n• 宽带和电信\n• 可再生能源项目\n• 供水和废水系统\n• 社区设施\n\n使用上面的类别或问我任何问题！',
    placeholder: '消息...',
    uploadFile: '上传文件',
    offTopic: '我专门帮助处理美国农业部农村发展项目。我可以回答有关农村地区的住房、商业发展、宽带、能源、供水系统和社区设施的问题。您想了解这些主题的什么内容？',
    noResults: '我明白您在询问{keyword}，但我在数据库中找不到特定的匹配程序。以下是我可以帮助您的内容：\n\n• 住房：直接贷款、贷款担保、维修补助\n• 商业：贷款担保、发展补助、合作社\n• 宽带：ReConnect、Community Connect项目\n• 能源：美国农村能源项目（REAP）\n• 水：供水和废物处理贷款及补助\n• 社区：设施贷款和补助\n\n您能重新表述您的问题或询问这些领域之一吗？',
    foundPrograms: '好问题！我找到了{count}个可能有帮助的相关项目：',
    moreDetails: '\n\n需要更多信息吗？请随时提问！',
    errorMessage: '抱歉，我在处理您的问题时遇到了错误。请再试一次。',
    categories: {
      housing: '住房',
      business: '商业',
      broadband: '宽带',
      energy: '能源',
      water: '水',
      community: '社区'
    },
    languages: {
      en: 'English',
      es: 'Español',
      zh: '中文',
      vi: 'Tiếng Việt'
    }
  },
  vi: {
    greeting: 'Xin chào! Tôi là trợ lý Phát triển Nông thôn USDA của bạn.\n\nTôi có thể giúp bạn khám phá các chương trình và tài nguyên cho:\n• Các khoản vay và trợ cấp nhà ở\n• Tài chính và phát triển kinh doanh\n• Băng thông rộng và viễn thông\n• Các chương trình năng lượng tái tạo\n• Hệ thống nước và nước thải\n• Cơ sở vật chất cộng đồng\n\nSử dụng các danh mục ở trên hoặc hỏi tôi bất cứ điều gì!',
    placeholder: 'Tin nhắn...',
    uploadFile: 'Tải Lên Tệp',
    offTopic: 'Tôi được thiết kế đặc biệt để hỗ trợ các chương trình Phát triển Nông thôn USDA. Tôi có thể trả lời các câu hỏi về nhà ở, phát triển kinh doanh, băng thông rộng, năng lượng, hệ thống nước và cơ sở vật chất cộng đồng ở các khu vực nông thôn. Bạn muốn biết gì về các chủ đề này?',
    noResults: 'Tôi hiểu bạn đang hỏi về {keyword}, nhưng tôi không thể tìm thấy các chương trình phù hợp cụ thể trong cơ sở dữ liệu của mình. Đây là những gì tôi có thể giúp bạn:\n\n• Nhà ở: Các khoản vay trực tiếp, bảo lãnh vay, trợ cấp sửa chữa\n• Kinh doanh: Bảo lãnh vay, trợ cấp phát triển, hợp tác xã\n• Băng thông rộng: Các chương trình ReConnect, Community Connect\n• Năng lượng: Chương trình Năng lượng Nông thôn cho Mỹ (REAP)\n• Nước: Các khoản vay và trợ cấp xử lý nước và chất thải\n• Cộng đồng: Các khoản vay và trợ cấp cho cơ sở vật chất\n\nBạn có thể diễn đạt lại câu hỏi hoặc hỏi về một trong các lĩnh vực này không?',
    foundPrograms: 'Câu hỏi hay! Tôi đã tìm thấy {count} chương trình liên quan có thể giúp ích:',
    moreDetails: '\n\nCần thêm thông tin? Cứ hỏi nhé!',
    errorMessage: 'Tôi xin lỗi, nhưng tôi gặp lỗi khi xử lý câu hỏi của bạn. Vui lòng thử hỏi lại.',
    categories: {
      housing: 'Nhà ở',
      business: 'Kinh doanh',
      broadband: 'Băng thông rộng',
      energy: 'Năng lượng',
      water: 'Nước',
      community: 'Cộng đồng'
    },
    languages: {
      en: 'English',
      es: 'Español',
      zh: '中文',
      vi: 'Tiếng Việt'
    }
  }
};

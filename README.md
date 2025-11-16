USDA Chatbot

A beautiful, production-ready chatbot interface for querying USDA Rural Development programs. Built with React, TypeScript, Tailwind CSS, and Supabase.

📁 Project Structure

usda-chatbot/
├── src/
│   ├── App.tsx          (Main chatbot component)
│   ├── main.tsx         (Entry point)
│   └── index.css        (Tailwind imports)
├── index.html           (HTML template)
├── package.json         (Dependencies)
├── vite.config.ts       (Vite config)
├── tailwind.config.js   (Tailwind config)
├── tsconfig.json        (TypeScript config)
├── tsconfig.app.json    (TypeScript app config)
└── .env                 (Environment variables)

📝 Features

Smart keyword detection: Automatically detects USDA-related topics
Database search: Queries Supabase for relevant programs
Conversational responses: Provides helpful, contextual answers
Floating widget: Can be opened and closed
Responsive design: Works on all screen sizes
Loading states: Animated indicators for better UX
Error handling: Graceful error messages

🛠️ Technologies Used
React 18 - UI framework
TypeScript - Type safety
Vite - Build tool
Tailwind CSS - Styling
Supabase - Database and backend
Lucide React - Icons
📦 Dependencies

Production

@supabase/supabase-js - Supabase client
lucide-react - Icon library
react & react-dom - React framework
Development

@vitejs/plugin-react - Vite React plugin
tailwindcss - CSS framework
typescript - TypeScript compiler
autoprefixer & postcss - CSS processing

🎯 How It Works
User Input: User types a question about USDA programs
Keyword Extraction: System extracts relevant keywords from the query
Database Search: Searches the usda_programs table using extracted keywords
Response Generation: Creates a conversational response with matching programs
Display: Shows formatted results with program details and links

🔒 Security Notes
Never commit your .env file to version control
Keep your Supabase keys secure
Use Row Level Security (RLS) policies in Supabase for production

📄 License
MIT License - Feel free to use this project for your own purposes.

🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

📧 Support
For questions or issues, please open an issue on GitHub.

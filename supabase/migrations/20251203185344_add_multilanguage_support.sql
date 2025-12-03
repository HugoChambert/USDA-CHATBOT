/*
  # Add Multi-Language Support

  1. Changes to programs table
    - Add title_es, title_zh, title_vi for Spanish, Chinese, Vietnamese titles
    - Add description_es, description_zh, description_vi for translated descriptions
  
  2. Changes to faqs table
    - Add question_es, question_zh, question_vi for translated questions
    - Add answer_es, answer_zh, answer_vi for translated answers
  
  3. Purpose
    - Enable the chatbot to display content in Spanish, Chinese, and Vietnamese
    - Support multi-language user interface
*/

-- Add language columns to programs table
ALTER TABLE programs 
ADD COLUMN IF NOT EXISTS title_es TEXT,
ADD COLUMN IF NOT EXISTS title_zh TEXT,
ADD COLUMN IF NOT EXISTS title_vi TEXT,
ADD COLUMN IF NOT EXISTS description_es TEXT,
ADD COLUMN IF NOT EXISTS description_zh TEXT,
ADD COLUMN IF NOT EXISTS description_vi TEXT;

-- Add language columns to faqs table
ALTER TABLE faqs 
ADD COLUMN IF NOT EXISTS question_es TEXT,
ADD COLUMN IF NOT EXISTS question_zh TEXT,
ADD COLUMN IF NOT EXISTS question_vi TEXT,
ADD COLUMN IF NOT EXISTS answer_es TEXT,
ADD COLUMN IF NOT EXISTS answer_zh TEXT,
ADD COLUMN IF NOT EXISTS answer_vi TEXT;
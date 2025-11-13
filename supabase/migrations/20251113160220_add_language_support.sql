/*
  # Add Language Support to Resources

  1. Changes
    - Add `language` column to `faqs` table (default 'en')
    - Add `language` column to `documents` table (default 'en')
    - Add `language` column to `programs` table (default 'en')
    - Create indexes on language columns for fast filtering
  
  2. Purpose
    - Support multilingual content (English, Spanish, Chinese, Vietnamese)
    - Allow users to access resources in their preferred language
    - Maintain separate content for each language
*/

-- Add language column to faqs table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'faqs' AND column_name = 'language'
  ) THEN
    ALTER TABLE faqs ADD COLUMN language text DEFAULT 'en' NOT NULL;
  END IF;
END $$;

-- Add language column to documents table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'documents' AND column_name = 'language'
  ) THEN
    ALTER TABLE documents ADD COLUMN language text DEFAULT 'en' NOT NULL;
  END IF;
END $$;

-- Add language column to programs table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'programs' AND column_name = 'language'
  ) THEN
    ALTER TABLE programs ADD COLUMN language text DEFAULT 'en' NOT NULL;
  END IF;
END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_faqs_language ON faqs(language);
CREATE INDEX IF NOT EXISTS idx_documents_language ON documents(language);
CREATE INDEX IF NOT EXISTS idx_programs_language ON programs(language);

-- Add check constraints to ensure valid language codes
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'faqs_language_check'
  ) THEN
    ALTER TABLE faqs ADD CONSTRAINT faqs_language_check 
    CHECK (language IN ('en', 'es', 'zh', 'vi'));
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'documents_language_check'
  ) THEN
    ALTER TABLE documents ADD CONSTRAINT documents_language_check 
    CHECK (language IN ('en', 'es', 'zh', 'vi'));
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'programs_language_check'
  ) THEN
    ALTER TABLE programs ADD CONSTRAINT programs_language_check 
    CHECK (language IN ('en', 'es', 'zh', 'vi'));
  END IF;
END $$;

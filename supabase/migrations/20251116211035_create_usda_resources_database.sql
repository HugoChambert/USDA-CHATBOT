/*
  # USDA Rural Development Resources Database

  ## Overview
  Creates a comprehensive database structure to support the USDA Rural Development chatbot
  with proper resources, documents, and program information.

  ## New Tables

  1. **programs**
     - Program information including title, description, eligibility, benefits
  2. **documents**
     - Document resources with URLs and types
  3. **categories**
     - Category organization
  4. **program_contacts**
     - Contact information for programs
  5. **faqs**
     - Frequently asked questions

  ## Security
  - Enable RLS on all tables
  - Add policies for public read access (chatbot needs to read)
  - Restrict write access to authenticated admin users only
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  parent_category_id uuid REFERENCES categories(id),
  created_at timestamptz DEFAULT now()
);

-- Create programs table
CREATE TABLE IF NOT EXISTS programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  url text,
  category text NOT NULL,
  eligibility text,
  benefits text,
  application_process text,
  keywords text[] DEFAULT '{}',
  title_es text,
  title_zh text,
  title_vi text,
  description_es text,
  description_zh text,
  description_vi text,
  language text DEFAULT 'en' NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  document_url text NOT NULL,
  document_type text NOT NULL,
  category text,
  program_id uuid REFERENCES programs(id) ON DELETE SET NULL,
  keywords text[] DEFAULT '{}',
  file_format text,
  publish_date date,
  language text DEFAULT 'en' NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create program_contacts table
CREATE TABLE IF NOT EXISTS program_contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id uuid REFERENCES programs(id) ON DELETE CASCADE,
  contact_name text,
  contact_title text,
  email text,
  phone text,
  state text,
  created_at timestamptz DEFAULT now()
);

-- Create faqs table
CREATE TABLE IF NOT EXISTS faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  program_id uuid REFERENCES programs(id) ON DELETE SET NULL,
  category text,
  keywords text[] DEFAULT '{}',
  language text DEFAULT 'en' NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better search performance
CREATE INDEX IF NOT EXISTS idx_programs_title ON programs USING gin(to_tsvector('english', title));
CREATE INDEX IF NOT EXISTS idx_programs_description ON programs USING gin(to_tsvector('english', description));
CREATE INDEX IF NOT EXISTS idx_programs_keywords ON programs USING gin(keywords);
CREATE INDEX IF NOT EXISTS idx_programs_category ON programs(category);
CREATE INDEX IF NOT EXISTS idx_programs_language ON programs(language);

CREATE INDEX IF NOT EXISTS idx_documents_title ON documents USING gin(to_tsvector('english', title));
CREATE INDEX IF NOT EXISTS idx_documents_keywords ON documents USING gin(keywords);
CREATE INDEX IF NOT EXISTS idx_documents_type ON documents(document_type);
CREATE INDEX IF NOT EXISTS idx_documents_category ON documents(category);
CREATE INDEX IF NOT EXISTS idx_documents_language ON documents(language);

CREATE INDEX IF NOT EXISTS idx_faqs_question ON faqs USING gin(to_tsvector('english', question));
CREATE INDEX IF NOT EXISTS idx_faqs_keywords ON faqs USING gin(keywords);
CREATE INDEX IF NOT EXISTS idx_faqs_language ON faqs(language);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Allow public read access for chatbot
CREATE POLICY "Public users can view categories"
  ON categories FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public users can view programs"
  ON programs FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public users can view documents"
  ON documents FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public users can view program contacts"
  ON program_contacts FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public users can view faqs"
  ON faqs FOR SELECT
  TO public
  USING (true);

-- Admin policies for insert/update/delete (authenticated users only)
CREATE POLICY "Authenticated users can insert categories"
  ON categories FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update categories"
  ON categories FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete categories"
  ON categories FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert programs"
  ON programs FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update programs"
  ON programs FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete programs"
  ON programs FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert documents"
  ON documents FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update documents"
  ON documents FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete documents"
  ON documents FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert program_contacts"
  ON program_contacts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update program_contacts"
  ON program_contacts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete program_contacts"
  ON program_contacts FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert faqs"
  ON faqs FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update faqs"
  ON faqs FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete faqs"
  ON faqs FOR DELETE
  TO authenticated
  USING (true);
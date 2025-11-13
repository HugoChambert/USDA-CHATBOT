/*
  # USDA Rural Development Resources Database

  ## Overview
  Creates a comprehensive database structure to support the USDA Rural Development chatbot
  with proper resources, documents, and program information.

  ## New Tables

  1. **programs**
     - `id` (uuid, primary key)
     - `title` (text, not null) - Program name
     - `description` (text) - Detailed program description
     - `url` (text) - Link to program information
     - `category` (text, not null) - Program category
     - `eligibility` (text) - Eligibility requirements
     - `benefits` (text) - Program benefits
     - `application_process` (text) - How to apply
     - `keywords` (text[]) - Searchable keywords array
     - `created_at` (timestamptz)
     - `updated_at` (timestamptz)

  2. **documents**
     - `id` (uuid, primary key)
     - `title` (text, not null)
     - `description` (text)
     - `document_url` (text, not null)
     - `document_type` (text, not null) - bulletin, handbook, factsheet, form, etc.
     - `category` (text)
     - `program_id` (uuid, foreign key to programs)
     - `keywords` (text[])
     - `file_format` (text) - pdf, doc, xls, etc.
     - `publish_date` (date)
     - `created_at` (timestamptz)
     - `updated_at` (timestamptz)

  3. **categories**
     - `id` (uuid, primary key)
     - `name` (text, unique, not null)
     - `description` (text)
     - `parent_category_id` (uuid, foreign key to categories)
     - `created_at` (timestamptz)

  4. **program_contacts**
     - `id` (uuid, primary key)
     - `program_id` (uuid, foreign key to programs)
     - `contact_name` (text)
     - `contact_title` (text)
     - `email` (text)
     - `phone` (text)
     - `state` (text)
     - `created_at` (timestamptz)

  5. **faqs**
     - `id` (uuid, primary key)
     - `question` (text, not null)
     - `answer` (text, not null)
     - `program_id` (uuid, foreign key to programs)
     - `category` (text)
     - `keywords` (text[])
     - `created_at` (timestamptz)
     - `updated_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Add policies for public read access (chatbot needs to read)
  - Restrict write access to authenticated admin users only

  ## Indexes
  - Add indexes for faster text search on titles, descriptions, and keywords
  - Add GIN indexes for array columns (keywords)
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
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better search performance
CREATE INDEX IF NOT EXISTS idx_programs_title ON programs USING gin(to_tsvector('english', title));
CREATE INDEX IF NOT EXISTS idx_programs_description ON programs USING gin(to_tsvector('english', description));
CREATE INDEX IF NOT EXISTS idx_programs_keywords ON programs USING gin(keywords);
CREATE INDEX IF NOT EXISTS idx_programs_category ON programs(category);

CREATE INDEX IF NOT EXISTS idx_documents_title ON documents USING gin(to_tsvector('english', title));
CREATE INDEX IF NOT EXISTS idx_documents_keywords ON documents USING gin(keywords);
CREATE INDEX IF NOT EXISTS idx_documents_type ON documents(document_type);
CREATE INDEX IF NOT EXISTS idx_documents_category ON documents(category);

CREATE INDEX IF NOT EXISTS idx_faqs_question ON faqs USING gin(to_tsvector('english', question));
CREATE INDEX IF NOT EXISTS idx_faqs_keywords ON faqs USING gin(keywords);

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
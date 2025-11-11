# USDA Rural Development Chatbot Database Guide

## Overview

The chatbot now uses a comprehensive database structure to provide users with detailed information about USDA Rural Development programs, documents, and resources.

## Database Structure

### Tables

#### 1. **programs**
Stores information about USDA programs and services.

**Columns:**
- `id` (uuid) - Primary key
- `title` (text) - Program name
- `description` (text) - Detailed program description
- `url` (text) - Link to program webpage
- `category` (text) - Program category (Housing, Business, Utilities, etc.)
- `eligibility` (text) - Who can apply and eligibility requirements
- `benefits` (text) - Program benefits and advantages
- `application_process` (text) - How to apply
- `keywords` (text[]) - Searchable keywords array
- `created_at` (timestamptz) - Record creation timestamp
- `updated_at` (timestamptz) - Last update timestamp

#### 2. **documents**
Stores bulletins, handbooks, fact sheets, and other resources.

**Columns:**
- `id` (uuid) - Primary key
- `title` (text) - Document title
- `description` (text) - Document description
- `document_url` (text) - Direct link to PDF/file
- `document_type` (text) - Type: bulletin, handbook, factsheet, form
- `category` (text) - Document category
- `program_id` (uuid) - Foreign key to programs table
- `keywords` (text[]) - Searchable keywords
- `file_format` (text) - pdf, doc, xls, etc.
- `publish_date` (date) - Publication date
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

#### 3. **faqs**
Frequently asked questions and answers.

**Columns:**
- `id` (uuid) - Primary key
- `question` (text) - The question
- `answer` (text) - The answer
- `program_id` (uuid) - Related program (optional)
- `category` (text) - FAQ category
- `keywords` (text[]) - Searchable keywords
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

#### 4. **categories**
Hierarchical category structure.

**Columns:**
- `id` (uuid) - Primary key
- `name` (text) - Category name
- `description` (text) - Category description
- `parent_category_id` (uuid) - Parent category for hierarchy
- `created_at` (timestamptz)

#### 5. **program_contacts**
Contact information for programs.

**Columns:**
- `id` (uuid) - Primary key
- `program_id` (uuid) - Related program
- `contact_name` (text) - Contact person name
- `contact_title` (text) - Job title
- `email` (text) - Email address
- `phone` (text) - Phone number
- `state` (text) - State/region
- `created_at` (timestamptz)

## Search Capabilities

The chatbot searches across multiple tables simultaneously:

1. **Programs** - Searches title, description, eligibility, benefits, category
2. **Documents** - Searches title, description, document type, category
3. **FAQs** - Searches questions and answers

All searches support:
- Case-insensitive matching
- Partial word matching
- Multiple keyword support
- Full-text search with PostgreSQL indexes

## Adding New Data

### Add a New Program

```sql
INSERT INTO programs (title, description, url, category, eligibility, benefits, application_process, keywords)
VALUES (
  'Program Name',
  'Detailed description of what the program does...',
  'https://www.rd.usda.gov/programs/...',
  'Category Name',
  'Who can apply and requirements...',
  'Benefits provided by the program...',
  'How to apply for this program...',
  ARRAY['keyword1', 'keyword2', 'keyword3']
);
```

### Add a Document

```sql
INSERT INTO documents (title, description, document_url, document_type, category, keywords, file_format)
VALUES (
  'Bulletin 1234-5',
  'Description of bulletin contents',
  'https://www.rd.usda.gov/media/file/download/bulletin-1234-5.pdf',
  'bulletin',
  'Bulletins',
  ARRAY['keyword1', 'keyword2'],
  'pdf'
);
```

### Add an FAQ

```sql
INSERT INTO faqs (question, answer, category, keywords)
VALUES (
  'How do I apply for a loan?',
  'To apply for a loan, contact your local USDA office...',
  'General',
  ARRAY['loan', 'apply', 'application', 'how to']
);
```

## Current Categories

- Bulletins
- Fact Sheets
- Handbooks
- Program Matrix
- Programs & Services
- Housing Programs
- Business Programs
- Utility Programs
- Community Facilities
- Energy Programs

## Chatbot Features

The chatbot now provides:

1. **Program Information** - Details about USDA programs including eligibility and benefits
2. **Document Links** - Direct links to bulletins, handbooks, and fact sheets
3. **FAQ Answers** - Quick answers to common questions
4. **Multi-language Support** - English, Spanish, Chinese, Vietnamese
5. **Smart Search** - Searches across all resources simultaneously

## Security

- All tables use Row Level Security (RLS)
- Public users can read all data (for chatbot access)
- Only authenticated admin users can insert/update/delete records
- No sensitive data is stored in these tables

## Performance Optimization

The database includes several indexes for fast searching:
- Full-text search indexes on title and description fields
- GIN indexes on keyword arrays
- Category indexes for filtering

## Maintenance

To keep the chatbot effective:

1. Regularly add new programs as they become available
2. Update document links when bulletins are revised
3. Add FAQs based on common user questions
4. Keep keywords up to date for better search results
5. Archive outdated programs or documents

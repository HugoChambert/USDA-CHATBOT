import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

const supabaseUrl = 'https://0ec90b57d6e95fcbda19832f.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2x0IiwicmVmIjoiMGVjOTBiNTdkNmU5NWZjYmRhMTk4MzJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODE1NzQsImV4cCI6MTc1ODg4MTU3NH0.9I8-U0x86Ak8t2DGaIk0HfvTSLsAyzdnz-Nw00mMkKw';
const supabase = createClient(supabaseUrl, supabaseKey);

async function importDocuments() {
  console.log('Loading data.json...');
  const data = JSON.parse(readFileSync('./data.json', 'utf8'));
  console.log(`Found ${data.length} documents to import`);

  const documents = data.map(doc => ({
    title: doc.t || '',
    description: doc.u || null,
    document_url: doc.d || '',
    document_type: doc.d && doc.d.includes('.pdf') ? 'PDF' : 'Document',
    category: doc.c || 'General',
    keywords: []
  }));

  // Import in batches of 100
  const batchSize = 100;
  let totalImported = 0;

  for (let i = 0; i < documents.length; i += batchSize) {
    const batch = documents.slice(i, i + batchSize);
    console.log(`Importing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(documents.length / batchSize)}...`);

    try {
      const { data: result, error } = await supabase
        .from('documents')
        .insert(batch);

      if (error) {
        console.error(`Error in batch ${Math.floor(i / batchSize) + 1}:`, error.message);
      } else {
        totalImported += batch.length;
        console.log(`✓ Imported ${batch.length} documents (Total: ${totalImported}/${documents.length})`);
      }
    } catch (error) {
      console.error(`Exception in batch ${Math.floor(i / batchSize) + 1}:`, error.message);
    }
  }

  console.log(`\n✓ Import complete! Imported ${totalImported} documents`);
}

importDocuments().catch(console.error);

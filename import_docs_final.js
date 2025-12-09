const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://yakentlojgvnqyzbhpeb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlha2VudGxvamd2bnF5emJocGViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM2NTc4MzgsImV4cCI6MjA0OTIzMzgzOH0.Ygc5n-IAMXY3OC7EKkrvFcnp7Hx4aDEqUe4XqI7j850';
const supabase = createClient(supabaseUrl, supabaseKey);

async function executeBatch(batchNum) {
  console.log(`Importing batch ${batchNum}...`);

  const sql = fs.readFileSync(`/tmp/batch${batchNum}_fixed.sql`, 'utf8');

  try {
    const { data, error } = await supabase.rpc('exec_sql', { query: sql });

    if (error) {
      console.error(`✗ Batch ${batchNum} failed:`, error.message);
      return false;
    }

    console.log(`✓ Batch ${batchNum} imported successfully`);
    return true;
  } catch (err) {
    console.error(`✗ Batch ${batchNum} exception:`, err.message);
    return false;
  }
}

async function main() {
  for (let i = 2; i <= 5; i++) {
    await executeBatch(i);
  }

  const { count: totalDocs } = await supabase
    .from('documents')
    .select('*', { count: 'exact', head: true });

  console.log(`\nTotal documents in database: ${totalDocs}`);
}

main();

import json
from supabase import create_client
import os

# Get Supabase credentials from .env
url = os.getenv('VITE_SUPABASE_URL')
key = os.getenv('VITE_SUPABASE_ANON_KEY')

if not url or not key:
    print("Error: Supabase credentials not found in environment")
    exit(1)

supabase = create_client(url, key)

# Read and process data.json
with open('/tmp/cc-agent/60281312/project/data.json', 'r') as f:
    data = json.load(f)

documents = []
for item in data:
    title = item.get('t', '')
    desc = item.get('u')
    url_val = item.get('d')
    category = item.get('c', 'General')
    
    if not url_val or url_val in ['Download PDF', '', 'Overview']:
        continue
    
    cat_map = {
        'Bulletins': 'Utilities',
        'Fact Sheets': 'General',
        'Handbooks': 'Housing',
        'Program Matrix': 'General',
        'Programs & Services': 'General',
        'Virginia Contacts': 'General'
    }
    mapped_cat = cat_map.get(category, 'General')
    
    documents.append({
        'title': title,
        'description': desc,
        'document_url': url_val,
        'document_type': category,
        'category': mapped_cat,
        'language': 'en'
    })

# Insert in batches of 50
batch_size = 50
for i in range(0, len(documents), batch_size):
    batch = documents[i:i+batch_size]
    try:
        result = supabase.table('documents').insert(batch).execute()
        print(f"Inserted batch {i//batch_size + 1}: {len(batch)} documents")
    except Exception as e:
        print(f"Error inserting batch {i//batch_size + 1}: {e}")

print(f"\nTotal documents inserted: {len(documents)}")

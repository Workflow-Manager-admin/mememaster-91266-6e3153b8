# Supabase Integration for Meme Generator

This React project uses Supabase as its backend for:
- Hosting meme templates (via 'meme_templates' table, each row: `{ url: string }`)
- Potential storage for user uploads (optional, currently not activated in code)
- Easy extensibility for registration or cloud storage for created memes

## How to integrate

1. Ensure the following keys are present in `.env`/environment:
    - REACT_APP_SUPABASE_URL
    - REACT_APP_SUPABASE_KEY

2. The Supabase client is initialized at `src/App.js` as:
```js
import { createClient } from '@supabase/supabase-js';
export const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_KEY);
```

3. Meme templates are sourced from a public table called `meme_templates` in Supabase (see `MemeTemplatesSidebar.js`). Images are currently fetched via public URLs.

> ⚠️ **IMPORTANT:** Due to project platform restrictions, you must manually create the required table in your Supabase project (if not already present):
> - Table name: `meme_templates`
> - Columns: `url` (type: text, required)
> Create this via the Supabase web dashboard under Table Editor.

4. To enable saving memes or uploading images to storage:
    - Use `supabase.storage.from('bucket_name').upload(file_path, file)` as per documentation.

5. No user authentication is required for the public meme generator; to add saved user history, see Supabase Auth docs.

## Notes
- The app gracefully falls back to a static template set if the Supabase template list fetch fails.

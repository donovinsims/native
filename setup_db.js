import postgres from 'postgres';

const sql = postgres('postgresql://postgres.adhwmqqzheqkgibttioi:WQUKRSNT7glac3kVIvyv0fL14gYxJwLbJ7qnbly4aYb3aS5byDX5nIvoc9DHrmDi@aws-1-us-east-2.pooler.supabase.com:5432/postgres');

async function setup() {
  console.log('Setting up database schema...');
  
  try {
    // Create apps table
    await sql`
      CREATE TABLE IF NOT EXISTS apps (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        description TEXT,
        short_description TEXT,
        category TEXT,
        platforms TEXT[],
        pricing TEXT,
        developer TEXT,
        last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        website_url TEXT,
        favicon_url TEXT,
        preview_image TEXT,
        about TEXT,
        features TEXT[],
        related_app_ids UUID[],
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;
    console.log('Table "apps" ensured.');

    // Check if table is empty
    const countResult = await sql`SELECT count(*) FROM apps`;
    const count = parseInt(countResult[0].count);

    if (count === 0) {
      console.log('Seeding initial data...');
      const initialApps = [
        {
          title: 'Figma',
          description: 'The collaborative interface design tool.',
          short_description: 'Design, prototype, and gather feedback all in one place.',
          category: 'Design',
          platforms: ['Web', 'macOS', 'Windows', 'iOS', 'Android'],
          pricing: 'Free / Subscription',
          developer: 'Figma, Inc.',
          website_url: 'https://figma.com',
          favicon_url: 'https://www.figma.com/favicon.ico',
          preview_image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
          about: 'Figma is a collaborative web application for interface design, with additional offline features enabled by desktop applications for macOS and Windows.',
          features: ['Real-time collaboration', 'Prototyping', 'Design systems', 'Auto Layout']
        },
        {
          title: 'Notion',
          description: 'The all-in-one workspace for your notes, tasks, wikis, and databases.',
          short_description: 'Write, plan, collaborate, and get organized.',
          category: 'Productivity',
          platforms: ['Web', 'macOS', 'Windows', 'iOS', 'Android'],
          pricing: 'Free / Subscription',
          developer: 'Notion Labs, Inc.',
          website_url: 'https://notion.so',
          favicon_url: 'https://www.notion.so/images/favicon.ico',
          preview_image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
          about: 'Notion is a project management and note-taking software platform designed to help members of companies or organizations coordinate deadlines, objectives, and assignments.',
          features: ['Wikis', 'Task Management', 'Notes', 'Databases']
        }
      ];

      for (const app of initialApps) {
        await sql`
          INSERT INTO apps (
            title, description, short_description, category, platforms, pricing, 
            developer, website_url, favicon_url, preview_image, about, features
          ) VALUES (
            ${app.title}, ${app.description}, ${app.short_description}, ${app.category}, 
            ${app.platforms}, ${app.pricing}, ${app.developer}, ${app.website_url}, 
            ${app.favicon_url}, ${app.preview_image}, ${app.about}, ${app.features}
          )
        `;
      }
      console.log('Seed data inserted.');
    } else {
      console.log('Table already has data, skipping seed.');
    }

  } catch (error) {
    console.error('Error during database setup:', error);
  } finally {
    await sql.end();
  }
}

setup();

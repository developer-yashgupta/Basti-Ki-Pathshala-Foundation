const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const { marked } = require('marked');

// Create dist directory
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy public assets
const publicDir = path.join(__dirname, 'public');
const distPublicDir = path.join(distDir, 'public');
if (fs.existsSync(publicDir)) {
  fs.cpSync(publicDir, distPublicDir, { recursive: true });
}

// Sample data for static generation
const sampleData = {
  programs: [
    {
      id: 1,
      title: "Basic Literacy Program",
      description: "Teaching fundamental reading and writing skills to children in underserved communities.",
      image: "/public/uploads/literacy.jpg",
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      title: "Digital Skills Workshop",
      description: "Introducing children to basic computer skills and digital literacy.",
      image: "/public/uploads/digital.jpg",
      created_at: new Date().toISOString()
    }
  ],
  posts: [
    {
      id: 1,
      title: "Success Story: Priya's Journey",
      excerpt: "How education transformed a young girl's life in the slums of Delhi.",
      content: "Priya was just 8 years old when she first joined our literacy program...",
      created_at: new Date().toISOString()
    }
  ],
  events: [
    {
      id: 1,
      title: "Community Learning Festival",
      description: "Annual celebration of learning achievements in our partner communities.",
      date: "2024-12-25",
      location: "Community Center, Delhi",
      created_at: new Date().toISOString()
    }
  ],
  partners: [
    {
      id: 1,
      name: "Education for All Foundation",
      type: "NGO",
      logo: "/public/uploads/partner1.jpg",
      created_at: new Date().toISOString()
    }
  ]
};

// Helper function to render EJS template
async function renderTemplate(templatePath, data = {}) {
  const template = fs.readFileSync(templatePath, 'utf8');
  return ejs.render(template, {
    ...data,
    marked,
    title: data.title || 'Basti Ki Pathshala Foundation',
    // Add script tags for client-side functionality
    scripts: `
      <script src="/public/js/app.js"></script>
      <script src="/public/js/netlify-forms.js"></script>
    `
  }, {
    views: [path.join(__dirname, 'views')],
    filename: templatePath
  });
}

// Generate static pages
async function generateStaticSite() {
  const viewsDir = path.join(__dirname, 'views', 'public');
  const pages = [
    { template: 'index.ejs', output: 'index.html', data: { ...sampleData, title: 'Home - Basti Ki Pathshala Foundation' } },
    { template: 'about.ejs', output: 'about.html', data: { title: 'About Us - Basti Ki Pathshala Foundation' } },
    { template: 'programs.ejs', output: 'programs.html', data: { ...sampleData, title: 'Programs - Basti Ki Pathshala Foundation' } },
    { template: 'stories.ejs', output: 'stories.html', data: { ...sampleData, title: 'Success Stories - Basti Ki Pathshala Foundation' } },
    { template: 'events.ejs', output: 'events.html', data: { ...sampleData, title: 'Events - Basti Ki Pathshala Foundation' } },
    { template: 'partners.ejs', output: 'partners.html', data: { ...sampleData, title: 'Partners - Basti Ki Pathshala Foundation' } },
    { template: 'transparency.ejs', output: 'transparency.html', data: { title: 'Transparency - Basti Ki Pathshala Foundation' } },
    { template: 'contact.ejs', output: 'contact.html', data: { title: 'Contact Us - Basti Ki Pathshala Foundation' } }
  ];

  for (const page of pages) {
    try {
      const templatePath = path.join(viewsDir, page.template);
      if (fs.existsSync(templatePath)) {
        const html = await renderTemplate(templatePath, page.data);
        fs.writeFileSync(path.join(distDir, page.output), html);
        console.log(`Generated: ${page.output}`);
      } else {
        console.warn(`Template not found: ${page.template}`);
      }
    } catch (error) {
      console.error(`Error generating ${page.output}:`, error.message);
    }
  }

  // Generate admin page (simple redirect to Netlify Identity)
  const adminDir = path.join(distDir, 'admin');
  if (!fs.existsSync(adminDir)) {
    fs.mkdirSync(adminDir, { recursive: true });
  }
  
  const adminHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin - Basti Ki Pathshala Foundation</title>
    <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</head>
<body>
    <div id="admin-app">
        <h1>Admin Panel</h1>
        <p>Please log in to access the admin panel.</p>
        <div data-netlify-identity-menu></div>
    </div>
    <script>
        if (window.netlifyIdentity) {
            window.netlifyIdentity.on("init", user => {
                if (!user) {
                    window.netlifyIdentity.on("login", () => {
                        document.location.href = "/admin/dashboard.html";
                    });
                }
            });
        }
    </script>
</body>
</html>`;
  
  fs.writeFileSync(path.join(adminDir, 'index.html'), adminHtml);
  console.log('Generated: admin/index.html');

  console.log('Static site generation complete!');
}

generateStaticSite().catch(console.error);
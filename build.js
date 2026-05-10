const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const { marked } = require('marked');

// Create dist directory
const distDir = path.join(__dirname, 'dist');
fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir, { recursive: true });

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
    { template: 'home.ejs', output: 'index.html', data: { ...sampleData, title: 'Home - Basti Ki Pathshala Foundation' } },
    { template: 'about.ejs', output: 'about.html', data: { title: 'About Us - Basti Ki Pathshala Foundation' } },
    { template: 'programs.ejs', output: 'programs.html', data: { rows: sampleData.programs, title: 'Programs - Basti Ki Pathshala Foundation' } },
    { template: 'stories.ejs', output: 'stories.html', data: { rows: sampleData.posts, title: 'Success Stories - Basti Ki Pathshala Foundation' } },
    { template: 'events.ejs', output: 'events.html', data: { rows: sampleData.events, title: 'Events - Basti Ki Pathshala Foundation' } },
    { template: 'partners.ejs', output: 'partners.html', data: { rows: sampleData.partners, title: 'Partners - Basti Ki Pathshala Foundation' } },
    { template: 'transparency.ejs', output: 'transparency.html', data: { title: 'Transparency - Basti Ki Pathshala Foundation' } },
    { template: 'contact.ejs', output: 'contact.html', data: { title: 'Contact Us - Basti Ki Pathshala Foundation' } }
  ];

  const generationErrors = [];

  for (const page of pages) {
    try {
      const templatePath = path.join(viewsDir, page.template);
      if (fs.existsSync(templatePath)) {
        const html = await renderTemplate(templatePath, page.data);
        fs.writeFileSync(path.join(distDir, page.output), html);
        console.log(`Generated: ${page.output}`);
      } else {
        generationErrors.push(`Template not found: ${page.template}`);
      }
    } catch (error) {
      generationErrors.push(`Error generating ${page.output}: ${error.message}`);
    }
  }

  if (generationErrors.length > 0) {
    generationErrors.forEach(err => console.error(err));
    throw new Error('Static site generation failed. See errors above.');
  }

  // Generate admin login page with password protection
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
    <title>Admin Login - Basti Ki Pathshala Foundation</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #ffcd05, #f7b500);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
        }
        .login-container {
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            max-width: 400px;
            width: 100%;
        }
        h1 {
            color: #1e3a8a;
            margin-bottom: 10px;
            font-size: 24px;
        }
        p {
            color: #6b7280;
            margin-bottom: 30px;
            font-size: 14px;
        }
        .form-group {
            margin-bottom: 20px;
        }
        label {
            display: block;
            color: #1e3a8a;
            margin-bottom: 8px;
            font-weight: 500;
        }
        input {
            width: 100%;
            padding: 12px;
            border: 1px solid #e5e7eb;
            border-radius: 5px;
            font-size: 14px;
        }
        input:focus {
            outline: none;
            border-color: #ffcd05;
            box-shadow: 0 0 0 3px rgba(255, 205, 5, 0.1);
        }
        button {
            width: 100%;
            padding: 12px;
            background: #ffcd05;
            color: #1e3a8a;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            margin-top: 10px;
        }
        button:hover {
            background: #f7b500;
        }
        .error {
            color: #dc2626;
            font-size: 14px;
            margin-top: 10px;
            display: none;
        }
        .info {
            background: #f0f9ff;
            border: 1px solid #bfdbfe;
            color: #1e40af;
            padding: 12px;
            border-radius: 5px;
            font-size: 13px;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <h1>🎓 Admin Panel</h1>
        <p>Basti Ki Pathshala Foundation</p>
        
        <div class="info">
            <strong>Default Password:</strong> admin123
        </div>
        
        <form id="login-form">
            <div class="form-group">
                <label for="password">Admin Password</label>
                <input type="password" id="password" name="password" autofocus placeholder="Enter admin password">
            </div>
            <button type="submit">Log In</button>
            <div class="error" id="error"></div>
        </form>
    </div>

    <script>
        const MAX_ATTEMPTS = 5;
        const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes
        
        document.getElementById('login-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const password = document.getElementById('password').value;
            const error = document.getElementById('error');
            
            // Check lockout
            const lastAttempt = JSON.parse(localStorage.getItem('admin_lockout') || '{}');
            if (lastAttempt.count >= MAX_ATTEMPTS) {
                const elapsed = Date.now() - lastAttempt.time;
                if (elapsed < LOCKOUT_TIME) {
                    const remaining = Math.ceil((LOCKOUT_TIME - elapsed) / 1000 / 60);
                    error.textContent = 'Too many failed attempts. Try again in ' + remaining + ' minutes.';
                    error.style.display = 'block';
                    return;
                } else {
                    localStorage.removeItem('admin_lockout');
                }
            }
            
            // Verify password with API
            try {
                const response = await fetch('/.netlify/functions/api/auth', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ password })
                });
                
                if (response.ok) {
                    const data = await response.json();
                    if (data.token) {
                        sessionStorage.setItem('admin_token', data.token);
                        window.location.href = '/public/admin/dashboard.html?t=' + data.token;
                    }
                } else {
                    throw new Error('Invalid password');
                }
            } catch (err) {
                error.textContent = 'Invalid password. Please try again.';
                error.style.display = 'block';
                
                // Track failed attempts
                const lockout = JSON.parse(localStorage.getItem('admin_lockout') || '{\"count\": 0}');
                lockout.count = (lockout.count || 0) + 1;
                lockout.time = Date.now();
                localStorage.setItem('admin_lockout', JSON.stringify(lockout));
                
                document.getElementById('password').value = '';
                document.getElementById('password').focus();
            }
        });
        
        // Auto-login if token exists in session
        const existingToken = sessionStorage.getItem('admin_token');
        if (existingToken) {
            window.location.href = '/public/admin/dashboard.html?t=' + existingToken;
        }
    </script>
</body>
</html>`;
  
  fs.writeFileSync(path.join(adminDir, 'index.html'), adminHtml);
  console.log('Generated: admin/index.html');

  console.log('Static site generation complete!');
}

generateStaticSite().catch(console.error);
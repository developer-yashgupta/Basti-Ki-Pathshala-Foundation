# 🎓 Basti Ki Pathshala Foundation Website

**Breaking barriers of education in underserved communities**

A comprehensive, full-stack web application for the Basti Ki Pathshala Foundation, dedicated to providing quality learning opportunities for children in slum communities across India. This modern, responsive platform serves as a complete digital hub for community engagement, volunteer coordination, donation tracking, and impact showcase.

## 🌟 Overview

Basti Ki Pathshala Foundation is committed to transforming lives through education. This web application provides a complete digital ecosystem that combines:

- **Public-facing website** for community awareness and engagement
- **Admin management system** for content creation and organization management
- **Volunteer & Donation tracking** system for operational efficiency
- **Real-time statistics** and impact metrics dashboard
- **Multi-page content management** with rich text and image support

The platform is built with modern web technologies running on Node.js and Express.js, using a lightweight JSON database for development and easy setup.

## 🚀 Key Features

### 📱 **Responsive Public Website**
- **Modern Design System**: Professional yellow and blue color scheme with consistent branding
- **Mobile-First Approach**: Fully responsive design optimized for all devices
- **Interactive Elements**: Smooth animations, hover effects, and scroll-triggered animations
- **SEO Optimized**: Proper meta tags, semantic HTML, and search engine optimization

### 🎛️ **Comprehensive Admin Panel**
- **Professional Dashboard**: Real-time statistics and quick action overview
- **Content Management System**: Full CRUD operations for all content types
- **User Management**: Volunteer application and donation pledge tracking
- **Communication Tools**: Email composition and outbox management
- **Data Export**: JSON export functionality for all data types

### 📚 **Program Management**
- **Visual Program Showcase**: Card-based layout with images and descriptions
- **Markdown Support**: Rich text editing for detailed program descriptions
- **Image Upload**: Cover image support for visual appeal
- **Program Statistics**: Comprehensive metrics and analytics

### 📝 **Success Stories**
- **Impact Narratives**: Inspiring success stories with rich content
- **Visual Storytelling**: Image support and excerpt previews
- **Story Management**: Complete editorial workflow for story creation
- **Community Impact**: Showcase real transformation stories

### 📅 **Event Management**
- **Event Planning**: Create and manage community events and workshops
- **Date & Location Tracking**: Comprehensive event details
- **Status Management**: Upcoming vs. past event categorization
- **Event Analytics**: Participation and engagement metrics

### 🤝 **Partnership Platform**
- **Partner Showcase**: Visual partner directory with logos
- **Partnership Types**: Corporate, educational, government, and NGO partnerships
- **Collaboration Tools**: Partnership management and communication
- **Impact Amplification**: Showcase collaborative achievements

### 👥 **Volunteer Coordination**
- **Application System**: Streamlined volunteer application process
- **Contact Management**: Direct email and phone integration
- **Interest Tracking**: Volunteer skills and interest categorization
- **Communication Hub**: Direct volunteer engagement tools

### 💝 **Donation Management**
- **Pledge Tracking**: Comprehensive donation pledge system
- **Status Management**: Pledged, received, and cancelled status tracking
- **Financial Overview**: Total amounts and donation analytics
- **Donor Relations**: Direct communication with supporters

## 🛠️ Technical Stack & Architecture

### **Backend Technologies**

| Technology | Version | Purpose | Why Used |
|-----------|---------|---------|----------|
| **Node.js** | >=18.0.0 | JavaScript Runtime | Enables server-side JavaScript, perfect for full-stack development |
| **Express.js** | ^4.19.2 | Web Framework | Lightweight, unopinionated framework for HTTP request handling and routing |
| **lowdb** | ^7.0.1 | Database | Lightweight JSON database, ideal for development and small deployments, zero setup required |
| **bcrypt** | ^5.1.1 | Password Hashing | Cryptographically secure password hashing for user authentication |
| **express-session** | ^1.17.3 | Session Management | Maintains user sessions across HTTP requests for admin authentication |
| **Multer** | ^1.4.5-lts.1 | File Upload | Middleware for handling multipart/form-data (file uploads) |
| **EJS** | ^3.1.10 | Template Engine | Embedded JavaScript templates for server-side HTML rendering |
| **marked** | ^12.0.2 | Markdown Parser | Converts markdown content to HTML for rich text editing |
| **slugify** | ^1.6.6 | URL Generation | Converts titles to URL-friendly slugs (e.g., "My Program" → "my-program") |
| **method-override** | ^3.0.0 | HTTP Methods | Allows DELETE/PUT methods via POST for HTML forms |
| **helmet** | ^7.1.0 | Security Headers | Adds security HTTP headers (XSS, clickjacking protection, etc.) |
| **morgan** | ^1.10.0 | Request Logging | Logs HTTP requests for debugging and monitoring |

### **Frontend Technologies**

| Technology | Purpose | Implementation |
|-----------|---------|--------|
| **HTML5** | Semantic markup | EJS templating engine renders dynamic HTML |
| **CSS3** | Styling & Layout | Custom CSS with CSS Grid, Flexbox, and CSS variables |
| **JavaScript (Vanilla)** | Interactivity | Pure JavaScript (no frameworks), form validation, animations |
| **Google Fonts** | Typography | Yeseva One (headings), System fonts (body) |
| **CSS Grid & Flexbox** | Responsive Layout | Modern layout system for desktop, tablet, mobile |
| **CSS Animations** | Motion Design | Smooth transitions and scroll-triggered animations |

### **Development Tools**

| Tool | Purpose | Usage |
|------|---------|-------|
| **npm** | Package Manager | Dependency management and script execution |
| **Git** | Version Control | Code repository and collaboration |
| **Netlify Functions** | Serverless API (optional) | Fallback API endpoints for static deployment |
| **ESLint** | Code Linting | Code quality and consistency checks |
| **Prettier** | Code Formatting | Automatic code formatting |
| **Nodemon** | Development Tool | Auto-restart server on file changes |

### **Database Technology**

- **lowdb (JSON Database)**
  - **Advantages**: Zero setup, human-readable data, perfect for prototyping
  - **File location**: `data/db.json`
  - **Schema**: Includes users, programs, posts, events, partners, volunteers, donations, contact messages
  - **Production Alternative**: PostgreSQL or MySQL recommended for scaling

## 🧠 How the Technology Stack Works Together

### **Request Flow - Public Pages:**
1. User visits `http://localhost:3000/`
2. Express routes request to `/routes/public.js`
3. Route handler fetches data from lowdb database
4. EJS template (`/views/public/home.ejs`) renders with data
5. Static assets (`/public/styles.css`, `/public/js/app.js`) load in browser
6. Browser renders responsive HTML with CSS Grid/Flexbox layout

### **Request Flow - Admin Panel:**
1. User visits `http://localhost:3000/admin/login`
2. Express serves login EJS template (`/views/admin/login.ejs`)
3. User submits credentials via POST to `/admin/login`
4. Express verifies email + password against lowdb users table
5. bcrypt compares password hash
6. If valid: session created, redirect to `/admin` (dashboard)
7. If invalid: re-render login with error message
8. Authenticated requests checked by `requireAuth()` middleware
9. Admin templates (`/views/admin/dashboard.ejs`, etc.) render with data
10. Admin can create/edit/delete content which updates lowdb

### **File Upload Flow:**
1. Admin uploads image in content form
2. Multer validates and stores file in `/public/uploads/`
3. File path saved to database (e.g., `/public/uploads/1234-image.jpg`)
4. EJS template renders `<img src="/public/uploads/1234-image.jpg">`
5. Express serves static files from `/public/` folder

### **Content Rendering Flow:**
1. Admin writes markdown in textarea (e.g., `# Heading\n**Bold text**`)
2. Express stores raw markdown in database
3. When rendering: marked.js converts markdown to HTML
4. EJS template renders HTML: `<%-html%>` (unescaped to allow HTML)
5. User sees formatted content in browser

## 📁 Project Structure

```
basti-ki-pathshala/
├── server/
│   ├── index.js              # Main server file
│   ├── lib/
│   │   ├── db.js            # Database operations
│   │   └── middleware.js     # Custom middleware
│   └── routes/
│       ├── admin.js         # Admin panel routes
│       └── public.js        # Public website routes
├── views/
│   ├── admin/               # Admin panel templates
│   │   ├── dashboard.ejs    # Admin dashboard
│   │   ├── programs/        # Program management
│   │   ├── posts/           # Story management
│   │   ├── events/          # Event management
│   │   ├── partners/        # Partner management
│   │   ├── volunteers/      # Volunteer management
│   │   ├── pledges/         # Donation management
│   │   ├── outbox/          # Email management
│   │   ├── account.ejs      # Account settings
│   │   └── settings.ejs     # Site settings
│   ├── public/              # Public website templates
│   │   ├── index.ejs        # Homepage
│   │   ├── about.ejs        # About page
│   │   ├── programs.ejs     # Programs showcase
│   │   ├── stories.ejs      # Success stories
│   │   ├── events.ejs       # Events listing
│   │   ├── partners.ejs     # Partners showcase
│   │   ├── transparency.ejs # Transparency page
│   │   └── contact.ejs      # Contact page
│   └── partials/
│       ├── header.ejs       # Site header with navigation
│       └── footer.ejs       # Site footer
├── public/
│   ├── style.css           # Main stylesheet
│   ├── uploads/            # User uploaded files
│   └── favicon.ico         # Site favicon
├── data/
│   └── database.db         # SQLite database file
├── package.json            # Project dependencies
└── README.md              # Project documentation
```

## 🎨 Design System

### **Color Palette**
- **Primary Yellow**: `#ffcd05` - Main brand color for CTAs and highlights
- **Secondary Yellow**: `#f7b500` - Supporting brand color for accents
- **Dark Blue**: `#1e3a8a` - Professional text and headers
- **Success Green**: `#10b981` - Success states and positive actions
- **Light Gray**: `#f3f4f6` - Background and subtle elements
- **Text Gray**: `#6b7280` - Secondary text and descriptions

### **Typography**
- **Headings**: Yeseva One (Google Fonts) - Distinctive, readable serif
- **Body Text**: System font stack for optimal performance and readability
- **Font Sizes**: Responsive typography with rem units
- **Line Heights**: Optimized for readability across all devices

### **Layout System**
- **CSS Grid**: Modern layout system for complex designs
- **Flexbox**: Flexible component layouts
- **Container System**: Consistent max-width and padding
- **Responsive Breakpoints**: Mobile-first responsive design

## � Getting Started: Installation & Setup

### **Prerequisites**
```
Node.js >= 18.0.0    (Download from nodejs.org)
npm >= 8.0.0         (Comes with Node.js)
Git                  (For version control)
```

### **Step 1: Clone the Repository**
```bash
git clone https://github.com/dev-yashgupta/Basti-Ki-Pathshala-Foundation.git
cd Basti-Ki-Pathshala-Foundation
```

### **Step 2: Install Dependencies**
```bash
npm install
```

This installs all packages from `package.json`:
- Express.js for server
- EJS for templating
- bcrypt for password security
- lowdb for database
- Multer for file uploads
- And development tools (Nodemon, ESLint, Prettier)

### **Step 3: Start Development Server**
```bash
npm start
```

**Expected Output:**
```
Basti Ki Pathshala site running at http://localhost:3000
Seeded admin user.
Email: admin@bastikipathshala.local
Password: admin123
```

**What happens:**
1. Express server starts on port 3000
2. Database initializes at `data/db.json`
3. Admin user automatically created (if first time)
4. Sessions configured with MemoryStore

### **Available Commands**

```bash
npm start              # Start production server
npm run dev           # Start with Nodemon (auto-reload)
npm run build         # Build public pages for static deployment
npm run lint          # Check code with ESLint
npm test              # Run tests (if configured)
```

### **Environment Variables (Optional)**
Create `.env` file in root directory:
```bash
# Server config
PORT=3000
NODE_ENV=development

# Session security
SESSION_SECRET=change-this-to-random-string

# Admin password (if different from default)
ADMIN_PASSWORD=admin123
```

## 📖 How to Use the Application

### **Accessing the Website**

#### **Public Website**
```
URL: http://localhost:3000
```

**Available Pages:**
- **Home** (`/`) - Hero section, stats, programs preview, stories, why education matters
- **About** (`/about`) - Foundation history and mission
- **Programs** (`/programs`) - All educational programs with descriptions
- **Success Stories** (`/stories`) - Inspiring stories of student transformation
- **Events** (`/events`) - Upcoming community events and workshops
- **Partners** (`/partners`) - Partner organizations and collaborators
- **Transparency** (`/transparency`) - Financial and operational transparency
- **Contact** (`/contact`) - Contact form for inquiries

**Public Features:**
- Volunteer application form
- Donation pledge form
- Contact form
- Responsive design (mobile, tablet, desktop)
- SEO optimized

#### **Admin Panel**
```
URL: http://localhost:3000/admin
```

### **Step 1: Login to Admin Panel**

**Login Page:**
```
URL: http://localhost:3000/admin/login
```

**Default Credentials:**
```
Email: admin@bastikipathshala.local
Password: admin123
```

**How to Login:**
1. Navigate to `http://localhost:3000/admin/login`
2. Enter email and password
3. Click "🔓 Login to Admin Panel"
4. Redirects to dashboard if credentials are correct
5. Invalid credentials show error message

### **Step 2: Dashboard Overview**

Once logged in, you see the **Admin Dashboard** with:

```
┌─────────────────────────────────────────────┐
│ 🎛️ Admin Dashboard                          │
├─────────────────────────────────────────────┤
│ Overview & Statistics                       │
│ ┌─────────────┐ ┌──────────┐ ┌──────────┐│
│ │ 📚 Programs │ │ 📝 Stories│ │ 📅 Events││
│ │    Count    │ │  Count   │ │  Count   ││
│ │  [Manage]   │ │ [Manage] │ │ [Manage] ││
│ └─────────────┘ └──────────┘ └──────────┘│
│                                           │
│ Quick Actions:                            │
│ • Content Management                      │
│ • User Management                         │
│ • Communication                           │
│ • Data Management                         │
└─────────────────────────────────────────────┘
```

### **Step 3: Manage Content**

#### **📚 Manage Programs**
```
Admin → Programs → [Manage]
```

**Available Actions:**
- **View All**: See list of all programs
- **Create New**: Click "Add New Program"
  - Title (visible on website)
  - Summary (short description)
  - Description (markdown, rich text)
  - Cover Image (upload JPG/PNG)
  - Click Save
  - Auto-slug generation (title → URL-friendly)
- **Edit**: Click program → modify → save
- **Delete**: Mark as inactive or remove

**Example Program:**
```
Title: Digital Skills Workshop
Slug: digital-skills-workshop
Summary: Teaching children basic computer skills
Description: (markdown content)
Image: /public/uploads/1234-workshop.jpg
```

#### **📝 Manage Success Stories**
```
Admin → Stories → [Manage]
```

**Available Actions:**
- **Create Story**: New success story entry
  - Title: Student/community name
  - Excerpt: Preview text (appears in cards)
  - Body: Full story (markdown)
  - Cover Image: Photo of student/community
- **Edit Story**: Update content
- **Delete Story**: Remove from database

**Markdown Examples:**
```markdown
# Priya's Journey

Priya was just 8 years old...

## Learning Progress
- Started at level 1
- Now at level 5
- Excels in mathematics

**Read more about her achievement!**
```

#### **📅 Manage Events**
```
Admin → Events → [Manage]
```

**Event Details:**
- Event Title
- Description
- Event Date & Time
- Location (address)
- Capacity (optional)
- Status (upcoming/past)

#### **🤝 Manage Partners**
```
Admin → Partners → [Manage]
```

**Partner Information:**
- Organization Name
- Type: NGO, Corporate, Government, Educational
- Logo/Image
- Website Link
- Description

#### **👥 Manage Volunteers**
```
Admin → Volunteers → [Manage]
```

**Volunteer Data:**
- Auto-collected from volunteer signup form
- Name, Email, Phone
- Areas of Interest
- Message/motivation
- Download as JSON

#### **💝 Manage Donations**
```
Admin → Pledges → [Manage]
```

**Pledge Tracking:**
- Donor name and contact
- Amount pledged
- Status: Pledged, Received, Cancelled
- Payment method notes
- Thank you messaging

### **Step 4: Account Settings**

```
Admin → Account → Change Password
```

**Update Admin Password:**
1. Enter current password
2. Enter new password
3. Confirm new password
4. Click "Update Password"

### **Step 5: Logout**

```
Admin Dashboard → [🚪 Logout Button]
```

Session destroyed, redirects to home page.

## 📊 Database Structure & Data Management

## 📊 Database Structure & Data Management

### **Database Technology: lowdb (JSON Database)**

**Location:** `data/db.json`  
**Format:** Human-readable JSON file  
**Auto-backup:** Consider backing up `db.json` regularly

### **Database Schema**

```json
{
  "users": [
    {
      "id": 1,
      "email": "admin@bastikipathshala.local",
      "password_hash": "$2b$10$...",
      "role": "admin",
      "created_at": "2025-08-08T08:32:23.626Z"
    }
  ],
  "programs": [
    {
      "id": 1,
      "title": "Digital Skills Workshop",
      "slug": "digital-skills-workshop",
      "summary": "Teaching basic computer skills",
      "body_md": "# Digital Skills\n\nMarkdown content here...",
      "cover_path": "/public/uploads/123-image.jpg",
      "created_at": "2025-08-08T08:32:23.626Z"
    }
  ],
  "posts": [
    {
      "id": 1,
      "title": "Priya's Success Story",
      "slug": "priyas-success-story",
      "excerpt": "How education changed a child's life",
      "body_md": "# Priya's Journey\n\nFull story markdown...",
      "cover_path": "/public/uploads/456-priya.jpg",
      "created_at": "2025-08-08T08:32:23.626Z"
    }
  ],
  "events": [
    {
      "id": 1,
      "title": "Community Learning Festival",
      "description": "Annual celebration of learning",
      "event_date": "2025-12-25T00:00:00.000Z",
      "location": "Community Center, Delhi",
      "created_at": "2025-08-08T08:32:23.626Z"
    }
  ],
  "partners": [
    {
      "id": 1,
      "name": "Education Foundation",
      "type": "NGO",
      "logo_path": "/public/uploads/789-logo.jpg",
      "url": "https://example.org",
      "created_at": "2025-08-08T08:32:23.626Z"
    }
  ],
  "volunteers": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+91-9876543210",
      "interests": "Teaching, Community Work",
      "message": "I want to help children learn",
      "created_at": "2025-08-08T08:32:23.626Z"
    }
  ],
  "donation_pledges": [
    {
      "id": 1,
      "name": "Jane Smith",
      "email": "jane@example.com",
      "phone": "+91-9876543211",
      "amount": 5000,
      "message": "Education is important",
      "status": "pledged",
      "created_at": "2025-08-08T08:32:23.626Z"
    }
  ],
  "contact_messages": [
    {
      "id": 1,
      "name": "Visitor",
      "email": "visitor@example.com",
      "phone": "+91-9876543212",
      "message": "How can I help?",
      "created_at": "2025-08-08T08:32:23.626Z"
    }
  ],
  "_counters": {
    "users": 1,
    "programs": 1,
    "posts": 1,
    "events": 1,
    "partners": 1,
    "volunteers": 1,
    "donation_pledges": 1,
    "contact_messages": 0,
    "outbox": 0
  }
}
```

### **Table Descriptions**

#### **users**
- Stores admin user accounts
- `password_hash`: bcrypt hashed password (never store plain text)
- `role`: Currently "admin", can extend for different roles
- Authentication checks email + password match

#### **programs**
- Educational programs offered
- `slug`: Auto-generated URL-friendly identifier (used in URLs)
- `body_md`: Markdown content for rich text
- `cover_path`: Path to uploaded image
- Public listing: `/programs`
- Detail page: `/programs/:slug`

#### **posts (Success Stories)**
- Impact stories and testimonials
- `excerpt`: Short preview shown in cards
- `body_md`: Full markdown story
- Public listing: `/stories`
- Detail page: `/stories/:slug`

#### **events**
- Community events and workshops
- `event_date`: ISO timestamp for sorting
- `location`: Physical meeting location
- Public listing: `/events`

#### **partners**
- Partner organizations
- `type`: Category for filtering (NGO, Corporate, etc.)
- `url`: External website link
- Public listing: `/partners`

#### **volunteers**
- Volunteer application data
- Form-submitted from public: `/volunteer`
- Admin view: `/admin/volunteers`
- Can export as JSON

#### **donation_pledges**
- Donation commitments
- `status`: pledged→received→cancelled tracking
- `amount`: Pledged amount in INR
- Form from: `/donate` public form
- Admin tracking: `/admin/pledges`

#### **contact_messages**
- Visitor inquiries from contact form
- Form from: `/contact` public form
- Admin view: Email notifications
- Stored for follow-up

### **Data Operations (CRUD)**

#### **Create (C)**
```javascript
// Backend (Express route)
const newProgram = await insert('programs', {
  title: "Program Name",
  slug: "program-name",
  summary: "Short description",
  body_md: "# Markdown content",
  cover_path: "/public/uploads/image.jpg"
});
```

#### **Read (R)**
```javascript
// Get all programs
const allPrograms = await findAll('programs');

// Get by slug
const program = await findOne('programs', p => p.slug === 'program-name');
```

#### **Update (U)**
```javascript
// Update specific program
await updateOne('programs', programId, {
  title: "Updated Title",
  summary: "Updated summary"
});
```

#### **Delete (D)**
```javascript
// Delete program
await deleteOne('programs', programId);
```

## 🧠 Development Workflow

## 🧠 Development Workflow

### **1. Feature Development Process**

```
1. Create feature branch
   git checkout -b feature/add-newsletter

2. Start development server
   npm start

3. Make changes to:
   - Routes: /server/routes/*.js
   - Templates: /views/**/*.ejs
   - Styles: /public/styles.css
   - Database queries: /server/lib/db.js

4. Test in browser
   http://localhost:3000

5. Commit changes
   git add .
   git commit -m "feature: add newsletter signup"

6. Push and create pull request
   git push origin feature/add-newsletter
```

### **2. Adding a New Content Type (Example: Newsletter)**

#### **Step 1: Add Route Handler**
File: `server/routes/admin.js`
```javascript
// Get all newsletters
router.get('/newsletters', async (req, res) => {
  const rows = await findAll('newsletters');
  res.render('admin/newsletters/index', { title: 'Newsletters', rows });
});

// Create newsletter
router.post('/newsletters', async (req, res) => {
  const { title, content } = req.body;
  await insert('newsletters', { title, slug: slugify(title), body_md: content });
  res.redirect('/admin/newsletters');
});
```

#### **Step 2: Create EJS Template**
File: `views/admin/newsletters/index.ejs`
```ejs
<%- include('../../partials/header', { title }) %>

<section class="section">
  <div class="container">
    <h1>Newsletters</h1>
    <a href="/admin/newsletters/new" class="btn">Add Newsletter</a>
    
    <table class="data-table">
      <tr>
        <th>Title</th>
        <th>Date</th>
        <th>Actions</th>
      </tr>
      <% rows.forEach(newsletter => { %>
        <tr>
          <td><%= newsletter.title %></td>
          <td><%= new Date(newsletter.created_at).toLocaleDateString() %></td>
          <td>
            <a href="/admin/newsletters/<%= newsletter.id %>/edit">Edit</a>
            <form method="POST" action="/admin/newsletters/<%= newsletter.id %>/delete">
              <button>Delete</button>
            </form>
          </td>
        </tr>
      <% }) %>
    </table>
  </div>
</section>

<%- include('../../partials/footer') %>
```

#### **Step 3: Update Admin Link**
File: `views/admin/dashboard.ejs`
```ejs
<a href="/admin/newsletters" class="btn">Manage Newsletters</a>
```

#### **Step 4: Display on Public Site**
Add route to `server/routes/public.js` and create view template

### **3. File Structure When Adding Features**

```
Adding new "Workshop" management:

server/
├─ routes/
│  ├─ admin.js (add GET/POST routes for workshops)
│  └─ public.js (add public workshop routes)

views/
├─ admin/
│  └─ workshops/
│     ├─ index.ejs (list all)
│     ├─ new.ejs (create form)
│     ├─ edit.ejs (edit form)
│     └─ show.ejs (detail view)
└─ public/
   └─ workshops.ejs (public listing)

data/
└─ db.json (auto-updated with "workshops" table)
```

### **4. Code Style Guidelines**

- **Naming**: camelCase for variables, kebab-case for file names
- **Routes**: RESTful conventions (GET /resource, POST /resource, etc.)
- **EJS**: Use `<%- %>` for unescaped HTML (markdown), `<%= %>` for text
- **Comments**: Explain "why" not "what"
- **Error Handling**: Always use try-catch in async functions

### **5. Testing Locally**

```bash
# Test public website
curl http://localhost:3000

# Test admin login
curl -X POST http://localhost:3000/admin/login \
  -d "email=admin@bastikipathshala.local&password=admin123"

# Test API endpoint
curl http://localhost:3000/api/programs

# Check database
cat data/db.json | jq '.programs'
```

## 🚀 Deployment & Hosting

### **⚠️ Important: Technology Mismatch**

This is a **full-stack Node.js/Express application**, NOT a static website.

- ❌ **Cannot deploy to:** Netlify, GitHub Pages, Vercel (free tier)
- ✅ **Can deploy to:** Render, Railway, Heroku, DigitalOcean

### **Option 1: Render.com (Recommended for beginners)**

```bash
# 1. Push code to GitHub
git push origin main

# 2. Visit render.com → New → Web Service
# 3. Connect GitHub repository

# Build command
npm install

# Start command
npm start

# Environment variables
PORT=3000
NODE_ENV=production
```

### **Option 2: Railway.app**

```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Login and initialize
railway login
railway init

# 3. Deploy
railway up

# View logs
railway logs
```

### **Option 3: Heroku (Free tier deprecated)**

```bash
# 1. Install Heroku CLI
brew install heroku/brew/heroku

# 2. Login
heroku login

# 3. Create app
heroku create app-name

# 4. Deploy
git push heroku main

# View logs
heroku logs --tail
```

### **Option 4: DigitalOcean App Platform**

1. Create DigitalOcean account
2. Create new App
3. Connect GitHub repository
4. Auto-deploys on push
5. Custom domain support

### **Database for Production**

**Current (Development):** lowdb (JSON file)

**Recommended for Production:**
```bash
# PostgreSQL (most recommended)
npm install pg

# Or MySQL
npm install mysql2

# Connection example
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
```

### **Environment Variables for Production**

```env
# Server
NODE_ENV=production
PORT=3000

# Database (if using PostgreSQL)
DATABASE_URL=postgres://user:pass@host:5432/dbname

# Session security (IMPORTANT - change this!)
SESSION_SECRET=your-very-secret-random-string-here

# Admin password
ADMIN_PASSWORD=strong-new-password

# Email service (for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=app-specific-password

# File storage (for scalability)
AWS_S3_BUCKET=your-bucket-name
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
```

### **Pre-Deployment Checklist**

- [ ] Update admin password in environment variables
- [ ] Set strong SESSION_SECRET
- [ ] Configure database (PostgreSQL recommended)
- [ ] Set NODE_ENV=production
- [ ] Add SSL certificate (auto with most platforms)
- [ ] Configure custom domain
- [ ] Set up email service for notifications
- [ ] Enable HTTPS redirect
- [ ] Test all admin functionality on staging
- [ ] Backup database before going live
- [ ] Set up monitoring/alerts
- [ ] Prepare deployment documentation

## 🔒 Security Best Practices

## 🔒 Security Best Practices

### **Authentication & Authorization**

1. **Password Security**
   - Passwords hashed with bcrypt (10 salt rounds)
   - Never store plain text passwords
   - Change default password after first login
   - Use strong passwords in production

2. **Session Management**
   - HttpOnly cookies prevent XSS attacks
   - SameSite=Lax prevents CSRF
   - Sessions expire after inactivity
   - Change SESSION_SECRET for production

3. **Route Protection**
   - `requireAuth()` middleware protects admin routes
   - Unauthenticated users redirected to /login
   - Role-based access control ready for expansion

### **Data Security**

1. **Input Validation**
   - All inputs sanitized on server-side
   - File uploads validated (type, size)
   - HTML entities escaped in output (unless markdown)

2. **File Upload**
   - Stored in `/public/uploads/` with unique names
   - Original filename: `Date.now() + '-' + filename`
   - Prevents overwriting and directory traversal
   - Consider virus scanning for production

3. **Database**
   - lowdb uses `.json` file - back it up regularly!
   - Production: Use PostgreSQL with proper backups
   - Implement read-only user accounts where possible

### **HTTP Security Headers** (via Helmet.js)

```javascript
// Already configured in server/index.js
- X-Frame-Options: SAMEORIGIN (prevents clickjacking)
- X-Content-Type-Options: nosniff (prevents MIME sniffing)
- X-XSS-Protection: 0 (modern browsers)
- Strict-Transport-Security (HTTPS enforcement)
- Referrer-Policy: no-referrer (privacy)
```

### **HTTPS & SSL**

- **Development**: HTTP is fine for localhost
- **Production**: HTTPS mandatory
  - Use Let's Encrypt (free)
  - Auto-configured on Render/Railway/DigitalOcean
  - Redirect HTTP → HTTPS

### **Admin Panel Security**

- Keep `/admin` URLs private/unlisted
- Monitor login attempts
- Consider 2FA for production
- Regular password rotation policy

## ❓ Troubleshooting & Common Issues

### **Issue: "Address already in use :::3000"**

**Cause:** Port 3000 already in use

**Solution:**
```bash
# Kill process using port 3000
lsof -i :3000
kill -9 <PID>

# Or use different port
PORT=3001 npm start
```

### **Issue: Admin login not working**

**Checklist:**
- [ ] Is server running? (`npm start`)
- [ ] Database exists? (`data/db.json`)
- [ ] Admin user seeded? (Check console output)
- [ ] Email format correct? (`admin@bastikipathshala.local`)
- [ ] Sessions enabled? (Check server/index.js)
- [ ] Cookies accepted in browser?

**Debug:**
```bash
# Check database
cat data/db.json | jq '.users'

# Check admin password hash format
cat data/db.json | jq '.users[0].password_hash'
```

### **Issue: File uploads not working**

**Checks:**
- [ ] `/public/uploads/` directory exists
- [ ] Write permissions on `/public` folder
- [ ] File size under 50MB
- [ ] Allowed extensions: jpg, png, jpeg, gif

**Create uploads directory:**
```bash
mkdir -p public/uploads
chmod 755 public/uploads
```

### **Issue: Images not displaying**

**Common causes:**
- Wrong file path in database
- Directory doesn't exist
- File deleted after upload
- Permission issues

**Check:**
```bash
# Verify file exists
ls -la public/uploads/

# Check path in database
cat data/db.json | jq '.programs[0].cover_path'
```

### **Issue: Database appears empty**

**Solutions:**
- Backup old `data/db.json`: `cp data/db.json data/db.json.backup`
- Delete and restart: `rm data/db.json && npm start`
- Import previous data: Manually add JSON to `db.json`

### **Issue: Slow performance**

**Optimization:**
```javascript
// Enable caching
const cacheMiddleware = (req, res, next) => {
  res.setHeader('Cache-Control', 'public, max-age=3600');
  next();
};

app.use('/public', cacheMiddleware, express.static('../public'));
```

### **Issue: Want to reset everything**

```bash
# Backup current state
cp data/db.json data/db.json.backup

# Delete database (will be recreated)
rm data/db.json

# Delete uploads
rm -rf public/uploads/*

# Restart server
npm start
```

## 📚 File & Folder Reference

```
Basti-Ki-Pathshala-Foundation/
│
├── server/                    # Backend Express application
│   ├── index.js              # Server entry point
│   ├── lib/
│   │   ├── db.js             # Database CRUD operations
│   │   └── middleware.js     # Custom middleware (auth, etc)
│   └── routes/
│       ├── admin.js          # Admin routes (CRUD)
│       └── public.js         # Public website routes
│
├── views/                     # EJS templates
│   ├── admin/                # Admin panel templates
│   │   ├── login.ejs         # Login form
│   │   ├── dashboard.ejs     # Admin dashboard
│   │   ├── programs/         # Program management
│   │   ├── posts/            # Story management
│   │   ├── events/           # Event management
│   │   ├── partners/         # Partner management
│   │   ├── volunteers/       # Volunteer list
│   │   ├── pledges/          # Donation tracking
│   │   ├── account.ejs       # User account page
│   │   └── settings.ejs      # Site settings
│   ├── public/               # Public website templates
│   │   ├── home.ejs          # Homepage
│   │   ├── about.ejs         # About page
│   │   ├── programs.ejs      # Programs listing
│   │   ├── stories.ejs       # Stories listing
│   │   ├── events.ejs        # Events listing
│   │   ├── partners.ejs      # Partners listing
│   │   ├── transparency.ejs  # Transparency page
│   │   └── contact.ejs       # Contact form
│   └── partials/
│       ├── header.ejs        # Navigation header
│       └── footer.ejs        # Footer
│
├── public/                    # Static files (served by Express)
│   ├── styles.css            # Main stylesheet
│   ├── js/                   # JavaScript files
│   │   ├── app.js            # App initialization
│   │   └── netlify-forms.js  # Form handling
│   ├── uploads/              # User-uploaded images
│   ├── favicon.ico           # Website icon
│   └── admin/                # Admin CMS config (optional)
│       └── config.yml        # Netlify CMS config
│
├── data/                      # Data storage
│   └── db.json              # JSON database (auto-created)
│
├── netlify/                   # Serverless functions (optional)
│   └── functions/
│       └── api.js           # Read-only API
│
├── .gitignore               # Git ignore rules
├── package.json             # Dependencies and scripts
├── package-lock.json        # Dependency lock file
├── netlify.toml             # Netlify config (for comments)
├── build.js                 # Build script (public pages)
├── README.md                # This file!
└── .env                     # Environment variables (not in git)
```

## 🎯 Project Roadmap

### **Current Features** ✅
- Public website with responsive design
- Admin panel with CRUD operations
- Program, story, event, partner management
- Volunteer and donation tracking
- Database persistence
- Image upload support
- Markdown content support

### **Recommended Future Enhancements** 🚀

1. **Email Notifications**
   - Welcome emails for volunteers
   - Donation confirmation emails
   - Admin notifications for new submissions

2. **Advanced Filtering**
   - Filter programs by category
   - Search volunteers by skills
   - Sort donations by amount/date

3. **Reporting & Analytics**
   - Volunteer hour tracking
   - Donation analytics dashboard
   - Program impact metrics

4. **User Features**
   - Volunteer profile pages
   - Donor management system
   - Attendance tracking

5. **Admin Enhancements**
   - Email template management
   - Bulk import/export
   - User role management
   - Activity logs

6. **Frontend**
   - Dark mode
   - Multi-language support
   - Accessibility improvements (WCAG 2.1 AA)

7. **Integrations**
   - Stripe/Razorpay payments
   - Google Calendar sync
   - Email service (SendGrid, Mailgun)

## 📞 Support & Contributions

### **Getting Help**
1. Check troubleshooting section above
2. Review console logs: `npm start` output
3. Check browser developer console (F12)
4. Look at server logs in `/tmp/server.log`

### **Contributing**
```bash
# Fork repository
# Create feature branch
git checkout -b feature/your-feature

# Make changes
# Test thoroughly
# Push changes
git push origin feature/your-feature

# Create pull request on GitHub
```

### **Code of Conduct**
- Be respectful to all contributors
- Follow existing code style
- Write clear commit messages
- Test before submitting PR
- Help review others' code

## 📄 License & Attribution

### **Project License**
This project is licensed under the **MIT License** - see the LICENSE file for details.

```
MIT License

Copyright (c) 2025 Basti Ki Pathshala Foundation

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

### **Acknowledgments**

- **Basti Ki Pathshala Foundation Team** - Dedicated educators and administrators
- **Student & Community Members** - Our impact comes from you
- **Partner Organizations** - Supporting our mission
- **Open Source Community** - Built with Node.js, Express, EJS, and lowdb

### **Asset Attribution**

- **Icons**: System icons used are free and open source
- **Fonts**: Google Fonts (Yeseva One, System Fonts)
- **Color Palette**: Custom design by the foundation
- **Framework**: Express.js and Node.js community

---

## 🎓 Final Notes

### **About the Codebase**

This application was built with simplicity and educational value in mind. It serves as both:
1. **A production tool** for managing the foundation's operations
2. **A learning resource** for developers interested in full-stack JavaScript

### **For Developers Contributing**

- The codebase is intentionally straightforward for readability
- Comments explain design decisions where helpful
- Follows Node.js and Express.js best practices
- Perfect for learning or starting your own similar project

### **For Foundation Staff**

- Focus on content creation and community engagement
- Don't worry about technical details - the app handles them
- Regular backups of `data/db.json` recommended
- Contact development team for customization needs

### **For Visitors & Supporters**

Thank you for visiting Basti Ki Pathshala Foundation's website. Whether you're:
- 📚 Learning about our programs
- 🤝 Interested in volunteering
- 💝 Wanting to donate
- 📞 Looking to partner with us

We appreciate your support in **transforming lives through education**!

---

## 🚀 Quick Reference

| Task | Command |
|------|---------|
| Start the app | `npm start` |
| Access public site | `http://localhost:3000` |
| Access admin panel | `http://localhost:3000/admin` |
| Admin login | `admin@bastikipathshala.local` / `admin123` |
| Stop the server | `Ctrl + C` |
| View database | `cat data/db.json` |
| Reset database | `rm data/db.json` then `npm start` |
| Build static pages | `npm run build` |

---

**Questions? Issues? Ideas?**

1. **Check the Troubleshooting section** above
2. **Review the database schema** for data structure questions
3. **Read the code comments** in `/server/routes/` for logic details
4. **Contact the development team** for complex issues

---

## 📞 Contact & Support

**Basti Ki Pathshala Foundation**

- 🌐 Website: Check the deployed site
- 📧 Email: Contact via the website contact form
- 🤝 Volunteers: Apply via the website
- 💝 Donations: Pledge via the website

**Development Support**

For technical issues or questions about this repository:
1. Check this README thoroughly
2. Search GitHub issues for similar problems
3. Create a new issue with detailed description

---

**Happy development! 🎉**

*Built with ❤️ for education and community empowerment*

Last Updated: 2025-08-08
Documentation Version: 2.0

# 🎓 Basti Ki Pathshala Foundation Website

**Breaking barriers of education in underserved communities**

A comprehensive web platform for the Basti Ki Pathshala Foundation, dedicated to providing quality learning opportunities for children in slum communities across India. This modern, responsive website serves as a digital hub for community engagement, volunteer coordination, and impact showcase.

## 🌟 Overview

Basti Ki Pathshala Foundation is committed to transforming lives through education. Our website provides a complete digital ecosystem for managing educational programs, engaging volunteers, tracking donations, and showcasing the real impact of our work in underserved communities.

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

## 🛠️ Technical Stack

### **Backend Technologies**
- **Runtime**: Node.js (JavaScript runtime environment)
- **Framework**: Express.js (Fast, unopinionated web framework)
- **Database**: SQLite (Lightweight, serverless database)
- **Authentication**: Session-based authentication with bcrypt
- **File Upload**: Multer middleware for image uploads
- **Template Engine**: EJS (Embedded JavaScript templates)

### **Frontend Technologies**
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **Typography**: Google Fonts (Yeseva One for headings)
- **Icons**: Emoji-based icon system for universal compatibility
- **Animations**: CSS transitions and transforms
- **Responsive Design**: Mobile-first responsive breakpoints

### **Development Tools**
- **Package Manager**: npm (Node Package Manager)
- **Version Control**: Git with comprehensive commit history
- **Code Organization**: Modular architecture with separation of concerns
- **Error Handling**: Comprehensive try-catch blocks and error logging

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

## 🔧 Installation & Setup

### **Prerequisites**
- Node.js (v14 or higher)
- npm (Node Package Manager)
- Git (for version control)

### **Installation Steps**

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd basti-ki-pathshala
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Initialize Database**
   ```bash
   npm run init-db
   ```

4. **Start Development Server**
   ```bash
   npm start
   ```

5. **Access the Application**
   - Public Website: `http://localhost:3000`
   - Admin Panel: `http://localhost:3000/admin`

### **Default Admin Credentials**
- **Email**: `admin@bastikipathshala.org`
- **Password**: `admin123`

## 📊 Database Schema

### **Core Tables**
- **programs**: Educational program information
- **posts**: Success stories and blog posts
- **events**: Community events and workshops
- **partners**: Partner organizations and collaborators
- **volunteers**: Volunteer applications and information
- **donation_pledges**: Donation commitments and tracking
- **outbox**: Email communications and messaging

### **Key Fields**
- **Content Tables**: id, title, slug, description, images, timestamps
- **User Tables**: id, name, email, phone, status, timestamps
- **Relationship Tables**: Foreign keys for data relationships

## 🚀 Deployment

### **Production Considerations**
- **Environment Variables**: Configure for production settings
- **Database**: Consider PostgreSQL or MySQL for production
- **File Storage**: Implement cloud storage for uploaded files
- **Email Service**: Integrate with email service provider
- **SSL Certificate**: Ensure HTTPS for security
- **Performance**: Implement caching and optimization

### **Recommended Hosting**
- **Platform**: Heroku, DigitalOcean, or AWS
- **Database**: PostgreSQL or MySQL
- **File Storage**: AWS S3 or Cloudinary
- **Email**: SendGrid or Mailgun
- **CDN**: Cloudflare for performance

## 🔒 Security Features

### **Authentication & Authorization**
- **Session Management**: Secure session-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Admin Protection**: Route-level authentication middleware
- **CSRF Protection**: Cross-site request forgery prevention

### **Data Security**
- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Prevention**: Parameterized queries
- **File Upload Security**: File type and size restrictions
- **Error Handling**: Secure error messages without data exposure

## 📈 Performance Features

### **Optimization**
- **Responsive Images**: Optimized image loading
- **CSS Optimization**: Efficient selectors and minimal overhead
- **Database Indexing**: Optimized database queries
- **Caching Headers**: Browser caching for static assets

### **User Experience**
- **Fast Loading**: Optimized for quick page loads
- **Smooth Animations**: Hardware-accelerated CSS animations
- **Mobile Performance**: Touch-friendly interface
- **Accessibility**: Semantic HTML and keyboard navigation

## 🤝 Contributing

### **Development Guidelines**
- **Code Style**: Consistent formatting and naming conventions
- **Documentation**: Comprehensive inline comments
- **Testing**: Write tests for new features
- **Git Workflow**: Feature branches and pull requests

### **Getting Started**
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Foundation Team**: Dedicated educators and volunteers
- **Community**: Children and families in underserved communities
- **Partners**: Organizations supporting our mission
- **Contributors**: Developers and supporters of this project

---

**Built with ❤️ for education and community empowerment**

*Transforming lives through technology and education*

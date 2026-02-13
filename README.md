# Modern Portfolio Website

A professional, modern portfolio website with smooth animations, dark mode, and responsive design.

## ✨ Features

- ✅ **Responsive Design** - Works on all devices (mobile, tablet, desktop)
- ✅ **Dark/Light Mode** - Toggle between themes with localStorage persistence
- ✅ **Smooth Animations** - Scroll reveal animations using Intersection Observer
- ✅ **Form Validation** - Real-time client-side validation for contact form
- ✅ **SEO Optimized** - Semantic HTML and meta tags
- ✅ **Accessibility** - ARIA labels and keyboard navigation
- ✅ **Fast Performance** - Optimized CSS and JavaScript
- ✅ **Cross-browser Compatible** - Works on Chrome, Firefox, Safari, Edge

## 🎨 Sections

1. **Homepage** - Hero section with typing animation
2. **About** - Personal details, skills, and career objectives
3. **Projects** - Portfolio showcasing 3 featured projects
4. **Testimonials** - Client reviews and feedback
5. **Blog** - Latest articles and insights
6. **Contact** - Form with validation

## 🚀 Quick Start

### 1. Download/Clone the Project

```bash
# If using git
git clone <your-repo-url>
cd portfolio-website

# Or simply download and extract the ZIP file
```

### 2. Customize Your Content

#### Update Personal Information

**Edit `index.html`:**
- Line 50: Change "YN" to your initials
- Line 61: Update "Your Name" 
- Line 174: Replace profile placeholder with your image
- Update all text content in each section

**Edit `css/style.css`:**
- Line 3-15: Customize color scheme
- Change fonts if desired

**Add Your Resume:**
- Place your resume PDF in `/assets/resume.pdf`

#### Add Your Projects

1. Take screenshots of your projects
2. Save images in `/images/projects/`
3. Update project cards in `index.html` (lines 285-390)
4. Edit project detail pages in `/projects/` folder

### 3. Test Locally

#### Option A: Using VS Code Live Server
1. Install "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"

#### Option B: Using Python
```bash
# Python 3
python -m http.server 8000

# Then open http://localhost:8000
```

#### Option C: Using Node.js
```bash
npm install -g http-server
http-server

# Then open http://localhost:8080
```

## 🌐 Deployment

### GitHub Pages (Free & Easy)

1. **Create GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git branch -M main
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings
   - Navigate to "Pages" in sidebar
   - Source: Deploy from branch → main
   - Click Save
   - Wait 2-3 minutes
   - Visit: `https://YOUR_USERNAME.github.io/portfolio/`

### Netlify (Recommended)

#### Method 1: Drag & Drop
1. Go to [netlify.com](https://netlify.com)
2. Sign up/login
3. Drag project folder to deploy zone
4. Done! You get a URL like `https://random-name.netlify.app`

#### Method 2: Git Integration
1. Push code to GitHub
2. Go to Netlify → "Add new site" → "Import an existing project"
3. Connect GitHub repository
4. Deploy settings:
   - Build command: (leave empty)
   - Publish directory: `/`
5. Click "Deploy site"

**Custom Domain on Netlify:**
1. Go to Site settings → Domain management
2. Add custom domain
3. Update DNS records with your domain provider

### Vercel (Fast & Modern)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```
   - Follow prompts
   - Automatic HTTPS
   - Global CDN
   - Instant deployment

3. **Update Deployment**
   ```bash
   vercel --prod
   ```

## 📁 Project Structure

```
portfolio-website/
├── index.html              # Main homepage
├── css/
│   ├── style.css          # Main styles
│   └── animations.css     # Animation styles
├── js/
│   ├── main.js            # Core functionality
│   ├── animations.js      # Scroll animations
│   └── form-validation.js # Form validation
├── images/
│   └── projects/          # Project images
├── projects/
│   ├── project1.html      # Project detail pages
│   ├── project2.html
│   └── project3.html
├── assets/
│   └── resume.pdf         # Downloadable resume
└── README.md              # This file
```

## 🎨 Customization Guide

### Change Color Scheme

Edit `/css/style.css` (lines 8-14):

```css
:root {
    --color-primary: #6366f1;    /* Main brand color */
    --color-secondary: #8b5cf6;  /* Accent color */
    --color-accent: #ec4899;     /* Highlight color */
}
```

### Change Fonts

Edit `<head>` section in `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;600;700&display=swap" rel="stylesheet">
```

Then update in `/css/style.css`:

```css
:root {
    --font-heading: 'YourFont', sans-serif;
    --font-body: 'YourFont', sans-serif;
}
```

### Add New Section

1. Add HTML in `index.html`:
```html
<section id="new-section" class="section">
    <div class="container">
        <h2 class="section-title">New Section</h2>
        <!-- Your content -->
    </div>
</section>
```

2. Add navigation link:
```html
<li><a href="#new-section" class="nav-link">New Section</a></li>
```

## 📝 Form Configuration

The contact form currently simulates submission. To connect to a real backend:

### Option 1: Formspree (Easiest)

1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form
3. Update `js/form-validation.js` (line 140):

```javascript
async function simulateFormSubmission(data) {
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return response.json();
}
```

### Option 2: EmailJS

1. Sign up at [emailjs.com](https://emailjs.com)
2. Create email service and template
3. Add EmailJS SDK to `index.html`:

```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
```

4. Update form submission in `js/form-validation.js`

### Option 3: Custom Backend

Create your own API endpoint and update the fetch URL in `form-validation.js`

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## ♿ Accessibility

- Semantic HTML5 elements
- ARIA labels for screen readers
- Keyboard navigation support
- Color contrast compliant
- Focus indicators
- Alt text for images

## ⚡ Performance Optimization

- Minified CSS and JS (for production)
- Lazy loading images
- CSS animations (GPU accelerated)
- Debounced scroll events
- Optimized font loading

## 📱 Testing Checklist

- [ ] All links work correctly
- [ ] Images load properly
- [ ] Form validation works
- [ ] Dark mode toggles correctly
- [ ] Mobile menu functions
- [ ] Smooth scroll works
- [ ] Animations trigger on scroll
- [ ] Responsive on all screen sizes
- [ ] Cross-browser compatible
- [ ] No console errors

## 🐛 Troubleshooting

### Images not loading
- Check file paths are correct
- Ensure images are in `/images/` folder
- Use lowercase file names without spaces

### Animations not working
- Check JavaScript console for errors
- Ensure all script files are loaded
- Verify Intersection Observer is supported

### Dark mode not persisting
- Check localStorage is enabled
- Ensure JavaScript is not blocked
- Clear browser cache and try again

## 📚 Resources

- [MDN Web Docs](https://developer.mozilla.org) - HTML/CSS/JS reference
- [Can I Use](https://caniuse.com) - Browser compatibility
- [Google Fonts](https://fonts.google.com) - Free fonts
- [Unsplash](https://unsplash.com) - Free images
- [Coolors](https://coolors.co) - Color palette generator

## 📄 License

This project is free to use for personal and commercial purposes.

## 🤝 Support

If you need help:
1. Check the troubleshooting section
2. Review the code comments
3. Search for similar issues online
4. Customize the code to your needs

## 🎯 Next Steps

1. ✅ Customize content with your information
2. ✅ Add your actual projects
3. ✅ Include real testimonials
4. ✅ Write blog posts
5. ✅ Add your resume PDF
6. ✅ Test thoroughly
7. ✅ Deploy to the web
8. ✅ Share your portfolio!

---

**Made with ❤️ using HTML, CSS, and JavaScript**

Good luck with your portfolio! 🚀

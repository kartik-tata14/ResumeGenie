# 🧞 Resume Genie

> AI-powered resume builder that creates ATS-optimized, professional resumes from LinkedIn profiles or uploaded resumes.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)

## ✨ Features

### 🤖 AI-Powered Analysis
- **Gemini 2.0 Flash Integration** - Comprehensive resume parsing and optimization
- **LinkedIn Profile Support** - Paste LinkedIn URL for instant resume generation
- **Resume Upload** - Upload PDF/DOC/DOCX files for AI analysis
- **Job Description Matching** - Tailored optimization based on job requirements

### 📊 ATS Optimization
- **Smart Scoring** - 6-category ATS compatibility analysis
- **Keyword Extraction** - Match important terms from job descriptions
- **Actionable Suggestions** - Specific recommendations to improve your resume
- **Skills Ranking** - AI-powered relevance scoring for your skills

### 🎨 Professional Templates
- **3 Modern Templates** - Classic, Modern, and Professional designs
- **PDF Export** - Download polished, print-ready resumes
- **Customizable Sections** - Edit and reorder content as needed

### 🌓 Modern UI/UX
- **Dark/Light Mode** - Eye-friendly theme switching
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Smooth Animations** - Delightful user experience
- **Intuitive Flow** - Create resume in under 5 minutes

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** v18 or higher ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- **Gemini API Key** ([Get Free Key](https://makersuite.google.com/app/apikey))

### Installation

1. **Install Dependencies**

   Open two terminals in the project root:

   **Terminal 1 - Frontend:**
   ```bash
   cd client
   npm install
   npm run dev
   ```
   ✅ Frontend runs at `http://localhost:3000`

   **Terminal 2 - Backend:**
   ```bash
   cd server
   npm install
   npm run dev
   ```
   ✅ Backend runs at `http://localhost:5000`

2. **Configure API Key**

   Create `server/.env` file:
   ```env
   GEMINI_API_KEY=your-api-key-here
   PORT=5000
   NODE_ENV=development
   ```

3. **Open Application**

   Navigate to `http://localhost:3000` in your browser

---

## 📁 Project Structure

```
ResumeGenie/
├── client/                      # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── CTA.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── HowItWorks.jsx
│   │   │   └── Navbar.jsx
│   │   ├── pages/              # Page components
│   │   │   ├── LandingPage.jsx
│   │   │   ├── CreateResume.jsx
│   │   │   ├── ResumeEditor.jsx
│   │   │   ├── Templates.jsx
│   │   │   └── ExportResume.jsx
│   │   ├── context/            # React context
│   │   │   └── ThemeContext.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   │   └── images/
│   └── package.json
│
├── server/                      # Backend (Node.js + Express)
│   ├── routes/
│   │   └── upload.js           # Resume/LinkedIn upload endpoint
│   ├── utils/
│   │   ├── aiService.js        # Gemini AI integration
│   │   └── resumeParser.js     # PDF/DOC parsing
│   ├── uploads/                # Temporary file storage
│   ├── server.js               # Express server
│   └── package.json
│
├── images/                      # Template preview images
│   ├── Classic Resume Template.jpeg
│   ├── Modern Resume Template.jpeg
│   └── Professional Resume Template.jpeg
│
├── .gitignore
└── README.md
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework |
| **Vite 5** | Build tool & dev server |
| **Tailwind CSS** | Utility-first styling |
| **React Router DOM** | Client-side routing |
| **Lucide React** | Modern icon library |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **Express** | Web framework |
| **Gemini AI** | Resume analysis & optimization |
| **Multer** | File upload handling |
| **pdf-parse** | PDF text extraction |

---

## 📖 User Guide

### 1. Upload Resume or LinkedIn Profile

**Option A: Upload Resume**
- Drag & drop or click to upload PDF/DOC/DOCX
- Max file size: 5MB
- Supported formats: PDF, DOC, DOCX

**Option B: LinkedIn Profile**
- Paste LinkedIn profile URL (e.g., `linkedin.com/in/username`)
- AI generates comprehensive resume from profile

### 2. Add Job Description (Optional)

- Paste job description for tailored optimization
- AI matches keywords and suggests improvements
- Get relevance scores for your skills

### 3. Review AI Analysis

The AI extracts and analyzes:
- ✅ Contact information
- ✅ Professional summary (+ AI-enhanced version)
- ✅ Work experience with achievements
- ✅ Education (degree, GPA, coursework)
- ✅ Skills (technical, soft, tools, languages)
- ✅ Certifications
- ✅ Projects
- ✅ Awards and achievements
- ✅ Professional links

**ATS Score Breakdown:**
- Overall score (0-100)
- Formatting (0-20 points)
- Contact Info (0-20 points)
- Skills (0-25 points)
- Experience (0-20 points)
- Education (0-15 points)
- Keywords (0-20 points)

### 4. Edit Your Resume

- Click sections to edit content
- Drag to reorder sections
- Add/remove bullet points
- Review AI suggestions in sidebar

### 5. Choose Template & Export

- Preview 3 professional templates
- Select your preferred design
- Download as PDF

---

## 🔧 Configuration

### Environment Variables

**Server (`server/.env`):**
```env
# Required
GEMINI_API_KEY=your-api-key-here

# Optional
PORT=5000
NODE_ENV=development
```

### API Key Setup

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with Google account
3. Click "Create API Key"
4. Copy key and add to `server/.env`
5. Restart backend server

**Note:** The free tier includes:
- 60 requests per minute
- 1,500 requests per day
- Perfect for development and personal use

---

## 🎯 How It Works

### Resume Upload Flow
```
1. User uploads PDF → 2. PDF parsed → 3. Text sent to Gemini AI
→ 4. AI extracts structured data → 5. ATS score calculated
→ 6. Suggestions generated → 7. Displayed in editor
```

### LinkedIn Profile Flow
```
1. User pastes LinkedIn URL → 2. Username extracted
→ 3. Sent to Gemini AI with specialized prompt
→ 4. AI generates realistic profile → 5. Same analysis as resume
```

### AI Processing

The Gemini AI receives:
- Raw resume text OR LinkedIn URL
- Optional job description
- Detailed instructions for comprehensive extraction

The AI returns:
```javascript
{
  parsedResume: { /* all extracted data */ },
  optimizedSummary: "AI-enhanced summary",
  optimizedExperience: [ /* bullet points */ ],
  skillsAnalysis: { /* ranked skills */ },
  atsScore: { overall: 85, breakdown: {...} },
  suggestions: [ /* improvements */ ],
  keywords: { /* job matching */ }
}
```

---

## 🐛 Troubleshooting

### Frontend Issues

**Port 3000 already in use:**
```bash
# Kill process on port 3000
npx kill-port 3000

# Or change port in vite.config.js
```

**Styles not loading:**
```bash
cd client
rm -rf node_modules
npm install
npm run dev
```

### Backend Issues

**Port 5000 already in use:**
```bash
# Kill process on port 5000
npx kill-port 5000

# Or change PORT in .env
```

**Gemini API errors:**
- Verify API key is correct in `.env`
- Check you're using `gemini-2.0-flash` model
- Ensure API key has proper permissions
- Check rate limits (60/min, 1500/day)

**File upload fails:**
- Check file size (max 5MB)
- Verify file format (PDF, DOC, DOCX only)
- Ensure `uploads/` directory exists

### Common Errors

**"Cannot find module":**
```bash
# Reinstall dependencies
cd client && npm install
cd ../server && npm install
```

**"Gemini API key is required":**
- Add `GEMINI_API_KEY` to `server/.env`
- Restart backend server

**CORS errors:**
- Check frontend is on port 3000
- Check backend is on port 5000
- Verify CORS is enabled in `server.js`

---

## 🚀 Development

### Running in Development

```bash
# Terminal 1 - Frontend with hot reload
cd client
npm run dev

# Terminal 2 - Backend with auto-restart
cd server
npm run dev
```

### Building for Production

```bash
# Build frontend
cd client
npm run build
# Output in client/dist/

# Run backend in production mode
cd server
NODE_ENV=production node server.js
```

### Adding New Features

**Frontend:**
1. Add component in `client/src/components/`
2. Add page in `client/src/pages/`
3. Update routes in `client/src/App.jsx`

**Backend:**
1. Add route in `server/routes/`
2. Add utility in `server/utils/`
3. Update `server/server.js` to include route

---

## 📝 API Endpoints

### POST `/api/upload`

Upload resume file or LinkedIn URL for AI analysis.

**Request:**
```javascript
// FormData with either:
{
  resume: File,              // PDF/DOC/DOCX (optional)
  linkedinUrl: String,       // LinkedIn profile URL (optional)
  jobDescription: String     // Optional job description
}
```

**Response:**
```javascript
{
  success: true,
  message: "Resume processed successfully",
  data: {
    inputMethod: "upload" | "linkedin",
    resumeData: {
      original: { /* raw extracted data */ },
      optimized: { /* structured resume data */ },
      optimizedSummary: "...",
      optimizedExperience: [...],
      skillsAnalysis: { ... },
      atsScore: { overall: 85, breakdown: {...} },
      suggestions: [...],
      keywords: { ... }
    },
    hasJobDescription: boolean
  }
}
```

**Error Response:**
```javascript
{
  error: "Upload failed",
  message: "Error description"
}
```

---

## 🎨 Design System

### Colors
- **Primary:** Indigo (`#6366f1`)
- **Dark Background:** `#0f172a`
- **Light Background:** `#ffffff`
- **Text Dark:** `#1e293b`
- **Text Light:** `#e2e8f0`

### Typography
- **Font Family:** Inter, system-ui, sans-serif
- **Headings:** Bold, 2xl-4xl
- **Body:** Regular, base
- **Code:** Mono

### Spacing
- Consistent 4px grid system
- Tailwind utility classes

---

## 🤝 Contributing

This project is currently maintained for personal/educational use. If you'd like to contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

MIT License - feel free to use this project for learning and personal projects.

---

## 🙏 Acknowledgments

- **Google Gemini AI** - Powering intelligent resume analysis
- **Tailwind CSS** - Beautiful, responsive styling
- **React Community** - Excellent libraries and tools
- **Lucide Icons** - Clean, modern iconography

---

## 📞 Support

For issues, questions, or suggestions:
- Create an issue on GitHub
- Check troubleshooting section above
- Review Gemini AI documentation

---

**Built with ❤️ using React, Node.js, and Gemini AI**

Last Updated: November 2025

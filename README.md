# 🧞 ResumeGenie

<div align="center">

![ResumeGenie](https://img.shields.io/badge/ResumeGenie-AI--Powered-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Production-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

**Transform your resume with AI-powered optimization and LaTeX-quality templates**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [Tech Stack](#-tech-stack) • [Documentation](#-documentation)

</div>

---

## 🌟 Overview

**ResumeGenie** is a modern, full-stack web application that leverages **Google's Gemini AI** to analyze, optimize, and transform your resume into a professionally formatted document. Upload your existing resume, get AI-powered suggestions, and download a pixel-perfect PDF with LaTeX-inspired designs—all in minutes.

### ✨ Why ResumeGenie?

- 🤖 **AI-Powered Analysis**: Gemini AI extracts and optimizes every section of your resume
- 🎨 **LaTeX-Quality Templates**: Three professionally designed templates matching industry standards
- 📊 **ATS Optimization**: Get detailed ATS compliance scores with actionable suggestions
- 🖨️ **Browser-Based PDF**: Generate publication-quality PDFs directly in your browser
- 🚀 **No Sign-Up Required**: Upload, edit, and download—no account needed
- 🌓 **Dark Mode Support**: Easy on the eyes, works in any lighting

---

## 🎯 Features

### Core Features

#### 1. **Intelligent Resume Parsing**
- Upload PDF or DOCX files
- AI extracts: Experience, Education, Skills, Projects, Certifications, Honors
- Preserves dates, GPA, technologies, and all critical details

#### 2. **AI-Powered Optimization**
- **Summary Rewriting**: Transform generic summaries into compelling professional narratives
- **Experience Enhancement**: AI rewrites bullet points for impact and ATS compliance
- **Skills Extraction**: Identifies 15-20+ technical and soft skills
- **Content Analysis**: Comprehensive parsing of certifications, projects, and achievements

#### 3. **ATS Compliance Scoring**
Get a detailed breakdown across 8 categories:
- 📝 Keywords & Skills Match
- 📊 Experience Relevance
- 🎓 Education Requirements
- 🔧 Technical Skills
- 📜 Certifications & Credentials
- 💼 Professional Summary Quality
- 📐 Format & Structure
- ✍️ Overall Presentation

**Plus**: Real-time suggestions with penalties and bonuses displayed

#### 4. **Professional Templates**

<table>
<tr>
<td width="33%" align="center">
<img src="client/public/images/Modern Resume Template.jpeg" width="200"/><br/>
<b>Modern</b><br/>
<sub>2-column dark header<br/>Contemporary design</sub>
</td>
<td width="33%" align="center">
<img src="client/public/images/Professional Resume Template.jpeg" width="200"/><br/>
<b>Professional</b><br/>
<sub>Clean corporate style<br/>Skills grid layout</sub>
</td>
<td width="33%" align="center">
<img src="client/public/images/Classic Resume Template.jpeg" width="200"/><br/>
<b>Classic</b><br/>
<sub>Academic traditional<br/>Dense information</sub>
</td>
</tr>
</table>

#### 5. **Interactive Resume Editor**
Six comprehensive tabs:
- **Overview**: AI-optimized summary and ATS score
- **Experience**: Edit work history with AI-enhanced bullets
- **Education**: Manage degrees, GPA, coursework
- **Skills**: 15-20+ skills with match indicators
- **Extras**: Certifications, projects, honors, awards
- **Templates**: Live preview and selection

#### 6. **Export Options**
- **PDF Download**: Browser-based print → Save as PDF (A4 size)
- **LaTeX Export**: Download `.tex` files for Overleaf (advanced users)
- **Template Switching**: Change templates on the fly before download

---

## 🚀 Installation

### Prerequisites

- **Node.js** 18+ and npm
- **Google Gemini API Key** ([Get one here](https://makersuite.google.com/app/apikey))
- **Git** for cloning

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/kartik-tata14/ResumeGenie.git
cd ResumeGenie

# 2. Install backend dependencies
cd server
npm install

# 3. Create .env file
echo "GEMINI_API_KEY=your_gemini_api_key_here" > .env
echo "PORT=5000" >> .env

# 4. Start backend (in terminal 1)
npm start

# 5. Install frontend dependencies (open new terminal)
cd ../client
npm install

# 6. Start frontend (in terminal 2)
npm run dev

# 7. Open browser to http://localhost:3000
```

---

## 💻 Usage

### Quick Start Guide

1. **Upload Your Resume**
   - Click "Get Started" or "Create Resume"
   - Drag & drop your PDF/DOCX file or click to browse
   - Wait for AI analysis (15-30 seconds)

2. **Review AI-Optimized Content**
   - Navigate through the 6 tabs
   - Review AI-rewritten summaries and experience bullets
   - Check ATS score and suggestions
   - Edit any section as needed

3. **Select a Template**
   - Go to the "Templates" tab
   - Click on Modern, Professional, or Classic
   - Preview the design

4. **Export Your Resume**
   - Click "Proceed to Export"
   - Switch templates if desired (Live switching available)
   - Click "Download PDF"
   - In print dialog: Select "Save as PDF"
   - Choose A4 paper size, no margins
   - Save your professional resume!

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool & dev server
- **TailwindCSS** - Utility-first styling
- **React Router** - Client-side routing
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Google Generative AI** - Gemini 2.0 Flash model
- **Multer** - File upload handling
- **pdf-parse** - PDF text extraction
- **mammoth** - DOCX text extraction

---

## 📁 Project Structure

```
ResumeGenie/
├── client/                      # Frontend React application
│   ├── public/
│   │   └── images/              # Template preview images
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   ├── context/             # Dark mode management
│   │   ├── pages/               # Page components
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/                      # Backend Express API
│   ├── routes/
│   │   ├── export.js            # LaTeX export endpoint
│   │   └── upload.js            # Resume upload & AI processing
│   ├── utils/
│   │   ├── aiService.js         # Gemini AI integration
│   │   ├── latexGenerator.js   # LaTeX template generator
│   │   └── resumeParser.js     # Text extraction utilities
│   ├── uploads/                 # Temporary upload storage
│   ├── .env.example
│   ├── server.js                # Express server entry
│   └── package.json
│
├── templates/                   # LaTeX reference templates
│   ├── modern.tex
│   ├── professional.tex
│   └── classic.tex
│
├── docs/                        # Documentation
│   ├── DESIGN_IMPLEMENTATION.md # Design specifications
│   └── TESTING_GUIDE.md         # Testing checklist
│
├── .gitignore
└── README.md
```

---

## 🎨 Template Details

### 1. **Modern Template**
- **Design**: Two-column layout with dark header
- **Font**: Georgia serif
- **Features**: 
  - 31% sidebar with About, Education, Skills, Certifications, Honors
  - 69% main content with Experience and Projects
  - Dark gradient header (85% opacity)
  - LaTeX-inspired typography (10pt body, 14px headers)
- **Best For**: Tech/Creative industries, 3-5 years experience

### 2. **Professional Template**
- **Design**: Single-column academic style
- **Font**: Helvetica Neue sans-serif
- **Features**:
  - Navy blue accents (#2c3e50)
  - Skills in 2-column grid cards
  - Objective section at top
  - Clean corporate formatting
- **Best For**: Corporate positions, MBA roles, consulting

### 3. **Classic Template**
- **Design**: Traditional single-column
- **Font**: Times New Roman
- **Features**:
  - Tabular header (name left, contact right)
  - Small caps section headers
  - Dense information layout
  - Academic paper style
- **Best For**: Academia, research, senior-level (10+ years)

All templates:
- ✅ A4 dimensions (210mm × 297mm)
- ✅ Print-optimized with color preservation
- ✅ ATS-friendly (no images, clean structure)
- ✅ Include all data: certs, projects, honors

---

## 📚 Documentation

### Additional Resources

- **[Design Implementation Guide](docs/DESIGN_IMPLEMENTATION.md)** - Complete design specifications, typography, measurements
- **[Testing Guide](docs/TESTING_GUIDE.md)** - Comprehensive testing checklist for all templates
- **[LaTeX Templates](templates/)** - Reference `.tex` files for design inspiration

### API Endpoints

#### `POST /api/upload`
Upload and analyze resume with AI.

**Request:**
```bash
curl -X POST http://localhost:5000/api/upload \
  -F "resume=@your-resume.pdf" \
  -F "jobDescription=Data Analyst role..."
```

**Response:**
```json
{
  "success": true,
  "parsedResume": { ... },
  "optimized": {
    "name": "John Doe",
    "email": "john@example.com",
    "summary": "AI-optimized professional summary...",
    "skills": [...],
    "honors": [...]
  },
  "optimizedExperience": [...],
  "optimizedEducation": [...],
  "optimizedCertifications": [...],
  "optimizedProjects": [...],
  "atsScore": {...}
}
```

#### `POST /api/export/latex`
Generate LaTeX file for selected template.

---

## 🐛 Troubleshooting

### Common Issues

**Issue: Gemini API returns 429 error**
- Solution: Check your API quota at [Google AI Studio](https://makersuite.google.com/)

**Issue: PDF not downloading**
- Solution: Ensure browser allows pop-ups, try Ctrl+P manually

**Issue: Contact info not visible in Modern template**
- Solution: Clear cache and reload (fixed in v2.0)

**Issue: Upload fails**
- Solution: Check file size < 10MB, format is PDF or DOCX

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m "Add YourFeature"`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful resume analysis
- **LaTeX Community** for design inspiration
- **Tailwind CSS** team for excellent utility framework

---

## 📞 Contact & Support

- **GitHub**: [@kartik-tata14](https://github.com/kartik-tata14)
- **Issues**: [Report a bug](https://github.com/kartik-tata14/ResumeGenie/issues)

---

## 🗺️ Roadmap

### Planned Features
- [ ] LinkedIn profile import
- [ ] Multiple resume versions management
- [ ] User accounts and cloud storage
- [ ] Custom template builder
- [ ] Mobile app (React Native)

### Version History
- **v2.0** (Current) - LaTeX-inspired templates, improved Modern template
- **v1.5** - ATS scoring with 8 categories
- **v1.0** - Initial release with Gemini AI integration

---

<div align="center">

**Made with ❤️ by Kartik Tata**

⭐ Star this repo if you find it helpful!

[Back to Top](#-resumegenie)

</div>

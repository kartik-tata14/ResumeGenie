# 🚨 ResumeGenie - Critical Fixes Required Before Netlify Deployment

This document provides specific, actionable fixes for all critical issues identified in the deployment analysis.

---

## 🔴 CRITICAL FIX #1: Implement DOC/DOCX Parsing

**File to Fix**: `server/utils/resumeParser.js`

### Step 1: Install the required library
```bash
npm install mammoth --save
```

### Step 2: Update the import section (Line 1):
```javascript
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';  // ← ADD THIS LINE
import fs from 'fs/promises';
import path from 'path';
```

### Step 3: Replace the DOCX handler (Lines 71-79):
**Current (Broken)**:
```javascript
} else if (mimetype === 'application/msword' ||
    mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    // For DOC/DOCX, we'll use a simpler approach or rely on AI
    // In production, you'd use mammoth or docx library
    return {
        rawText: 'DOC parsing not yet implemented. Please upload PDF or use AI to extract.',
        name: '',
        email: '',
        phone: '',
        skills: [],
        experience: [],
        education: []
    };
}
```

**Fixed**:
```javascript
} else if (mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    // Handle DOCX files
    try {
        const docxBuffer = await fs.readFile(filePath);
        const result = await mammoth.extractRawText({arrayBuffer: docxBuffer});
        return extractResumeData(result.value);
    } catch (error) {
        console.error('DOCX parsing error:', error);
        throw new Error('Failed to parse DOCX file');
    }
} else if (mimetype === 'application/msword') {
    // DOC files are harder to parse, recommend DOCX
    throw new Error('DOC format is not supported. Please convert to DOCX or PDF.');
}
```

### Step 4: Update server package.json
Ensure `mammoth` is added to server/package.json dependencies:
```json
"dependencies": {
    "@google/generative-ai": "^0.21.0",
    "axios": "^1.6.7",
    "cors": "^2.8.5",
    "dotenv": "^16.4.1",
    "express": "^4.18.2",
    "mongoose": "^8.1.1",
    "multer": "^1.4.5-lts.1",
    "pdf-parse": "^1.1.1",
    "mammoth": "^1.6.0"  // ← ADD THIS
}
```

### Step 5: Update Netlify functions package.json
Since Netlify functions also use resumeParser.js, add mammoth there too:
```json
{
  "name": "resume-genie-functions",
  "version": "1.0.0",
  "description": "Netlify serverless functions for Resume Genie",
  "type": "module",
  "dependencies": {
    "@google/generative-ai": "^0.21.0",
    "axios": "^1.6.7",
    "dotenv": "^16.4.1",
    "parse-multipart-data": "^1.5.0",
    "pdf-parse": "^1.1.1",
    "mammoth": "^1.6.0"  // ← ADD THIS
  }
}
```

**Verification**: After fixing, try uploading a .docx file locally:
```bash
npm run dev  # Start server
# Then test upload via http://localhost:3000/create
```

---

## 🔴 CRITICAL FIX #2: Add SPA Routing Fallback to Netlify

**File to Fix**: `netlify.toml`

### Current Content:
```toml
[build]
  base = "client"
  command = "npm install && npm run build"
  publish = "dist"

[functions]
  directory = "netlify/functions"
  node_bundler = "esbuild"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    Access-Control-Allow-Origin = "*"
    Access-Control-Allow-Methods = "GET, POST, PUT, DELETE, OPTIONS"
    Access-Control-Allow-Headers = "Content-Type"
```

### Fix: Add SPA Redirect (INSERT BEFORE HEADERS)
```toml
[build]
  base = "client"
  command = "npm install && npm run build"
  publish = "dist"

[functions]
  directory = "netlify/functions"
  node_bundler = "esbuild"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

# ← ADD THIS BLOCK (SPA routing - MUST BE LAST REDIRECT)
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    Access-Control-Allow-Origin = "*"
    Access-Control-Allow-Methods = "GET, POST, PUT, DELETE, OPTIONS"
    Access-Control-Allow-Headers = "Content-Type"
```

**Important**: The SPA redirect MUST be the last `[[redirects]]` block because Netlify evaluates redirects top-to-bottom and the first match wins.

**What This Fixes**:
- Direct access to `/editor` no longer gives 404
- Page refresh on `/export` works
- Sharing links to `/templates` works
- All client-side routing works correctly

---

## 🔴 CRITICAL FIX #3: Fix Gemini API Key Access for Netlify

**File to Fix**: `server/utils/aiService.js`

### Step 1: Remove dotenv dependency (Lines 1-3)
**Current**:
```javascript
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();  // ← DELETE THIS LINE AND LINE 2

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
```

**Fixed**:
```javascript
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI (environment variables injected by Netlify)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
```

### Step 2: Update error message (Lines 10-12)
**Current**:
```javascript
if (!process.env.GEMINI_API_KEY) {
    throw new Error('Gemini API key is required. Add GEMINI_API_KEY to your .env file.');
}
```

**Fixed**:
```javascript
if (!process.env.GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured. Set GEMINI_API_KEY in Netlify environment variables.');
}
```

**How to Add API Key to Netlify**:
1. Go to your Netlify Dashboard → Site Settings → Environment Variables
2. Add new variable:
   - Key: `GEMINI_API_KEY`
   - Value: Your Google Gemini API key
   - Scopes: Check all (Builds, Functions, Post Processing)
3. Click "Create variable"
4. Go to Deploys → Trigger deploy

**Testing Locally**:
Before committing, test that the key works:
```bash
cd server
export GEMINI_API_KEY="your-api-key-here"
npm run dev
# Upload a resume to verify AI optimization works
```

---

## 🔴 CRITICAL FIX #4: Build Command Update for Functions

**File to Fix**: `netlify.toml`

### Current Build Command:
```toml
[build]
  base = "client"
  command = "npm install && npm run build"
  publish = "dist"
```

### Updated Build Command:
```toml
[build]
  base = "client"
  command = "npm install && npm run build && cd ../netlify/functions && npm install"
  publish = "dist"
```

**What This Does**:
1. Installs client dependencies
2. Builds the React app
3. Changes to netlify/functions directory
4. Installs serverless function dependencies

**Why It's Needed**:
Netlify functions import from shared utilities and have their own dependencies. This ensures they're installed and available when functions are bundled.

---

## 🔴 CRITICAL FIX #5: Add Error Boundaries to React

**File to Fix**: `client/src/App.jsx`

### Step 1: Create an Error Boundary component

Create a new file: `client/src/components/ErrorBoundary.jsx`

```jsx
import React from 'react';
import { AlertTriangle, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    resetError = () => {
        this.setState({ hasError: false, error: null });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
                    <div className="text-center max-w-md">
                        <div className="mb-4 flex justify-center">
                            <AlertTriangle className="w-16 h-16 text-red-500" />
                        </div>
                        <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                            Something Went Wrong
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            {this.state.error?.message || 'An unexpected error occurred'}
                        </p>
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={this.resetError}
                                className="px-6 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700"
                            >
                                Try Again
                            </button>
                            <a
                                href="/"
                                className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-semibold hover:bg-gray-300"
                            >
                                Go Home
                            </a>
                        </div>
                        {process.env.NODE_ENV === 'development' && (
                            <details className="mt-4 text-left text-xs text-gray-500">
                                <summary>Error details (dev only)</summary>
                                <pre className="mt-2 p-2 bg-gray-100 dark:bg-gray-800 overflow-auto">
                                    {this.state.error?.stack}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
```

### Step 2: Update App.jsx to use ErrorBoundary

**Current** `client/src/App.jsx`:
```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CreateResume from './pages/CreateResume';
import ResumeEditor from './pages/ResumeEditor';
import ExportResume from './pages/ExportResume';
import Templates from './pages/Templates';
import Navbar from './components/Navbar';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/create" element={<CreateResume />} />
                <Route path="/editor" element={<ResumeEditor />} />
                <Route path="/export" element={<ExportResume />} />
                <Route path="/templates" element={<Templates />} />
            </Routes>
        </Router>
    );
}

export default App;
```

**Fixed** `client/src/App.jsx`:
```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CreateResume from './pages/CreateResume';
import ResumeEditor from './pages/ResumeEditor';
import ExportResume from './pages/ExportResume';
import Templates from './pages/Templates';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';  // ← ADD THIS

function App() {
    return (
        <ErrorBoundary>  {/* ← ADD THIS */}
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/create" element={<CreateResume />} />
                    <Route path="/editor" element={<ResumeEditor />} />
                    <Route path="/export" element={<ExportResume />} />
                    <Route path="/templates" element={<Templates />} />
                </Routes>
            </Router>
        </ErrorBoundary>  {/* ← ADD THIS */}
    );
}

export default App;
```

**What This Does**: If any component throws an error, instead of crashing the entire app, the error boundary catches it and shows a friendly error page.

---

## 🔴 CRITICAL FIX #6: Add Try-Catch to Problematic Components

### Fix CreateResume.jsx (Lines 88-118)

**Current**:
```javascript
const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
});

if (response.ok) {
    const result = await response.json();
    console.log('Success:', result);
    // Navigate to editor page with resume data
    navigate('/editor', { state: { resumeData: result.data.resumeData } });
} else {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Upload failed');
}
```

**Fixed** (Better error handling):
```javascript
const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
});

if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Upload failed: ${response.statusText}`);
}

try {
    const result = await response.json();
    if (!result.data || !result.data.resumeData) {
        throw new Error('Invalid response: missing resume data');
    }
    console.log('Success:', result);
    navigate('/editor', { state: { resumeData: result.data.resumeData } });
} catch (parseError) {
    throw new Error('Failed to process response: ' + parseError.message);
}
```

### Fix ExportResume.jsx (Lines 31-46)

**Current**:
```javascript
const handleDownloadLatex = async () => {
    setDownloading(true);
    setDownloadError('');

    try {
        const response = await fetch('/api/export-latex', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ resumeData, selectedTemplate: currentTemplate })
        });

        if (!response.ok) throw new Error('Failed to generate LaTeX file');

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const templateNames = { 1: 'modern', 2: 'professional', 3: 'classic' };
        a.download = `resume_${templateNames[currentTemplate] || 'modern'}.tex`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('LaTeX download error:', error);
        setDownloadError('Failed to download LaTeX file');
    } finally {
        setDownloading(false);
    }
};
```

**Fixed** (Check for text response):
```javascript
const handleDownloadLatex = async () => {
    setDownloading(true);
    setDownloadError('');

    try {
        if (!resumeData) {
            throw new Error('No resume data available');
        }

        const response = await fetch('/api/export-latex', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ resumeData, selectedTemplate: currentTemplate })
        });

        if (!response.ok) {
            const errorText = await response.text().catch(() => 'Unknown error');
            throw new Error(`Export failed: ${errorText}`);
        }

        const blob = await response.blob();
        if (blob.size === 0) {
            throw new Error('Received empty file from server');
        }

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const templateNames = { 1: 'modern', 2: 'professional', 3: 'classic' };
        a.download = `resume_${templateNames[currentTemplate] || 'modern'}.tex`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('LaTeX download error:', error);
        setDownloadError(error.message || 'Failed to download LaTeX file');
    } finally {
        setDownloading(false);
    }
};
```

---

## 📋 Testing Checklist After Fixes

- [ ] DOC/DOCX upload works and parses correctly
- [ ] SPA routing (direct /editor, /export access) works
- [ ] Netlify env var for GEMINI_API_KEY is set
- [ ] Serverless functions deploy without errors
- [ ] Error boundaries catch and display errors gracefully
- [ ] Resume optimization completes without API key errors
- [ ] LaTeX export downloads correctly
- [ ] PDF download via print works
- [ ] All 3 templates render properly
- [ ] Mobile responsive design works
- [ ] Dark mode toggle works

---

## 🚀 Deployment Commands

```bash
# After applying all fixes:

# 1. Install all dependencies
cd ResumeGenie
npm install
cd client && npm install
cd ../server && npm install
cd ../netlify/functions && npm install
cd ../..

# 2. Build the client
cd client
npm run build
cd ..

# 3. Test Netlify build locally
netlify build

# 4. Test with Netlify dev server
netlify dev

# 5. If all tests pass, commit and push
git add -A
git commit -m "Fix critical Netlify deployment issues"
git push origin main

# 6. Add Netlify environment variable
# Go to Netlify Dashboard → Site Settings → Environment → Add Variable
# - Key: GEMINI_API_KEY
# - Value: Your API key
# - Save

# 7. Trigger redeploy
# Go to Deploys → Trigger deploy
```

---

## ✅ Verification After Deployment

1. Visit your Netlify deployment URL
2. Test:
   - Upload a PDF resume
   - Check AI optimization works
   - View ATS score
   - Export as LaTeX
   - Download PDF via print
   - Switch templates
   - Navigate directly to /editor, /export, /templates
   - Test mobile view
   - Check server logs for errors

If everything passes, your ResumeGenie is production-ready! 🎉

# 🧪 Testing Guide - Professional Resume Templates

## Quick Test Checklist

### ✅ Pre-Testing Setup
1. **Start both servers**:
   ```powershell
   # Terminal 1 - Backend
   cd server
   npm start

   # Terminal 2 - Frontend  
   cd client
   npm run dev
   ```

2. **Upload a sample resume** (PDF or DOCX with comprehensive data)
3. **Navigate through all tabs** to verify AI extraction
4. **Go to Export page** from Templates tab

---

## 📋 Template 1: MODERN - Test Checklist

### Visual Elements
- [ ] Dark header background visible (black with 85% opacity)
- [ ] Name split: First name light, last name bold
- [ ] Contact info in single line with pipe separators
- [ ] Two-column layout: 31% left sidebar, 69% right main content

### Sidebar Content
- [ ] About Me section with justified text
- [ ] Education with GPA and dates
- [ ] Links section (if LinkedIn/GitHub present)
- [ ] Certifications with issuer and date
- [ ] Honors & Awards list
- [ ] Skills comma-separated

### Main Content
- [ ] Experience with company bold, title after dash
- [ ] Dates aligned right in gray
- [ ] Bullet points with proper indentation
- [ ] Projects section with name bold
- [ ] Technologies italicized with "Tech:" prefix
- [ ] Footer with "Last updated [date]"

### Typography
- [ ] Georgia/Times New Roman serif font
- [ ] Section headers uppercase with underline
- [ ] 10pt body text, 14px headers
- [ ] Proper letter-spacing on headers

---

## 📋 Template 2: PROFESSIONAL - Test Checklist

### Header
- [ ] Name centered at 28pt in navy (#2c3e50)
- [ ] 2pt solid navy border under header
- [ ] Contact info in single row with bullets
- [ ] LinkedIn/GitHub on second row (if present)

### Skills Section
- [ ] 2-column grid layout
- [ ] Each skill in light gray card with border
- [ ] Navy bullet point before each skill

### Content Sections
- [ ] All section headers in uppercase navy
- [ ] 1.5pt solid border under each header
- [ ] Consistent 7mm spacing between sections

### Experience
- [ ] Company name bold navy, title after dash
- [ ] Dates right-aligned, italic, gray
- [ ] Standard disc bullet markers
- [ ] 5mm spacing between entries

### Education
- [ ] Institution bold, degree with GPA on same line
- [ ] Dates right-aligned in italic
- [ ] Coursework in italic subtext (if present)

### Projects
- [ ] Project name bold with date right-aligned
- [ ] Description paragraph below
- [ ] Technologies line with "Technologies:" prefix

---

## 📋 Template 3: CLASSIC - Test Checklist

### Header (Tabular Layout)
- [ ] Name on left at 22pt bold
- [ ] Email and phone right-aligned
- [ ] Location on second row left
- [ ] GitHub/LinkedIn right-aligned on second row

### Section Headers
- [ ] Small caps styling visible
- [ ] 1pt solid black underline
- [ ] 13pt font size, bold weight

### Education
- [ ] Table-style layout with left/right alignment
- [ ] Institution bold left, location right
- [ ] Degree italic with GPA
- [ ] Dates right-aligned italic

### Skills
- [ ] "Technical Skills:" label bold
- [ ] Comma-separated list after colon

### Experience
- [ ] Company bold left, location right
- [ ] Title regular, dates italic right
- [ ] Circle bullets (◦) for items
- [ ] 5mm left margin

### Projects
- [ ] Name bold with technologies in parentheses
- [ ] Date in parentheses, floated right
- [ ] Description single paragraph

### Certifications
- [ ] Name bold, issuer in parentheses
- [ ] Date with dash separator

---

## 🖨️ Print Testing

### For Each Template
1. **Click "Download PDF"** button
2. **Verify print preview**:
   - [ ] A4 size selected (210mm × 297mm)
   - [ ] No margins (0mm)
   - [ ] Background colors printing
   - [ ] All sections visible
   - [ ] No content cut off
   - [ ] Page breaks appropriate

3. **Save as PDF**:
   - [ ] File size reasonable (< 500KB)
   - [ ] Text selectable (not image)
   - [ ] Fonts embedded correctly
   - [ ] Colors accurate

---

## 🔄 Template Switching

### Dynamic Switching Test
1. [ ] Start on Template 1 (Modern)
2. [ ] Click "Professional" button → content changes instantly
3. [ ] Click "Classic" button → content changes instantly
4. [ ] Click "Modern" button → back to original
5. [ ] Active template button highlighted
6. [ ] No page reload or flickering

---

## 📦 LaTeX Download

### Test LaTeX Export
1. [ ] Click "Download LaTeX" button
2. [ ] File downloads as `resume_modern.tex` (or professional/classic)
3. [ ] Switch template → download again
4. [ ] Filename changes to match template
5. [ ] File opens in text editor
6. [ ] Valid LaTeX syntax (no compilation errors if uploaded to Overleaf)

---

## 🎨 Styling Verification

### Modern Template
```
Font: Georgia
Header BG: rgba(0,0,0,0.85)
Section Border: 0.5pt solid #4a4a4a
Body Font: 10pt
Line Height: 1.45
```

### Professional Template
```
Font: Helvetica Neue
Primary Color: #2c3e50 (navy)
Secondary Color: #34495e
Border: 1.5pt solid #34495e
Body Font: 10.5pt
Line Height: 1.5
```

### Classic Template
```
Font: Times New Roman
Border: 1pt solid black
Body Font: 11pt
Headers: 13pt Small Caps
Line Height: 1.4
```

---

## 🐛 Common Issues to Check

### Template 1 (Modern)
- [ ] Dark header not showing → Check opacity and positioning
- [ ] Sidebar too narrow → Verify 31% grid column
- [ ] Footer missing → Check last updated code
- [ ] Skills not wrapping → Verify text-align: justify

### Template 2 (Professional)
- [ ] Skills grid not 2 columns → Check grid-template-columns
- [ ] Navy color not showing → Verify #2c3e50 hex
- [ ] Borders too thick/thin → Check 1.5pt setting
- [ ] Spacing inconsistent → Verify 7mm margins

### Template 3 (Classic)
- [ ] Header not tabular → Check display: table structure
- [ ] Small caps not working → Verify font-variant
- [ ] Bullets wrong symbol → Check ◦ vs • vs ▸
- [ ] Text too tight → Verify line-height 1.4

---

## 📱 Responsive Testing

### Desktop (1920x1080)
- [ ] All templates display correctly
- [ ] A4 width maintained (210mm)
- [ ] Sidebar visible with template buttons
- [ ] Action bar sticky on scroll

### Laptop (1366x768)
- [ ] Resume fits in viewport
- [ ] Template buttons accessible
- [ ] No horizontal scroll

### Tablet/Mobile
- [ ] Navigation works
- [ ] Templates preview (warn user to print on desktop)
- [ ] Buttons stack vertically if needed

---

## ✨ Data Completeness Test

### Verify All Sections Render
- [ ] Name and contact info
- [ ] Professional summary (AI-optimized)
- [ ] Experience with AI-rewritten bullets
- [ ] Education with GPA
- [ ] Skills (15+ skills)
- [ ] Certifications with issuer, date, skills
- [ ] Projects with technologies, description
- [ ] Honors and awards
- [ ] Volunteer experience (if applicable)

### Missing Data Handling
- [ ] Sections hide gracefully if no data
- [ ] No "undefined" or "null" displayed
- [ ] Empty arrays don't show empty bullets
- [ ] Optional fields (GPA, dates) hide if missing

---

## 🎯 ATS Optimization Check

### All Templates Should Have
- [ ] Clean semantic HTML structure
- [ ] No images or icons in content (icons in nav only)
- [ ] Standard fonts (Georgia, Helvetica, Times)
- [ ] Linear reading order
- [ ] No tables for layout (except Classic header)
- [ ] Text-based bullets (•, ◦, ▸)
- [ ] Clear section headings

---

## 📊 Performance Testing

### Load Time
- [ ] Export page loads < 2 seconds
- [ ] Template switching < 100ms
- [ ] No layout shift on load
- [ ] Smooth scroll behavior

### Print Performance
- [ ] Print dialog opens quickly
- [ ] Preview renders in < 3 seconds
- [ ] No browser freeze during print

---

## 🔍 Edge Cases to Test

### Long Content
- [ ] Name > 30 characters → Wraps gracefully
- [ ] Experience bullets > 5 lines → No overflow
- [ ] 10+ projects → Multiple pages OK
- [ ] 50+ skills → Wraps in Modern, cards in Professional

### Special Characters
- [ ] Accented names (José, Müller) display correctly
- [ ] Em dashes (—) vs hyphens (-) correct
- [ ] Degrees (©, ®, °) render properly
- [ ] Quotes ("smart" vs "dumb") consistent

### Missing Data
- [ ] No email → Header adjusts
- [ ] No GPA → Line hides
- [ ] No projects → Section omitted
- [ ] No honors → Section hidden

---

## 📝 Final Validation

### Before Marking Complete
1. [ ] All 3 templates tested with real resume data
2. [ ] PDF downloads successfully from all templates
3. [ ] LaTeX files download with correct filenames
4. [ ] No console errors in browser
5. [ ] No React warnings in dev console
6. [ ] Print preview shows exact A4 dimensions
7. [ ] All AI-optimized content displays
8. [ ] Template switching works flawlessly
9. [ ] Dark mode UI works (export controls visible)
10. [ ] Back to Editor button works

---

## 🎉 Success Criteria

✅ **PASS** if:
- All 3 templates display professionally
- Print output matches LaTeX quality
- All data sections render correctly
- Template switching instant and smooth
- Downloads work (PDF + LaTeX)
- No visual bugs or broken layouts
- Typography matches design specs
- Colors and spacing accurate

❌ **FAIL** if:
- Any template has broken layout
- Sections missing or showing "undefined"
- Print output cut off or misaligned
- Template switching causes errors
- Downloads fail or wrong format
- Visual glitches or overlapping text

---

## 🆘 Troubleshooting

### If templates not showing:
```javascript
// Check console for errors
// Verify resumeData passed from Templates page
console.log(resumeData);
```

### If print doesn't work:
```javascript
// Verify window.print() triggers
// Check print styles loaded
// Ensure @page CSS rules present
```

### If LaTeX download fails:
```bash
# Check server running
curl http://localhost:5000/api/export/latex

# Check server logs for errors
# Verify resumeData in POST body
```

---

**Testing Time Estimate**: 30-45 minutes for comprehensive test  
**Priority**: P0 - Critical for launch  
**Last Updated**: November 2025

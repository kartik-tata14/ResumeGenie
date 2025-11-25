/**
 * LaTeX Resume Generator
 * Generates .tex files from resume data matching Overleaf templates
 */

/**
 * Escape special LaTeX characters
 */
function escapeLatex(text) {
    if (!text) return '';
    return text
        .replace(/\\/g, '\\textbackslash{}')
        .replace(/&/g, '\\&')
        .replace(/%/g, '\\%')
        .replace(/\$/g, '\\$')
        .replace(/#/g, '\\#')
        .replace(/_/g, '\\_')
        .replace(/\{/g, '\\{')
        .replace(/\}/g, '\\}')
        .replace(/~/g, '\\textasciitilde{}')
        .replace(/\^/g, '\\textasciicircum{}');
}

/**
 * Generate Modern Template LaTeX
 */
export function generateModernTemplate(resumeData) {
    const { optimized, optimizedExperience, optimizedEducation, optimizedCertifications, optimizedProjects } = resumeData;

    // Extract name parts
    const nameParts = (optimized.name || 'Your Name').split(' ');
    const firstName = nameParts[0] || 'First';
    const lastName = nameParts.slice(1).join(' ') || 'Last';

    // Build contact line
    const contactParts = [];
    if (optimized.email) contactParts.push(escapeLatex(optimized.email));
    if (optimized.phone) contactParts.push(escapeLatex(optimized.phone));
    if (optimized.location) contactParts.push(escapeLatex(optimized.location));
    const contactLine = contactParts.join(' | ');

    let latex = `\\documentclass[11pt]{article}

% ================ PACKAGES ====================
\\usepackage[reset, a4paper, margin=6mm, top=7mm, right=4mm]{geometry}
\\usepackage{ragged2e}
\\usepackage{color}
\\usepackage{xcolor}
\\usepackage{ulem}
\\usepackage{contour}
\\usepackage{paracol}
\\usepackage{fontspec}
\\usepackage{eso-pic}
\\usepackage{fontawesome5}
\\usepackage{hyperref}
\\usepackage{enumitem}

% ================ SETTINGS ====================
\\setlist[itemize]{noitemsep, topsep=-2pt, leftmargin=2ex}
\\setromanfont{CormorantGaramond}
\\setsansfont{SourceSerifPro}
\\renewcommand{\\familydefault}{\\rmdefault}
\\thispagestyle{empty}
\\parindent=0pt
\\renewcommand{\\ULdepth}{3pt}
\\renewcommand{\\ULthickness}{0.5pt}
\\contourlength{2.0pt}
\\hypersetup{colorlinks=false, pdfborder = {0 0 0}}
\\tolerance=1
\\emergencystretch=\\maxdimen
\\hyphenpenalty=10000
\\hbadness=10000

% ================ MACROS ======================
\\newfontfamily\\titlethin{CormorantGaramond-Light}
\\newfontfamily\\titlethick{CormorantGaramond-Medium}
\\newfontfamily\\titlebold{CormorantGaramond-Bold}
\\newfontfamily\\normaltext{SourceSerifPro}

\\newcommand{\\resumetitle}[3]{
    \\AddToShipoutPictureBG{
        \\AtPageUpperLeft {
        \\raisebox{-0.09\\paperheight}{
            \\color{black!85}\\rule{2\\paperwidth}{\\paperheight}}
        }}
    \\begin{Center}
        \\begingroup
        \\titlethin
        \\color{black!10}\\Huge{#1}
        \\titlethick
        \\color{black!5}\\Huge{#2} \\\\
        \\vspace{2mm}
        \\textrm{\\color{black!15}\\Large{#3}}
        \\endgroup
    \\end{Center}
    \\vspace{7mm}
}

\\newcommand{\\betteruline}[1]{\\uline{#1}}
\\newcommand{\\sectiontitle}[1]{
    \\begingroup
        \\titlebold
        \\betteruline{\\Large\\uppercase{#1}  }
        \\vspace{1.7mm}
    \\endgroup
}
\\newcommand{\\sectioncontent}[1]{
    \\begingroup
        \\begin{FlushLeft}
        \\vspace{-3mm}
        \\sffamily\\small#1
        \\end{FlushLeft}
    \\endgroup
    \\vspace{2mm}
}
\\newcommand{\\job}[3]{
    \\begingroup
        \\textbf{\\small#1} - \\small#2
        \\hfill\\color{black!70}\\small{#3}
    \\endgroup
}
\\newcommand{\\project}[2]{
    \\begingroup
        \\textbf{\\small#1}
        \\hfill\\color{black!70}\\small{#2}
    \\endgroup
}
\\newcommand{\\spacevv}{\\vspace{2mm}}
\\newcommand{\\honor}[2]{\\textcolor{black!70}{#1} - #2 \\\\\\vspace{1.5mm}}

\\begin{document}
    \\resumetitle{${escapeLatex(firstName)}}{${escapeLatex(lastName)}}{${contactLine}}

    \\columnratio{0.31}
    \\setlength{\\columnsep}{7mm}
    \\begin{paracol}{2}

    \\sectiontitle{about me}
    \\sectioncontent{
        ${escapeLatex(optimized.summary || 'Professional summary will appear here.')}
    }

    \\sectiontitle{education}
    \\sectioncontent{
`;

    // Education
    if (optimizedEducation && optimizedEducation.length > 0) {
        optimizedEducation.forEach((edu, idx) => {
            latex += `        \\textbf{${escapeLatex(edu.degree)}${edu.field ? ` in ${escapeLatex(edu.field)}` : ''}} \\\\\n`;
            latex += `        ${escapeLatex(edu.institution)} \\\\\n`;
            if (edu.gpa) latex += `        \\textcolor{black!70}{GPA: ${escapeLatex(edu.gpa)}} \\\\\n`;
            latex += `        \\textcolor{black!70}{${escapeLatex(edu.startDate || '')}${edu.startDate && edu.endDate ? ' - ' : ''}${escapeLatex(edu.endDate || '')}} \\\\\n`;
            if (idx < optimizedEducation.length - 1) latex += `        \\vspace{2mm}\n`;
        });
    }

    latex += `    }

    \\sectiontitle{skills}
    \\sectioncontent{
`;

    // Skills
    if (optimized.skills && optimized.skills.length > 0) {
        const skillsList = optimized.skills.map(s => escapeLatex(s.name || s)).join(', ');
        latex += `        ${skillsList}\n`;
    }

    latex += `    }
`;

    // Certifications
    if (optimizedCertifications && optimizedCertifications.length > 0) {
        latex += `
    \\sectiontitle{certifications}
    \\sectioncontent{
`;
        optimizedCertifications.forEach((cert) => {
            latex += `        \\textbf{${escapeLatex(cert.name)}} \\\\\n`;
            latex += `        ${escapeLatex(cert.issuer)}${cert.date ? ` - ${escapeLatex(cert.date)}` : ''} \\\\\n`;
            if (cert.skills && cert.skills.length > 0) {
                latex += `        \\textit{Skills: ${cert.skills.map(s => escapeLatex(s)).join(', ')}} \\\\\n`;
            }
            latex += `        \\vspace{1.5mm}\n`;
        });
        latex += `    }\n`;
    }

    // Honors & Awards
    if (optimized.honors && optimized.honors.length > 0) {
        latex += `
    \\sectiontitle{Honors \\& Awards}
    \\sectioncontent{
`;
        optimized.honors.forEach((honor) => {
            latex += `        ${escapeLatex(honor)} \\\\\n`;
            latex += `        \\vspace{1.5mm}\n`;
        });
        latex += `    }\n`;
    }

    latex += `
    \\switchcolumn

    \\sectiontitle{experience}
    \\sectioncontent{
`;

    // Experience
    if (optimizedExperience && optimizedExperience.length > 0) {
        optimizedExperience.forEach((exp, idx) => {
            const dateRange = `${exp.startDate || ''} - ${exp.endDate || ''}`;
            latex += `      \\job{${escapeLatex(exp.company)}}{${escapeLatex(exp.title)}}{${escapeLatex(dateRange)}}\n`;
            if (exp.optimizedBullets && exp.optimizedBullets.length > 0) {
                latex += `      \\begin{itemize}\n`;
                exp.optimizedBullets.forEach(bullet => {
                    latex += `        \\item ${escapeLatex(bullet)}\n`;
                });
                latex += `      \\end{itemize}\n`;
            }
            if (idx < optimizedExperience.length - 1) latex += `      \\spacevv\n`;
        });
    }

    latex += `    }
`;

    // Projects
    if (optimizedProjects && optimizedProjects.length > 0) {
        latex += `
    \\sectiontitle{projects}
    \\sectioncontent{
`;
        optimizedProjects.forEach((proj, idx) => {
            latex += `        \\project{${escapeLatex(proj.name)}}{${escapeLatex(proj.date || '')}}\n`;
            latex += `        \\begin{itemize}\n`;
            latex += `            \\item ${escapeLatex(proj.description || '')}\n`;
            if (proj.technologies && proj.technologies.length > 0) {
                latex += `            \\item \\textbf{Technologies:} ${proj.technologies.map(t => escapeLatex(t)).join(', ')}\n`;
            }
            if (proj.achievements && proj.achievements.length > 0) {
                proj.achievements.forEach(achievement => {
                    latex += `            \\item ${escapeLatex(achievement)}\n`;
                });
            }
            latex += `        \\end{itemize}\n`;
            if (idx < optimizedProjects.length - 1) latex += `        \\spacevv\n`;
        });
        latex += `    }\n`;
    }

    latex += `
    \\normaltext \\hfill \\tiny Generated by Resume Genie

    \\end{paracol}

\\end{document}`;

    return latex;
}

/**
 * Generate Professional Template LaTeX
 */
export function generateProfessionalTemplate(resumeData) {
    const { optimized, optimizedExperience, optimizedEducation, optimizedCertifications, optimizedProjects } = resumeData;

    const latex = `\\documentclass[10pt]{article}
\\usepackage[utf8]{inputenc}
\\usepackage{TLCresume}

% Contact Information
\\def\\name{${escapeLatex(optimized.name || 'Your Name')}}
\\def\\phone{${escapeLatex(optimized.phone || '(xxx) xxx-xxxx')}}
\\def\\city{${escapeLatex(optimized.location || 'City, State')}}
\\def\\email{${escapeLatex(optimized.email || 'email@example.com')}}
\\def\\role{Professional}

\\input{_header}
\\begin{document}\\pagestyle{others}\\thispagestyle{first_page}

\\section{Professional Summary}
${escapeLatex(optimized.summary || 'Professional summary will appear here.')}

\\section{Skills}
${optimized.skills ? optimized.skills.map(s => escapeLatex(s.name || s)).join(' $\\bullet$ ') : 'Skills will appear here'}

\\section{Experience}
${optimizedExperience && optimizedExperience.length > 0 ? optimizedExperience.map(exp => `
\\subsection*{${escapeLatex(exp.title)} | ${escapeLatex(exp.company)}}
\\textit{${escapeLatex(exp.startDate || '')} - ${escapeLatex(exp.endDate || '')}} ${exp.location ? `| ${escapeLatex(exp.location)}` : ''}
\\begin{itemize}
${exp.optimizedBullets ? exp.optimizedBullets.map(bullet => `    \\item ${escapeLatex(bullet)}`).join('\n') : ''}
\\end{itemize}
`).join('\n') : 'Experience will appear here'}

\\section{Education}
${optimizedEducation && optimizedEducation.length > 0 ? optimizedEducation.map(edu => `
\\subsection*{${escapeLatex(edu.degree)}${edu.field ? ` in ${escapeLatex(edu.field)}` : ''}}
${escapeLatex(edu.institution)} | ${escapeLatex(edu.endDate || '')}${edu.gpa ? ` | GPA: ${escapeLatex(edu.gpa)}` : ''}
`).join('\n') : 'Education will appear here'}

${optimizedCertifications && optimizedCertifications.length > 0 ? `
\\section{Certifications}
${optimizedCertifications.map(cert => `
\\subsection*{${escapeLatex(cert.name)}}
${escapeLatex(cert.issuer)}${cert.date ? ` | ${escapeLatex(cert.date)}` : ''}${cert.skills && cert.skills.length > 0 ? ` | Skills: ${cert.skills.map(s => escapeLatex(s)).join(', ')}` : ''}
`).join('\n')}` : ''}

${optimizedProjects && optimizedProjects.length > 0 ? `
\\section{Projects}
${optimizedProjects.map(proj => `
\\subsection*{${escapeLatex(proj.name)}}${proj.date ? ` | ${escapeLatex(proj.date)}` : ''}
${escapeLatex(proj.description || '')}
${proj.technologies && proj.technologies.length > 0 ? `\\\\\\textbf{Technologies:} ${proj.technologies.map(t => escapeLatex(t)).join(', ')}` : ''}
`).join('\n')}` : ''}

${optimized.honors && optimized.honors.length > 0 ? `
\\section{Honors \\& Awards}
\\begin{itemize}
${optimized.honors.map(honor => `    \\item ${escapeLatex(honor)}`).join('\n')}
\\end{itemize}` : ''}

\\end{document}`;

    return latex;
}

/**
 * Generate Classic Template LaTeX (Simple text-based)
 */
export function generateClassicTemplate(resumeData) {
    const { optimized, optimizedExperience, optimizedEducation, optimizedCertifications, optimizedProjects } = resumeData;

    return `\\documentclass[11pt]{article}
\\usepackage[margin=1in]{geometry}
\\usepackage{enumitem}
\\usepackage{hyperref}

\\setlist{nosep}
\\pagestyle{empty}

\\begin{document}

\\begin{center}
{\\LARGE \\textbf{${escapeLatex(optimized.name || 'Your Name')}}} \\\\
\\vspace{2mm}
${optimized.email || 'email@example.com'} $\\bullet$ ${optimized.phone || '(xxx) xxx-xxxx'} $\\bullet$ ${optimized.location || 'City, State'}
\\end{center}

\\section*{Professional Summary}
${escapeLatex(optimized.summary || 'Professional summary will appear here.')}

\\section*{Skills}
${optimized.skills ? optimized.skills.map(s => escapeLatex(s.name || s)).join(' $\\bullet$ ') : 'Skills'}

\\section*{Experience}
${optimizedExperience && optimizedExperience.length > 0 ? optimizedExperience.map(exp => `
\\subsection*{${escapeLatex(exp.title)}}
\\textbf{${escapeLatex(exp.company)}} \\hfill ${escapeLatex(exp.startDate || '')} - ${escapeLatex(exp.endDate || '')}
\\begin{itemize}
${exp.optimizedBullets ? exp.optimizedBullets.map(bullet => `    \\item ${escapeLatex(bullet)}`).join('\n') : ''}
\\end{itemize}
`).join('\n') : ''}

\\section*{Education}
${optimizedEducation && optimizedEducation.length > 0 ? optimizedEducation.map(edu => `
\\textbf{${escapeLatex(edu.degree)}${edu.field ? ` in ${escapeLatex(edu.field)}` : ''}} \\\\
${escapeLatex(edu.institution)} \\hfill ${escapeLatex(edu.endDate || '')}${edu.gpa ? ` | GPA: ${escapeLatex(edu.gpa)}` : ''}
`).join('\n') : ''}

${optimizedCertifications && optimizedCertifications.length > 0 ? `
\\section*{Certifications}
\\begin{itemize}
${optimizedCertifications.map(cert => `    \\item \\textbf{${escapeLatex(cert.name)}} - ${escapeLatex(cert.issuer)}${cert.date ? ` (${escapeLatex(cert.date)})` : ''}${cert.skills && cert.skills.length > 0 ? ` | ${cert.skills.map(s => escapeLatex(s)).join(', ')}` : ''}`).join('\n')}
\\end{itemize}` : ''}

${optimizedProjects && optimizedProjects.length > 0 ? `
\\section*{Projects}
${optimizedProjects.map(proj => `
\\textbf{${escapeLatex(proj.name)}}${proj.date ? ` \\hfill ${escapeLatex(proj.date)}` : ''} \\\\
${escapeLatex(proj.description || '')}
${proj.technologies && proj.technologies.length > 0 ? `\\\\\\textit{Technologies: ${proj.technologies.map(t => escapeLatex(t)).join(', ')}}` : ''}
\\\\`).join('\n')}` : ''}

${optimized.honors && optimized.honors.length > 0 ? `
\\section*{Honors \\& Awards}
\\begin{itemize}
${optimized.honors.map(honor => `    \\item ${escapeLatex(honor)}`).join('\n')}
\\end{itemize}` : ''}

\\end{document}`;
}

/**
 * Main export function
 */
export function generateLatexResume(resumeData, templateId = 1) {
    switch (templateId) {
        case 1:
            return generateModernTemplate(resumeData);
        case 2:
            return generateProfessionalTemplate(resumeData);
        case 3:
            return generateClassicTemplate(resumeData);
        default:
            return generateModernTemplate(resumeData);
    }
}

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Download, ArrowLeft, FileText } from 'lucide-react';

const ExportResume = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { resumeData, selectedTemplate = 1 } = location.state || {};

    if (!resumeData) {
        navigate('/create');
        return null;
    }

    const { optimized, optimizedExperience, optimizedEducation, optimizedCertifications, optimizedProjects } = resumeData;
    const [downloading, setDownloading] = useState(false);
    const [downloadError, setDownloadError] = useState('');
    const [currentTemplate, setCurrentTemplate] = useState(selectedTemplate);

    const handleDownload = () => {
        window.print();
    };

    const handleDownloadLatex = async () => {
        setDownloading(true);
        setDownloadError('');

        try {
            const response = await fetch('http://localhost:5000/api/export/latex', {
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

    // Extract name parts for Modern template
    const nameParts = (optimized.name || 'Your Name').split(' ');
    const firstName = nameParts[0] || 'First';
    const lastName = nameParts.slice(1).join(' ') || 'Last';

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Action Bar */}
            <div className="print:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => navigate('/editor', { state: { resumeData } })}
                            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Editor
                        </button>

                        <div className="flex items-center space-x-3">
                            {/* Template Selector */}
                            <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                                {[
                                    { id: 1, name: 'Modern' },
                                    { id: 2, name: 'Professional' },
                                    { id: 3, name: 'Classic' }
                                ].map(template => (
                                    <button
                                        key={template.id}
                                        onClick={() => setCurrentTemplate(template.id)}
                                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${currentTemplate === template.id
                                            ? 'bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 shadow-sm'
                                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                            }`}
                                    >
                                        {template.name}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={handleDownloadLatex}
                                disabled={downloading}
                                className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FileText className="w-5 h-5 mr-2" />
                                {downloading ? 'Generating...' : 'LaTeX'}
                            </button>
                            <button
                                onClick={handleDownload}
                                className="px-6 py-2.5 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center"
                            >
                                <Download className="w-5 h-5 mr-2" />
                                Download PDF
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Instructions */}
            <div className="print:hidden max-w-[210mm] mx-auto px-4 pt-6 pb-4">
                <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                        <FileText className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                ✨ Your Professional Resume is Ready!
                            </h3>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                Switch templates above • Click <strong>"Download PDF"</strong> to save • All AI-optimized content included
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Resume Preview - A4 Size */}
            <div className="max-w-[210mm] mx-auto pb-8 px-4 print:p-0">
                <div className="bg-white shadow-2xl print:shadow-none" style={{ minHeight: '297mm' }} id="resume-content">

                    {/* TEMPLATE 1: MODERN (LaTeX-inspired 2-column dark header) */}
                    {currentTemplate === 1 && (
                        <div className="relative overflow-hidden" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                            {/* Dark background header with 85% opacity like LaTeX */}
                            <div className="absolute top-0 left-0 right-0 h-[160px] bg-black" style={{ opacity: 0.85, zIndex: 0 }}></div>

                            {/* Header - matching LaTeX light/bold name style */}
                            <div className="relative text-center pt-8 pb-7 px-8" style={{ zIndex: 1 }}>
                                <h1 className="text-[44px] mb-[8px] tracking-wide" style={{ letterSpacing: '0.02em', color: '#ffffff' }}>
                                    <span style={{ fontWeight: 300 }}>{firstName}</span>
                                    <span style={{ fontWeight: 600 }} className="ml-1">{lastName}</span>
                                </h1>
                                <p className="text-[15px]" style={{ letterSpacing: '0.01em', color: '#ffffff' }}>
                                    {optimized.email && optimized.email}
                                    {optimized.phone && ` | ${optimized.phone}`}
                                    {optimized.location && ` | ${optimized.location}`}
                                </p>
                            </div>

                            {/* Two-column layout - exact 31/69 split */}
                            <div className="grid grid-cols-[31%_69%]" style={{ columnGap: '7mm', paddingLeft: '6mm', paddingRight: '10mm', paddingTop: '4mm', paddingBottom: '8mm' }}>
                                {/* LEFT COLUMN - Sidebar */}
                                <div style={{ fontSize: '10.5pt', lineHeight: '1.45' }}>
                                    {/* About Me */}
                                    {optimized.summary && (
                                        <div style={{ marginBottom: '6mm' }}>
                                            <h2 className="uppercase font-bold tracking-wide" style={{
                                                fontSize: '14px',
                                                borderBottom: '0.5pt solid #4a4a4a',
                                                paddingBottom: '1mm',
                                                marginBottom: '2.5mm',
                                                letterSpacing: '0.05em'
                                            }}>
                                                ABOUT ME
                                            </h2>
                                            <p style={{ fontSize: '10pt', color: '#2d2d2d', textAlign: 'justify', lineHeight: '1.5' }}>
                                                {optimized.summary}
                                            </p>
                                        </div>
                                    )}

                                    {/* Education */}
                                    {optimizedEducation && optimizedEducation.length > 0 && (
                                        <div style={{ marginBottom: '6mm' }}>
                                            <h2 className="uppercase font-bold tracking-wide" style={{
                                                fontSize: '14px',
                                                borderBottom: '0.5pt solid #4a4a4a',
                                                paddingBottom: '1mm',
                                                marginBottom: '2.5mm',
                                                letterSpacing: '0.05em'
                                            }}>
                                                EDUCATION
                                            </h2>
                                            {optimizedEducation.map((edu, idx) => (
                                                <div key={idx} style={{ marginBottom: '2mm' }}>
                                                    <p style={{ fontWeight: 600, fontSize: '10pt', marginBottom: '0.5mm' }}>
                                                        {edu.degree}{edu.field && ` in ${edu.field}`}
                                                    </p>
                                                    <p style={{ fontSize: '10pt', color: '#3a3a3a' }}>{edu.institution}</p>
                                                    <p style={{ fontSize: '9pt', color: '#666', marginTop: '0.5mm' }}>
                                                        {edu.startDate && edu.endDate ? `${edu.startDate} - ${edu.endDate}` : edu.endDate}
                                                        {edu.gpa && ` | GPA: ${edu.gpa}`}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Links (if available) */}
                                    {(optimized.linkedin || optimized.github || optimized.website) && (
                                        <div style={{ marginBottom: '6mm' }}>
                                            <h2 className="uppercase font-bold tracking-wide" style={{
                                                fontSize: '14px',
                                                borderBottom: '0.5pt solid #4a4a4a',
                                                paddingBottom: '1mm',
                                                marginBottom: '2.5mm',
                                                letterSpacing: '0.05em'
                                            }}>
                                                LINKS
                                            </h2>
                                            <div style={{ fontSize: '10pt', lineHeight: '1.7' }}>
                                                {optimized.linkedin && <p>🔗 {optimized.linkedin}</p>}
                                                {optimized.github && <p>🔗 {optimized.github}</p>}
                                                {optimized.website && <p>🔗 {optimized.website}</p>}
                                            </div>
                                        </div>
                                    )}

                                    {/* Certifications */}
                                    {optimizedCertifications && optimizedCertifications.length > 0 && (
                                        <div style={{ marginBottom: '6mm' }}>
                                            <h2 className="uppercase font-bold tracking-wide" style={{
                                                fontSize: '14px',
                                                borderBottom: '0.5pt solid #4a4a4a',
                                                paddingBottom: '1mm',
                                                marginBottom: '2.5mm',
                                                letterSpacing: '0.05em'
                                            }}>
                                                CERTIFICATIONS
                                            </h2>
                                            {optimizedCertifications.map((cert, idx) => (
                                                <div key={idx} style={{ marginBottom: '2mm' }}>
                                                    <p style={{ fontWeight: 600, fontSize: '10pt' }}>{cert.name}</p>
                                                    <p style={{ fontSize: '9pt', color: '#3a3a3a' }}>{cert.issuer}</p>
                                                    {cert.date && <p style={{ fontSize: '9pt', color: '#666' }}>{cert.date}</p>}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Honors & Awards - LaTeX "Date - Description" format */}
                                    {optimized.honors && optimized.honors.length > 0 && (
                                        <div style={{ marginBottom: '6mm' }}>
                                            <h2 className="uppercase font-bold tracking-wide" style={{
                                                fontSize: '14px',
                                                borderBottom: '0.5pt solid #4a4a4a',
                                                paddingBottom: '1mm',
                                                marginBottom: '2.5mm',
                                                letterSpacing: '0.05em'
                                            }}>
                                                HONORS & AWARDS
                                            </h2>
                                            {optimized.honors.map((honor, idx) => (
                                                <p key={idx} style={{ fontSize: '9pt', color: '#4a4a4a', marginBottom: '1.5mm', lineHeight: '1.4' }}>
                                                    {honor}
                                                </p>
                                            ))}
                                        </div>
                                    )}

                                    {/* Skills */}
                                    {optimized.skills && optimized.skills.length > 0 && (
                                        <div style={{ marginBottom: '6mm' }}>
                                            <h2 className="uppercase font-bold tracking-wide" style={{
                                                fontSize: '14px',
                                                borderBottom: '0.5pt solid #4a4a4a',
                                                paddingBottom: '1mm',
                                                marginBottom: '2.5mm',
                                                letterSpacing: '0.05em'
                                            }}>
                                                SKILLS
                                            </h2>
                                            <p style={{ fontSize: '10pt', color: '#2d2d2d', lineHeight: '1.6', textAlign: 'justify' }}>
                                                {optimized.skills.map(s => s.name || s).join(', ')}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* RIGHT COLUMN - Main Content */}
                                <div style={{ fontSize: '10.5pt', lineHeight: '1.4', paddingRight: '3mm' }}>
                                    {/* Experience */}
                                    {optimizedExperience && optimizedExperience.length > 0 && (
                                        <div style={{ marginBottom: '5mm' }}>
                                            <h2 className="uppercase font-bold tracking-wide" style={{
                                                fontSize: '14px',
                                                borderBottom: '0.5pt solid #4a4a4a',
                                                paddingBottom: '1mm',
                                                marginBottom: '2.5mm',
                                                letterSpacing: '0.05em'
                                            }}>
                                                EXPERIENCE
                                            </h2>
                                            {optimizedExperience.map((exp, idx) => (
                                                <div key={idx} style={{ marginBottom: '3mm' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5mm', flexWrap: 'wrap', gap: '2mm' }}>
                                                        <div style={{ flex: '1 1 auto', minWidth: '60%' }}>
                                                            <span style={{ fontWeight: 600, fontSize: '10pt' }}>{exp.company}</span>
                                                            <span style={{ fontSize: '10pt' }}> — {exp.title}</span>
                                                        </div>
                                                        <span style={{ fontSize: '9pt', color: '#666', whiteSpace: 'nowrap', flex: '0 0 auto' }}>
                                                            {exp.startDate} - {exp.endDate}
                                                        </span>
                                                    </div>
                                                    {exp.optimizedBullets && (
                                                        <ul style={{ marginTop: '1mm', paddingLeft: '0', listStyle: 'none' }}>
                                                            {exp.optimizedBullets.map((bullet, bidx) => (
                                                                <li key={bidx} style={{
                                                                    fontSize: '9.5pt',
                                                                    color: '#2d2d2d',
                                                                    marginBottom: '0.8mm',
                                                                    paddingLeft: '3mm',
                                                                    paddingRight: '1mm',
                                                                    position: 'relative',
                                                                    lineHeight: '1.45',
                                                                    wordBreak: 'break-word'
                                                                }}>
                                                                    <span style={{ position: 'absolute', left: 0 }}>•</span>
                                                                    {bullet}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Personal Projects */}
                                    {optimizedProjects && optimizedProjects.length > 0 && (
                                        <div style={{ marginBottom: '5mm' }}>
                                            <h2 className="uppercase font-bold tracking-wide" style={{
                                                fontSize: '14px',
                                                borderBottom: '0.5pt solid #4a4a4a',
                                                paddingBottom: '1mm',
                                                marginBottom: '2.5mm',
                                                letterSpacing: '0.05em'
                                            }}>
                                                PERSONAL PROJECTS
                                            </h2>
                                            {optimizedProjects.map((proj, idx) => (
                                                <div key={idx} style={{ marginBottom: '2.5mm' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5mm', flexWrap: 'wrap', gap: '2mm' }}>
                                                        <span style={{ fontWeight: 600, fontSize: '10pt', flex: '1 1 auto', minWidth: '60%' }}>{proj.name}</span>
                                                        {proj.date && <span style={{ fontSize: '9pt', color: '#666', flex: '0 0 auto' }}>{proj.date}</span>}
                                                    </div>
                                                    <ul style={{ marginTop: '0.8mm', paddingLeft: '0', listStyle: 'none' }}>
                                                        <li style={{
                                                            fontSize: '9.5pt',
                                                            color: '#2d2d2d',
                                                            paddingLeft: '3mm',
                                                            paddingRight: '1mm',
                                                            position: 'relative',
                                                            lineHeight: '1.45',
                                                            marginBottom: '0.8mm',
                                                            wordBreak: 'break-word'
                                                        }}>
                                                            <span style={{ position: 'absolute', left: 0 }}>•</span>
                                                            {proj.description}
                                                        </li>
                                                        {proj.technologies && proj.technologies.length > 0 && (
                                                            <li style={{
                                                                fontSize: '9.5pt',
                                                                color: '#4a4a4a',
                                                                paddingLeft: '3mm',
                                                                paddingRight: '1mm',
                                                                position: 'relative',
                                                                fontStyle: 'italic',
                                                                wordBreak: 'break-word'
                                                            }}>
                                                                <span style={{ position: 'absolute', left: 0 }}>•</span>
                                                                <strong>Tech:</strong> {proj.technologies.join(', ')}
                                                            </li>
                                                        )}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Volunteering (if experience has volunteer roles) */}
                                    {optimizedExperience && optimizedExperience.some(exp => exp.title?.toLowerCase().includes('volunteer')) && (
                                        <div style={{ marginBottom: '5mm' }}>
                                            <h2 className="uppercase font-bold tracking-wide" style={{
                                                fontSize: '14px',
                                                borderBottom: '0.5pt solid #4a4a4a',
                                                paddingBottom: '1mm',
                                                marginBottom: '2.5mm',
                                                letterSpacing: '0.05em'
                                            }}>
                                                VOLUNTEERING
                                            </h2>
                                            {optimizedExperience
                                                .filter(exp => exp.title?.toLowerCase().includes('volunteer'))
                                                .map((exp, idx) => (
                                                    <div key={idx} style={{ marginBottom: '3mm' }}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                                            <div>
                                                                <span style={{ fontWeight: 600, fontSize: '10pt' }}>{exp.company}</span>
                                                                <span style={{ fontSize: '10pt' }}> — {exp.title}</span>
                                                            </div>
                                                            <span style={{ fontSize: '9pt', color: '#666' }}>{exp.startDate} - {exp.endDate}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Footer - Last updated */}
                            <div style={{
                                textAlign: 'right',
                                fontSize: '7pt',
                                color: '#999',
                                paddingRight: '6mm',
                                paddingBottom: '3mm',
                                fontFamily: 'Georgia, serif'
                            }}>
                                Last updated {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </div>
                        </div>
                    )}

                    {/* TEMPLATE 2: PROFESSIONAL (TLCresume-inspired clean academic) */}
                    {currentTemplate === 2 && (
                        <div style={{
                            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                            padding: '12mm 18mm',
                            fontSize: '11pt',
                            lineHeight: '1.5',
                            color: '#1a1a1a'
                        }}>
                            {/* Header Section */}
                            <div style={{ marginBottom: '8mm', textAlign: 'center', borderBottom: '2pt solid #2c3e50', paddingBottom: '5mm' }}>
                                <h1 style={{
                                    fontSize: '28pt',
                                    fontWeight: 700,
                                    marginBottom: '3mm',
                                    color: '#2c3e50',
                                    letterSpacing: '0.5pt'
                                }}>
                                    {optimized.name || 'Your Name'}
                                </h1>
                                <div style={{ fontSize: '10.5pt', color: '#34495e', letterSpacing: '0.3pt' }}>
                                    {optimized.email && <span>{optimized.email}</span>}
                                    {optimized.phone && <span> • {optimized.phone}</span>}
                                    {optimized.location && <span> • {optimized.location}</span>}
                                </div>
                                {(optimized.linkedin || optimized.github) && (
                                    <div style={{ fontSize: '10pt', color: '#34495e', marginTop: '2mm' }}>
                                        {optimized.linkedin && <span>LinkedIn: {optimized.linkedin}</span>}
                                        {optimized.github && <span> • GitHub: {optimized.github}</span>}
                                    </div>
                                )}
                            </div>

                            {/* Objective/Summary */}
                            {optimized.summary && (
                                <section style={{ marginBottom: '7mm' }}>
                                    <h2 style={{
                                        fontSize: '14pt',
                                        fontWeight: 700,
                                        color: '#2c3e50',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1pt',
                                        borderBottom: '1.5pt solid #34495e',
                                        paddingBottom: '2mm',
                                        marginBottom: '3mm'
                                    }}>
                                        OBJECTIVE
                                    </h2>
                                    <p style={{
                                        fontSize: '10.5pt',
                                        lineHeight: '1.6',
                                        textAlign: 'justify',
                                        color: '#2c2c2c'
                                    }}>
                                        {optimized.summary}
                                    </p>
                                </section>
                            )}

                            {/* Skills Section - Table Format */}
                            {optimized.skills && optimized.skills.length > 0 && (
                                <section style={{ marginBottom: '7mm' }}>
                                    <h2 style={{
                                        fontSize: '14pt',
                                        fontWeight: 700,
                                        color: '#2c3e50',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1pt',
                                        borderBottom: '1.5pt solid #34495e',
                                        paddingBottom: '2mm',
                                        marginBottom: '3mm'
                                    }}>
                                        SKILLS
                                    </h2>
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(2, 1fr)',
                                        gap: '2mm',
                                        fontSize: '10pt'
                                    }}>
                                        {optimized.skills.map((skill, idx) => (
                                            <div key={idx} style={{
                                                padding: '2mm 3mm',
                                                backgroundColor: '#f8f9fa',
                                                border: '0.5pt solid #dee2e6',
                                                borderRadius: '2pt'
                                            }}>
                                                <strong style={{ color: '#2c3e50' }}>•</strong> {skill.name || skill}
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Technical Experience */}
                            {optimizedExperience && optimizedExperience.length > 0 && (
                                <section style={{ marginBottom: '7mm' }}>
                                    <h2 style={{
                                        fontSize: '14pt',
                                        fontWeight: 700,
                                        color: '#2c3e50',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1pt',
                                        borderBottom: '1.5pt solid #34495e',
                                        paddingBottom: '2mm',
                                        marginBottom: '3mm'
                                    }}>
                                        TECHNICAL EXPERIENCE
                                    </h2>
                                    {optimizedExperience.map((exp, idx) => (
                                        <div key={idx} style={{ marginBottom: '5mm' }}>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'baseline',
                                                marginBottom: '1mm'
                                            }}>
                                                <div>
                                                    <span style={{ fontWeight: 700, fontSize: '11pt', color: '#2c3e50' }}>
                                                        {exp.company}
                                                    </span>
                                                    <span style={{ fontSize: '10.5pt', color: '#555' }}> — {exp.title}</span>
                                                </div>
                                                <span style={{
                                                    fontSize: '10pt',
                                                    color: '#7f8c8d',
                                                    fontStyle: 'italic',
                                                    whiteSpace: 'nowrap',
                                                    marginLeft: '5mm'
                                                }}>
                                                    {exp.startDate} – {exp.endDate}
                                                </span>
                                            </div>
                                            {exp.location && (
                                                <p style={{ fontSize: '10pt', color: '#7f8c8d', marginBottom: '2mm', fontStyle: 'italic' }}>
                                                    {exp.location}
                                                </p>
                                            )}
                                            {exp.optimizedBullets && (
                                                <ul style={{
                                                    marginTop: '2mm',
                                                    paddingLeft: '5mm',
                                                    listStyleType: 'disc',
                                                    listStylePosition: 'outside'
                                                }}>
                                                    {exp.optimizedBullets.map((bullet, bidx) => (
                                                        <li key={bidx} style={{
                                                            fontSize: '10pt',
                                                            lineHeight: '1.6',
                                                            marginBottom: '1.5mm',
                                                            color: '#2c2c2c'
                                                        }}>
                                                            {bullet}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ))}
                                </section>
                            )}

                            {/* Education */}
                            {optimizedEducation && optimizedEducation.length > 0 && (
                                <section style={{ marginBottom: '7mm' }}>
                                    <h2 style={{
                                        fontSize: '14pt',
                                        fontWeight: 700,
                                        color: '#2c3e50',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1pt',
                                        borderBottom: '1.5pt solid #34495e',
                                        paddingBottom: '2mm',
                                        marginBottom: '3mm'
                                    }}>
                                        EDUCATION
                                    </h2>
                                    {optimizedEducation.map((edu, idx) => (
                                        <div key={idx} style={{ marginBottom: '4mm' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                                <div>
                                                    <p style={{ fontWeight: 700, fontSize: '11pt', color: '#2c3e50', marginBottom: '0.5mm' }}>
                                                        {edu.institution}
                                                    </p>
                                                    <p style={{ fontSize: '10.5pt', color: '#555' }}>
                                                        {edu.degree}{edu.field && ` in ${edu.field}`}
                                                        {edu.gpa && ` • GPA: ${edu.gpa}`}
                                                    </p>
                                                </div>
                                                <span style={{
                                                    fontSize: '10pt',
                                                    color: '#7f8c8d',
                                                    fontStyle: 'italic',
                                                    whiteSpace: 'nowrap'
                                                }}>
                                                    {edu.startDate && edu.endDate ? `${edu.startDate} – ${edu.endDate}` : edu.endDate}
                                                </span>
                                            </div>
                                            {edu.coursework && (
                                                <p style={{ fontSize: '9.5pt', color: '#666', marginTop: '1mm', fontStyle: 'italic' }}>
                                                    <strong>Coursework:</strong> {edu.coursework}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </section>
                            )}

                            {/* Projects */}
                            {optimizedProjects && optimizedProjects.length > 0 && (
                                <section style={{ marginBottom: '7mm' }}>
                                    <h2 style={{
                                        fontSize: '14pt',
                                        fontWeight: 700,
                                        color: '#2c3e50',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1pt',
                                        borderBottom: '1.5pt solid #34495e',
                                        paddingBottom: '2mm',
                                        marginBottom: '3mm'
                                    }}>
                                        PROJECTS
                                    </h2>
                                    {optimizedProjects.map((proj, idx) => (
                                        <div key={idx} style={{ marginBottom: '4mm' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                                <span style={{ fontWeight: 700, fontSize: '10.5pt', color: '#2c3e50' }}>
                                                    {proj.name}
                                                </span>
                                                {proj.date && (
                                                    <span style={{ fontSize: '10pt', color: '#7f8c8d', fontStyle: 'italic' }}>
                                                        {proj.date}
                                                    </span>
                                                )}
                                            </div>
                                            <p style={{ fontSize: '10pt', lineHeight: '1.6', color: '#2c2c2c', marginTop: '1mm' }}>
                                                {proj.description}
                                            </p>
                                            {proj.technologies && proj.technologies.length > 0 && (
                                                <p style={{ fontSize: '9.5pt', color: '#555', marginTop: '1mm', fontStyle: 'italic' }}>
                                                    <strong>Technologies:</strong> {proj.technologies.join(', ')}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </section>
                            )}

                            {/* Certifications */}
                            {optimizedCertifications && optimizedCertifications.length > 0 && (
                                <section style={{ marginBottom: '7mm' }}>
                                    <h2 style={{
                                        fontSize: '14pt',
                                        fontWeight: 700,
                                        color: '#2c3e50',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1pt',
                                        borderBottom: '1.5pt solid #34495e',
                                        paddingBottom: '2mm',
                                        marginBottom: '3mm'
                                    }}>
                                        CERTIFICATIONS
                                    </h2>
                                    {optimizedCertifications.map((cert, idx) => (
                                        <div key={idx} style={{ marginBottom: '2mm', fontSize: '10pt' }}>
                                            <strong style={{ color: '#2c3e50' }}>{cert.name}</strong>
                                            <span style={{ color: '#555' }}> — {cert.issuer}</span>
                                            {cert.date && <span style={{ color: '#7f8c8d', fontStyle: 'italic' }}> ({cert.date})</span>}
                                        </div>
                                    ))}
                                </section>
                            )}

                            {/* Activities/Honors */}
                            {optimized.honors && optimized.honors.length > 0 && (
                                <section>
                                    <h2 style={{
                                        fontSize: '14pt',
                                        fontWeight: 700,
                                        color: '#2c3e50',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1pt',
                                        borderBottom: '1.5pt solid #34495e',
                                        paddingBottom: '2mm',
                                        marginBottom: '3mm'
                                    }}>
                                        HONORS & ACTIVITIES
                                    </h2>
                                    <ul style={{
                                        paddingLeft: '5mm',
                                        listStyleType: 'disc',
                                        fontSize: '10pt'
                                    }}>
                                        {optimized.honors.map((honor, idx) => (
                                            <li key={idx} style={{
                                                marginBottom: '1.5mm',
                                                lineHeight: '1.5',
                                                color: '#2c2c2c'
                                            }}>
                                                {honor}
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}
                        </div>
                    )}

                    {/* TEMPLATE 3: CLASSIC (LaTeX classic.tex inspired) */}
                    {currentTemplate === 3 && (
                        <div style={{
                            fontFamily: '"Times New Roman", Times, serif',
                            padding: '12mm 16mm',
                            fontSize: '11pt',
                            lineHeight: '1.4',
                            color: '#000'
                        }}>
                            {/* Tabular Header - classic.tex style */}
                            <div style={{
                                display: 'table',
                                width: '100%',
                                marginBottom: '5mm',
                                borderCollapse: 'collapse'
                            }}>
                                <div style={{ display: 'table-row' }}>
                                    <div style={{ display: 'table-cell', textAlign: 'left', verticalAlign: 'top' }}>
                                        <h1 style={{
                                            fontSize: '22pt',
                                            fontWeight: 700,
                                            margin: 0,
                                            letterSpacing: '0.5pt'
                                        }}>
                                            {optimized.name || 'Your Name'}
                                        </h1>
                                    </div>
                                    <div style={{ display: 'table-cell', textAlign: 'right', verticalAlign: 'top' }}>
                                        <div style={{ fontSize: '10pt', lineHeight: '1.5' }}>
                                            {optimized.email && (
                                                <div>Email: {optimized.email}</div>
                                            )}
                                            {optimized.phone && (
                                                <div>Mobile: {optimized.phone}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {optimized.location && (
                                    <div style={{ display: 'table-row' }}>
                                        <div style={{ display: 'table-cell', fontSize: '10pt', paddingTop: '1mm' }}>
                                            {optimized.location}
                                        </div>
                                    </div>
                                )}
                                {(optimized.github || optimized.linkedin) && (
                                    <div style={{ display: 'table-row' }}>
                                        <div style={{ display: 'table-cell', fontSize: '10pt', paddingTop: '1mm' }}>
                                            {optimized.github && <div>Github: {optimized.github}</div>}
                                        </div>
                                        <div style={{ display: 'table-cell', textAlign: 'right', fontSize: '10pt', paddingTop: '1mm' }}>
                                            {optimized.linkedin && <div>LinkedIn: {optimized.linkedin}</div>}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Education */}
                            {optimizedEducation && optimizedEducation.length > 0 && (
                                <section style={{ marginBottom: '4mm' }}>
                                    <h2 style={{
                                        fontSize: '13pt',
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        fontVariant: 'small-caps',
                                        letterSpacing: '1pt',
                                        borderBottom: '1pt solid #000',
                                        paddingBottom: '1mm',
                                        marginBottom: '3mm'
                                    }}>
                                        Education
                                    </h2>
                                    {optimizedEducation.map((edu, idx) => (
                                        <div key={idx} style={{ marginBottom: '3mm' }}>
                                            <div style={{ display: 'table', width: '100%', marginBottom: '0.5mm' }}>
                                                <div style={{ display: 'table-row' }}>
                                                    <div style={{ display: 'table-cell', fontWeight: 700, fontSize: '11pt' }}>
                                                        {edu.institution}
                                                    </div>
                                                    <div style={{ display: 'table-cell', textAlign: 'right', fontSize: '10pt' }}>
                                                        {edu.location || ''}
                                                    </div>
                                                </div>
                                                <div style={{ display: 'table-row' }}>
                                                    <div style={{ display: 'table-cell', fontStyle: 'italic', fontSize: '10.5pt' }}>
                                                        {edu.degree}{edu.field && ` - ${edu.field}`}
                                                        {edu.gpa && `; GPA: ${edu.gpa}`}
                                                    </div>
                                                    <div style={{ display: 'table-cell', textAlign: 'right', fontStyle: 'italic', fontSize: '10pt' }}>
                                                        {edu.startDate && edu.endDate ? `${edu.startDate} - ${edu.endDate}` : edu.endDate}
                                                    </div>
                                                </div>
                                            </div>
                                            {edu.coursework && (
                                                <p style={{ fontSize: '9.5pt', fontStyle: 'italic', marginTop: '1mm', marginLeft: '1mm' }}>
                                                    <strong>Courses:</strong> {edu.coursework}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </section>
                            )}

                            {/* Skills Summary */}
                            {optimized.skills && optimized.skills.length > 0 && (
                                <section style={{ marginBottom: '4mm' }}>
                                    <h2 style={{
                                        fontSize: '13pt',
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        fontVariant: 'small-caps',
                                        letterSpacing: '1pt',
                                        borderBottom: '1pt solid #000',
                                        paddingBottom: '1mm',
                                        marginBottom: '3mm'
                                    }}>
                                        Skills Summary
                                    </h2>
                                    <div style={{ marginLeft: '1mm' }}>
                                        {/* Group skills by category if possible */}
                                        <div style={{ marginBottom: '1mm' }}>
                                            <span style={{ fontWeight: 700, fontSize: '10pt' }}>Technical Skills: </span>
                                            <span style={{ fontSize: '10pt' }}>
                                                {optimized.skills.map(s => s.name || s).join(', ')}
                                            </span>
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* Experience */}
                            {optimizedExperience && optimizedExperience.length > 0 && (
                                <section style={{ marginBottom: '4mm' }}>
                                    <h2 style={{
                                        fontSize: '13pt',
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        fontVariant: 'small-caps',
                                        letterSpacing: '1pt',
                                        borderBottom: '1pt solid #000',
                                        paddingBottom: '1mm',
                                        marginBottom: '3mm'
                                    }}>
                                        Experience
                                    </h2>
                                    {optimizedExperience.map((exp, idx) => (
                                        <div key={idx} style={{ marginBottom: '4mm' }}>
                                            <div style={{ display: 'table', width: '100%', marginBottom: '1mm' }}>
                                                <div style={{ display: 'table-row' }}>
                                                    <div style={{ display: 'table-cell', fontWeight: 700, fontSize: '10.5pt' }}>
                                                        {exp.company}
                                                    </div>
                                                    <div style={{ display: 'table-cell', textAlign: 'right', fontSize: '10pt' }}>
                                                        {exp.location || 'Remote'}
                                                    </div>
                                                </div>
                                                <div style={{ display: 'table-row' }}>
                                                    <div style={{ display: 'table-cell', fontSize: '10.5pt' }}>
                                                        {exp.title}
                                                    </div>
                                                    <div style={{ display: 'table-cell', textAlign: 'right', fontStyle: 'italic', fontSize: '10pt' }}>
                                                        {exp.startDate} - {exp.endDate}
                                                    </div>
                                                </div>
                                            </div>
                                            {exp.optimizedBullets && (
                                                <ul style={{
                                                    marginTop: '1mm',
                                                    marginLeft: '5mm',
                                                    paddingLeft: 0,
                                                    listStyleType: 'none'
                                                }}>
                                                    {exp.optimizedBullets.map((bullet, bidx) => (
                                                        <li key={bidx} style={{
                                                            fontSize: '10pt',
                                                            marginBottom: '1mm',
                                                            position: 'relative',
                                                            paddingLeft: '4mm'
                                                        }}>
                                                            <span style={{ position: 'absolute', left: 0, fontWeight: 700 }}>
                                                                {bullet.startsWith('•') ? '' : '◦'}
                                                            </span>
                                                            {bullet.replace(/^•\s*/, '')}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ))}
                                </section>
                            )}

                            {/* Projects */}
                            {optimizedProjects && optimizedProjects.length > 0 && (
                                <section style={{ marginBottom: '4mm' }}>
                                    <h2 style={{
                                        fontSize: '13pt',
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        fontVariant: 'small-caps',
                                        letterSpacing: '1pt',
                                        borderBottom: '1pt solid #000',
                                        paddingBottom: '1mm',
                                        marginBottom: '3mm'
                                    }}>
                                        Projects
                                    </h2>
                                    {optimizedProjects.map((proj, idx) => (
                                        <div key={idx} style={{ marginBottom: '2.5mm', marginLeft: '1mm' }}>
                                            <div style={{ marginBottom: '0.5mm' }}>
                                                <span style={{ fontWeight: 700, fontSize: '10pt' }}>{proj.name}</span>
                                                {proj.technologies && proj.technologies.length > 0 && (
                                                    <span style={{ fontSize: '9.5pt', fontStyle: 'italic' }}>
                                                        {' '}({proj.technologies.join(', ')})
                                                    </span>
                                                )}
                                                {proj.date && (
                                                    <span style={{ fontSize: '9.5pt', float: 'right' }}>({proj.date})</span>
                                                )}
                                            </div>
                                            <p style={{ fontSize: '10pt', lineHeight: '1.4', margin: 0 }}>
                                                {proj.description}
                                            </p>
                                        </div>
                                    ))}
                                </section>
                            )}

                            {/* Publications/Certifications */}
                            {optimizedCertifications && optimizedCertifications.length > 0 && (
                                <section style={{ marginBottom: '4mm' }}>
                                    <h2 style={{
                                        fontSize: '13pt',
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        fontVariant: 'small-caps',
                                        letterSpacing: '1pt',
                                        borderBottom: '1pt solid #000',
                                        paddingBottom: '1mm',
                                        marginBottom: '3mm'
                                    }}>
                                        Certifications
                                    </h2>
                                    {optimizedCertifications.map((cert, idx) => (
                                        <div key={idx} style={{ marginBottom: '1.5mm', marginLeft: '1mm' }}>
                                            <span style={{ fontWeight: 700, fontSize: '10pt' }}>{cert.name}</span>
                                            <span style={{ fontSize: '10pt' }}> ({cert.issuer})</span>
                                            {cert.date && (
                                                <span style={{ fontSize: '9.5pt', fontStyle: 'italic' }}> - {cert.date}</span>
                                            )}
                                        </div>
                                    ))}
                                </section>
                            )}

                            {/* Honors and Awards */}
                            {optimized.honors && optimized.honors.length > 0 && (
                                <section style={{ marginBottom: '4mm' }}>
                                    <h2 style={{
                                        fontSize: '13pt',
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        fontVariant: 'small-caps',
                                        letterSpacing: '1pt',
                                        borderBottom: '1pt solid #000',
                                        paddingBottom: '1mm',
                                        marginBottom: '3mm'
                                    }}>
                                        Honors and Awards
                                    </h2>
                                    <ul style={{
                                        marginLeft: '5mm',
                                        paddingLeft: 0,
                                        listStyleType: 'none'
                                    }}>
                                        {optimized.honors.map((honor, idx) => (
                                            <li key={idx} style={{
                                                fontSize: '10pt',
                                                marginBottom: '1mm',
                                                position: 'relative',
                                                paddingLeft: '3mm'
                                            }}>
                                                <span style={{ position: 'absolute', left: 0 }}>•</span>
                                                {honor}
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}

                            {/* Volunteer Experience (if any) */}
                            {optimizedExperience && optimizedExperience.some(exp => exp.title?.toLowerCase().includes('volunteer')) && (
                                <section>
                                    <h2 style={{
                                        fontSize: '13pt',
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        fontVariant: 'small-caps',
                                        letterSpacing: '1pt',
                                        borderBottom: '1pt solid #000',
                                        paddingBottom: '1mm',
                                        marginBottom: '3mm'
                                    }}>
                                        Volunteer Experience
                                    </h2>
                                    {optimizedExperience
                                        .filter(exp => exp.title?.toLowerCase().includes('volunteer'))
                                        .map((exp, idx) => (
                                            <div key={idx} style={{ marginBottom: '3mm' }}>
                                                <div style={{ display: 'table', width: '100%' }}>
                                                    <div style={{ display: 'table-row' }}>
                                                        <div style={{ display: 'table-cell', fontWeight: 700, fontSize: '10.5pt' }}>
                                                            {exp.title} at {exp.company}
                                                        </div>
                                                        <div style={{ display: 'table-cell', textAlign: 'right', fontSize: '10pt' }}>
                                                            {exp.location || ''}
                                                        </div>
                                                    </div>
                                                </div>
                                                <p style={{ fontSize: '10pt', fontStyle: 'italic', marginTop: '0.5mm' }}>
                                                    {exp.optimizedBullets && exp.optimizedBullets[0]}
                                                </p>
                                            </div>
                                        ))}
                                </section>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Print Styles */}
            <style>{`
                @media print {
                    body { 
                        margin: 0; 
                        padding: 0;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    @page {
                        size: A4;
                        margin: 0;
                    }
                    .print\\:hidden { display: none !important; }
                    .print\\:p-0 { padding: 0 !important; }
                    .print\\:shadow-none { box-shadow: none !important; }
                    .print\\:p-6 { padding: 1.5rem !important; }
                    .print\\:p-8 { padding: 2rem !important; }
                    
                    /* Prevent page breaks inside content blocks */
                    div, section, ul, li {
                        page-break-inside: avoid;
                    }
                    
                    /* Ensure backgrounds print */
                    * {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                }
                
                /* Smooth scrolling for template preview */
                html {
                    scroll-behavior: smooth;
                }
                
                /* Better font rendering */
                body {
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                }
            `}</style>
        </div>
    );
};

export default ExportResume;

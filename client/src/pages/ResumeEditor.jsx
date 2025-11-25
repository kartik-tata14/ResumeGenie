import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    CheckCircle, AlertTriangle, Info, Download, Edit,
    Sparkles, ArrowLeft, FileText, Award, TrendingUp
} from 'lucide-react';

const ResumeEditor = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [resumeData, setResumeData] = useState(null);
    const [selectedTemplate, setSelectedTemplate] = useState(1);
    const [activeTab, setActiveTab] = useState('overview');
    const [showAllSuggestions, setShowAllSuggestions] = useState(false);

    useEffect(() => {
        if (location.state?.resumeData) {
            setResumeData(location.state.resumeData);
        } else {
            // If no data, redirect to upload page
            navigate('/create');
        }
    }, [location, navigate]);

    if (!resumeData) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">Loading your resume...</p>
                </div>
            </div>
        );
    }

    const { optimized, atsScore, suggestions } = resumeData;

    const getSuggestionIcon = (type) => {
        switch (type) {
            case 'critical':
                return <AlertTriangle className="w-5 h-5 text-red-500" />;
            case 'warning':
                return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
            default:
                return <Info className="w-5 h-5 text-blue-500" />;
        }
    };

    const getScoreColor = (score) => {
        if (score >= 90) return 'text-green-600 dark:text-green-400';
        if (score >= 80) return 'text-blue-600 dark:text-blue-400';
        if (score >= 70) return 'text-yellow-600 dark:text-yellow-400';
        return 'text-red-600 dark:text-red-400';
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-8">
                <button
                    onClick={() => navigate('/create')}
                    className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-4"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Upload
                </button>

                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                            Your Optimized{' '}
                            <span className="bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent">
                                Resume
                            </span>
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Review your ATS score, make edits, and choose a template
                        </p>
                    </div>

                    <button
                        onClick={() => navigate('/export', { state: { resumeData, selectedTemplate } })}
                        className="px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center"
                    >
                        <Download className="w-5 h-5 mr-2" />
                        Export PDF
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
                {/* Left Sidebar - ATS Score & Suggestions */}
                <div className="lg:col-span-1 space-y-6">
                    {/* ATS Score Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                        <div className="flex items-center space-x-2 mb-4">
                            <Award className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">ATS Score</h2>
                        </div>

                        <div className="text-center mb-6">
                            <div className={`text-6xl font-bold mb-2 ${getScoreColor(atsScore.overall)}`}>
                                {atsScore.overall}
                            </div>
                            <div className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-1">
                                Grade: {atsScore.grade}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-500 px-4">
                                {atsScore.verdict}
                            </div>
                            {atsScore.overall < 70 && (
                                <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                                    <p className="text-xs text-yellow-700 dark:text-yellow-300">
                                        ⚠️ Your resume may need significant improvements to match the job requirements
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Score Breakdown */}
                        <div className="space-y-3">
                            <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">
                                Score Breakdown
                            </h3>
                            {Object.entries(atsScore.breakdown).map(([key, value]) => {
                                const maxScores = {
                                    formatting: 15,
                                    contactInfo: 10,
                                    skills: 20,
                                    experience: 20,
                                    education: 10,
                                    certifications: 10,
                                    projects: 5,
                                    keywords: 10
                                };
                                const maxScore = maxScores[key] || 20;
                                // Cap the value at maxScore to prevent overflow
                                const cappedValue = Math.min(value, maxScore);

                                return (
                                    <div key={key} className="space-y-1">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600 dark:text-gray-400 capitalize">
                                                {key.replace(/([A-Z])/g, ' $1').trim()}
                                            </span>
                                            <span className="font-semibold text-gray-900 dark:text-white">
                                                {cappedValue}/{maxScore}
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                            <div
                                                className="bg-gradient-to-r from-primary-600 to-accent-600 h-2 rounded-full transition-all duration-300"
                                                style={{
                                                    width: `${Math.min((cappedValue / maxScore) * 100, 100)}%`
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Strengths and Weaknesses */}
                        {(atsScore.strengths || atsScore.weaknesses) && (
                            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                {atsScore.strengths && atsScore.strengths.length > 0 && (
                                    <div className="mb-4">
                                        <h4 className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase mb-2 flex items-center">
                                            <CheckCircle className="w-3 h-3 mr-1" />
                                            Strengths
                                        </h4>
                                        <ul className="space-y-1">
                                            {atsScore.strengths.map((strength, idx) => (
                                                <li key={idx} className="text-xs text-gray-700 dark:text-gray-300">• {strength}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {atsScore.weaknesses && atsScore.weaknesses.length > 0 && (
                                    <div>
                                        <h4 className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase mb-2 flex items-center">
                                            <AlertTriangle className="w-3 h-3 mr-1" />
                                            Weaknesses
                                        </h4>
                                        <ul className="space-y-1">
                                            {atsScore.weaknesses.map((weakness, idx) => (
                                                <li key={idx} className="text-xs text-gray-700 dark:text-gray-300">• {weakness}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Keywords Match Card */}
                    {resumeData.keywords?.matchPercentage !== undefined && (
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                            <div className="flex items-center space-x-2 mb-4">
                                <Sparkles className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                    Keyword Match
                                </h2>
                            </div>
                            <div className="text-center mb-4">
                                <div className={`text-5xl font-bold mb-2 ${resumeData.keywords.matchPercentage >= 70 ? 'text-green-600 dark:text-green-400' :
                                    resumeData.keywords.matchPercentage >= 50 ? 'text-yellow-600 dark:text-yellow-400' :
                                        'text-red-600 dark:text-red-400'
                                    }`}>
                                    {resumeData.keywords.matchPercentage}%
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Job keywords found in resume
                                </p>
                            </div>
                            {resumeData.keywords.missing?.length > 0 && (
                                <div className="space-y-2">
                                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                                        Missing Keywords:
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {resumeData.keywords.missing.slice(0, 8).map((keyword, idx) => (
                                            <span key={idx} className="text-xs px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full">
                                                {keyword}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Suggestions Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                                <TrendingUp className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                    Suggestions ({suggestions.length})
                                </h2>
                            </div>
                            {suggestions.length > 5 && (
                                <button
                                    onClick={() => setShowAllSuggestions(!showAllSuggestions)}
                                    className="text-xs text-primary-600 dark:text-primary-400 hover:underline font-semibold"
                                >
                                    {showAllSuggestions ? 'Show Less' : `Show All (${suggestions.length - 5} more)`}
                                </button>
                            )}
                        </div>

                        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                            {(showAllSuggestions ? suggestions : suggestions.slice(0, 5)).map((suggestion, index) => (
                                <div
                                    key={index}
                                    className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                                >
                                    {getSuggestionIcon(suggestion.type)}
                                    <div className="flex-1">
                                        <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
                                            {suggestion.category}
                                        </div>
                                        <p className="text-sm text-gray-700 dark:text-gray-300">
                                            {suggestion.message}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content - Resume Data */}
                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                        {/* Tabs */}
                        <div className="border-b border-gray-200 dark:border-gray-700">
                            <div className="flex space-x-4 px-6 overflow-x-auto">
                                <button
                                    onClick={() => setActiveTab('overview')}
                                    className={`py-4 px-2 border-b-2 font-semibold transition-colors whitespace-nowrap ${activeTab === 'overview'
                                        ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                                        }`}
                                >
                                    Overview
                                </button>
                                <button
                                    onClick={() => setActiveTab('experience')}
                                    className={`py-4 px-2 border-b-2 font-semibold transition-colors whitespace-nowrap ${activeTab === 'experience'
                                        ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                                        }`}
                                >
                                    Experience
                                </button>
                                <button
                                    onClick={() => setActiveTab('education')}
                                    className={`py-4 px-2 border-b-2 font-semibold transition-colors whitespace-nowrap ${activeTab === 'education'
                                        ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                                        }`}
                                >
                                    Education
                                </button>
                                <button
                                    onClick={() => setActiveTab('skills')}
                                    className={`py-4 px-2 border-b-2 font-semibold transition-colors whitespace-nowrap ${activeTab === 'skills'
                                        ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                                        }`}
                                >
                                    Skills
                                </button>
                                <button
                                    onClick={() => setActiveTab('extras')}
                                    className={`py-4 px-2 border-b-2 font-semibold transition-colors whitespace-nowrap ${activeTab === 'extras'
                                        ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                                        }`}
                                >
                                    Extras
                                </button>
                                <button
                                    onClick={() => setActiveTab('templates')}
                                    className={`py-4 px-2 border-b-2 font-semibold transition-colors whitespace-nowrap ${activeTab === 'templates'
                                        ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                                        }`}
                                >
                                    Templates
                                </button>
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="p-6">
                            {activeTab === 'overview' && (
                                <div className="space-y-6">
                                    {/* Contact Info */}
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                            Contact Information
                                        </h3>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Name</label>
                                                <input
                                                    type="text"
                                                    value={optimized.name || ''}
                                                    onChange={(e) => setResumeData({
                                                        ...resumeData,
                                                        optimized: { ...optimized, name: e.target.value }
                                                    })}
                                                    className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Email</label>
                                                <input
                                                    type="email"
                                                    value={optimized.email || ''}
                                                    onChange={(e) => setResumeData({
                                                        ...resumeData,
                                                        optimized: { ...optimized, email: e.target.value }
                                                    })}
                                                    className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Phone</label>
                                                <input
                                                    type="tel"
                                                    value={optimized.phone || ''}
                                                    onChange={(e) => setResumeData({
                                                        ...resumeData,
                                                        optimized: { ...optimized, phone: e.target.value }
                                                    })}
                                                    className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Location</label>
                                                <input
                                                    type="text"
                                                    value={optimized.location || ''}
                                                    onChange={(e) => setResumeData({
                                                        ...resumeData,
                                                        optimized: { ...optimized, location: e.target.value }
                                                    })}
                                                    className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Professional Summary */}
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                                Professional Summary
                                            </h3>
                                            <Sparkles className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                                        </div>
                                        <textarea
                                            value={optimized.summary || ''}
                                            onChange={(e) => setResumeData({
                                                ...resumeData,
                                                optimized: { ...optimized, summary: e.target.value }
                                            })}
                                            rows={4}
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                                        />
                                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                            ✨ AI-optimized for maximum impact
                                        </p>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'experience' && (
                                <div className="space-y-6">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                        Professional Experience
                                    </h3>
                                    {resumeData.optimizedExperience && resumeData.optimizedExperience.length > 0 ? (
                                        <div className="space-y-6">
                                            {resumeData.optimizedExperience.map((exp, index) => (
                                                <div key={index} className="p-5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-700/30">
                                                    <div className="flex justify-between items-start mb-3">
                                                        <div>
                                                            <h4 className="text-lg font-bold text-gray-900 dark:text-white">{exp.title}</h4>
                                                            <p className="text-primary-600 dark:text-primary-400 font-semibold">{exp.company}</p>
                                                            {exp.location && <p className="text-sm text-gray-600 dark:text-gray-400">{exp.location}</p>}
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                                {exp.startDate} - {exp.endDate}
                                                            </p>
                                                            {exp.duration && (
                                                                <p className="text-xs text-gray-500 dark:text-gray-400">{exp.duration}</p>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="mb-3">
                                                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2 flex items-center">
                                                            <Sparkles className="w-3 h-3 mr-1" />
                                                            AI-Optimized Achievements
                                                        </p>
                                                        <ul className="space-y-2">
                                                            {exp.optimizedBullets?.map((bullet, bulletIdx) => (
                                                                <li key={bulletIdx} className="flex items-start space-x-2">
                                                                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                                                    <span className="text-sm text-gray-700 dark:text-gray-300">{bullet}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    {exp.technologies && exp.technologies.length > 0 && (
                                                        <div className="flex flex-wrap gap-2 mt-3">
                                                            {exp.technologies.map((tech, techIdx) => (
                                                                <span key={techIdx} className="text-xs px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full">
                                                                    {tech}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <Info className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                            <p className="text-gray-600 dark:text-gray-400">No experience data available</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'education' && (
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                        Education
                                    </h3>
                                    {resumeData.optimizedEducation && resumeData.optimizedEducation.length > 0 ? (
                                        <div className="space-y-4">
                                            {resumeData.optimizedEducation.map((edu, index) => (
                                                <div key={index} className="p-5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-700/30">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div>
                                                            <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                                                                {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                                                            </h4>
                                                            <p className="text-primary-600 dark:text-primary-400 font-semibold">{edu.institution}</p>
                                                            {edu.location && <p className="text-sm text-gray-600 dark:text-gray-400">{edu.location}</p>}
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                                {edu.startDate && edu.endDate ? `${edu.startDate} - ${edu.endDate}` : edu.endDate || ''}
                                                            </p>
                                                            {edu.gpa && (
                                                                <p className="text-sm text-green-600 dark:text-green-400 font-semibold">GPA: {edu.gpa}</p>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {edu.honors && (
                                                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                                                            <span className="font-semibold">Honors:</span> {edu.honors}
                                                        </p>
                                                    )}

                                                    {edu.relevant && edu.relevant.length > 0 && (
                                                        <div className="mt-2">
                                                            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">Relevant Coursework:</p>
                                                            <div className="flex flex-wrap gap-2">
                                                                {edu.relevant.map((course, courseIdx) => (
                                                                    <span key={courseIdx} className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
                                                                        {course}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <Info className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                            <p className="text-gray-600 dark:text-gray-400">No education data available</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'extras' && (
                                <div className="space-y-6">
                                    {/* Certifications */}
                                    {resumeData.optimizedCertifications && resumeData.optimizedCertifications.length > 0 && (
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Certifications</h3>
                                            <div className="grid sm:grid-cols-2 gap-3">
                                                {resumeData.optimizedCertifications.map((cert, index) => (
                                                    <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700/30">
                                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{cert.name}</h4>
                                                        <p className="text-sm text-primary-600 dark:text-primary-400">{cert.issuer}</p>
                                                        {cert.date && <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Issued: {cert.date}</p>}
                                                        {cert.skills && cert.skills.length > 0 && (
                                                            <div className="flex flex-wrap gap-1 mt-2">
                                                                {cert.skills.map((skill, skillIdx) => (
                                                                    <span key={skillIdx} className="text-xs px-2 py-0.5 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded">
                                                                        {skill}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}
                                                        {cert.relevance && <p className="text-xs text-gray-700 dark:text-gray-300 mt-2 italic">{cert.relevance}</p>}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Projects */}
                                    {resumeData.optimizedProjects && resumeData.optimizedProjects.length > 0 && (
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Projects</h3>
                                            <div className="space-y-4">
                                                {resumeData.optimizedProjects.map((project, index) => (
                                                    <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700/30">
                                                        <div className="flex justify-between items-start mb-2">
                                                            <h4 className="font-semibold text-gray-900 dark:text-white">{project.name}</h4>
                                                            {project.date && <p className="text-xs text-gray-600 dark:text-gray-400">{project.date}</p>}
                                                        </div>
                                                        {project.role && <p className="text-sm text-primary-600 dark:text-primary-400 mb-2">{project.role}</p>}
                                                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{project.description}</p>
                                                        {project.skills && project.skills.length > 0 && (
                                                            <div className="mb-2">
                                                                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Skills:</p>
                                                                <div className="flex flex-wrap gap-1">
                                                                    {project.skills.map((skill, skillIdx) => (
                                                                        <span key={skillIdx} className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded">
                                                                            {skill}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                        {project.technologies && project.technologies.length > 0 && (
                                                            <div className="flex flex-wrap gap-2 mb-2">
                                                                {project.technologies.map((tech, techIdx) => (
                                                                    <span key={techIdx} className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                                                                        {tech}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}
                                                        {project.achievements && project.achievements.length > 0 && (
                                                            <ul className="text-xs space-y-1 mt-2">
                                                                {project.achievements.map((achievement, achIdx) => (
                                                                    <li key={achIdx} className="flex items-start space-x-1">
                                                                        <CheckCircle className="w-3 h-3 text-green-600 mt-0.5" />
                                                                        <span className="text-gray-700 dark:text-gray-300">{achievement}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                        {project.link && (
                                                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-xs text-primary-600 dark:text-primary-400 hover:underline mt-2 inline-block">
                                                                View Project →
                                                            </a>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Honors/Awards */}
                                    {optimized.honors && optimized.honors.length > 0 && (
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Honors & Awards</h3>
                                            <div className="grid sm:grid-cols-2 gap-3">
                                                {optimized.honors.map((honor, index) => (
                                                    <div key={index} className="flex items-start space-x-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                                                        <Award className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                                                        <span className="text-sm text-gray-700 dark:text-gray-300">{honor}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Empty state */}
                                    {(!resumeData.optimizedCertifications || resumeData.optimizedCertifications.length === 0) &&
                                        (!resumeData.optimizedProjects || resumeData.optimizedProjects.length === 0) &&
                                        (!optimized.honors || optimized.honors.length === 0) && (
                                            <div className="text-center py-8">
                                                <Info className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                                <p className="text-gray-600 dark:text-gray-400">No additional information available</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Certifications, projects, and honors will appear here</p>
                                            </div>
                                        )}
                                </div>
                            )}

                            {activeTab === 'skills' && (
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                        Skills Assessment
                                    </h3>
                                    {optimized.skills && optimized.skills.length > 0 ? (
                                        <div className="grid sm:grid-cols-2 gap-3">
                                            {optimized.skills.map((skill, index) => (
                                                <div
                                                    key={index}
                                                    className={`flex items-center justify-between p-3 rounded-lg ${skill.matchesJob
                                                        ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                                                        : 'bg-gray-50 dark:bg-gray-700/50'
                                                        }`}
                                                >
                                                    <div className="flex items-center space-x-3">
                                                        <CheckCircle className={`w-5 h-5 ${skill.matchesJob ? 'text-green-600' : 'text-gray-400'
                                                            }`} />
                                                        <span className="font-medium text-gray-900 dark:text-white">
                                                            {skill.name}
                                                        </span>
                                                        {skill.suggested && (
                                                            <span className="text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-2 py-1 rounded-full">
                                                                AI Suggested
                                                            </span>
                                                        )}
                                                        {skill.matchesJob && (
                                                            <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
                                                                Matches Job
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className={`text-sm font-semibold ${skill.relevance >= 80 ? 'text-green-600 dark:text-green-400' :
                                                        skill.relevance >= 60 ? 'text-yellow-600 dark:text-yellow-400' :
                                                            'text-red-600 dark:text-red-400'
                                                        }`}>
                                                        {skill.relevance}%
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <Info className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                            <p className="text-gray-600 dark:text-gray-400">No skills data available</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Upload your resume again to extract skills</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'templates' && (
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                        Choose Your Template
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                                        Select a professional template for your resume. All templates are ATS-optimized.
                                    </p>
                                    <div className="grid md:grid-cols-3 gap-6">
                                        {[
                                            { id: 1, name: 'Modern', image: '/images/Modern Resume Template.jpeg', desc: 'Clean & Contemporary' },
                                            { id: 2, name: 'Professional', image: '/images/Professional Resume Template.jpeg', desc: 'Elegant & Sophisticated' },
                                            { id: 3, name: 'Classic', image: '/images/Classic Resume Template.jpeg', desc: 'Traditional & Timeless' }
                                        ].map((template) => (
                                            <button
                                                key={template.id}
                                                onClick={() => setSelectedTemplate(template.id)}
                                                className={`group relative p-4 border-2 rounded-xl transition-all overflow-hidden ${selectedTemplate === template.id
                                                    ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 shadow-lg'
                                                    : 'border-gray-200 dark:border-gray-700 hover:border-primary-400 hover:shadow-md'
                                                    }`}
                                            >
                                                {/* Template Preview Image */}
                                                <div className="aspect-[8.5/11] bg-gray-100 dark:bg-gray-800 rounded-lg mb-3 overflow-hidden">
                                                    <img
                                                        src={template.image}
                                                        alt={template.name}
                                                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                            e.target.nextSibling.style.display = 'flex';
                                                        }}
                                                    />
                                                    <div className="hidden w-full h-full items-center justify-center">
                                                        <FileText className="w-12 h-12 text-gray-400" />
                                                    </div>
                                                </div>

                                                {/* Selected Badge */}
                                                {selectedTemplate === template.id && (
                                                    <div className="absolute top-6 right-6 bg-primary-600 text-white p-2 rounded-full shadow-lg">
                                                        <CheckCircle className="w-5 h-5" />
                                                    </div>
                                                )}

                                                <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                                                    {template.name}
                                                </h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                    {template.desc}
                                                </p>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeEditor;

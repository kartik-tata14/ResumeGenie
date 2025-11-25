import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Link as LinkIcon, FileText, Sparkles, ArrowRight, AlertCircle } from 'lucide-react';

const CreateResume = () => {
    const navigate = useNavigate();
    const [inputMethod, setInputMethod] = useState(null); // 'upload' or 'linkedin' or null
    const [file, setFile] = useState(null);
    const [linkedinUrl, setLinkedinUrl] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [dragActive, setDragActive] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Handle file drag events
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    // Handle file drop
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileChange(e.dataTransfer.files[0]);
        }
    };

    // Handle file selection
    const handleFileChange = (selectedFile) => {
        const validTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];

        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!validTypes.includes(selectedFile.type)) {
            setErrors({ ...errors, file: 'Please upload a PDF, DOC, or DOCX file' });
            return;
        }

        if (selectedFile.size > maxSize) {
            setErrors({ ...errors, file: 'File size must be less than 5MB' });
            return;
        }

        setFile(selectedFile);
        setErrors({ ...errors, file: null });
    };

    // Validate LinkedIn URL
    const validateLinkedInUrl = (url) => {
        const linkedinPattern = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[\w-]+\/?$/i;
        return linkedinPattern.test(url);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        // Validate input method
        if (!inputMethod) {
            newErrors.method = 'Please select an input method';
        } else if (inputMethod === 'upload' && !file) {
            newErrors.file = 'Please upload your resume';
        }

        if (inputMethod === 'linkedin') {
            if (!linkedinUrl) {
                newErrors.linkedin = 'Please enter your LinkedIn profile URL';
            } else if (!validateLinkedInUrl(linkedinUrl)) {
                newErrors.linkedin = 'Please enter a valid LinkedIn profile URL (e.g., linkedin.com/in/your-profile)';
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();

            if (inputMethod === 'upload') {
                formData.append('resume', file);
            } else {
                formData.append('linkedinUrl', linkedinUrl);
            }

            if (jobDescription) {
                formData.append('jobDescription', jobDescription);
            }

            // API call will be implemented
            const response = await fetch('http://localhost:5000/api/upload', {
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
        } catch (error) {
            console.error('Error:', error);
            setErrors({ submit: 'Something went wrong. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="max-w-4xl mx-auto text-center mb-12 animate-slide-up">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4">
                    <Sparkles className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                    <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">
                        Step 1: Upload Your Information
                    </span>
                </div>

                <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                    Let's Build Your{' '}
                    <span className="bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent">
                        Perfect Resume
                    </span>
                </h1>

                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Upload your existing resume or share your LinkedIn profile. Add a job description to get a tailored, ATS-optimized resume.
                </p>
            </div>

            {/* Main Form */}
            <div className="max-w-4xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Input Method Toggle */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                            Choose Your Input Method
                        </h2>

                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                            {/* Upload Option */}
                            <button
                                type="button"
                                onClick={() => setInputMethod('upload')}
                                className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${inputMethod === 'upload'
                                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                    : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700'
                                    }`}
                            >
                                <div className="flex items-start space-x-4">
                                    <div className={`p-3 rounded-lg ${inputMethod === 'upload'
                                        ? 'bg-primary-100 dark:bg-primary-900/40'
                                        : 'bg-gray-100 dark:bg-gray-700'
                                        }`}>
                                        <Upload className={`w-6 h-6 ${inputMethod === 'upload'
                                            ? 'text-primary-600 dark:text-primary-400'
                                            : 'text-gray-600 dark:text-gray-400'
                                            }`} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-lg mb-1 text-gray-900 dark:text-white">
                                            Upload Resume
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Upload your existing resume in PDF, DOC, or DOCX format
                                        </p>
                                    </div>
                                    {inputMethod === 'upload' && (
                                        <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            </button>

                            {/* LinkedIn Option */}
                            <button
                                type="button"
                                onClick={() => setInputMethod('linkedin')}
                                className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${inputMethod === 'linkedin'
                                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                    : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700'
                                    }`}
                            >
                                <div className="flex items-start space-x-4">
                                    <div className={`p-3 rounded-lg ${inputMethod === 'linkedin'
                                        ? 'bg-primary-100 dark:bg-primary-900/40'
                                        : 'bg-gray-100 dark:bg-gray-700'
                                        }`}>
                                        <LinkIcon className={`w-6 h-6 ${inputMethod === 'linkedin'
                                            ? 'text-primary-600 dark:text-primary-400'
                                            : 'text-gray-600 dark:text-gray-400'
                                            }`} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-lg mb-1 text-gray-900 dark:text-white">
                                            LinkedIn Profile
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Paste your LinkedIn profile URL to import your information
                                        </p>
                                    </div>
                                    {inputMethod === 'linkedin' && (
                                        <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            </button>
                        </div>

                        {/* File Upload Section */}
                        {inputMethod === 'upload' && (
                            <div className="space-y-4">
                                <div
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                    className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${dragActive
                                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                        : 'border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-600'
                                        }`}
                                >
                                    <input
                                        type="file"
                                        id="resume-upload"
                                        accept=".pdf,.doc,.docx"
                                        onChange={(e) => e.target.files[0] && handleFileChange(e.target.files[0])}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />

                                    {!file ? (
                                        <div className="space-y-3">
                                            <div className="flex justify-center">
                                                <div className="p-4 bg-primary-100 dark:bg-primary-900/30 rounded-full">
                                                    <Upload className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                                    Drop your resume here, or click to browse
                                                </p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    Supports PDF, DOC, DOCX (Max 5MB)
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center space-x-3">
                                            <FileText className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                                            <div className="text-left">
                                                <p className="font-semibold text-gray-900 dark:text-white">{file.name}</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setFile(null);
                                                }}
                                                className="ml-4 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {errors.file && (
                                    <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
                                        <AlertCircle className="w-5 h-5" />
                                        <span className="text-sm">{errors.file}</span>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* LinkedIn URL Input */}
                        {inputMethod === 'linkedin' && (
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="linkedin-url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        LinkedIn Profile URL
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <LinkIcon className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="url"
                                            id="linkedin-url"
                                            value={linkedinUrl}
                                            onChange={(e) => {
                                                setLinkedinUrl(e.target.value);
                                                setErrors({ ...errors, linkedin: null });
                                            }}
                                            placeholder="https://linkedin.com/in/your-profile"
                                            className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                        />
                                    </div>
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                        Example: linkedin.com/in/john-doe or https://www.linkedin.com/in/john-doe
                                    </p>
                                </div>

                                {errors.linkedin && (
                                    <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
                                        <AlertCircle className="w-5 h-5" />
                                        <span className="text-sm">{errors.linkedin}</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Job Description Section */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Job Description <span className="text-gray-500 dark:text-gray-400 text-lg font-normal">(Optional)</span>
                            </h2>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                {jobDescription.length} characters
                            </span>
                        </div>

                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Paste the job description to get a tailored resume optimized for this specific role
                        </p>

                        <textarea
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            placeholder="Paste the complete job description here..."
                            rows={8}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center justify-between animate-slide-up" style={{ animationDelay: '0.3s' }}>
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="px-6 py-3 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-semibold transition-colors"
                        >
                            ← Back to Home
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="group px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <span>Generate My Resume</span>
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </div>

                    {errors.submit && (
                        <div className="flex items-center justify-center space-x-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                            <AlertCircle className="w-5 h-5" />
                            <span>{errors.submit}</span>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default CreateResume;

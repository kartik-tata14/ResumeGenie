import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Zap, Target, Download, BarChart, Palette } from 'lucide-react';

const Features = () => {
    const navigate = useNavigate();
    const features = [
        {
            icon: FileText,
            title: 'LinkedIn & Resume Import',
            description: 'Simply paste your LinkedIn profile URL or upload your existing resume. Our AI extracts and structures all relevant information instantly.',
            color: 'primary'
        },
        {
            icon: Target,
            title: 'Job-Tailored Optimization',
            description: 'Paste the job description and watch as your resume is intelligently optimized to match the role, highlighting relevant skills and experience.',
            color: 'accent'
        },
        {
            icon: BarChart,
            title: 'ATS Score & Analysis',
            description: 'Get a detailed ATS compatibility score with actionable insights. Know exactly how your resume will perform with applicant tracking systems.',
            color: 'primary'
        },
        {
            icon: Palette,
            title: '3 Professional Templates',
            description: 'Choose from three carefully designed resume templates that balance aesthetic appeal with ATS optimization.',
            color: 'accent'
        },
        {
            icon: Zap,
            title: 'AI-Powered Suggestions',
            description: 'Receive intelligent recommendations to improve your resume content, formatting, and keyword optimization for maximum impact.',
            color: 'primary'
        },
        {
            icon: Download,
            title: 'Export to PDF',
            description: 'Download your polished, ATS-optimized resume as a professional PDF, ready to send to recruiters and employers.',
            color: 'accent'
        }
    ];

    return (
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16 animate-slide-up">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                        Everything You Need to{' '}
                        <span className="bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent">
                            Land Your Dream Job
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Powerful features designed to transform your resume from good to exceptional
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        const colorClasses = feature.color === 'primary'
                            ? 'from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500'
                            : 'from-accent-500 to-accent-600 dark:from-accent-400 dark:to-accent-500';

                        return (
                            <div
                                key={index}
                                className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 animate-slide-up"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Icon */}
                                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${colorClasses} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon className="w-8 h-8 text-white" />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* View Templates CTA */}
                <div className="text-center mt-12 animate-slide-up" style={{ animationDelay: '0.7s' }}>
                    <button
                        onClick={() => navigate('/templates')}
                        className="px-8 py-3 bg-white dark:bg-gray-700 border-2 border-primary-500 dark:border-primary-600 text-primary-600 dark:text-primary-400 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:bg-primary-50 dark:hover:bg-gray-600 transition-all duration-300"
                    >
                        View Sample Resumes
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Features;

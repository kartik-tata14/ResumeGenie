import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Wand2, FileCheck, Download } from 'lucide-react';

const HowItWorks = () => {
    const navigate = useNavigate();

    const steps = [
        {
            number: '01',
            icon: Upload,
            title: 'Input Your Information',
            description: 'Paste your LinkedIn profile URL or upload your existing resume. Optionally add a job description to tailor your resume.',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            number: '02',
            icon: Wand2,
            title: 'AI Works Its Magic',
            description: 'Our advanced AI analyzes your information, optimizes content for ATS systems, and structures everything professionally.',
            color: 'from-purple-500 to-pink-500'
        },
        {
            number: '03',
            icon: FileCheck,
            title: 'Review & Customize',
            description: 'Choose from 3 professional templates, review your ATS score, and make any final adjustments to perfect your resume.',
            color: 'from-green-500 to-emerald-500'
        },
        {
            number: '04',
            icon: Download,
            title: 'Download & Apply',
            description: 'Export your polished, ATS-optimized resume as a PDF and start applying to your dream jobs with confidence.',
            color: 'from-orange-500 to-red-500'
        }
    ];

    return (
        <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16 animate-slide-up">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                        From Profile to{' '}
                        <span className="bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent">
                            Perfect Resume
                        </span>
                        {' '}in 4 Steps
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Our streamlined process gets you from start to finish in under 5 minutes
                    </p>
                </div>

                {/* Steps */}
                <div className="relative">
                    {/* Connection Line */}
                    <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary-200 via-accent-200 to-primary-200 dark:from-primary-900 dark:via-accent-900 dark:to-primary-900 -translate-y-1/2 -z-10"></div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, index) => {
                            const Icon = step.icon;

                            return (
                                <div
                                    key={index}
                                    className="relative animate-slide-up"
                                    style={{ animationDelay: `${index * 0.15}s` }}
                                >
                                    {/* Card */}
                                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 h-full">
                                        {/* Step Number */}
                                        <div className="text-6xl font-bold text-gray-400 dark:text-gray-500 mb-4">
                                            {step.number}
                                        </div>

                                        {/* Icon */}
                                        <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${step.color} mb-6 shadow-lg`}>
                                            <Icon className="w-8 h-8 text-white" />
                                        </div>

                                        {/* Content */}
                                        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>

                                    {/* Arrow for mobile */}
                                    {index < steps.length - 1 && (
                                        <div className="lg:hidden flex justify-center my-4">
                                            <div className="w-1 h-8 bg-gradient-to-b from-primary-400 to-accent-400"></div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-16 animate-slide-up" style={{ animationDelay: '0.6s' }}>
                    <button onClick={() => navigate('/create')} className="px-10 py-4 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg">
                        Start Creating Your Resume
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;

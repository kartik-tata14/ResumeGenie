import React, { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Download, ArrowRight, Sparkles } from 'lucide-react';

const Templates = () => {
    const navigate = useNavigate();

    // Set scroll position to top before paint
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const templates = [
        {
            id: 1,
            name: 'Modern Resume Template',
            image: '/images/Modern Resume Template.jpeg',
            description: 'Clean, contemporary design with a professional edge',
            style: 'Modern & Minimal',
            bestFor: 'Tech, Startups, Creative roles',
            features: [
                'ATS-optimized single column layout',
                'Bold section headers with accent colors',
                'Clear hierarchy and easy to scan',
                'Perfect for 1-2 pages',
                'Excellent for technical positions'
            ],
            color: 'from-blue-500 to-cyan-500'
        },
        {
            id: 2,
            name: 'Professional Resume Template',
            image: '/images/Professional Resume Template.jpeg',
            description: 'Classic two-column layout with elegant dark sidebar',
            style: 'Professional & Sophisticated',
            bestFor: 'Corporate, Finance, Legal, Executive roles',
            features: [
                'Premium two-column design',
                'Dark sidebar for visual impact',
                'Ample white space for readability',
                'Ideal for experienced professionals',
                'Great for traditional industries'
            ],
            color: 'from-purple-500 to-pink-500'
        },
        {
            id: 3,
            name: 'Classic Resume Template',
            image: '/images/Classic Resume Template.jpeg',
            description: 'Timeless single-column format focused on content',
            style: 'Classic & Traditional',
            bestFor: 'Academia, Healthcare, Government, Education',
            features: [
                'Traditional single-column layout',
                'Content-first approach',
                'Maximum ATS compatibility',
                'Easy to customize and extend',
                'Works for any career level'
            ],
            color: 'from-green-500 to-emerald-500'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="max-w-7xl mx-auto text-center mb-16 animate-slide-up">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4">
                    <Sparkles className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                    <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">
                        Professional Resume Templates
                    </span>
                </div>

                <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                    Choose Your{' '}
                    <span className="bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent">
                        Perfect Template
                    </span>
                </h1>

                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                    All templates are 100% ATS-optimized and designed by professionals. Pick your favorite style and let AI fill in your details.
                </p>
            </div>

            {/* Templates Grid */}
            <div className="max-w-7xl mx-auto space-y-16">
                {templates.map((template, index) => (
                    <div
                        key={template.id}
                        className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden animate-slide-up"
                        style={{ animationDelay: `${index * 0.2}s` }}
                    >
                        <div className={`grid lg:grid-cols-2 gap-8 ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                            {/* Template Image */}
                            <div className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                                <div className="relative h-full min-h-[500px] lg:min-h-[600px] bg-gray-100 dark:bg-gray-900">
                                    <img
                                        src={template.image}
                                        alt={template.name}
                                        className="absolute inset-0 w-full h-full object-contain p-8"
                                    />
                                    {/* Gradient Overlay at bottom */}
                                    <div className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t ${template.color} opacity-10`}></div>
                                </div>
                            </div>

                            {/* Template Details */}
                            <div className={`p-8 lg:p-12 flex flex-col justify-center ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                                {/* Style Badge */}
                                <div className={`inline-flex w-fit items-center space-x-2 px-4 py-2 bg-gradient-to-r ${template.color} bg-opacity-10 rounded-full mb-4`}>
                                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        {template.style}
                                    </span>
                                </div>

                                <h2 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">
                                    {template.name.replace(' Resume Template', '')}
                                </h2>

                                <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                                    {template.description}
                                </p>

                                <div className="mb-6">
                                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Best For:
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {template.bestFor}
                                    </p>
                                </div>

                                {/* Features List */}
                                <div className="mb-8">
                                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                        Key Features:
                                    </p>
                                    <ul className="space-y-2">
                                        {template.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start space-x-2">
                                                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button
                                        onClick={() => navigate('/create', { state: { selectedTemplate: template.id } })}
                                        className="group flex-1 px-6 py-4 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                                    >
                                        <span>Use This Template</span>
                                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>

                                    <a
                                        href={template.image}
                                        download={`${template.name}.jpeg`}
                                        className="px-6 py-4 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-500 text-gray-700 dark:text-gray-300 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg flex items-center justify-center"
                                    >
                                        <Download className="mr-2 w-5 h-5" />
                                        <span>Download Sample</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom CTA */}
            <div className="max-w-4xl mx-auto mt-20 text-center animate-slide-up" style={{ animationDelay: '0.8s' }}>
                <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-3xl p-12 shadow-2xl">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Ready to Create Your Perfect Resume?
                    </h2>
                    <p className="text-xl text-white/90 mb-8">
                        Choose any template and let our AI optimize your content in minutes
                    </p>
                    <button
                        onClick={() => navigate('/create')}
                        className="px-10 py-4 bg-white text-primary-600 rounded-xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 inline-flex items-center"
                    >
                        <span>Get Started Now</span>
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Templates;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Upload, FileText, Sparkles } from 'lucide-react';

const Hero = () => {
    const navigate = useNavigate();

    return (
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 dark:bg-primary-500/5 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/10 dark:bg-accent-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="animate-slide-up">
                        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-6">
                            <Sparkles className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                            <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">
                                AI-Powered Resume Builder
                            </span>
                        </div>

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                            Your AI Genie for{' '}
                            <span className="bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent">
                                Perfect Resumes
                            </span>
                        </h1>

                        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                            Transform your LinkedIn profile or existing resume into an ATS-optimized,
                            interview-ready resume in minutes. Let AI do the heavy lifting while you
                            focus on landing your dream job.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-12">
                            <button onClick={() => navigate('/create')} className="group px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center">
                                <span>Create Resume Now</span>
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <button className="px-8 py-4 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg">
                                Watch Demo
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6">
                            <div>
                                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">3</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Templates</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">100%</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">ATS Optimized</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">&lt;5min</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">To Complete</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Visual Mockup */}
                    <div className="relative animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <div className="relative bg-gradient-to-br from-primary-500/10 to-accent-500/10 dark:from-primary-500/5 dark:to-accent-500/5 rounded-3xl p-8 backdrop-blur-sm border border-primary-200 dark:border-primary-800/30">
                            {/* Input Options Card */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-6 transform hover:scale-105 transition-transform duration-300">
                                <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Choose Your Input</h3>

                                <div className="space-y-4">
                                    {/* LinkedIn Option */}
                                    <div className="flex items-center space-x-4 p-4 border-2 border-primary-200 dark:border-primary-800 rounded-xl hover:border-primary-500 dark:hover:border-primary-500 transition-colors cursor-pointer group">
                                        <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg group-hover:bg-primary-200 dark:group-hover:bg-primary-800/50 transition-colors">
                                            <FileText className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-semibold text-gray-900 dark:text-white">LinkedIn Profile</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">Paste your profile URL</div>
                                        </div>
                                    </div>

                                    {/* Upload Option */}
                                    <div className="flex items-center space-x-4 p-4 border-2 border-primary-200 dark:border-primary-800 rounded-xl hover:border-primary-500 dark:hover:border-primary-500 transition-colors cursor-pointer group">
                                        <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg group-hover:bg-primary-200 dark:group-hover:bg-primary-800/50 transition-colors">
                                            <Upload className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-semibold text-gray-900 dark:text-white">Upload Resume</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">PDF, DOC, DOCX</div>
                                        </div>
                                    </div>
                                </div>

                                <button onClick={() => navigate('/create')} className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                                    Generate Resume
                                </button>
                            </div>

                            {/* Floating elements */}
                            <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg font-semibold text-sm animate-float">
                                ✓ ATS Score: 95%
                            </div>
                            <div className="absolute -bottom-4 -left-4 bg-accent-500 text-white px-4 py-2 rounded-full shadow-lg font-semibold text-sm animate-float" style={{ animationDelay: '1.5s' }}>
                                ⚡ Ready in 3 mins
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const CTA = () => {
    const navigate = useNavigate();

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-600 via-accent-600 to-primary-700 dark:from-primary-900 dark:via-accent-900 dark:to-primary-950 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <div className="animate-slide-up">
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>

                    {/* Heading */}
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        Ready to Land Your Dream Job?
                    </h2>

                    {/* Description */}
                    <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Join thousands of job seekers who've transformed their careers with Resume Genie.
                        Your perfect, ATS-optimized resume is just minutes away.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button onClick={() => navigate('/create')} className="group px-10 py-4 bg-white hover:bg-gray-100 text-primary-600 rounded-xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center text-lg">
                            <span>Get Started Free</span>
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button onClick={() => navigate('/templates')} className="px-10 py-4 bg-transparent border-2 border-white hover:bg-white/10 text-white rounded-xl font-bold transition-all duration-300 hover:shadow-lg text-lg backdrop-blur-sm">
                            View Sample Resumes
                        </button>
                    </div>

                    {/* Trust Indicators */}
                    <div className="mt-12 pt-8 border-t border-white/20">
                        <div className="flex flex-wrap justify-center items-center gap-8 text-white/80">
                            <div className="flex items-center space-x-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="font-semibold">100% ATS Compatible</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="font-semibold">No Credit Card Required</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                                </svg>
                                <span className="font-semibold">Ready in &lt; 5 Minutes</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;

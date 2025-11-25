import React from 'react';
import { Sparkles, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 dark:bg-black text-gray-300 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center space-x-2 mb-4">
                            <Sparkles className="w-6 h-6 text-primary-400" />
                            <span className="text-xl font-bold text-white">Resume Genie</span>
                        </div>
                        <p className="text-sm text-gray-400 mb-4">
                            Your AI Genie for perfect resumes. Transform your career with ATS-optimized resumes in minutes.
                        </p>
                        {/* Social Links */}
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Product */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Product</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#features" className="hover:text-primary-400 transition-colors">Features</a></li>
                            <li><a href="#how-it-works" className="hover:text-primary-400 transition-colors">How It Works</a></li>
                            <li><a href="#templates" className="hover:text-primary-400 transition-colors">Templates</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition-colors">Pricing</a></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-primary-400 transition-colors">Resume Tips</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition-colors">ATS Guide</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition-colors">Career Blog</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition-colors">Help Center</a></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Company</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-primary-400 transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition-colors">Contact</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>&copy; 2025 Resume Genie. All rights reserved.</p>
                    <p className="mt-2 md:mt-0">
                        Built with ❤️ for job seekers everywhere
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

import React from 'react';
import { Link } from 'react-router-dom';
import Tooltip from '../common/Tooltip';

interface HeaderProps {
    onMobileMenuToggle?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMobileMenuToggle }) => {
    return (
        <header className="bg-gray-800 text-white shadow-lg">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={onMobileMenuToggle}
                            className="md:hidden text-white hover:text-primary-400 transition-colors"
                            aria-label="Toggle mobile menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>

                        <div className="text-2xl font-bold text-primary-400">
                            📊
                        </div>
                        <h1 className="text-xl font-bold">CMS Analytics Dashboard</h1>
                    </div>
                    <nav className="hidden md:flex space-x-6">
                        <Link to="/" className="hover:text-primary-400 transition-colors">
                            Dashboard
                        </Link>
                        <Link to="/analytics" className="hover:text-primary-400 transition-colors">
                            Analytics
                        </Link>
                        <Link to="/content" className="hover:text-primary-400 transition-colors">
                            Content
                        </Link>
                        <Link to="/settings" className="hover:text-primary-400 transition-colors">
                            Settings
                        </Link>
                    </nav>
                    <div className="flex items-center space-x-4">
                        <Tooltip content="Search (Ctrl+K)">
                            <button className="text-sm hover:text-primary-400 transition-colors" aria-label="Search">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </Tooltip>
                        <Tooltip content="User Profile">
                            <button className="text-sm hover:text-primary-400 transition-colors">
                                Profile
                            </button>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Tooltip from '../common/Tooltip';

interface HeaderProps {
    onMobileMenuToggle?: () => void;
}

const UserMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.success('Logged out successfully');
        navigate('/login');
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 text-sm hover:text-primary-400 transition-colors"
            >
                <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span className="hidden md:inline">{user?.name || 'User'}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    ></div>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-20">
                        <div className="px-4 py-2 border-b border-gray-200">
                            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                            <p className="text-xs text-gray-500">{user?.email}</p>
                            <span className="inline-block mt-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                                {user?.role}
                            </span>
                        </div>
                        <Link
                            to="/settings"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsOpen(false)}
                        >
                            Settings
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                            Logout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

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
                        <UserMenu />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
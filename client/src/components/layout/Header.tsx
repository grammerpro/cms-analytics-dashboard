import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className="bg-gray-800 text-white shadow-lg">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
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
                        <button className="text-sm hover:text-primary-400 transition-colors">
                            Profile
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
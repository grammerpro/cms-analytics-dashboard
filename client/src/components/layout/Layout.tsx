import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Breadcrumbs from '../common/Breadcrumbs';
import useKeyboardShortcut from '../../hooks/useKeyboardShortcut';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    // Keyboard shortcuts
    useKeyboardShortcut([
        { key: 'd', ctrlKey: true, callback: () => navigate('/') },
        { key: 'a', ctrlKey: true, callback: () => navigate('/analytics') },
        { key: 'c', ctrlKey: true, callback: () => navigate('/content') },
        { key: 's', ctrlKey: true, callback: () => navigate('/settings') },
        { key: 'k', ctrlKey: true, callback: () => alert('Search feature coming soon!') },
    ]);

    return (
        <div className="min-h-screen flex flex-col">
            <Header onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
            <div className="flex flex-1">
                <Sidebar
                    isMobileOpen={isMobileMenuOpen}
                    onMobileClose={() => setIsMobileMenuOpen(false)}
                />
                <main className="flex-1 p-4 md:p-8 bg-gray-50 overflow-auto">
                    <Breadcrumbs />
                    <div className="animate-fadeIn">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;
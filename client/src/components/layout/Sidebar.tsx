import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `flex items-center px-6 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors ${
            isActive ? 'bg-primary-100 text-primary-700 border-r-4 border-primary-600' : ''
        }`;

    return (
        <aside className="w-64 bg-white shadow-md">
            <nav className="py-4">
                <NavLink to="/" className={navLinkClass}>
                    <span className="mr-3">📊</span>
                    Dashboard
                </NavLink>
                <NavLink to="/analytics" className={navLinkClass}>
                    <span className="mr-3">📈</span>
                    Analytics
                </NavLink>
                <NavLink to="/content" className={navLinkClass}>
                    <span className="mr-3">📝</span>
                    Content
                </NavLink>
                <NavLink to="/settings" className={navLinkClass}>
                    <span className="mr-3">⚙️</span>
                    Settings
                </NavLink>
            </nav>
        </aside>
    );
};

export default Sidebar;
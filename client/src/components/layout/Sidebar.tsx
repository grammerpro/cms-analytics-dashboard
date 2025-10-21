import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Tooltip from '../common/Tooltip';

interface SidebarProps {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen = false, onMobileClose }) => {
    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `flex items-center px-6 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors ${
            isActive ? 'bg-primary-100 text-primary-700 border-r-4 border-primary-600' : ''
        }`;

    const handleNavClick = () => {
      if (onMobileClose) {
        onMobileClose();
      }
    };

    return (
        <>
          {/* Mobile Overlay */}
          {isMobileOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={onMobileClose}
            ></div>
          )}

          {/* Sidebar */}
          <aside
            className={`
              fixed md:static inset-y-0 left-0 z-50
              w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out
              ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
              md:translate-x-0
            `}
          >
            {/* Mobile Close Button */}
            <div className="md:hidden flex justify-end p-4">
              <button
                onClick={onMobileClose}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="py-4">
                <Tooltip content="View Dashboard (Ctrl+D)" position="right">
                  <NavLink to="/" className={navLinkClass} onClick={handleNavClick}>
                      <span className="mr-3">📊</span>
                      Dashboard
                  </NavLink>
                </Tooltip>
                <Tooltip content="View Analytics (Ctrl+A)" position="right">
                  <NavLink to="/analytics" className={navLinkClass} onClick={handleNavClick}>
                      <span className="mr-3">📈</span>
                      Analytics
                  </NavLink>
                </Tooltip>
                <Tooltip content="Manage Content (Ctrl+C)" position="right">
                  <NavLink to="/content" className={navLinkClass} onClick={handleNavClick}>
                      <span className="mr-3">📝</span>
                      Content
                  </NavLink>
                </Tooltip>
                <Tooltip content="Settings (Ctrl+S)" position="right">
                  <NavLink to="/settings" className={navLinkClass} onClick={handleNavClick}>
                      <span className="mr-3">⚙️</span>
                      Settings
                  </NavLink>
                </Tooltip>
            </nav>
        </aside>
        </>
    );
};

export default Sidebar;
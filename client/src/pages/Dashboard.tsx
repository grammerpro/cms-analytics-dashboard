import React, { useState, useEffect } from 'react';
import MetricCard from '../components/analytics/MetricCard';
import Chart from '../components/analytics/Chart';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Tooltip from '../components/common/Tooltip';
import toast from 'react-hot-toast';

const Dashboard: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    const sampleData = [
        { name: 'Jan', value: 400 },
        { name: 'Feb', value: 300 },
        { name: 'Mar', value: 600 },
        { name: 'Apr', value: 800 },
        { name: 'May', value: 500 },
        { name: 'Jun', value: 750 },
    ];

    const handleExport = () => {
        toast.success('Report exported successfully! 📊');
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <LoadingSpinner size="lg" text="Loading dashboard..." />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Welcome back! Here's what's happening with your analytics today.
                    </p>
                </div>
                <Tooltip content="Export analytics report to CSV">
                    <button className="btn-primary" onClick={handleExport}>
                        📥 Export Report
                    </button>
                </Tooltip>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard 
                    title="Total Users" 
                    value="1,234" 
                    description="Active users this month"
                    icon="👥"
                    trend={{ value: 12.5, isPositive: true }}
                />
                <MetricCard 
                    title="Page Views" 
                    value="45,678" 
                    description="Total page views"
                    icon="👁️"
                    trend={{ value: 8.2, isPositive: true }}
                />
                <MetricCard 
                    title="Bounce Rate" 
                    value="34.5%" 
                    description="Average bounce rate"
                    icon="📉"
                    trend={{ value: 3.1, isPositive: false }}
                />
                <MetricCard 
                    title="Avg. Session" 
                    value="4m 32s" 
                    description="Average session duration"
                    icon="⏱️"
                    trend={{ value: 15.3, isPositive: true }}
                />
            </div>

            {/* Chart Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">Monthly Trend</h2>
                    <select className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                        <option>Last 6 months</option>
                        <option>Last 12 months</option>
                        <option>This year</option>
                    </select>
                </div>
                <Chart data={sampleData} />
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
                <div className="space-y-3">
                    {[
                        { action: 'New user registration', time: '2 minutes ago', icon: '👤' },
                        { action: 'Content published', time: '15 minutes ago', icon: '📝' },
                        { action: 'Analytics report generated', time: '1 hour ago', icon: '📊' },
                        { action: 'User role updated', time: '2 hours ago', icon: '🔐' },
                    ].map((activity, index) => (
                        <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                            <div className="flex items-center space-x-3">
                                <span className="text-2xl">{activity.icon}</span>
                                <span className="text-sm text-gray-700">{activity.action}</span>
                            </div>
                            <span className="text-xs text-gray-500">{activity.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
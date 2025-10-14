import React from 'react';
import AnalyticsDashboard from '../components/analytics/Dashboard';
import RealTimeMetrics from '../components/analytics/RealTimeMetrics';

const Analytics: React.FC = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
                <p className="mt-1 text-sm text-gray-500">
                    Comprehensive analytics and performance insights
                </p>
            </div>

            {/* Real-Time Metrics */}
            <RealTimeMetrics />

            {/* Main Analytics Dashboard */}
            <AnalyticsDashboard />
        </div>
    );
};

export default Analytics;
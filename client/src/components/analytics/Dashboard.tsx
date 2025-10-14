import React from 'react';
import Chart from './Chart';
import MetricCard from './MetricCard';

const Dashboard: React.FC = () => {
    const sampleMetrics = [
        { id: 1, title: 'Total Views', value: '12,543', description: 'Page views this month' },
        { id: 2, title: 'Unique Visitors', value: '3,421', description: 'Unique users' },
        { id: 3, title: 'Conversion Rate', value: '4.2%', description: 'Average conversion' },
        { id: 4, title: 'Revenue', value: '$24,567', description: 'Total revenue' },
    ];

    const chartData = [
        { name: 'Mon', value: 400 },
        { name: 'Tue', value: 300 },
        { name: 'Wed', value: 600 },
        { name: 'Thu', value: 800 },
        { name: 'Fri', value: 700 },
        { name: 'Sat', value: 500 },
        { name: 'Sun', value: 400 },
    ];

    return (
        <div className="analytics-dashboard" style={{ padding: '20px' }}>
            <h2>Analytics Overview</h2>
            <div className="metrics" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' }}>
                {sampleMetrics.map((metric) => (
                    <MetricCard 
                        key={metric.id} 
                        title={metric.title}
                        value={metric.value}
                        description={metric.description}
                    />
                ))}
            </div>
            <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
                <h3>Weekly Performance</h3>
                <Chart data={chartData} />
            </div>
        </div>
    );
};

export default Dashboard;
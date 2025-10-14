import React, { useEffect, useState } from 'react';
import { useWebSocket } from '../../hooks/useWebSocket';

interface RealtimeMetrics {
  pageViews?: number;
  activeUsers?: number;
  timestamp?: string;
}

const RealTimeMetrics: React.FC = () => {
  const { isConnected, realtimeData } = useWebSocket();
  const [metrics, setMetrics] = useState<RealtimeMetrics>({
    pageViews: 0,
    activeUsers: 0,
  });

  useEffect(() => {
    if (realtimeData) {
      setMetrics({
        pageViews: realtimeData.pageViews,
        activeUsers: realtimeData.activeUsers,
        timestamp: realtimeData.timestamp,
      });
    }
  }, [realtimeData]);

  return (
    <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg shadow-lg p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Real-Time Metrics</h3>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
          <span className="text-sm">{isConnected ? 'Live' : 'Disconnected'}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-sm opacity-90">Page Views</p>
          <p className="text-3xl font-bold mt-1">{metrics.pageViews?.toLocaleString()}</p>
        </div>
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-sm opacity-90">Active Users</p>
          <p className="text-3xl font-bold mt-1">{metrics.activeUsers?.toLocaleString()}</p>
        </div>
      </div>
      
      {metrics.timestamp && (
        <p className="text-xs opacity-75 mt-4">
          Last updated: {new Date(metrics.timestamp).toLocaleTimeString()}
        </p>
      )}
    </div>
  );
};

export default RealTimeMetrics;

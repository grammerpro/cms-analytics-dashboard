import { useEffect, useState } from 'react';
import { fetchAnalyticsData } from '../services/analytics.service';
import { AnalyticsData } from '../types/analytics.types';

const useAnalytics = () => {
    const [data, setData] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadAnalyticsData = async () => {
            try {
                const result = await fetchAnalyticsData();
                setData(result);
            } catch (err) {
                setError('Failed to fetch analytics data');
            } finally {
                setLoading(false);
            }
        };

        loadAnalyticsData();
    }, []);

    return { data, loading, error };
};

export default useAnalytics;
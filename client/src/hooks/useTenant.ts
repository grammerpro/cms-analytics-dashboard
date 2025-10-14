import { useEffect, useState } from 'react';
import { Tenant } from '../types/tenant.types';
import { fetchTenants } from '../services/api';

const useTenant = () => {
    const [tenants, setTenants] = useState<Tenant[]>([]);
    const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadTenants = async () => {
            try {
                const data = await fetchTenants();
                setTenants(data);
                if (data.length > 0) {
                    setSelectedTenant(data[0]); // Select the first tenant by default
                }
            } catch (err) {
                setError('Failed to load tenants');
            } finally {
                setLoading(false);
            }
        };

        loadTenants();
    }, []);

    const selectTenant = (tenant: Tenant) => {
        setSelectedTenant(tenant);
    };

    return {
        tenants,
        selectedTenant,
        loading,
        error,
        selectTenant,
    };
};

export default useTenant;
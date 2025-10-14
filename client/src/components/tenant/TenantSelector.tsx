import React from 'react';

const TenantSelector: React.FC = () => {
    const [tenants, setTenants] = React.useState<string[]>([]);
    const [selectedTenant, setSelectedTenant] = React.useState<string | null>(null);

    React.useEffect(() => {
        // Fetch tenants from API or context
        const fetchTenants = async () => {
            // Placeholder for API call
            const fetchedTenants = await fetch('/api/tenants').then(res => res.json());
            setTenants(fetchedTenants);
        };

        fetchTenants();
    }, []);

    const handleTenantChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTenant(event.target.value);
        // Additional logic to handle tenant change
    };

    return (
        <div>
            <label htmlFor="tenant-selector">Select Tenant:</label>
            <select id="tenant-selector" value={selectedTenant || ''} onChange={handleTenantChange}>
                <option value="" disabled>Select a tenant</option>
                {tenants.map((tenant) => (
                    <option key={tenant} value={tenant}>
                        {tenant}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default TenantSelector;
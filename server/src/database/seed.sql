-- Seed Data for Development
-- This file contains sample data for testing

-- Insert Demo Tenant
INSERT INTO tenants (id, name, domain, config) VALUES
    ('00000000-0000-0000-0000-000000000001', 'Demo Tenant', 'demo.example.com', '{"theme": "light", "features": ["analytics", "content"]}'),
    ('00000000-0000-0000-0000-000000000002', 'Acme Corp', 'acme.example.com', '{"theme": "dark", "features": ["analytics", "content", "advanced"]}')
ON CONFLICT (id) DO NOTHING;

-- Insert Demo Users
-- Password for all demo users is 'password123'
-- Hash generated with: bcrypt.hash('password123', 10)
INSERT INTO users (id, email, password_hash, name, role, tenant_id) VALUES
    ('00000000-0000-0000-0000-000000000001', 'admin@demo.com', '$2b$10$rKvHvj1VNzl7xV7kQ2QJ5u0Z1YZzQ7.xF5xG7bQ6xF5xG7bQ6xF5xG', 'Admin User', 'admin', '00000000-0000-0000-0000-000000000001'),
    ('00000000-0000-0000-0000-000000000002', 'editor@demo.com', '$2b$10$rKvHvj1VNzl7xV7kQ2QJ5u0Z1YZzQ7.xF5xG7bQ6xF5xG7bQ6xF5xG', 'Editor User', 'editor', '00000000-0000-0000-0000-000000000001'),
    ('00000000-0000-0000-0000-000000000003', 'viewer@demo.com', '$2b$10$rKvHvj1VNzl7xV7kQ2QJ5u0Z1YZzQ7.xF5xG7bQ6xF5xG7bQ6xF5xG', 'Viewer User', 'viewer', '00000000-0000-0000-0000-000000000001'),
    ('00000000-0000-0000-0000-000000000004', 'admin@acme.com', '$2b$10$rKvHvj1VNzl7xV7kQ2QJ5u0Z1YZzQ7.xF5xG7bQ6xF5xG7bQ6xF5xG', 'Acme Admin', 'admin', '00000000-0000-0000-0000-000000000002')
ON CONFLICT (id) DO NOTHING;

-- Insert Sample Content
INSERT INTO content (id, title, body, status, tenant_id, created_by, metadata, version) VALUES
    (
        '00000000-0000-0000-0000-000000000001',
        'Getting Started Guide',
        'Welcome to the CMS Analytics Dashboard. This comprehensive guide will help you understand all the features and capabilities of our platform. Start by exploring the dashboard to see real-time analytics.',
        'published',
        '00000000-0000-0000-0000-000000000001',
        '00000000-0000-0000-0000-000000000001',
        '{"tags": ["guide", "tutorial"], "category": "documentation"}',
        1
    ),
    (
        '00000000-0000-0000-0000-000000000002',
        'API Documentation',
        'This guide covers all API endpoints available in the CMS Analytics Dashboard. Learn how to integrate with our RESTful API and WebSocket connections for real-time updates.',
        'published',
        '00000000-0000-0000-0000-000000000001',
        '00000000-0000-0000-0000-000000000001',
        '{"tags": ["api", "documentation"], "category": "technical"}',
        2
    ),
    (
        '00000000-0000-0000-0000-000000000003',
        'Draft Article',
        'This is a work in progress article about advanced analytics features.',
        'draft',
        '00000000-0000-0000-0000-000000000001',
        '00000000-0000-0000-0000-000000000002',
        '{"tags": ["analytics"], "category": "blog"}',
        1
    ),
    (
        '00000000-0000-0000-0000-000000000004',
        'Acme Company Blog',
        'Welcome to Acme Corp blog. Here we share insights about our industry.',
        'published',
        '00000000-0000-0000-0000-000000000002',
        '00000000-0000-0000-0000-000000000004',
        '{"tags": ["blog"], "category": "company"}',
        1
    )
ON CONFLICT (id) DO NOTHING;

-- Insert Sample Analytics Data
INSERT INTO analytics (tenant_id, content_id, page_views, unique_visitors, avg_time_on_page, bounce_rate, date) VALUES
    ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 1250, 876, 180, 32.5, CURRENT_DATE - INTERVAL '7 days'),
    ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 1340, 903, 185, 30.2, CURRENT_DATE - INTERVAL '6 days'),
    ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 1180, 845, 175, 33.8, CURRENT_DATE - INTERVAL '5 days'),
    ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 1420, 967, 190, 28.1, CURRENT_DATE - INTERVAL '4 days'),
    ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 1580, 1034, 195, 25.6, CURRENT_DATE - INTERVAL '3 days'),
    ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 1390, 921, 188, 29.3, CURRENT_DATE - INTERVAL '2 days'),
    ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 1450, 923, 195, 28.3, CURRENT_DATE - INTERVAL '1 day'),
    ('00000000-0000-0000-0000-000000000001', NULL, 1620, 1087, 200, 24.5, CURRENT_DATE),
    ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000004', 850, 612, 165, 35.2, CURRENT_DATE - INTERVAL '1 day'),
    ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000004', 920, 654, 170, 32.8, CURRENT_DATE)
ON CONFLICT DO NOTHING;

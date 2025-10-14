export class User {
    id: string;
    email: string;
    password: string;
    tenantId: string;
    role: 'admin' | 'editor' | 'viewer';
    name?: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(id: string, email: string, password: string, tenantId: string, role: 'admin' | 'editor' | 'viewer' = 'viewer') {
        this.id = id;
        this.email = email;
        this.password = password;
        this.tenantId = tenantId;
        this.role = role;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    updatePassword(newPassword: string) {
        this.password = newPassword;
        this.updatedAt = new Date();
    }

    hasPermission(requiredRole: 'admin' | 'editor' | 'viewer'): boolean {
        const roleHierarchy = { admin: 3, editor: 2, viewer: 1 };
        return roleHierarchy[this.role] >= roleHierarchy[requiredRole];
    }
}
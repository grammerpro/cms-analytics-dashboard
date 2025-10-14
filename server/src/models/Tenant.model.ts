export class Tenant {
    id: string;
    name: string;
    domain?: string;
    config?: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;

    constructor(id: string, name: string, domain?: string, config?: Record<string, any>) {
        this.id = id;
        this.name = name;
        this.domain = domain;
        this.config = config || {};
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    updateName(newName: string) {
        this.name = newName;
        this.updatedAt = new Date();
    }

    updateConfig(newConfig: Record<string, any>) {
        this.config = { ...this.config, ...newConfig };
        this.updatedAt = new Date();
    }
}
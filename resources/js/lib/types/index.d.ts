import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    profile_photo_url: string | undefined;
    two_factor_confirmed_at: string | null;
}

interface Session {
    id: string;
    agent: {
        platform: string;
        browser: string;
        is_desktop: boolean;
    };
    ip_address: string;
    real_ip: string;
    is_current_device: boolean;
    last_activity: string;
    last_active_ago: string;
    browser: string;
    browser_version: string;
    os: string;
    os_version: string;
    device_type: string;
    location: string | null;
    device_details: {
        is_mobile: boolean;
        is_tablet: boolean;
        is_desktop: boolean;
        device: string;
        languages: string[];
    };
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};

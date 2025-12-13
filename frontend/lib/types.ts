// Authentication Types
export interface RegisterData {
    email: string;
    username: string;
    password: string;
}

export interface LoginData {
    username: string;
    password: string;
}

export interface User {
    id: number;
    email: string;
    username: string;
    is_active: boolean;
    created_at: string;
}

export interface TokenResponse {
    access_token: string;
    token_type: string;
}


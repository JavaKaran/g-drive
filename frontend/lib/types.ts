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

// Folder Types
export interface Folder {
    id: string;
    user_id: string;
    name: string;
    parent_folder_id: string | null;
    path: string;
    created_at: string;
    updated_at: string;
}

// File Types
export enum FileStatus {
    UPLOADING = 'uploading',
    COMPLETED = 'completed',
    FAILED = 'failed',
    DELETED = 'deleted',
}

export interface File {
    id: string;
    user_id: string;
    name: string;
    size: number;
    mime: string | null;
    storage_key: string;
    status: FileStatus;
    folder_id: string | null;
    created_at: string;
    updated_at: string;
}


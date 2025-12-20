import { api } from '@/lib/config';
import type { Folder } from '@/lib/types';

/**
 * Folder service
 * Handles all folder-related API calls
 */
export const folderService = {
    /**
     * Get root folders (folders with no parent)
     */
    getRootFolders: async (): Promise<Folder[]> => {
        // Omit parent_folder_id parameter - FastAPI defaults to None, which returns root folders
        const response = await api.get<Folder[]>('/folders/');
        return response.data;
    },

    /**
     * Get folders by parent folder ID
     */
    getFoldersByParent: async (parentFolderId: string): Promise<Folder[]> => {
        const response = await api.get<Folder[]>('/folders/', {
            params: {
                parent_folder_id: parentFolderId,
            },
        });
        return response.data;
    },

    /**
     * Create a new folder
     */
    createFolder: async (name: string, parentFolderId?: string): Promise<Folder> => {
        const response = await api.post<Folder>('/folders/', {
            name,
            parent_folder_id: parentFolderId || null,
        });
        return response.data;
    },
};


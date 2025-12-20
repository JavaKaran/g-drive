import { api } from '@/lib/config';
import type { File } from '@/lib/types';

/**
 * File service
 * Handles all file-related API calls
 */
export const fileService = {
    /**
     * Get root files (files with no folder)
     */
    getRootFiles: async (): Promise<File[]> => {
        // Omit folder_id parameter - FastAPI defaults to None, which returns root files
        const response = await api.get<File[]>('/files/');
        return response.data;
    },

    /**
     * Get files by folder ID
     */
    getFilesByFolder: async (folderId: string): Promise<File[]> => {
        const response = await api.get<File[]>('/files/', {
            params: {
                folder_id: folderId,
            },
        });
        return response.data;
    },
};


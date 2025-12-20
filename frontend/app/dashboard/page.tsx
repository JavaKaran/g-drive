'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { authService } from '@/services/auth'
import { folderService } from '@/services/folder'
import { fileService } from '@/services/file'
import type { User, Folder, File } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LogOut, User as UserIcon, Folder as FolderIcon, File as FileIcon } from 'lucide-react'
import Cookies from 'js-cookie'
import { AxiosError } from 'axios'

export default function DashboardPage() {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const [folders, setFolders] = useState<Folder[]>([])
    const [files, setFiles] = useState<File[]>([])
    const [loading, setLoading] = useState(true)
    const [itemsLoading, setItemsLoading] = useState(true)

    useEffect(() => {
        const token = Cookies.get('access_token')
        if (!token) {
            router.push('/login')
            return
        }

        const fetchData = async () => {
            try {
                const userData = await authService.getCurrentUser()
                setUser(userData)

                // Fetch root folders and files
                const [rootFolders, rootFiles] = await Promise.all([
                    folderService.getRootFolders(),
                    fileService.getRootFiles(),
                ])
                setFolders(rootFolders)
                setFiles(rootFiles)
            } catch (error) {
                const axiosError = error as AxiosError<{ detail?: string }>
                const errorMessage = axiosError.response?.data?.detail || axiosError.message || 'Failed to load dashboard data'
                toast.error('Error', {
                    description: errorMessage,
                })
            } finally {
                setLoading(false)
                setItemsLoading(false)
            }
        }

        fetchData()
    }, [router])

    const handleLogout = async () => {
        try {
            await authService.logout()
            router.push('/login')
        } catch (error) {
            // Even if logout fails, clear token and redirect
            Cookies.remove('access_token')
            router.push('/login')
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-muted-foreground">Loading...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="border-b border-border">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">G-Drive</h1>
                    <div className="flex items-center gap-4">
                        {user && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <UserIcon className="h-4 w-4" />
                                <span>{user.username}</span>
                            </div>
                        )}
                        <Button variant="outline" onClick={handleLogout}>
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2">Welcome back, {user?.username}!</h2>
                    <p className="text-muted-foreground">
                        Manage your files and folders from here
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Files and Folders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {itemsLoading ? (
                            <div className="text-center py-8 text-muted-foreground">
                                Loading items...
                            </div>
                        ) : folders.length === 0 && files.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground">
                                No folders or files yet. Start by creating a folder or uploading a file.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {/* Folders */}
                                {folders.map((folder) => (
                                    <Card
                                        key={folder.id}
                                        className="cursor-pointer hover:bg-accent transition-colors"
                                    >
                                        <CardContent className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="rounded-lg bg-primary/10 p-2">
                                                    <FolderIcon className="h-5 w-5 text-primary" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium truncate">{folder.name}</p>
                                                    <p className="text-xs text-muted-foreground">Folder</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}

                                {/* Files */}
                                {files.map((file) => (
                                    <Card
                                        key={file.id}
                                        className="cursor-pointer hover:bg-accent transition-colors"
                                    >
                                        <CardContent className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="rounded-lg bg-secondary/10 p-2">
                                                    <FileIcon className="h-5 w-5 text-secondary-foreground" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium truncate">{file.name}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {(file.size / 1024).toFixed(2)} KB
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}


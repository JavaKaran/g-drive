'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { authService } from '@/services/auth'
import type { User } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LogOut, User as UserIcon } from 'lucide-react'
import Cookies from 'js-cookie'

export default function DashboardPage() {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = Cookies.get('access_token')
        if (!token) {
            router.push('/login')
            return
        }

        const fetchUser = async () => {
            try {
                const userData = await authService.getCurrentUser()
                setUser(userData)
            } catch (error) {
                router.push('/login')
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
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
                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-3xl">Welcome to G-Drive</CardTitle>
                        <CardDescription>
                            Your personal file storage and management system
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <p className="text-muted-foreground">
                                Hello, <span className="font-semibold text-foreground">{user?.username}</span>!
                                You've successfully logged in to your dashboard.
                            </p>
                            <div className="pt-4 border-t border-border">
                                <p className="text-sm text-muted-foreground">
                                    This is your dashboard. You can start managing your files and folders from here.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}


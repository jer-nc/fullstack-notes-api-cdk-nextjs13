'use client'
import AppLayout from '@/layouts/AppLayout'


export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <main lang="en" suppressHydrationWarning className='scroll-smooth'>
            <AppLayout>
                {children}
            </AppLayout>
        </main>
    )
}

import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const FormSkeleton = () => {
    return (
        <div className="flex items-center space-x-4 w-full">
            <div className="space-y-4 w-full">
            <Skeleton className="h-8 w-[200px]" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-12 w-full" />
            </div>
        </div>
    )
}

export default FormSkeleton
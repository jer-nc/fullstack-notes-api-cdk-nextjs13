'use client'
import React from 'react'
import { Button } from '../ui/button'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'

const GoBackButton = () => {
    const { push } = useRouter()

    const handleNavigateBack = () => {
        push('/dashboard')
    }

    return (
        <Button onClick={handleNavigateBack} size='icon' variant='outline'>
            <ArrowLeftIcon />
        </Button>
    )
}

export default GoBackButton
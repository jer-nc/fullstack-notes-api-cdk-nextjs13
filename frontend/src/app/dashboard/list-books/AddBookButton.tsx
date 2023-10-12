'use client'
import { Button } from '@/components/ui/button'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import React from 'react'

const AddBookButton = () => {
    const { push } = useRouter()

    const handleNavigate = () => {
        push('/new-book')
    }

    return (
        <Button onClick={handleNavigate} size='primary' variant='default' className='gap-2'>
            New Book
            <PlusCircledIcon />
        </Button>
    )
}

export default AddBookButton
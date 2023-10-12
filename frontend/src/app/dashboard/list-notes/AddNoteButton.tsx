'use client'
import { Button } from '@/components/ui/button'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import React from 'react'

const AddNoteButton = () => {
    const { push } = useRouter()

    const handleNavigate = () => {
        push('/new-note')
    }

    return (
        <Button onClick={handleNavigate} size='primary' variant='default' className='gap-2'>
            New Note
            <PlusCircledIcon />
        </Button>
    )
}

export default AddNoteButton
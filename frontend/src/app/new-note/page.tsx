import AppLayout from '@/layouts/AppLayout'
import React from 'react'
import NewNoteForm from './new-note-form/NewNoteForm'
import GoBackButton from '@/components/custom/GoBackButton'


const page = () => {
    return (
        <AppLayout>
            <div className='flex justify-between gap-4 items-center  pb-8'>
                <div className='flex gap-4 items-center'>
                    <GoBackButton />
                    <h1 className='text-2xl font-semibold'>New Note</h1>
                </div>
            </div>
            <NewNoteForm />
        </AppLayout>
    )
}

export default page
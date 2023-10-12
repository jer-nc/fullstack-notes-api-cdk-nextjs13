import GoBackButton from '@/components/custom/GoBackButton'
import AppLayout from '@/layouts/AppLayout'
import React from 'react'
import EditNoteForm from './edit-note/EditNoteForm'

const page = () => {

    return (
        <AppLayout>
            <div className='flex justify-between gap-4 items-center  pb-8'>
                <div className='flex gap-4 items-center'>
                    <GoBackButton />
                    <h1 className='text-2xl font-semibold'>Edit Note</h1>
                </div>
            </div>
            <EditNoteForm />
        </AppLayout>
    )
}

export default page
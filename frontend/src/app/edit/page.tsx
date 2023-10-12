import GoBackButton from '@/components/custom/GoBackButton'
import AppLayout from '@/layouts/AppLayout'
import React from 'react'
import EditBookForm from './edit-book/EditBookForm'

const page = () => {

    return (
        <AppLayout>
            <div className='flex justify-between gap-4 items-center  pb-8'>
                <div className='flex gap-4 items-center'>
                    <GoBackButton />
                    <h1 className='text-2xl font-semibold'>Edit Book</h1>
                </div>
            </div>
            <EditBookForm />
        </AppLayout>
    )
}

export default page
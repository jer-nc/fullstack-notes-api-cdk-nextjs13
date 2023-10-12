import AppLayout from '@/layouts/AppLayout'
import React from 'react'
import NewBookForm from './new-book-form/NewBookForm'
import GoBackButton from '@/components/custom/GoBackButton'


const page = () => {
    return (
        <AppLayout>
            <div className='flex justify-between gap-4 items-center  pb-8'>
                <div className='flex gap-4 items-center'>
                    <GoBackButton />
                    <h1 className='text-2xl font-semibold'>New Book</h1>
                </div>
            </div>
            <NewBookForm />
        </AppLayout>
    )
}

export default page
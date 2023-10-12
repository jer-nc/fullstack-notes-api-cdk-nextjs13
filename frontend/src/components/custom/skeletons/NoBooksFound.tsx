import { Cross1Icon } from '@radix-ui/react-icons'
import React from 'react'

const NoBooksFound = () => {
    return (
        <div className='col-span-full py-12'>
            <div className='flex justify-center items-center gap-4'>
                <p className='text-center text-lg text-muted-foreground'>
                    No books found
                </p>
                <Cross1Icon />
            </div>
        </div>
    )
}

export default NoBooksFound
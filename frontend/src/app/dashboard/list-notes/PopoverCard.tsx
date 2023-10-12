import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { DotsVerticalIcon } from '@radix-ui/react-icons'
import CardButtons from './CardButtons'
import { NoteProps } from '@/types/types'



const PopoverCard = ({ note }  : NoteProps) => {
    return (
        <Popover>
            <PopoverTrigger className='w-10 h-10 hover:bg-gray-100 rounded-md flex justify-center items-center'>
                <DotsVerticalIcon />
            </PopoverTrigger>
            <PopoverContent align='start'>
                <CardButtons note={note} />
            </PopoverContent>
        </Popover>
    )
}

export default PopoverCard
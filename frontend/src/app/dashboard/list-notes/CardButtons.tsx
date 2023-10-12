'use client'
import { Button } from '@/components/ui/button'
import { NoteProps } from '@/types/types'
import { MinusCircledIcon, Pencil2Icon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import React from 'react'
import { deleteNote } from './deleteNote'
import { useNoteStore } from '@/store/noteStore'
import { getUser } from '@/lib/getUser'
import { CognitoUserSession } from 'amazon-cognito-identity-js'

const CardButtons = ({ note }: NoteProps) => {
  const { title, NoteId } = note
  console.log(title, NoteId)
  const { push } = useRouter()
  const { notes, setNotes } = useNoteStore()

  const handleEdit = () => {
    push(`/edit?id=${NoteId}&title=${title}`)
  }


  const handleDelete = async () => {

    try {
      const { session } = await getUser() as { session: CognitoUserSession }
      const jwt = session.getIdToken().getJwtToken()

      const res = await deleteNote({ NoteId, jwt })
      if (res) {
      // console.log('success')
        const newNotes = notes.filter((note) => note.NoteId !== NoteId)
        setNotes(newNotes)
      } else {
      // console.log('error')
      }
    } catch (error) {
    // console.log(error)
    }
  }


  return (
    <div className='flex flex-col gap-2 justify-start w-full'>
      <Button onClick={handleEdit} size='primary' variant='ghost' className='w-full justify-start gap-2'>
        <Pencil2Icon />
        Edit
      </Button>
      <Button onClick={handleDelete} size='primary' variant='ghost' className='w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-destructive/10'>
        <MinusCircledIcon />
        Delete
      </Button>
    </div>
  )
}

export default CardButtons
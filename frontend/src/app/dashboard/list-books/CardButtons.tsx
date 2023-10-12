'use client'
import { Button } from '@/components/ui/button'
import { BookProps } from '@/types/types'
import { MinusCircledIcon, Pencil2Icon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import React from 'react'
import { deleteBook } from './deleteBook'
import { useBookStore } from '@/store/bookStore'
import { getUser } from '@/lib/getUser'
import { CognitoUserSession } from 'amazon-cognito-identity-js'

const CardButtons = ({ book }: BookProps) => {
  const { title, id } = book
  // console.log(title, author, description, year, id)
  const { push } = useRouter()
  const { books, setBooks } = useBookStore()

  const handleEdit = () => {
    push(`/edit?id=${id}&title=${title}`)
  }


  const handleDelete = async () => {

    try {
      const { session } = await getUser() as { session: CognitoUserSession }
      const jwt = session.getIdToken().getJwtToken()

      const res = await deleteBook({ id, jwt })
      if (res) {
      // console.log('success')
        const newBooks = books.filter((book) => book.id !== id)
        setBooks(newBooks)
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
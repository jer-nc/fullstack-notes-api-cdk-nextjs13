'use client'
import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from '@/components/ui/scroll-area'
import PopoverCard from './PopoverCard'
import AddBookButton from './AddBookButton'
import { getAllBooks } from './getAllBooks'
import { CognitoUserSession } from 'amazon-cognito-identity-js'
import { getUser } from '@/lib/getUser'
import { useBookStore } from '@/store/bookStore'
import NoBooksFound from '../../../components/custom/skeletons/NoBooksFound'
import { generateSkeletonCards } from '../../../components/custom/skeletons/genarateSkeletonCards'


const ListBooks = () => {
  const setBooks = useBookStore((state) => state.setBooks);
  const books = useBookStore((state) => state.books);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const getBooks = async () => {
        const { session } = await getUser() as { session: CognitoUserSession }

        if (session) {
          const jwt = session.getIdToken().getJwtToken()
          const books = await getAllBooks(jwt)
          if (books) {
            setBooks(books)
            setLoading(false);
          }
        }

      }

      getBooks()
    } catch (error) {
    // console.log(error)
    }
  }, [])


  return (
    <div className='py-4'>
      <div className='flex justify-between gap-4 items-center  pb-8'>
        <h1 className='text-2xl font-semibold'>Listed Books</h1>
        <AddBookButton />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>

        {
          loading ? (generateSkeletonCards(4)) : (
            <>
              {
                books.map((book, index) => (
                  <div key={index}>
                    <Card >
                      <CardHeader>
                        <div className='flex gap-2 justify-between items-center'>
                          <CardTitle>{book.title}</CardTitle>
                          <div>
                            <PopoverCard book={book} />
                          </div>
                        </div>
                        <CardDescription>{book.author}</CardDescription>
                      </CardHeader>
                      <CardContent className='p-0'>
                        <ScrollArea className="h-[200px] px-6 py-2">
                          <p>{book.description ? book.description : 'N/A'}</p>
                        </ScrollArea>
                      </CardContent>
                      <CardFooter>
                        <p>
                          <span className='text-muted-foreground'>Published:</span> {book.year ? book.year : 'N/A'}
                        </p>
                      </CardFooter>
                    </Card>
                  </div>
                ))
              }
              {
                books.length === 0 && (
                  <NoBooksFound />
                )
              }
            </>
          )
        }

      </div>

    </div >
  )
}

export default ListBooks
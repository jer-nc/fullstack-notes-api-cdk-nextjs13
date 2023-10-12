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
import AddNoteButton from './AddNoteButton'
import { getAllNotes } from './getAllNotes'
import { CognitoUserSession } from 'amazon-cognito-identity-js'
import { getUser } from '@/lib/getUser'
import { useNoteStore } from '@/store/noteStore'
import NoBooksFound from '../../../components/custom/skeletons/NoBooksFound'
import { generateSkeletonCards } from '../../../components/custom/skeletons/genarateSkeletonCards'
import { formatTimeAgo } from '@/lib/formatTimeAgo'


const ListNotes = () => {
  const setNotes = useNoteStore((state) => state.setNotes);
  const notes = useNoteStore((state) => state.notes);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const getNotes = async () => {
        const { session } = await getUser() as { session: CognitoUserSession }

        if (session) {
          const jwt = session.getIdToken().getJwtToken()
          const notes = await getAllNotes(jwt)
          if (notes) {
            setNotes(notes)
            setLoading(false);
          }
        }

      }
      
      getNotes()
    } catch (error) {
    // console.log(error)
    }
  }, [])



  return (
    <div className='py-4'>
      <div className='flex justify-between gap-4 items-center  pb-8'>
        <h1 className='text-2xl font-semibold'>Your Notes</h1>
        <AddNoteButton />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>

        {
          loading ? (generateSkeletonCards(4)) : (
            <>
              {
                notes.map((note, index) => (
                  <div key={index}>
                    <Card >
                      <CardHeader>
                        <div className='flex gap-2 justify-between items-center'>
                          <CardTitle>{note.title}</CardTitle>
                          <div>
                            <PopoverCard note={note} />
                          </div>
                        </div>
                        <CardDescription>{note.description ? note.description : 'N/A'}</CardDescription>
                      </CardHeader>
                      <CardContent className='p-0'>
                        <ScrollArea className="h-[200px] px-6 py-2">
                          <p>{note.description ? note.description : 'N/A'}</p>
                        </ScrollArea>
                      </CardContent>
                      <CardFooter>
                        <p className='text-sm'>
                          <span className='text-muted-foreground'>Last Update:</span> {note.Timestamp ? formatTimeAgo(note.Timestamp) : 'N/A'}
                        </p>
                      </CardFooter>
                    </Card>
                  </div>
                ))
              }
              {
                notes.length === 0 && (
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

export default ListNotes
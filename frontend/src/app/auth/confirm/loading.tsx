'use client'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function Loading() {

  return (
    <div className='h-[100vh] w-full flex justify-center items-center'>
      <div className='grid grid-cols-1 xl:grid-cols-2 gap-5 w-full h-full '>
        <Skeleton className='100vh w-full'>
        </Skeleton>
        <Skeleton className='m-auto min-w-[300px] w-[500px] grid gap-4'>
          <div className='flex justify-center items-center p-20 mx-4 h-[30vh]'>

          </div>
        </Skeleton>
      </div>
    </div>
  )
}

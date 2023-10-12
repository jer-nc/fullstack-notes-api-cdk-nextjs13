/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useEffect } from 'react'
import FormConfirmCode from './form-confirm-code/FormConfirmCode'
import Image from 'next/image'
import image from '../../../../public/hero-image.png'


const page = () => {


  return (
    <>
      <div>
        <div className='h-[100vh] w-full flex justify-center items-center'>
          <div className='grid grid-cols-1 xl:grid-cols-2 gap-5 w-full h-full '>
            <div className='p-12 max-w-[500px] mx-auto'>
              <Image width={100} height={100} sizes="100vw" className="h-full w-full object-contain" src={image} alt='' />
            </div>
            <div className='flex justify-center items-center p-2 md:p-20'>
              <FormConfirmCode />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default page
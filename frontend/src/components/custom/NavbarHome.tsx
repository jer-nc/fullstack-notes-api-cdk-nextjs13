'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { Button } from '../ui/button';


const NavbarHome = () => {
    const router = useRouter()

    const navigateSignIn = () => {
        router.push('/auth/sign-up')
    }

    return (
        <div className="flex w-full justify-end p-4  fixed top-0 z-50">
            <div className="flex gap-2 items-center h-10">
                <Button onClick={navigateSignIn} type="button" variant='primary' size='primary'>
                    Sign Up
                </Button>
            </div>
        </div>
    )
}

export default NavbarHome
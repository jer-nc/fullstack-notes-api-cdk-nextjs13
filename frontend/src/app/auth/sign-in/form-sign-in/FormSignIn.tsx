'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import * as z from "zod"
import { useForm } from 'react-hook-form'
import { registerSignInSchema } from '@/schemas/signin-schema'
import { EnvelopeClosedIcon, EyeClosedIcon, EyeOpenIcon, LockClosedIcon, ReloadIcon } from '@radix-ui/react-icons'
import { INITIAL_VALIDATION_ERRORS_SIGN_IN } from '@/constants/auth/auth_constants'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signInUser } from './signInUser'
import { SignInResponse } from '@/types/types'

const FormSignIn = () => {
    const [loading, setLoading] = useState(false)
    const [validationErrors, setValidationErrors] = useState(INITIAL_VALIDATION_ERRORS_SIGN_IN);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof registerSignInSchema>>({
        resolver: zodResolver(registerSignInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit() {
        setLoading(true)
        try {
            const values = form.getValues(); 
            const data = await signInUser(values) as SignInResponse;
          // console.log('data: ', data)
            
            if (data && data.idToken.jwtToken) {
                router.push('/dashboard');
            } 
        } catch (error) {
          // console.log('error', error)
            setLoading(false)
            setValidationErrors({ ...validationErrors, email: (error as Error).message })
        } finally {
            setLoading(false)
        }

    }

    return (
        <div className='min-w-[300px] w-[500px] mx-4'>
            <div className='pb-4'>
                <h1 className='text-center text-3xl text-gray-600 font-semibold'>Sign In</h1>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 p-6 z-20'>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <>
                                        <div className="relative">
                                            <Input className='py-6 bg-gray-100 pl-10' placeholder="Email" {...field} />
                                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                                <EnvelopeClosedIcon className='text-muted-foreground' />
                                            </div>

                                        </div>
                                    </>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {validationErrors.email && (
                        <div className="text-[0.8rem] font-medium text-destructive col-span-2 mt-2">
                            {validationErrors.email}
                        </div>
                    )}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <>
                                        <div className="relative">
                                            <Input className='py-6 bg-gray-100 pl-10' type={showPassword ? 'text' : 'password'} placeholder="Password" {...field} />
                                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                                <LockClosedIcon className='text-muted-foreground' />
                                            </div>
                                            <div onClick={() => setShowPassword(!showPassword)} className='cursor-pointer absolute right-5 top-1/2 transform -translate-y-1/2'>
                                                {showPassword ? <EyeOpenIcon className='text-muted-foreground' /> : <EyeClosedIcon className='text-muted-foreground' />}
                                            </div>
                                        </div>
                                    </>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {validationErrors.password && (
                        <div className="text-[0.8rem] font-medium text-destructive col-span-2 mt-2">
                            {validationErrors.password}
                        </div>
                    )}
                    <div className='pt-4 flex gap-2 items-center'>
                        <p className='text-sm text-muted-foreground'>You don&apos;t have an account yet?</p>
                        <Link href="/auth/sign-up" className='text-blue-500 font-semibold hover:underline'>Sign Up</Link>
                    </div>
                    {!loading ?
                        <Button variant='primary' size='primary' type='submit' className='py-6'>
                            Sign In
                        </Button> :
                        <Button disabled variant='primary' size='primary' type='submit' className='py-6'>
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            Signin In...
                        </Button>
                    }
                </form>
            </Form>
        </div>
    )
}

export default FormSignIn
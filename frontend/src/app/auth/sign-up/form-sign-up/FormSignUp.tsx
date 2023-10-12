'use client'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { registerSignUpSchema } from '@/schemas/signup-schema';
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import * as z from "zod"
import { useForm } from 'react-hook-form'
import { EnvelopeClosedIcon, LockClosedIcon, EyeClosedIcon, EyeOpenIcon, ReloadIcon } from '@radix-ui/react-icons';
import { INITIAL_VALIDATION_ERRORS_SIGN_UP } from '@/constants/auth/auth_constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpUser } from './signUpUser';
import { SignUpResponse } from '@/types/types';
import Cookies from 'js-cookie';

const FormSignUp = () => {
    const [loading, setLoading] = useState(false)
    const [validationErrors, setValidationErrors] = useState(INITIAL_VALIDATION_ERRORS_SIGN_UP);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    // 12345678aA@


    const form = useForm<z.infer<typeof registerSignUpSchema>>({
        resolver: zodResolver(registerSignUpSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    async function onSubmit() {
        setLoading(true)

        try {
            const values = form.getValues();
            const { password, email } = values;
          // console.log('values: ', values)
            const data = await signUpUser(values) as SignUpResponse;
          // console.log('data: ', data)
            if (data && data.userSub) {
                Cookies.set('tmp_p', password, { expires: 1 });
              // console.log(data);
                router.push(`/auth/confirm?email=${encodeURIComponent(email)}`);
            }
        } catch (error) {
          // console.log('error', error)
            setLoading(false)
            setValidationErrors({ ...validationErrors, email: (error as Error).message })

        } finally {
            setLoading(false)
        }

    };

    return (
        <div className='min-w-[300px] w-[500px] mx-4'>
            <div className='pb-4'>
                <h1 className='text-center text-3xl text-gray-600 font-semibold'>Create Account</h1>
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

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <>
                                        <div className="relative">
                                            <Input className='py-6 bg-gray-100 pl-10' type={showPassword ? 'text' : 'password'} placeholder="Confirm Password" {...field} />
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
                        <p className='text-sm text-muted-foreground'>Do you already have an account?</p>
                        <Link href='/auth/sign-in' className='text-blue-500 font-semibold hover:underline'>
                            Sign In
                        </Link>
                    </div>
                    {!loading ?
                        <Button variant='primary' size='primary' type='submit' className='py-6'>
                            Sign Up
                        </Button> :
                        <Button disabled variant='primary' size='primary' type='submit' className='py-6'>
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            Creating Account...
                        </Button>
                    }
                    <p className='text-sm text-muted-foreground'>
                        When registering an account, you agree to our Terms of Service and Privacy and Cookies Policy.
                    </p>
                </form>
            </Form>
        </div>
    );
};

export default FormSignUp;

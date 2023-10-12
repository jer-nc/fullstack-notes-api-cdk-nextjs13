'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useRef, RefObject } from 'react'
import Cookies from 'js-cookie';
import { confirmRegistration } from './confirmCode';
import { resendCode } from './resendCode';
import { SignInResponse } from '@/types/types';

const FormConfirmCode = () => {
    const params = useSearchParams()
    const email = params.get('email') || '';
    const [codes, setCodes] = useState(['', '', '', '', '', '']);
    const password = Cookies.get('tmp_p') || '';
    const inputRefs = useRef<Array<RefObject<HTMLInputElement>>>([...Array(6)].map(() => React.createRef<HTMLInputElement>()));
    const [codeResent, setCodeResent] = useState(false);
    const [loading, setLoading] = useState(false)
    const [validationErrors, setValidationErrors] = useState('');
    const router = useRouter();

  // console.log('email', email)

    const handleCodeChange = (index: number, value: string) => {
        const newCodes = [...codes];
        newCodes[index] = value;
        setCodes(newCodes);

        // Focus on next input field if character is entered
        if (value.length === 1 && index < 5) {
            const nextInputRef = inputRefs.current[index + 1];
            if (nextInputRef && nextInputRef.current) {
                nextInputRef.current.focus();
            }
        }

    };

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>, index: number) => {
        event.preventDefault();
        const pastedText = event.clipboardData.getData('text/plain');
        const pastedCodes = pastedText.split('').slice(0, 6); // Limit to only 6 characters
        const newCodes = [...codes];
        pastedCodes.forEach((char: string, i: number) => {
            if (index + i < 6) {
                newCodes[index + i] = char;
            }
        });
        setCodes(newCodes);
    };


    const handleResendCode = async () => {
        try {
            // This is the function that will resend the code to the user's email
            const data = await resendCode(email);
            // TODO - Handle error if data is null OR if data has an error message
            if (data) {
              // console.log(data);
                setCodeResent(true);
            }
        } catch (error) {
          // console.log('error', error);
        }
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const code = codes.join('');

        // Create a new CognitoUser with the email entered by the user 
        const values = {
            email: email,
            password: password,
            code: code
        };

        try {
            // This is the function that will confirm the user's email
            const data = await confirmRegistration(values) as SignInResponse;

            // If the user is confirmed, we can log them in 
            if (data && data.idToken.jwtToken) {
                Cookies.remove('tmp_p');
              // console.log('data from confirm form', data);
                router.push(`/dashboard`);
                setLoading(false);
            }
        }
        catch (error) {
            // We can't use the error message returned from AWS Cognito because it's not user friendly 
            console.error('Error en onSubmit:', error);
            setValidationErrors('Invalid code entered.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className='w-[500px] min-w-[300px] mx-4'>
            <div>
                <form onSubmit={onSubmit}>
                    <div className='pb-8'>
                        <Label htmlFor="code" className='text-center text-3xl text-gray-600 font-semibold'>Verification code</Label>
                        <p className='text-muted-foreground text-sm'>Please enter the verification code sent to your email</p>
                    </div>
                    <div className='flex gap-2 pb-4 justify-center'>
                        {codes.map((code, index) => (
                            <Input
                                key={index}
                                type="text"
                                value={code}
                                placeholder='-'
                                onPaste={(e) => handlePaste(e, index)}
                                onChange={(e) => handleCodeChange(index, e.target.value)}
                                className="border text-lg bg-gray-100 text-muted-foreground sm:pl-[21px] rounded-md w-9 h-9 sm:w-14 sm:h-14 focus:outline-none focus:border-blue-500"
                                maxLength={1}
                                ref={inputRefs.current[index]}
                            />
                        ))}
                    </div>
                    <div>
                        {!codeResent ? (
                            <div className='pt-4 flex gap-2 items-center'>
                                <p className='text-sm text-muted-foreground'>
                                    Have you not received the email?{' '}
                                </p>
                                <Button
                                    variant='link'
                                    className='text-blue-500 font-semibold p-0'
                                    onClick={handleResendCode}
                                    type='button'
                                >
                                    Resend code
                                </Button>
                            </div>
                        ) : (
                            <p className='text-sm text-muted-foreground'>
                                Code resent. Please check your email.
                            </p>
                        )}
                        {
                            validationErrors && (
                                <div className="text-[0.8rem] font-medium text-destructive col-span-2 mt-2">
                                    {validationErrors}
                                </div>
                            )
                        }
                        {
                            loading ? (
                                <Button disabled type="submit" variant='primary' size='primary' className='py-6 mt-4'>Verifying</Button>
                            ) : (
                                <Button type="submit" variant='primary' size='primary' className='py-6 mt-4'>Confirm code</Button>
                            )
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormConfirmCode
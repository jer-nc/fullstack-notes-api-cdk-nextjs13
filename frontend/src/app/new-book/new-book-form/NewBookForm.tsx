'use client'

import { newBookSchema } from "@/schemas/new-book-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import * as z from "zod"
import { useForm } from 'react-hook-form'
import { Input } from "@/components/ui/input"
import { BookmarkIcon, FileTextIcon, LapTimerIcon, PersonIcon, TextIcon } from "@radix-ui/react-icons"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { createBook } from "./createBook"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { getUser } from "@/lib/getUser"
import { CognitoUserSession } from "amazon-cognito-identity-js"

const NewBookForm = () => {
  const [loading, setLoading] = useState(false)
  const { push } = useRouter()
  const form = useForm<z.infer<typeof newBookSchema>>({
    resolver: zodResolver(newBookSchema),
    defaultValues: {
      title: "",
      author: "",
      description: "",
      year: ""
    },
  })


  async function onSubmit() {
    const { title, author, description, year } = form.getValues()

    try {
      setLoading(true)
      // const book = { title, author }ç
      const { session } = await getUser() as { session: CognitoUserSession }

      if (session) {
        const jwt = session.getIdToken().getJwtToken()
        const res = await createBook({ title, author, description, year, jwt }) as any

      // console.log(res)
        if (res?.ok) {
        // console.log('success')
          push('/dashboard')
        } else {
        // console.log('error')
        }
      }

    } catch (error) {
    // console.log(error)
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className='py-4'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4  z-20'>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <>
                    <div className="relative">
                      <Input disabled={loading} className='py-6 bg-gray-100 pl-10' placeholder="Book Title" {...field} />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <TextIcon className='text-muted-foreground' />
                      </div>

                    </div>
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <>
                    <div className="relative">
                      <Input disabled={loading} className='py-6 bg-gray-100 pl-10' type='text' placeholder="Author" {...field} />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <PersonIcon className='text-muted-foreground' />
                      </div>

                    </div>
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <>
                    <div className="relative">
                      <Textarea disabled={loading} className='pt-5 bg-gray-100 pl-10 min-h-[200px]' placeholder="Description" {...field} />
                      <div className="absolute left-3 top-8 transform -translate-y-1/2">
                        <FileTextIcon className='text-muted-foreground' />
                      </div>

                    </div>
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <>
                    <div className="relative">
                      <Input disabled={loading} className='py-6 bg-gray-100 pl-10' type='number' placeholder="Year" {...field} />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <LapTimerIcon className='text-muted-foreground' />
                      </div>

                    </div>
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full flex justify-end pt-4">
            {
              loading ?
                <Button size='lg' className='gap-2' disabled>
                  Saving...
                </Button>
                :
                <Button size='lg' className='gap-2' type='submit'>
                  Save
                  <BookmarkIcon />
                </Button>
            }
          </div>

        </form>
      </Form>


    </div>
  )
}

export default NewBookForm
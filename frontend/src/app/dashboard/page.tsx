import React from 'react'
import ListBooks from './list-books/ListBooks'

const page = () => {
  return (
    <div>
      {/* <h1 className='text-2xl font-semibold'>Dashboard</h1>
      <p className='mt-2'>
        This is a dashboard page. You can only see this if you are logged in. If you are not logged in, you will be redirected to the login page.
      </p> */}
      <ListBooks />
    </div>
  )
}

export default page
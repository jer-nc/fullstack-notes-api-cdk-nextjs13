import React from 'react'
import ListNotes from './list-notes/ListNotes'

const page = () => {
  return (
    <div>
      {/* <h1 className='text-2xl font-semibold'>Dashboard</h1>
      <p className='mt-2'>
        This is a dashboard page. You can only see this if you are logged in. If you are not logged in, you will be redirected to the login page.
      </p> */}
      <ListNotes />
    </div>
  )
}

export default page
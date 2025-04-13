import React from 'react'
import UserMenu from '../component/UserMenu'
import { Outlet } from 'react-router-dom'
// import { useSelector } from 'react-redux'

export const Dashboard = () => {

  // const user = useSelector((state) => state.user);

  return (
    <section className='bg-white'>
      <div className='container mx-auto p-1 grid lg:grid-cols-[250px,1fr]'>
        <div className='py-4 sticky top-24 max-h-[calc(100vh-96px)] overflow-y-auto hidden lg:block border-r '>
          <UserMenu/>
        </div>
        <div className='bg-white min-h-[75vh] p-2'>
          <Outlet/>
        </div>
      </div>
    </section>
  )
}

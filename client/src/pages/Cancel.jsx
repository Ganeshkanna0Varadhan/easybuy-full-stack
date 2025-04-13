import React from 'react'
import { GiCancel } from 'react-icons/gi'
import { HiHome } from 'react-icons/hi'
import { Link } from 'react-router-dom'

const Cancel = () => {
  return (
    <section className="m-2 w-full h-[75vh] bg-red-200 p-4 py-5 rounded mx-auto flex flex-col justify-center items-center gap-2" >
      <div className="text-red-800 font-bold text-lg">
        <GiCancel size={100}  className='flex items-center justify-between'/>
      </div>
      <p className="text-red-800 font-bold text-lg  animate-wiggle text-center">Order Cancelled</p>
      <Link to="/" className="border border-red-900 text-red-900 hover:bg-red-900 hover:text-white flex gap-1 items-center transition-all px-2 rounded py-1"><HiHome size={18}/> Home </Link>

    </section>
  )
}

export default Cancel
import React from 'react'
import { GiCancel } from 'react-icons/gi'
import { HiHome } from 'react-icons/hi'
import { Link } from 'react-router-dom'

const Cancel = () => {
  return (
    <section className="w-full h-[75vh] flex items-center justify-center bg-red-50">
      <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center gap-4 max-w-md w-full">
        <div className="bg-red-100 p-4 rounded-full">
          <GiCancel size={50} className="text-red-600" />
        </div>
        <h2 className="text-xl font-semibold text-red-700">Order Cancelled</h2>
        <p className="text-sm text-gray-700 text-center">
          Your order could not be completed. If this was a mistake, please try again.
        </p>
        <Link
          to="/"
          className="mt-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded transition"
        >
          Return Home
        </Link>
      </div>
    </section>
  )
}

export default Cancel
import React from 'react'

const CardLoading = () => {
  return (
    <div className='border p-4 grid gap-3 min-w-32 lg:min-w-52 rounded animate-pulse'>
        <div className='min-h-24 lg:min-h-20 bg-blue-200 rounded'>
        </div>
        <div className='p-2 lg:p-3 bg-blue-200 rounded w-20'>
        </div>
        <div className='p-2 lg:p-3 bg-blue-200 rounded'>
        </div>
        <div className='p-2 lg:p-3 bg-blue-200 rounded w-14'>
        </div>

        <div className='flex items-center justify-between gap-3'>
            <div className='p-2 lg:p-3 bg-blue-200 rounded w-20'>
            </div>
            <div className='p-2 lg:p-3 bg-blue-200 rounded w-20'>
            </div>
        </div>

    </div>
  )
}

export default CardLoading
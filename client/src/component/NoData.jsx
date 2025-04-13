import React from 'react'
import noDataImage from "../assets/nothing here yet.webp"

export const NoData = () => {
  return (
    <div className='flex flex-col items-center justify-center mx-auto py-20'>
        <img 
            src={noDataImage}
            alt='no data'
            className='w-36'
        />
        <p className='text-neutral-500'>No Data</p>
    </div>
  )
}

export default NoData;

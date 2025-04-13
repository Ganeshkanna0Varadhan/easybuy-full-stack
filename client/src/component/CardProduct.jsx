import React, { useState } from 'react'
import { displayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { Link } from 'react-router-dom'
import validURLConvert from '../utils/validURLConvert'
import priceWithDiscount from '../utils/PriceWithDiscount'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import { SummaryApi } from '../common/summaryApi'
import toast from 'react-hot-toast'
import AddCartToButton from './AddCartToButton'

const CardProduct = ({ data,  }) => {
    const url = `/product/${validURLConvert(data?.name)}-${data?._id}`;
    
    return (
    <Link to={url} className='border py-2 lg:p-4 grid gap-1 lg:gap-2 min-w-36 lg:min-w-52 rounded bg-white'>
        <div className='min-h-20 w-full max-h-24 lg:max-h-32 rounded overflow-hidden'>
            <img 
                src={data?.image[0]}
                className='h-full w-full object-scale-down  lg:scale-125' 
            />
        </div>
        <div className='p-[1px] text-xs ml-2 px-1 rounded w-fit text-green-600 bg-green-100'>
            10 min
        </div>
        <div className='px-2 lg:px-0 font-medium text-sm lg:text-base text-ellipsis line-clamp-2'>
            {data?.name}
        </div>
        <div className='w-fit px-2 lg:px-0 text-sm lg:text-base'>
            {data?.unit}
        </div>

        <div className='px-2 lg:px-0 flex items-center justify-between gap-3 text-sm lg:text-base'>
            <div className='flex flex-col items-center gap-1'>
                <div className='font-semibold'>
                    {displayPriceInRupees(priceWithDiscount(data?.price, data?.discount))}
                </div>
                {
                    Number(data?.discount) ? (
                        <p className='font-medium text-sm line-through text-neutral-500'>
                            {displayPriceInRupees(data?.price)}
                        </p>
                    ) : ("")
                }
            </div>
            <div className=''>
                {
                    data?.stock == 0 ? (
                        <p className='text-sm text-red-500 font-medium text-center'>Out of stock</p>
                    ) : (
                        <AddCartToButton data={data}/>
                    )
                }
            </div>
        </div>

    </Link>
  )
}

export default CardProduct
import React from 'react'
import { useSelector } from 'react-redux'
import NoData from '../component/NoData';
import { displayPriceInRupees } from '../utils/DisplayPriceInRupees';
import { AiTwotoneCheckCircle } from 'react-icons/ai';
import { IoIosCheckmarkCircle } from 'react-icons/io';

const MyOrders = () => {
  const orders = useSelector(state => state.orders.order);
  return (
    <div>
      <div className='bg-white shadow-md p-3 font-semibold'>
        <h1>Order History</h1>
      </div>
      {
        !orders[0] && (
          <NoData/>
        )
      }
      <div className='grid gap-3'>
        {
          orders[0] && orders.map((order, index) => {
            return (
              <div className='order grid gap-2 bg-blue-50 text-sm rounded p-4 ' key={order._id+"order"+index}>
                <p className='font-semibold'>Order No: {order.orderId}</p>
                <div className='flex gap-3'>
                  <img 
                    src={order.product_details.image[0]}
                    className='w-14 h-14'
                  />
                  <div>
                    <p className='font-medium'>{order.product_details.name}</p>
                    <p className='text-neutral-500'>{displayPriceInRupees(order.subTotalAmt)}</p>
                    <p className='flex gap-2'> <span className='text-green-700'> <IoIosCheckmarkCircle size={18}/> </span> <span>Delivered At</span> {new Date(order.createdAt).toDateString()}</p>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default MyOrders
import React, { useState } from 'react'
import { displayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { useGlobalContext } from '../provider/GlobalProvider'
import AddAddress from '../component/AddAddress';
import { useSelector } from 'react-redux';
import { IoExit } from 'react-icons/io5';
import { BiEdit } from 'react-icons/bi';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import { SummaryApi } from '../common/summaryApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const CheckoutPage = () => {
  const {totalPrice, noDiscountTotalPrice , totalQty, fetchCartItem, fetchOrder } = useGlobalContext();
  const [openAddress, setOpenAddress] = useState(false)
  const addressList = useSelector(state => state.addresses.addressList);
  const [selectAddress, setSelectedAddress] = useState(0);
  const cartItemsList = useSelector((state) => state.cartItem.cart);
  const navigate = useNavigate();
  const handleCashOnDelivery = async () => {
    try {

      if (!addressList[selectAddress]) {
        toast.error("Proceed with Delivery Address")
        return;
      }

      const response = await Axios({
        ...SummaryApi.cashOnDeliveryOrder,
        data: {
          list_items: cartItemsList,
          addressId: addressList[selectAddress]?._id,
          subTotalAmt: totalPrice,
          totalAmt: totalPrice
        }
      });

      const {data: responseData} = response;
      if (responseData.success) {
        toast.success(responseData.message);
        if (fetchCartItem)
          fetchCartItem();
        if (fetchOrder) 
          fetchOrder();
        navigate('/success', { state: { text: "Order"}});
      }
    }
    catch(err) {
      AxiosToastError(err);
    }
  }


  const handleOnlinePayment = async () => {
    try {

      if (!addressList[selectAddress]) {
        toast.error("Proceed with Delivery Address")
        return;
      }

      toast.loading('Loading...');
      const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
      const stripePromise = await loadStripe(stripePublicKey)
      const response = await Axios({
        ...SummaryApi.paymentCheckout,
        data: {
          list_items: cartItemsList,
          addressId: addressList[selectAddress]?._id,
          subTotalAmt: totalPrice,
          totalAmt: totalPrice
        }
      });

      const { data: responseData} = response;

      stripePromise.redirectToCheckout({ sessionId: responseData.id})
      
      if (fetchCartItem) {
        fetchCartItem();
      }
      if (fetchOrder) {
        fetchOrder();
      }
    
    }
    catch(err) {
      AxiosToastError(err);
    }
  }

  return (
    <section className='bg-blue-50'>
      <div className='p-4 flex flex-col lg:flex-row w-full gap-5 justify-between'>
          <div className='w-full'>
            {/* adddress */}
            <div className='bg-white p-2 grid gap-5 rounded'>
              <h3 className='text-lg text-primary-200  font-semibold'>Choose Delivery Address</h3>
              {
                addressList[0] && (
                  addressList.map((address, index) => {
                    return (
                      <label key={"address_list_checkout_"+index} htmlFor={"address"+index} className={`hover: cursor-pointer ${!address?.status && "hidden"}`}>
                        <div className={`border-2 border-blue-200 flex items-start justify-between gap-2 rounded p-2 ${selectAddress == index ? "bg-blue-100" : ""} `} >
                          <div className='flex items-start gap-2'>
                            <div>
                              <input id={"address"+index} value={index} defaultChecked={selectAddress == index} onChange={(e) => setSelectedAddress(e.target.value)} className='size-3' type='radio'  name='address' />
                            </div>
                            <div className='grid gap-1'>
                              <p className='font-semibold'>{address.name} - {address.mobile}</p>
                              <p>{address.address_line}</p>
                              <p>{address.city}</p>
                              <p>{address.state}</p>
                              <p>{address.country} - <span className='font-semibold'>{address.pincode}</span></p>
                            </div>
                          </div>
                          {/* <div>
                            <button>
                              <BiEdit size={20}/>
                            </button>
                          </div> */}
                        </div>
                      </label>
                    )
                  })
                )
              }

              <div onClick={() => setOpenAddress(true)} className='py-2 text-neutral-700 bg-primary-100  font-semibold border rounded flex justify-center hover:bg-primary-200 hover:text-blue-50 items-center cursor-pointer'>
                Add address
              </div>
            </div>
            

          </div>
          <div className='w-full max-w-md rounded bg-white py-4 px-2'>
            {/* summary */}
            <h3 className='text-lg font-semibold text-primary-200'>Summary</h3>
            <div className='bg-white grid gap-2 p-4'>
              <h3 className='font-semibold'>Bill details</h3>
              <div className='flex gap-4 justify-between ml-1'>
                  <p>Items total</p>
                  <p className='flex items-center gap-2'>
                      <span className='line-through text-neutral-400'>{displayPriceInRupees(noDiscountTotalPrice)}</span>
                      <span>{displayPriceInRupees(totalPrice)}</span>
                  </p>
              </div>
              <div className='flex gap-4 justify-between m-1'>
                  <p>Total Qty</p>
                  <p className='flex items-center gap-2'>
                      {totalQty} items
                  </p>
              </div>
              <div className='flex gap-4 justify-between m-1'>
                  <p>Deliver Charge</p>
                  <p className='flex items-center gap-2'>
                      Free
                  </p>
              </div>
              <div className='font-semibold flex items-center justify-between'>
                  <p>Grand total</p>
                  <p>{displayPriceInRupees(totalPrice)}</p>
              </div>

            </div>
            <div className='w-full flex flex-col gap-4'>
              <button onClick={handleOnlinePayment} className='py-2 px-4 bg-green-700 hover:bg-green-800 text-white font-semibold rounded'>
                Online Payment
              </button>
              <button onClick={handleCashOnDelivery} className='py-2 px-4 border-2 text-green-700 border-green-700 hover:bg-green-700 hover:text-white font-semibold rounded'>
                Cash on Delivery
              </button>
            </div>
          </div>
      </div>


      {
        openAddress && (
          <AddAddress close={() => setOpenAddress(false)}/>
        )
      }
    </section>
  )
}

export default CheckoutPage
import React from 'react'
import { IoClose } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../provider/GlobalProvider'
import { displayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { FaCaretRight } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import AddCartToButton from './AddCartToButton'
import priceWithDiscount from '../utils/PriceWithDiscount'
import imageEmpty from '../assets/empty cart.png'
import toast from 'react-hot-toast'

const DisplayCartItem = ({ close }) => {
    const { noDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext();
    const cartItem = useSelector(state => state.cartItem.cart);
    const user = useSelector(state => state.user);
    const navigate = useNavigate();

    const redirectToCheckoutPage = () => {
        if (user?._id) {
            if (close) {
                close();
            }
            navigate('/checkout');
            return;
        } 
        toast("Please Login")
    }
    
    return (
        <section className='bg-neutral-900 fixed top-0 bottom-0 right-0 left-0 bg-opacity-70 z-50'>
            <div className='bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto'>
                <div className='flex items-center p-4 shadow-md gap-2 justify-between rounded'>
                    <h2 className='font-semibold'>Cart</h2>
                    <Link to={"/"} className='lg:hidden'>
                        <IoClose size={25}/>
                    </Link>
                    <button onClick={close} className='hidden lg:block'>
                        <IoClose size={25}/>
                    </button>
                </div>
                <div className='min-h-[75vh] lg:min-h-[80vh] h-full max-h-[calc(100vh-120px)] bg-blue-50 p-2 flex flex-col gap-4'>
                    {/* display Items */}
                    {
                       cartItem[0] ? (
                        <>
                            <div className='flex justify-between items-center px-4 py-2 bg-blue-200 text-blue-500 rounded-full '>
                                <p>Your total Savings</p>
                                <p className='font-semibold'>{displayPriceInRupees(noDiscountTotalPrice - totalPrice)}</p>
                            </div>
                            <div className='bg-white rounded-lg p-2 grid gap-5 overflow-auto'>
                                {
                                    cartItem[0] && (
                                        cartItem.map((item, index) => {
                                            return (
                                                <div key={"cart_item_display_"+index} className='flex w-full gap-4'>
                                                    <div className='w-16 h-16 min-w-16 min-h-16 bg-red-500 border rounded'>
                                                        <img 
                                                            src={item?.productId?.image[0]}
                                                        />
                                                    </div>
                                                    <div className='w-full max-w-sm text-xs'>
                                                        <p className='text-xs text-ellipsis line-clamp-2'>{item?.productId?.name}</p>
                                                        <p className='text-neutral-400'>{item?.productId?.unit}</p>
                                                        <p className='font-semibold'>{displayPriceInRupees(priceWithDiscount(item?.productId?.price, item?.productId?.discount))}</p>
                                                    </div>
                                                    <div>
                                                        <AddCartToButton data={item?.productId}/>
                                                    </div>

                                                </div>
                                            )
                                        })
                                    )
                                }
                            </div>
                            <div className='bg-white p-4'>
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
                        </>
                       ) : (
                        <div className='bg-white flex flex-col justify-center items-center'>
                            <img 
                                src={imageEmpty}
                                className='w-full bg-white h-full object-scale-down '
                            />
                            <Link onClick={close} to={"/"} className='block bg-green-600 px-4 my-2 py-2 text-white rounded'>
                                Shop Now
                            </Link>
                        </div>
                       )
                    }
                </div>

                {
                    cartItem[0] && (
                        <div className='p-2'>
                            <div className='bg-green-700 text-neutral-100 px-4 font-bold text-base py-4 sticky bottom-3 rounded flex 
                                items-center justify-between'>
                                <div>
                                    {displayPriceInRupees(totalPrice)}
                                </div>
                                <button onClick={redirectToCheckoutPage} className='flex items-center ga-1 '>
                                    Procced
                                    <span><FaCaretRight/></span>
                                </button>
                            </div>
                        </div>
                    )
                }


            </div>
        </section>
    )
}

export default DisplayCartItem
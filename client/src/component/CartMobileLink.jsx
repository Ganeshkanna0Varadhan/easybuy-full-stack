import React from 'react'
import { useGlobalContext } from '../provider/GlobalProvider';
import { FaCaretRight, FaCartShopping } from 'react-icons/fa6';
import { displayPriceInRupees } from '../utils/DisplayPriceInRupees';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const CartMobileLink = () => {
    const {totalPrice, totalQty} = useGlobalContext();
    const cartItem = useSelector(state => state.cartItem.cart);
    return (
        <>
            {
                cartItem[0] && (
                    <div className='p-2 sticky bottom-9 z-50'>
                        <div className='bg-green-700 px-2 py-1 rounded text-neutral-100 text-sm flex items-center justify-between gap-3 lg:hidden'>
                            <div className='flex items-center gap-2'>
                                <div className='p-2 bg-green-600 rounded w-fit' >
                                    <FaCartShopping/>
                                </div>
                                <div className='text-xs'>
                                    <p>{totalQty} items</p>
                                    <p>{displayPriceInRupees(totalPrice)}</p>
                                </div>
                            </div>
                            <Link to={"/cart"} className='flex items-center gap-1'>
                                <span className='text-sm'>View Cart</span>
                                <FaCaretRight/>  
                            </Link>
                        </div>
                    </div>
                )
            }
        </>

    )
}

export default CartMobileLink
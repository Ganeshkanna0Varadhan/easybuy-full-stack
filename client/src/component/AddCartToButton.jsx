import React, { useEffect, useState } from 'react'
import AxiosToastError from '../utils/AxiosToastError';
import { useGlobalContext } from '../provider/GlobalProvider';
import Axios from '../utils/Axios';
import { SummaryApi } from '../common/summaryApi';
import toast from 'react-hot-toast';
import Loading from './Loading';
import { useSelector } from 'react-redux';
import { FaMinus, FaPlus } from 'react-icons/fa6';

const AddCartToButton = ({ data }) => {
    const { fetchCartItem, updateCartItem, deleteCartItem } = useGlobalContext();
    const [loading, setLoading] = useState(false);
    const cartItem = useSelector(state => state.cartItem.cart );
    const [isAvailableCart, setIsAvailableCart] = useState(false);
    const [qty, setQty] = useState(1);
    const [cartItemDetails, setCartItemDetails] = useState({});
    const user = useSelector(state => state.user);

    const handleAddToCart = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user || !user._id) {
            toast.error("Please proceed with after login");
            return;
        }   

        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.addToCart,
                data: {
                    productId: data?._id
                }
            })

            const {data: responseData} = response;

            if (responseData.success) {
                toast.success(responseData.message);
                if (fetchCartItem) {
                    fetchCartItem();
                }
            }
        }
        catch(err) {
            AxiosToastError(err);
        } finally {
            setLoading(false);
        }
    }
  
    useEffect(() => {
        const checkingItem = cartItem.some(item => item.productId._id === data?._id );
        setIsAvailableCart(checkingItem);

        const product = cartItem.find(item => item.productId._id === data._id);
        setCartItemDetails(product);
        setQty(product?.quantity);

    }, [data, cartItem]);


    const increseQty = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const response = await updateCartItem(cartItemDetails?._id, qty+1);
        if (response.success) {
            toast.success("Item added");
        }
    }

    const decreaseQty = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (qty === 1) {
            if (deleteCartItem) {
                deleteCartItem(cartItemDetails._id);
            }
        } else {
           const response = await updateCartItem(cartItemDetails?._id, qty-1)
            if (response.success) {
                toast.success("Item removed");
            }
        }
    }

    return (
        <div className='w-full max-w-[150px]'>
            {
                isAvailableCart ? (
                    <div className='flex w-full h-full'>
                        <button className='bg-green-600 hover:bg-green-700 flex items-center justify-center  text-white flex-1 w-full p-1 rounded' onClick={decreaseQty}> <FaMinus/></button>
                        <p className='flex-1 w-full font-semibold px-1 flex items-center justify-center'>{qty}</p>
                        <button className='bg-green-600 hover:bg-green-700 flex items-center justify-center  text-white flex-1 w-full p-1 rounded' onClick={increseQty}><FaPlus/></button>
                    </div>
                ) : (
                    <button onClick={handleAddToCart} className='bg-green-700  hover:bg-green-900 text-white px-2 lg:px-4 py-1 rounded '>
                        { loading ? <Loading/> : "Add" }   
                    </button>
                )
            }

        </div>
    )
}

export default AddCartToButton
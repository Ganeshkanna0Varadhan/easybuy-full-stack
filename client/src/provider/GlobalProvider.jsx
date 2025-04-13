import { createContext, useContext, useEffect, useState } from "react";
import Axios from "../utils/Axios";
import { SummaryApi } from "../common/summaryApi";
import { addItemCart } from "../store/cart";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import priceWithDiscount from "../utils/PriceWithDiscount";
import { addAddress } from "../store/address";
import { setOrder } from "../store/order";

export const GlobalContext = createContext(null);

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({children}) => {
    
    const dispatch = useDispatch();
    const [totalPrice, setTotalPrice] = useState(0);
    const [noDiscountTotalPrice, setNoDiscountTotalPrice] = useState(0);
    const [totalQty, setTotalQty] = useState(0); 
    const cartItem = useSelector((state) => state.cartItem.cart);
    const user = useSelector(state => state.user);

    const fetchAddress = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.getAddress
            })

            const {data: responseData} = response;

            if (responseData.success) {
              dispatch(addAddress(responseData.data))
            }
        }
        catch(err) {
            AxiosToastError(err);
        }
    }

    const fetchCartItem = async () => {
      try {
        const response = await Axios({
          ...SummaryApi.getCartItem,
        });

        const {data: responseData } = response;

        if (responseData.success) {
          dispatch(addItemCart(responseData.data))
        }
      }
      catch(err) {
        console.log(err);
      }
    }

    const fetchOrder = async () => {
      try {
        const response = await Axios({
          ...SummaryApi.getOrderItems
        });

        const { data: responseData } = response;

        if (responseData.success) {
          dispatch(setOrder(responseData.data));
        }
      }
      catch(err) {
        AxiosToastError(err);
      }
    }

    const updateCartItem = async (id, qty) => {
      try {
        const response = await Axios({
            ...SummaryApi.updateCartItem,
            data: {
                _id: id,
                qty
            }
        })

        const {data: responseData} = response;

        if (responseData.success) {
            // toast.success(responseData.message);
          if (fetchCartItem) {
              fetchCartItem();
          }
          return responseData
        }
      }
      catch(err) {
        AxiosToastError(err);
        return err;
      }
    }

    const deleteCartItem = async (cartId) => {
      try {
        const response = await Axios({
          ...SummaryApi.deleteCartItem,
          data: {
            _id: cartId
          }
        });

        const {data: responseData} = response;

        if (responseData.success) {
          toast.success(responseData.message);
          fetchCartItem();
        }
      }
      catch(err) {
        AxiosToastError(err);
      }
    }

    const handleLogout = () => {
      localStorage.clear();
      dispatch(addItemCart([]));
    }

    useEffect(() => {
      if (user && user?._id) {
        fetchCartItem();
        handleLogout();
        fetchAddress();
        fetchOrder();
      }
    }, [user?._id])

    
    useEffect(() => {
      const qty = cartItem.reduce((prev, curr) => {
          return prev + curr.quantity;
      }, 0);
      setTotalQty(qty);

      const price = cartItem.reduce((prev, curr) => { 
        const priceWithDis = priceWithDiscount(curr?.productId?.price, curr?.productId?.discount);
        return prev + (priceWithDis * curr?.quantity)
      }, 0);

      setTotalPrice(price);

      const noDiscountPrice = cartItem.reduce((prev, curr) => { 
        return prev + (curr?.productId?.price * curr?.quantity)
      }, 0);

      setNoDiscountTotalPrice(noDiscountPrice);
    }, [cartItem]);
  
    
    return (
        <GlobalContext.Provider 
          value={{
            fetchCartItem,
            fetchAddress, 
            updateCartItem, 
            deleteCartItem,
            totalPrice,
            totalQty,
            noDiscountTotalPrice,
            fetchOrder
          }}>
          {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider
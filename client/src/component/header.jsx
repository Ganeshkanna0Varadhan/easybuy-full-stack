import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import Search from "./search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserLarge } from "react-icons/fa6";
import useMobile from "../hooks/useMobile";
import { BsCart4 } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import { useSelector } from "react-redux";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import UserMenu from "./UserMenu";
import { displayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { useGlobalContext } from "../provider/GlobalProvider";
import DisplayCartItem from "./DisplayCartItem";

const Header = () => {
    const isMobile  = useMobile();
    const location = useLocation();
    const navigate = useNavigate();

    const user = useSelector((state) => state?.user);

    const isSearchPage = location.pathname === '/search';
    const [openUserMenu, setOpenUserMenu] = useState(false);
    const cartItem = useSelector((state) => state.cartItem.cart);
    // const [totalPrice, setTotalPrice] = useState(0);
    // const [totalQty, setTotalQty] = useState(0); 
    const {totalPrice, totalQty} = useGlobalContext();
    const [openCartSection, setOpenCartSection] = useState(false);

    const redirectToLoginPage = () => {
        navigate("login");
    }

    const handleCloseUserMenu = () => {
        setOpenUserMenu(false);
    }

    const handleMobileUser = () => {
        if (!user._id) {
            navigate('/login');
            return
        }

        navigate('/user');
    }

    // useEffect(() => {
    //     const qty = cartItem.reduce((prev, curr) => {
    //         return prev + curr.quantity;
    //     }, 0);
    //     setTotalQty(qty);

    //     const price = cartItem.reduce((prev, curr) => { 
    //         return prev + (curr.productId.price * curr.quantity)
    //     }, 0);

    //     setTotalPrice(price);
    // }, [cartItem]);

    return (
        <header className="h-24 lg:h-13 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-2 bg-white" >

            {
                !(isSearchPage && isMobile) && (
                    <div className="container lg:max-w-full  flex items-center px-2 mx-auto justify-between">
                        {/* logo */}
                        <div className="h-full">
                            <Link to={"/"} className="h-full flex justify-center items-center ">
                                <img src={logo} height={50} width={170} alt="logo" className="hidden lg:block" />
                                <img src={logo} height={50} width={130} alt="logo" className="lg:hidden" />
                            </Link> 
                        </div>
                        {/* search */}
                        <div className="hidden lg:block">
                            <Search/>
                        </div>
                        {/* login and my cart */}
                        <div className="h-full">
                            {/* User icon display in mobile version */}
                            <button onClick={handleMobileUser} className="text-neutral-600 lg:hidden h-full flex items-end">
                                <FaUserLarge size={26}/>
                            </button>
                            {/* Desktop */}
                            <div className="hidden lg:flex items-center gap-5">
                                {
                                    user?._id ? (
                                        <div className="relative">
                                            <div onClick={() => setOpenUserMenu((prev) => !prev)} className="text-lg flex items-center gap-2 px-2.5 py-2 border group hover:border-blue-900 border-blue-700 rounded">
                                                <BiUser className="text-blue-700 group-hover:text-blue-900" size={20}/>
                                                <p className="text-blue-700 group-hover:text-blue-900 text-lg ">Account</p>
                                                {/* <GoTriangleUp className="text-blue-700 group-hover:text-blue-900 font-semibold" size={26}/> */}
                                            </div>
                                            {
                                                openUserMenu && (
                                                    <div className="absolute right-0 top-16">
                                                        <div className="bg-white rounded p-4 min-w-52 lg: shadow-lg">
                                                            <UserMenu close={handleCloseUserMenu}/>
                                                        </div>
    
                                                    </div>
                                                )
                                            }

                                        </div>
                                    ) : (
                                        <button onClick={redirectToLoginPage} className="text-lg flex gap-2 items-center px-2.5 py-2.5 border-2 group hover:border-blue-900 border-blue-700 rounded"> 
                                            <BiUser className="text-blue-700 group-hover:text-blue-900" size={26}/>
                                            <p className="px-2 text-blue-700 group-hover:text-blue-900 text-lg">Login</p>
                                        </button>
                                    ) 

                                }
                                

                                <button onClick={() =>setOpenCartSection(true)} className="flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-2 rounded text-white">
                                    <div className="animate-bounce">
                                    <BsCart4 size={26}/>
                                    </div>
                                    <div className="font-semibold text-sm">
                                        {
                                            cartItem[0] ? (
                                                <div>
                                                    <p>{totalQty} Items</p>
                                                    <p>{displayPriceInRupees(totalPrice)}</p>
                                                </div>
                                            ): (
                                                <p>My Cart</p>
                                            )
                                        }
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div> 
                )
            }
            
            <div className="container mx-auto px-2 lg:hidden">
                <Search/>    
            </div>

            {
                openCartSection && (
                    <DisplayCartItem close={() => setOpenCartSection(false)}/>
                )
            }


        </header>
    )
}

export default Header;
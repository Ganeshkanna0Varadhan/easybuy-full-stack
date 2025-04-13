import React, { useEffect, useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { FaArrowLeft } from "react-icons/fa";

import useMobile from '../hooks/useMobile';
const Search = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSearchPage, setIsSearchPage] = useState(false);
    const isMobile = useMobile();
    const searchText = location?.search?.slice(3);

    useEffect(() => {
        const isSearch = location.pathname === "/search";
        setIsSearchPage(isSearch);
    }, [location]);

    const redirectToSearchPage = () => {
        navigate("search");
    }

    const handleOnChange = (e) => {
        const value = e.target.value;
        const url = `/search?q=${value}`
        navigate(url);
    }

    return (
        <div className="w-full min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-primary-200">
            {
                (isMobile && isSearchPage) ? (
                    <Link to={"/"} className='flex justify-center items-center h-full px-2 m-1 text-neutral-800 group-focus-within:text-primary-200'>
                        <FaArrowLeft size={18}/>
                    </Link>
                ) : (
                    <button className='flext justify-center items-center h-full px-3 text-neutral-800 group-focus-within:text-primary-200'>
                        <IoSearch size={22}/>
                    </button>
                )
            }

            <div className='w-full h-full'>
                {
                    !isSearchPage ? (
                        // not in search page
                        <div onClick={redirectToSearchPage } className='w-full h-full flex items-center'>
                            <TypeAnimation
                                sequence={[
                                    'Search "bread"',
                                    1000, 
                                    'Search "sugar"',
                                    1000,
                                    'Search "milk"',
                                    1000,
                                    'Search "panner"',
                                    1000,  
                                    'Search "chocolate"',
                                    1000,
                                    'Search "curd"',
                                    1000,
                                    'Search "rice"',
                                    1000,
                                    'Search "chips"',
                                    1000,
                                    'Search "egg"',
                                    1000
                                ]}
                                wrapper="span"
                                speed={50}
                                repeat={Infinity}
                            />
                        </div>
                    ) : (
                        // in search page
                        <div className='w-full h-full'> 
                            <input type="text" placeholder='Search for milk bread and more'
                                    autoFocus 
                                    defaultValue={searchText}
                                    className='bg-transparent w-full h-full outline-none' 
                                    onChange={handleOnChange}        
                            /> 
                        </div>
                    )
                }
            </div>
            
        </div>
    )
}
export default Search;
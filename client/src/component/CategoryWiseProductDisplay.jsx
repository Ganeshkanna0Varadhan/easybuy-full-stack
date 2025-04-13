import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import { SummaryApi } from '../common/summaryApi';
import CardLoading from './CardLoading';
import CardProduct from './CardProduct';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import validURLConvert from '../utils/validURLConvert';
import { useSelector } from 'react-redux';

const CategoryWiseProductDisplay = ({ id, name}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const containerRef = useRef();
    const subCategoryData = useSelector((state) => state.product.allSubCategory);
    const navigate = useNavigate();
    const fetchCategoryWiseProduct = async () => {
        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.getProductByCategory,
                data: {
                    _id: id
                }
            });

            const { data: responseData} = response;

            if (responseData.success) {
                setData(responseData.data);
            }
            
        }
        catch(err) {
            AxiosToastError(err);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategoryWiseProduct();
    }, [])

    const loadingCardNumber = new Array(8).fill(null);

    const handleScrollRight = () => {
        containerRef.current.scrollLeft += 200;
    }

    const handleScrollLeft = () => {
        containerRef.current.scrollLeft -= 200;
    }
    
    const handleRedirectProductListPage = () => {
      const subCategory = subCategoryData.findLast(sub => {
        const filterData = sub.category.some(c => {
          return c._id == id;
        });

        return filterData ? true : null;
      }) 

      const url = `/${validURLConvert(name)}-${id}/${validURLConvert(subCategory.name)}-${subCategory._id}`;
      navigate(url)
    }
  
    return (
    <div>
        <div className='m-4 flex items-center justify-between gap-4'>
            <h3 className='font-semibold text-lg md:text-xl'>{name}</h3>
            <div  onClick={handleRedirectProductListPage} className='text-green-600 hover:text-green-400'>See All</div>
        </div>
        <div className="relative flex items-center">
            <div className='flex gap-4 md:gap-6 lg:gap-8 overflow-x-scroll scrollbar-none scroll-smooth' ref={containerRef}>
                {   loading &&
                    loadingCardNumber.map((_loading, index) => {
                        return (
                            <CardLoading key={"productWiseCardLoading_"+index}/>
                        )
                    })
                }
                {
                    data.map((p, index) => {
                        return (
                            <CardProduct data={p} key={"cardProduct_"+index} />
                        )
                    })
                }
            </div>
            <div className='w-full left-0 right-0 px-2 absolute justify-between hidden sm:flex'>
                <button onClick={handleScrollLeft} className='z-10 relative bg-white hover:bg-gray-100 shadow-lg p-2 text-lg rounded-full'>
                    <FaAngleLeft/>
                </button>
                <button onClick={handleScrollRight} className='z-10 relative bg-white hover:bg-gray-100 shadow-lg p-2 text-lg rounded-full'>
                    <FaAngleRight/>
                </button>
            </div>

        </div>
  </div>
  )
}

export default CategoryWiseProductDisplay
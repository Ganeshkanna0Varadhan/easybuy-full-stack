import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import { SummaryApi } from '../common/summaryApi';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { displayPriceInRupees } from '../utils/DisplayPriceInRupees';
import Divider from '../component/Divider';
import image1 from '../assets/minuteDelivery.png';
import image2 from '../assets/bestForMoney.png';
import image3 from '../assets/Wide_Assortment.png';
import priceWithDiscount from '../utils/PriceWithDiscount';
import AddCartToButton from '../component/AddCartToButton';

const ProductDisplay = () => {
  const params = useParams();
  const productId = params?.productId?.split("-").slice(-1)[0];
  const [data, setData] = useState({
    name: "",
    image: []
  })

  const [image, setImage] = useState(0);
  const [loading, setLoading] = useState(false);
  const imageContainer = useRef();

  const handleScrollRight = () => {
    imageContainer.current.scrollLeft += 100;
  }
  const handleScrollLeft = () => {
    imageContainer.current.scrollLeft -= 100;
  }

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: { productId: productId }
      });

      const {data: responseData} = response;

      if (responseData.success) {
        setData(responseData.data);
      }
    }
    catch(err) {
      AxiosToastError (err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProductDetails();
  }, [params]);


  return (
    <section className="p-4 grid lg:grid-cols-2">
      <div className="">
        <div className='bg-white lg:min-h-[65vh] lg:max-h-[65vh]  rounded min-h-56 max-h-56 h-full w-full '>
          <img 
            src={data.image[image]}
            className='h-full w-full object-scale-down'
          /> 
        </div>
        <div className='flex items-center justify-center gap-3 my-2'>
          {
            data.image.map((src, index) => {
              return (
                <div key={"button_image_"+index} className={`bg-slate-200 w-3 h-3 lg:w-5 lg:h-5 rounded-full ${index === image && "bg-slate-400" }`}>

                </div>
              )
            })
          }
        </div>
        <div className='grid relative'>
          <div ref={imageContainer} className='flex z-10 relative gap-4 w-full overflow-x-auto scrollbar-none'>
          {
            data.image.map((src, index) => {
              return (
                <div className='w-20 h-20 min-w-20 min-h-20  cursor-pointer shadow-md' key={"thumbnail_image_"+index} > 
                  <img 
                    src={src}
                    alt='min-prod'
                    onClick={() => setImage(index)}
                    className='w-full h-full object-scale-down'
                  />
                </div>
              )
            })
          }
          </div>
          <div className="w-full h-full hidden lg:flex -ml-3 justify-between absolute items-center">
            <button onClick={handleScrollLeft} className='bg-white z-10 relative  p-1 rounded-full shadow-lg'>
              <FaAngleLeft/>
            </button>
            <button onClick={handleScrollRight} className='bg-white z-10 relative p-1 rounded-full shadow-lg'>
              <FaAngleRight/>
            </button>
          </div>
        </div>
        <div>
          {

          }
        </div>

        <div className='my-4 gap-3 hidden lg:grid'>
          <div>
            <p className='font-semibold'>Description</p>
            <p className='text-base '>{data.description}</p>
          </div>
          <div>
            <p className='font-semibold'>Unit</p>
            <p className='text-base '>{data.unit}</p>
          </div>
          {
            data?.more_details && Object.keys(data?.more_details).map((element, index) => {
              return (
                <div key={"more-details-"+index}>
                  <p className='font-semibold'>{element}</p>
                  <p className='text-base '>{data.more_details[element]}</p>
                </div>
              )
            })
          }
        </div>
      </div>

      <div className='p-4 lg:pl-7 text-base lg:text-lg'>
        <p className='bg-green-300 w-fit px-2 rounded-full'>10 Min</p>
        <h2 className='text-lg font-semibold lg:text-3xl '>{data.name}</h2>
        <p className='text-gray-500'>{data.unit}</p>
        <Divider/>
        <div>
          <p>Price</p>
          <div className='flex items-center gap-2'>
            <div className='border border-green-600 px-2 py-1 rounded w-fit bg-green-50'>
              <p className='font-semibold text-lg lg:text-xl'>
                {displayPriceInRupees(priceWithDiscount(data.price, data.discount))} 
              </p>
            </div>
            {
              Number(data.discount) ? (
                <>
                  <p className='font-medium text-neutral-600'>
                  MRP <span className='line-through'>{displayPriceInRupees(data.price)}</span>
                  </p>
                  <p className='font-bold bg-blue-500 text-white p-1 rounded text-xs'>{data.discount}% OFF</p>
                </>
              ) : ("")
            }

          </div>
        </div>
        {
          
          data.stock === 0 ? (
            <p className='text-lg text-red-500'>Out of Stock</p>
          ) : (
            // <button className='my-4 px-4 py-1 bg-green-800 hover:bg-green-900 text-white rounded'>Add</button>
            <div className='my-4'>
              <AddCartToButton data={data}/>
            </div>
          )

        }


        <Divider/>

        <h2 className='font-semibold'>Why shop from easybuy?</h2>
      
        <div>
          <div className='flex items-center gap-4 my-4'>
            <img 
                src={image1}
                alt='superfast devlivery'
                className='w-20 h-20 rounded-full bg-yellow-300'
            />
            <div className='text-sm'>
              <div className='font-semibold'>Superfast Delivery</div>
              <p>Get your order delivered to your doorstep at the earliest from dark stores near you</p>
            </div>
          </div>
          <div className='flex items-center gap-4 my-4'>
            <img 
                src={image2}
                alt='Best price offers'
                className='w-20 h-20 rounded-full '
            />
            <div className='text-sm'>
              <div className='font-semibold'>Best Prices & Offers</div>
              <p>Best price destination with offers directly from the manufacturers</p>
            </div>
          </div>
          <div className='flex items-center gap-4 my-4'>
            <img 
                src={image3}
                alt='Wide Assortment'
                className='w-20 h-20 rounded-full'
            />
            <div className='text-sm'>
              <div className='font-semibold'>Wide Assortment</div>
              <p>Choose from 5000+ products food personal care, household & other categories</p>
            </div>
          </div>

        </div>

        {/* description display only for mobile */}
        
        <div className='my-4 gap-3 grid lg:hidden '>
          <div>
            <p className='font-semibold'>Description</p>
            <p className='text-base '>{data.description}</p>
          </div>
          <div>
            <p className='font-semibold'>Unit</p>
            <p className='text-base '>{data.unit}</p>
          </div>
          {
            data?.more_details && Object.keys(data?.more_details).map((element, index) => {
              return (
                <div key={"more-details-"+index}>
                  <p className='font-semibold'>{element}</p>
                  <p className='text-base '>{data.more_details[element]}</p>
                </div>
              )
            })
          }
        </div>


      </div>

    </section>
  )
}

export default ProductDisplay
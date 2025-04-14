import React from 'react'
import banner from '../assets/banner.jpg'
import banner_mobile from '../assets/banner-mobile.jpg'
import { useSelector } from 'react-redux'
import validURLConvert from '../utils/validURLConvert'
import { Link, useNavigate } from 'react-router-dom'
import CategoryWiseProductDisplay from '../component/CategoryWiseProductDisplay'
import AxiosToastError from '../utils/AxiosToastError'
  const Home = () => {
    const loadingCategory = useSelector(state => state.product.loadingCategory);
    const categoryData = useSelector((state) => state.product.allCategory);
    const subCategoryData = useSelector((state) => state.product.allSubCategory);
    const navigate = useNavigate();
    
    const handleRedirectProductListPage = (id, name) => {
      const subCategory = subCategoryData.findLast(sub => {
        const filterData = sub.category.some(c => {
          return c._id == id;
        });

        return filterData ? true : null;
      }) 

      const url = `/${validURLConvert(name)}-${id}/${validURLConvert(subCategory.name)}-${subCategory._id}`;
      navigate(url);

    }
    
    return (
      <section>
        <div className='my-4 bg-white'>
          <Link to={"/search"} className={`w-full hover:cursor-pointer h-full min-h-48 bg-blue-100 rounded ${!banner && "animate-pulse" } `}>
            <img  
              src={banner}
              className='w-full h-full hidden lg:block'
              alt='banner'
            ></img>
            <img  
              src={banner_mobile}
              className='w-full h-full  lg:hidden'
              alt='banner'
            ></img>
          </Link>
        </div>
        <div className='px-4 my-2 grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2'>
          {/* <h2 className="font-bold text-lg">Shop by Category</h2> */}
          {

            loadingCategory ? (
              new Array(20).fill(null).map((c, index) => {
                return (
                  <div key={"loading"+ index} className='bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse '>
                    <div className='bg-blue-200 min-h-20 rounded'></div>
                    <div className='bg-blue-200 h-8 rounded'></div>
                  </div>
  
                )
              })
            ) : (

              categoryData.map((cat, index) => {
                return (
                  <div className='w-full h-full' onClick={() => handleRedirectProductListPage(cat._id, cat.name)} key={"home-category"+ index}>
                    <div>
                      <img 
                        src={cat.image}
                        className='w-full h-full object-scale-down'
                      />
                    </div>
                  </div>
                )
              })
            )
          }
        </div>

        {/* display category product by GK */}
        <div className='bg-white p-4'>
          {
            categoryData.map((c, index) => {
              return (
                <CategoryWiseProductDisplay key={"categoryWiseProductDisplay"+index} id={c?._id} name={c?.name}></CategoryWiseProductDisplay>
              )
            })
          }
        </div>
        
      </section>
    )
  }

export default Home
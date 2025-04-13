import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import { SummaryApi } from '../common/summaryApi';
import { useSelector } from 'react-redux';
import Loading from '../component/Loading';
import CardProduct from '../component/CardProduct';
import validURLConvert from '../utils/validURLConvert';

const ProductListPage = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const allSubCategory = useSelector((state) => state.product.allSubCategory);
  const [displaySubCategory, setDisplayCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});


  const findSelectedCategoryId = (selectedCateId, selectedSubCateId) =>{
    let subCategory = allSubCategory?.filter((cate) => {
      let filterData = cate.category.some((c) => {
        return c._id === selectedCateId
      })
      return filterData ? filterData : null;
    });

    if (subCategory) {
      setDisplayCategory(subCategory);
      let selectedCate = subCategory.find((category) => {
        return category._id === selectedSubCateId;
      })

      setSelectedCategory(selectedCate)
    }
  }

  const fetchProductData = async () => {
    let categoryId = params.category?.split('-').slice(-1)[0];
    let subCategoryId = params.subCategory?.split('-').slice(-1)[0];
    setSelectedSubCategoryId(subCategoryId);

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubcategory,
        data: {
          categoryId: categoryId,
          subCategoryId: subCategoryId,
          page: page,
          limit: 8
        }
      })

      const { data: responseData } = response;

      if (responseData.success) {
        if (responseData.page == 1) {
          setData(responseData.data);
        }
        else {
          setData([...data, ...responseData.data]);
        }
        setTotalPage(responseData.totalCount);
      }
    }
    catch(err) {
      AxiosToastError(err);
    } finally {
      setLoading(false);
    }
  } 

  useEffect(() => {
    fetchProductData();
  }, [params])

  useEffect(() => {
    let categoryId = params.category?.split('-').slice(-1)[0];
    let subCategoryId = params.subCategory?.split('-').slice(-1)[0];
    setSelectedSubCategoryId(subCategoryId);
    findSelectedCategoryId(categoryId, subCategoryId);
  }, [allSubCategory, params])



  return (
    <section className="sticky top-24 lg:top-20">
      <div className='sticky top-24  grid grid-cols-[90px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[280px,1fr]'>
        <div className='px-2 min-h-[88vh] max-h-[88vh] overflow-y-scroll grid gap-1 scrollbarCustom bg-white py-2'>
          {
            displaySubCategory[0] && (
              displaySubCategory.map((s, index) => {
                const url = `/${validURLConvert(s?.category[0]?.name)}-${s?.category[0]?._id}/${validURLConvert(s.name)}-${s._id}`;
                return (
                  <Link to={url} className={`w-full p-2 lg:flex items-center lg:w-full lg:h-16 box-border lg:gap-4 border-b  
                      hover:bg-green-100 cursor-pointer
                      ${selectedSubCategoryId === s._id ? "bg-green-300" : ""}` }  
                      key={"productListPage_subCategoy_"+index}
                    >
                    <div className='w-fit max-w-28 mx-auto lg:mx-0 bg-white rounded'>
                      <img
                        src={s.image}
                        alt={s.name}
                        className='w-14 lg:h-14 lg:w-12 h-full object-scale-down'
                      />
                    </div>
                    <p className='-mt-5 lg:mt-0 text-xs text-center lg:text-left lg:text-base'>{s.name}</p>

                  </Link>
                )
              })
            )
          }
        </div>


        <div className="sticky top-20">
          <div className='bg-white shadow-md p-4 z-10 relative'> 
            <h3 className='font-semibold'>
              {
                selectedCategory && selectedCategory.name  
              }  
            </h3>
          </div>
          <div>
            <div className='min-h-[80vh] max-h-[80vh] overflow-y-auto'>
              <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
                {
                  data.map((p, index) => {
                    return (
                      <CardProduct
                        key={"productList_cartProduct_"+index}
                        data={p}
                      />
                    )
                  })
                }
              </div>
            </div>



            {
              loading && (
                <Loading/>
              )
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductListPage
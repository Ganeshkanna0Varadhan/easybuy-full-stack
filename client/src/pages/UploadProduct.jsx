import React, { useEffect, useState } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa';
import uploadImage from '../utils/UploadImage';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import Loading from '../component/Loading';
import ViewImage from '../component/ViewImage';
import { MdDelete } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { IoClose } from 'react-icons/io5';
import AddFieldComponent from '../component/AddFieldComponent';
import Axios from '../utils/Axios';
import { SummaryApi } from '../common/summaryApi';
import successAlert from '../utils/SuccessAlert';

const UploadProduct = () => {

  const [data, setData] = useState({
    name : "",
    image : [],
    category: [],
    subCategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {}
  })

  const [imageLoading, setImageLoading] = useState(false);
  const [viewImageURL, setViewImageURL] = useState("");
  const allCategory = useSelector((state) => state.product.allCategory);
  const [selectCategory, setSelectCategory] = useState("");
  const [selectSubCategory, setSelectSubCategory] = useState("");
  const allSubCategory = useSelector((state) => state.product.allSubCategory);
  const [allSelectedSubCategory, setAllSelectedSubCategory] = useState([]);
  // const [moreField, setMoreField] = useState([]);
  const [openAddField, setOpenAddField] = useState(false);
  const [fieldName, setFieldName] = useState("");

  const handleChange = (e) => {
    const {name, value} = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  useEffect(() => {
    if (!data.category[0]) {
      setAllSelectedSubCategory(allSubCategory);
      return;
    }

    let allFilterSubCategory = [];
    for (let cat of data.category) {
      let filterData = allSubCategory.filter((sub) => {
        let isfind = sub?.category.some((category) => {
          return category._id === cat._id;
        });
        
        return isfind ? isfind : null
      });

      allFilterSubCategory.push(filterData);
    }

    allFilterSubCategory = allFilterSubCategory.flat(1); 
    setAllSelectedSubCategory(allFilterSubCategory);

  }, [data.category, allSubCategory])
  


  const handleUploadImage = async (e) => {
    try {
      setImageLoading(true);
      const file = e.target.files[0];
      if (!file) 
        return;
      const response = await uploadImage(file);

      const { data : imageReponse } = response;

      if (imageReponse.success) {

          setData((prev) => {
              return {
                  ...prev,
                  image: [...prev.image, imageReponse.data.url]
              }
          })
          toast.success(imageReponse.message);

      }

      if (response.data.error) {
          toast.error(imageReponse.message);
      }
    }
    catch(err) {
      AxiosToastError(err)
    } finally {
      setImageLoading(false);
    }
  }

  const handDeleteImage = (index) => {
    data.image.splice(index, 1);
    setData((prev) => {
      return {
        ...prev
      }
    })
  }

  const handleDeleteCategory = (index) => {
    data.category.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
        category: [...prev.category]
      }
    })
  }

  const handleDeleteSubCategory = (index) => {
    data.subCategory.splice(index, 1);
    setData((prev) => {
      return {
        ...prev
      }
    })
  }

  const handleAddField = () => {
    setData((prev) => {
      return {
        ...prev,
        more_details: {
          ...prev.more_details,
          [fieldName]: ""
        }
      }
    });
    setFieldName("");
    setOpenAddField(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.createProduct,
        data
      });

      const { data: responseData } = response;

      if (responseData.success) {
          successAlert(responseData.message);
          setData({
            name : "",
            image : [],
            category: [],
            subCategory: [],
            unit: "",
            stock: "",
            price: "",
            discount: "",
            description: "",
            more_details: {}
          });
      }

      if (responseData.error) {
        toast.error(responseData.message);
      }
    }
    catch(err) {
      AxiosToastError(err);
    }
  }

  return (
    <section>
      <div className='p-2 font-semibold bg-white shadow-md flex items-center justify-between'>
          <h2 className='font-semibold'>Upload Product</h2>
      </div>
      <div className='grid p-3'>
        <form className='grid gap-4' onSubmit={handleSubmit}>
          <div className='grid gap-1'>
            <label htmlFor='name'>Name</label>
            <input 
              type='text'
              id='name'
              placeholder='Enter product Name'
              value={data.name}
              name='name'
              onChange={handleChange}
              required
              className='bg-blue-50 p-2 outline-none border 
                  focus-within:border-primary-200 rounded'
            />
          </div>
          <div className='grid gap-1'>
            <label htmlFor='description'>Description</label>
            <textarea 
              type='text'
              id='description'
              placeholder='Enter product Description'
              value={data.description}
              name='description'
              onChange={handleChange}
              required
              multiple
              rows={3}
              className='bg-blue-50 p-2 outline-none border 
                  focus-within:border-primary-200 rounded resize-none'
            />
          </div>
          <div>
            <p>Image</p>
            <div>
              <label htmlFor='productImage' className='bg-blue-50 h-24 border rounded flex justify-center items-center cursor-pointer'>
                <div className='text-center flex justify-center items-center flex-col'>
                  {
                    imageLoading ? <Loading/> : ( 
                      <>                              
                        <FaCloudUploadAlt size={35} />
                        <p>Upload Image</p>
                      </>
                    )
                  }
                </div>
                <input id='productImage' accept='image/*' type='file' onChange={handleUploadImage} className='hidden'></input>
              </label>
              <div className='flex flex-wrap gap-4'>
                {
                  data.image.map((src, index) => {
                    return (
                      <div key={"image_"+index} className='h-20 mt-1 w-20 min-w-20 bg-blue-50 border relative group'>
                        <img 
                          src={src}
                          alt={data.name + "_" + (index + 1)}
                          className='w-full h-full object-scale-down cursor-pointer'
                          onClick={() => setViewImageURL(src)}
                        />
                        <div onClick={() => handDeleteImage(index)} className="absolute bottom-0 right-0 p-1 bg-red-500 hidden hover:bg-red-600 rounded text-slate-100 group-hover:block">
                          <MdDelete/>
                        </div>
                      </div>

                    )
                  })
                }
              </div>
            </div>
          </div>
          <div className='grid gap-1'>
            <label>Category</label>
            <div>
              <select
                className='bg-blue-50 border outline-none w-full p-2 rounded'
                value={selectCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  if (!value) 
                    return
                  const category = allCategory.find((category) => category._id === value)

                  setData((prev) => {
                    return {
                      ...prev,
                      category: [...prev.category, category]
                    }
                  })

                  setSelectCategory("");
                }}
                >
                <option value={""}>Select Category</option>
                {
                  allCategory.map((cat, index) => {
                    return (
                      <option key={"category_"+index} value={cat._id}>{cat.name}</option>
                    )
                  })
                }
              </select>
              <div className='flex flex-wrap gap-3 '>
              {
                data.category.map((cate, index) => {
                  return (
                    <div key={"productSelect" +index} className='rounded text-sm flex items-center gap-2 bg-blue-50 mt-2 p-1'>
                      <p>{cate.name}</p>
                      <div className="hover:text-red-600 cursor-pointer" onClick={() => handleDeleteCategory(index)}>
                        <IoClose size={20}/>
                      </div>
                    </div>
                  )
                })
              }
              </div>
            </div>
          </div>
          <div className='grid gap-1'>
            <label>Sub Category</label>
            <div>
              <select
                className='bg-blue-50 border outline-none w-full p-2 rounded'
                value={selectSubCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  if (!value) 
                    return
                  const subCategory = allSelectedSubCategory.find((category) => category._id === value)

                  setData((prev) => {
                    return {
                      ...prev,
                      subCategory: [...prev.subCategory, subCategory]
                    }
                  })

                  setSelectSubCategory("");
                }}
                >
                <option value={""}>Select Sub Category</option>
                {
                  allSelectedSubCategory.map((cat, index) => {
                    return (
                      <option key={"sub_category_"+index} value={cat._id}>{cat.name}</option>
                    )
                  })
                }
              </select>
              <div className='flex flex-wrap gap-3 '>
              {
                data.subCategory.map((cate, index) => {
                  return (
                    <div key={"subProductSelect" +index} className='rounded text-sm flex items-center gap-2 bg-blue-50 mt-2 p-1'>
                      <p>{cate.name}</p>
                      <div className="hover:text-red-600 cursor-pointer" onClick={() => handleDeleteSubCategory(index)}>
                        <IoClose size={20}/>
                      </div>
                    </div>
                  )
                })
              }
              </div>
            </div>
          </div>
          <div className='grid gap-1'>
            <label htmlFor='unit'>Unit</label>
            <input 
              type='text'
              id='unit'
              placeholder='Enter product unit'
              value={data.unit}
              name='unit'
              onChange={handleChange}
              required
              className='bg-blue-50 p-2 outline-none border 
                  focus-within:border-primary-200 rounded'
            />
          </div>
          <div className='grid gap-1'>
            <label htmlFor='stock'>Stock</label>
            <input 
              type='number'
              id='stock'
              min={0}
              placeholder='Enter product stock'
              value={data.stock}
              name='stock'
              onChange={handleChange}
              required
              className='bg-blue-50 p-2 outline-none border 
                  focus-within:border-primary-200 rounded'
            />
          </div>
          <div className='grid gap-1'>
            <label htmlFor='price'>Price</label>
            <input 
              type='number'
              id='price'
              min={0}
              placeholder='Enter product price'
              value={data.price}
              name='price'
              onChange={handleChange}
              required
              className='bg-blue-50 p-2 outline-none border 
                  focus-within:border-primary-200 rounded'
            />
          </div>
          <div className='grid gap-1'>
            <label htmlFor='discount'>Discount</label>
            <input 
              type='number'
              min={0}
              id='discount'
              placeholder='Enter product discount'
              value={data.discount}
              name='discount'
              onChange={handleChange}
              required
              className='bg-blue-50 p-2 outline-none border 
                  focus-within:border-primary-200 rounded'
            />
          </div> 
          {
            Object?.keys(data?.more_details).map((k, index) => {
              return (
                <div  key={"Addfield_" + index} className='grid gap-1'>
                  <label htmlFor={k}>{k}</label>
                  <input 
                    type='text'
                    id={k}
                    value={data.more_details[k]}
                    onChange={(e) => {
                      const value = e.target.value
                      setData((prev) => {
                        return {
                          ...prev,
                          more_details: {
                            ...prev.more_details,
                            [k]: value
                          }
                        }
                      })
                    }}
                    required
                    placeholder={"Enter "+ k}
                    className='bg-blue-50 p-2 outline-none border 
                        focus-within:border-primary-200 rounded'
                  />
                </div>
              )
            })            
          }
          <div className="border rounded border-primary-200 bg-white cursor-pointer hover:bg-primary-50  py-1 px-3 w-36 text-center font-semibold "
            onClick={() => setOpenAddField(true)}>
            Add Fields
          </div>
          <button
              className='bg-primary-100 hover:bg-primary-200 hover:text-white py-2  rounded font-semibold'
            >
            Submit
          </button>

        </form>
      </div>

      {
        viewImageURL && (
          <ViewImage url={viewImageURL} close={() => setViewImageURL("")} />
        )
      }

      {
        openAddField && (
          <AddFieldComponent 
            value={fieldName}
            onChange={(e) => {
              setFieldName(e.target.value)
            }}
            submit={handleAddField}
            close={() => setOpenAddField(false)}
          />
        )
      }
    </section>
  )
}

export default UploadProduct;
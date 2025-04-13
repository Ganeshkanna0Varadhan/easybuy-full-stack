import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import AxiosToastError from '../utils/AxiosToastError'
import uploadImage from '../utils/UploadImage'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import Axios from '../utils/Axios'
import { SummaryApi } from '../common/summaryApi'

const EditSubCategory = ({data, close, fetchData}) => {
    const [subCategoryData, setSubCategoryData] = useState({
        _id: data._id,
        name: data.name,
        image: data.image,
        category: data.category || []
    })

    const handleChange = (e) => {
        const {name, value} = e.target;

        setSubCategoryData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const allCategory = useSelector((state) => state.product.allCategory );

    const handleUploadSubCategoryImage = async (e) => {
        try {
            const file = e.target.files[0];
            if (!file) return

            const response = await uploadImage(file);

            const { data : imageReponse } = response;

            if (imageReponse.success) {

                setSubCategoryData((prev) => {
                    return {
                        ...prev,
                        image: imageReponse.data.url
                    }
                })
                toast.success(imageReponse.message);

            }

            if (response.data.error) {
                toast.error(imageReponse.message);
            }

        }
        catch(err) {
            AxiosToastError(err);
        }
    }

    const handleRemoveCategorySelected = (id) => {
        const index = subCategoryData.category.findIndex((obj) => obj._id === id);
        subCategoryData.category.splice(index, 1);
        setSubCategoryData((prev) => {
            return {
                ...prev,
            }
        });
    }
    
    const handleSubmitSubCategory = async(e) => {
        e.preventDefault();
        try {
            const response = await Axios({
                ...SummaryApi.updateSubCategory,
                data: subCategoryData
            });

            const {data: responseData} = response;

            if (responseData.success) {
                toast.success(responseData.message);
                if (close) {
                    close();
                }
                if (fetchData) {
                    fetchData();
                }
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
        <section className='fixed top-0 left-0 right-0 bottom-0 bg-neutral-800 bg-opacity-70 z-50 flex items-center 
            justify-center p-4'>
            <div className="w-full max-w-6xl bg-white p-4 rounded">
                <div className="flex items-center justify-between gap-3">
                    <h1 className="font-semibold">Edit Sub Category</h1>
                    <button onClick={close}>
                        <IoClose size={25}/>
                    </button>
                </div>
                <form  className='my-3 grid gap-3' onSubmit={handleSubmitSubCategory}>
                    <div className='grid gap-1'>
                        <label htmlFor='name'>Name</label>
                        <input 
                            className='p-3 bg-blue-50 border outline-none focus-within:border-primary-200 rounded'
                            id='name'
                            name='name'
                            value={subCategoryData.name}
                            onChange={handleChange} 
                        />
                    </div>
                    <div className='grid gap-1'>
                        <p>Image</p>
                        <div className="flex flex-col lg:flex-row items-center  gap-3">
                            <div className='border h-36 w-full lg:w-36 bg-blue-50 flex items-center justify-center'>
                                {
                                    !subCategoryData.image ? (
                                        <p className="text-sm text-neutral-400">No Image</p>   
                                    ) : (
                                        <img 
                                        alt='sub category'
                                        src={subCategoryData.image}
                                        className='w-full h-full object-scale-down' 
                                    
                                    />
                                    )
                                }
                            </div>
                            <label htmlFor='uploadSubCategory'>
                                <div className='px-4 py-1 border border-primary-200 cursor-pointer
                                text-primary-200 rounded hover:bg-primary-200 hover:text-white '>
                                    Upload Image
                                </div>
                                <input className='hidden' 
                                    type='file'
                                    id='uploadSubCategory'
                                    onChange={handleUploadSubCategoryImage}        
                                />
                            </label>
                        </div>
                    </div>
                    {/* <div className='grid gap-1'>
                        <label>Select Category</label>
                        <select className='bg-blue-50 border p-3'>
                            <option value={""}>Select Category</option>
                        </select>
                    </div> */}
                    <div className='grid gap-1'>
                        <label>Select Category</label>
                        <div className='border focus-within:border-primary-200 rounded'>
                            <div className='flex flex-wrap gap-2'>
                                {
                                    subCategoryData.category.map((cat, index) => {
                                        return (
                                            <p key={"selectValue "+index} className="bg-primary-50 rounded shadow-md px-1 m-1 flex items-center gap-2">
                                                {cat.name}
                                                <button type="button" className="cursor-pointer hover:text-red-500" onClick={() => handleRemoveCategorySelected(cat._id) }>
                                                    <IoClose size={20}/>
                                                </button>
                                            </p>
                                        )
                                    })
                                }
                            </div>
                            <select className='w-full p-2 bg-transparent outline-none'
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (!value) return;
                                    const categoryData = allCategory.find((el) => el._id === value);
                                    setSubCategoryData((prev) => {
                                        return {
                                            ...prev,
                                            category: [...prev.category, categoryData]
                                        }
                                    }) 
                                }}>
                                <option value={""}>Select Category</option>
                                {
                                    allCategory.map((category, index) => {
                                        return (
                                            <option value={category._id} key={"subcategory "+index}>{category.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>

                    <button 
                        disabled={!(subCategoryData.name && subCategoryData.image && subCategoryData.category[0])}
                        className={`px-4 py-1 rounded border font-semibold ${subCategoryData.name && subCategoryData.image && subCategoryData.category[0] ?
                            "bg-primary-100 text-black  hover:bg-primary-200 hover:text-white" : "bg-gray-200" }`}                        
                        >
                        Submit
                    </button>
                </form>
            </div>    

        </section>
    )
}

export default EditSubCategory
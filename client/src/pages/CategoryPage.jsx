import React, { useEffect, useState } from 'react'
import UploadCategoryModel from '../component/UploadCategoryModel'
import Loading from '../component/Loading';
import NoData from '../component/NoData';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import { SummaryApi } from '../common/summaryApi';
import toast from 'react-hot-toast';
import EditCategory from '../component/EditCategory';
import ConfirmBox from '../component/ConfirmBox';
// import { useSelector } from 'react-redux';

const CategoryPage = () => {
    const [openUploadCategory, setOpenUploadCategory] = useState(false);
    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [openEdit, setOpenEdit] = useState(false);
    const [editData, setEditData] = useState({
        name: "",
        image: ""
    });
    const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false);
    const [deleteCategory, setDeleteCategory] = useState({
        _id: ""
    });

    // const allCategory = useSelector((state) => state.product.allCategory);

    // useEffect(() => {
    //     setCategoryData(allCategory);
    // }, [allCategory]);

    // console.log(allCategory);
    const fetchCategory = async () => {
        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.getCategory,
            });

            const { data : responseData } = response;

            if (responseData.success) {
                setCategoryData(responseData.data);
            }

            if (responseData.error) {
                toast.error(responseData.message);
            }

        } catch (err) {
            AxiosToastError(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCategory();
    }, [])



    const handleDeleteCategory = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.deleteCategory,
                data: { _id: deleteCategory}
            })

            const { data : responseData } = response;

            if (responseData.success) {
                toast.success(responseData.message);
                // fetchCategory();
                setOpenConfirmBoxDelete(false);
            }

            if (responseData.error) {
                toast.error(responseData.message);
            }
        }
        catch (err) {
            AxiosToastError(err);
        }
    }


    return (
        <section>
            <div className='p-2 font-semibold bg-white shadow-md flex items-center justify-between'>
                <h2 className='font-semibold'>Category</h2>
                <button onClick={() => setOpenUploadCategory(true)} className='text-sm border border-primary-100
                    hover:bg-primary-100 py-1 px-3 rounded'>
                    Add Category
                </button>
            </div>
            {
                !categoryData[0] && !loading && (
                    <NoData/>
                )
            }

            <div className='p-2 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-7 gap-2'>
                {
                    categoryData.map((category) => {
                        return (
                            <div className='w-32 h-56 group rounded shadow-md ' key={category._id}>
                                <img
                                    alt={category.name}
                                    src={category.image}
                                    className='w-full object-scale-down'
                                />
                                <div className='items-center mx-1 mb-2 h-9 flex gap-2'>
                                    <button onClick={() => { setOpenEdit(true); setEditData(category)}} className='flex-1 bg-green-100 hover:bg-green-300 text-green-600 font-medium py-1 rounded '>
                                        Edit
                                    </button>
                                    <button onClick={() => { setOpenConfirmBoxDelete(true); setDeleteCategory(category._id)}} className='flex-1 bg-red-100 hover:bg-red-300 text-red-600 font-medium py-1 rounded'>
                                        Delete
                                    </button>

                                </div>
                            </div>
                        )
                    })
                }
            </div>

            {
                loading && ( <Loading/>)
            }


            {
                openUploadCategory && (
                    <UploadCategoryModel fetchData={fetchCategory} close={() => {setOpenUploadCategory(false)}}/>
                )
            }

            {
                openEdit && (
                    <EditCategory fetchData={fetchCategory} data={editData} close={() => setOpenEdit(false)}/>
                )
            }

            {
                openConfirmBoxDelete && (
                    <ConfirmBox close={() => {setOpenConfirmBoxDelete(false)}} 
                                cancel={() => {setOpenConfirmBoxDelete(false)}} 
                                confirm={handleDeleteCategory}/>
                ) 
            }

        </section>
    )
}

export default CategoryPage
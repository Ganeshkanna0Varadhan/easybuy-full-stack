import React, { useEffect, useState } from 'react'
import UploadSubCategoryModel from '../component/UploadSubCategoryModel';
import Axios from '../utils/Axios';
import { SummaryApi } from '../common/summaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import DisplayTable from '../component/DisplayTable';
import { createColumnHelper } from '@tanstack/react-table';
import ViewImage from '../component/ViewImage';
import { MdDelete } from 'react-icons/md';
import { HiPencil } from 'react-icons/hi';
import EditSubCategory from '../component/EditSubCategory';
import ConfirmBox from '../component/ConfirmBox';
import toast from 'react-hot-toast';

const SubCategoryPage = () => {
  const [openAddSubCategory, setOpenAddSubCategory] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading]= useState(false);
  const columnHelper = createColumnHelper();
  const [imageURL, setImageURL] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    _id: ""
  })

  const [deleteSubCategoryId, setDeleteSubCategory] = useState({
     _id: ""
  })

  const [deleteConfirmBox, setDeleteConfirmBox] = useState(false);

  const fetchSubCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      })

      const {data: responseData} = response;

      if (responseData.success) {
        setData(responseData.data);
      }
    } catch(err) {
        AxiosToastError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSubCategory();
  }, []);

  const column = [
    columnHelper.accessor('name', {
      header: 'Name'
    }),
    columnHelper.accessor('image', {
      header: 'Image',
      cell: (data) => {
        return <div className="flex justify-center items-center">
          <img
            src={data.getValue()}
            alt={data.row.original.name}
            className="w-8 h-8 cursor-pointer"
            onClick={() => {
              setImageURL(data.getValue())
            }}
          />
        </div>
      }
    }),
    columnHelper.accessor('category', {
      header: 'Category',
      cell: (data) => {
        return (
          <>
            {
              data.getValue().map((category, index) => {
                return (
                  <p key={index+"category"} className='shadow-md rounded bg-primary-50 px-1 py-1 inline-block'>{category.name}</p>
                )
              })
            }
          </>
        )
      }
    }),
    columnHelper.accessor('_id', {
      header: 'Action',
      cell: ({row}) => {
        return (
          <div className="flex items-center justify-center gap-3">
            <button onClick={() => { setOpenEdit(true); setEditData(row.original)}}  className="p-2 bg-green-100 rounded-full hover:text-green-600">
              <HiPencil size={20}/>
            </button>
            <button onClick={() => {setDeleteConfirmBox(true); setDeleteSubCategory(row.original)}} className="p-2 bg-red-100 rounded-full text-red-500 hover:text-red-600">
              <MdDelete size={22}/>
            </button>
          </div>
        )
      }
    })
  ]

  const handleDeleteSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteSubCategory,
        data: deleteSubCategoryId
      });

      const { data : responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchSubCategory();
        setDeleteConfirmBox(false);
        setDeleteSubCategory({ _id: ""})
      }
    }
    catch(err) {
      AxiosToastError(err);
    }
  }

  return (
    <section>
      <div className='p-2 font-semibold bg-white shadow-md flex items-center justify-between'>
          <h2 className='font-semibold'>Sub Category</h2>
          <button onClick={() => setOpenAddSubCategory(true)} className='text-sm border border-primary-100
              hover:bg-primary-100 py-1 px-3 rounded'>
              Add Sub Category
          </button>
      </div>

      <div className='overflow-auto w-full max-w-[95vw]'>
        <DisplayTable data={data} columns={column} />
      </div>

      {
        openAddSubCategory && (
          <UploadSubCategoryModel fetchData={fetchSubCategory} close={() => setOpenAddSubCategory(false)} />
        )
      }

      {
        imageURL &&
        <ViewImage url={imageURL} close={() => setImageURL("")}/>
      }

      {
        openEdit && 
        <EditSubCategory 
          data={editData} 
          close={() => setOpenEdit(false)}
          fetchData={fetchSubCategory}
        />
      }

      {
        deleteConfirmBox && (
          <ConfirmBox 
            close={() => setDeleteConfirmBox(false)}
            cancel={() => setDeleteConfirmBox(false)}
            confirm={handleDeleteSubCategory}  
          />
        )
      }
    </section>
  )
}

export default SubCategoryPage
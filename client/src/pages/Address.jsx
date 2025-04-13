import React, { useState } from 'react'
import { BiEdit } from 'react-icons/bi';
import { useSelector } from 'react-redux'
import AddAddress from '../component/AddAddress';
import { MdDelete } from 'react-icons/md';
import EditAddressDetails from '../component/EditAddressDetails';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import { SummaryApi } from '../common/summaryApi';
import toast from 'react-hot-toast';
import { useGlobalContext } from '../provider/GlobalProvider';

const Address = () => {
  const addressList = useSelector(state => state.addresses.addressList);
  const [openAddress, setOpenAddress] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({})
  const { fetchAddress } = useGlobalContext();

  const handleDisableAddress = async (id) => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteAddress,
        data: {
          _id: id
        }
      });

      if (response.data.success) {
        toast.success('Address Removed');
        fetchAddress();
      }
    }
    catch(err) {
      AxiosToastError(err);
    }
  }

  return (
        <div className=''>
          <div className='bg-white rounded shadow-md px-2 py-2 my-1 flex justify-between gap-4 items-center'>
            <h2 className='font-semibold'>Address</h2>
            <div onClick={() => setOpenAddress(true)}  className='py-1 border border-primary-200 hover:bg-primary-200 hover:text-white text-primary-200 px-2 rounded cursor-pointer'>
              Add Address
            </div>
          </div>
          <div className='bg-white p-2 grid gap-5 rounded'>
            {
              addressList[0] && (
                addressList.map((address, index) => {
                  return (
                    <div className={`border-2 bg-white border-blue-200 flex items-start justify-between gap-2 rounded p-2 ${!address?.status && "hidden"}`} key={"address_list_checkout_"+index}>
                      {/* <div className='flex items-start gap-2'> */}
                        <div className='grid gap-1'>
                          <p className='font-semibold'>{address.name} - {address.mobile}</p>
                          <p>{address.address_line}</p>
                          <p>{address.city}</p>
                          <p>{address.state}</p>
                          <p>{address.country} - <span className='font-semibold'>{address.pincode}</span></p>
                        </div>
                      {/* </div> */}
                      <div className='flex flex-col gap-2'>
                        <button onClick={() => {
                          setOpenEdit(true);
                          setEditData(address);
                        }} className='w-13 flex hover:bg-blue-200 border-blue-500 items-center justify-center gap-2 border rounded py-[3px] text-blue-500'>
                          <p>Edit</p>
                          <BiEdit size={20}/>
                        </button>
                        
                        <button onClick={() => handleDisableAddress(address?._id)} className='flex border-red-600 hover:bg-red-200 items-center justify-between gap-1 border rounded px-1 py-[3px] text-red-500'>
                          <p>Delete</p>
                           <MdDelete size={20}/>
                        </button>
                      </div>
                    </div>
                  )
                })
              )
            }
          </div>

          {
            openAddress && (
              <AddAddress close={() => setOpenAddress(false)}/>
            )
          }

          {
            openEdit && (
              <EditAddressDetails data={editData} close={() => setOpenEdit(false)}/>
            )
          }
        </div>
  )
}

export default Address
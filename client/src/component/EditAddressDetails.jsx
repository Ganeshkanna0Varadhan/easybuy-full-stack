import React from 'react'
import { useForm } from "react-hook-form"
import { IoClose } from 'react-icons/io5';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import { SummaryApi } from '../common/summaryApi';
import toast from 'react-hot-toast';
import { useGlobalContext } from '../provider/GlobalProvider';
const EditAddressDetails = ({ close, data }) => {
    const { fetchAddress } = useGlobalContext();
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            _id: data?._id,
            name: data?.name,
            address_line: data?.address_line,
            city: data?.city,
            state: data?.state,
            country: data?.country,
            pincode: data?.pincode,
            mobile: data?.mobile
        }
    });

    const onSubmit = async (inputData) => {
        try {
            const response = await Axios({
                ...SummaryApi.updateAddress,
                data: inputData
            })

            const { data: responseData } = response;

            if (responseData.success) {
                toast.success(responseData.message);
                close();
                reset();
                fetchAddress();
            }
        }
        catch(err) {
            AxiosToastError(err);
        }
    }


    return (
        <section className='bg-black fixed top-0 left-0 right-0 bottom-0 z-50 bg-opacity-70 flex justify-center items-center'>
            <div className='max-h-[100vh] scrollbar-none bg-white p-4 w-full max-w-md mx-auto rounded overflow-y-auto'> {/* mt-8 */}
                <div className='flex items-center justify-between'>
                    <h2 className='font-semibold'>Edit Address</h2>
                    <button onClick={close}>
                        <IoClose size={25}/>
                    </button>
                </div>
                <form className='mt-3 grid gap-1' onSubmit={handleSubmit(onSubmit)}>
                        <div className='grid gap-1'>
                            <label htmlFor='name'>Name </label>
                            <input 
                                type='text'
                                id='name'
                                className='border bg-blue-50 p-2 rounded outline-none focus-within:border-blue-700'
                                {...register("name", {required: true})}
                            />
                        </div>
                    <div className='grid gap-1'>
                        <label htmlFor='addressLine'>Address Line </label>
                        <input 
                            type='text'
                            id='addressLine'
                            className='border bg-blue-50 p-2 rounded outline-none focus-within:border-blue-700'
                            {...register("address_line", {required: true})}
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor='city'>City </label>
                        <input 
                            type='text'
                            id='city'
                            className='border bg-blue-50 p-2 rounded outline-none focus-within:border-blue-700'
                            {...register("city", {required: true})}
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor='state'>State </label>
                        <input 
                            type='text'
                            id='state'
                            className='border bg-blue-50 p-2 rounded outline-none focus-within:border-blue-700'
                            {...register("state", {required: true})}
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor='pincode'>Pincode </label>
                        <input 
                            type='text'
                            id='pincode'
                            className='border bg-blue-50 p-2 rounded outline-none focus-within:border-blue-700'
                            {...register("pincode", {required: true})}
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor='country'>Country </label>
                        <input 
                            type='text'
                            id='country'
                            className='border bg-blue-50 p-2 rounded outline-none focus-within:border-blue-700'
                            {...register("country", {required: true})}
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor='mobile'>Mobile No. </label>
                        <input 
                            type='text'
                            id='mobile'
                            className='border bg-blue-50 p-2 rounded outline-none focus-within:border-blue-700'
                            {...register("mobile", {required: true})}
                        />
                    </div>


                    <button className='bg-primary-100 mt-2 rounded text-black w-full py-2 font-semibold hover:bg-primary-200 hover:text-white'>Submit</button>
                </form>

            </div>
        </section>
    )
}

export default EditAddressDetails
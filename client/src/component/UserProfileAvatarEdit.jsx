import React, { useState } from 'react'
import { FaRegUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux'
import Axios from '../utils/Axios';
import { SummaryApi } from '../common/summaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';
import { updateAvatar } from '../store/userSlice';
import { IoClose } from 'react-icons/io5';

const UserProfileAvatarEdit = ({close}) => {
    const user = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const handleUploadAvatarImage = async (e) => {
        try {
            const file = e.target.files[0];
            if (!file) {
                return;
            }
            const formData = new FormData();
            formData.append('avatar', file);
            
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.uploadAvatar,
                data: formData
            })

            if (response.data.success) {
                const { data }  = response.data;
                dispatch(updateAvatar(data.avatar))
                toast.success("Avatar upload Successfully");
            }
        }
        catch(err) {
            setLoading(false);
            AxiosToastError(err);
        } finally {
            setLoading(false);
        }
        
    }

    return (
        <section className='fixed top-0 bottom-0 left-0 
                            right-0 bg-neutral-900 bg-opacity-60
                            p-4 flex items-center justify-center'>
            <div className='bg-white max-w-sm w-full rounded p-4 flex flex-col
                items-center justify-center'>
                <button onClick={close} className='text-neutral-800 w-fit block ml-auto'> 
                    <IoClose size={20}/>
                </button>
                <div className='w-28 h-28 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm'>
                    {
                        user.avatar ? (
                        <img 
                            alt={user.name}
                            src={user.avatar}
                            className='h-full w-full'
                        />
                        ) : (
                        <FaRegUserCircle size={60}/>
                        )
                    }
                </div>
                <form onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor='uploadProfile'>
                        <div className='border border-primary-200 hover:bg-primary-100
                        px-4 py-1 rounded text-sm my-3 cursor-pointer'>
                        {
                            loading ? "Loading..." : "Upload"
                        }
                        </div>
                    </label>
                    <input onChange={handleUploadAvatarImage} type='file' id='uploadProfile' className='hidden'/> 
                </form>
                
            </div>
            Avatar upload
        </section>
    )
}

export default UserProfileAvatarEdit
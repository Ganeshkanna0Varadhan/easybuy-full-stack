import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegUserCircle } from 'react-icons/fa';
import UserProfileAvatarEdit from '../component/UserProfileAvatarEdit';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import { SummaryApi } from '../common/summaryApi';
import toast from 'react-hot-toast';
import { fetchUserDetails } from '../utils/fetchUser';
import { setUserDetails } from '../store/userSlice';
const Profile = () => {
  const user = useSelector((state) => state.user);
  const [openProfileAvatarEdit, setProfileAvatarEdit] = useState(false);
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile
  });

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
      const { name, value} = e.target;
      setUserData((prev) => {
        return {
          ...prev,
          [name]: value
        }
      });
  }

  useEffect(() => {
    setUserData({
      name: user.name,
      email: user.email,
      mobile: user.mobile
    })
  }, [user])

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.updateUser,
        data: userData
      })

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        const userData = await fetchUserDetails();
        dispatch(setUserDetails(userData.data));
      }
    }
    catch(err) {
      AxiosToastError(err);
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className='p-2'>
      {/* profile upload and display image */}
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
      <button onClick={() => setProfileAvatarEdit(true)} className='text-sm border-primary-200 hover:bg-primary-100 hover:border-primary-100 border w-28 px-3 py-1 rounded-full mt-3'>
        Edit
      </button>
      {
        openProfileAvatarEdit && (
          <UserProfileAvatarEdit close={() => setProfileAvatarEdit(false)} />
        )
      }

      {/* name, mobile , email, change password */}
      <form className='my-4 grid gap-4' onSubmit={handleSubmit}>
        <div className='grid gap-1'>
          <label htmlFor='name'>Name :</label>
          <input type='text'
            id='name'
            placeholder='Enter your name'
            className='p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded'
            value={userData.name}
            onChange={handleOnChange}
            name='name'
            required
          />
        </div>
        <div className='grid gap-1'>
          <label htmlFor='email'>Email :</label>
          <input type='email'
            id='email'
            placeholder='Enter your email'
            className='p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded'
            value={userData.email}
            onChange={handleOnChange}
            name='email'
            required
          />
        </div>
        <div className='grid gap-1'>
          <label htmlFor='mbl'>Mobile :</label>
          <input type='text'
            id='mbl'
            placeholder='Enter your number'
            className='p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded'
            value={userData.mobile}
            onChange={handleOnChange}
            name='mobile'
            required
          />
        </div>

        <button className='border px-4 py-2 font-semibold hover:bg-primary-100 text-primary-200 border-primary-100 hover:text-neutral-800 rounded'>
          {
            loading ? "Loading..." : "Submit"
          }
        </button>
      </form>
    </div>
  )
}

export default Profile
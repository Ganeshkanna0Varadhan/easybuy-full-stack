import React, { useEffect, useState } from 'react'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import { SummaryApi } from '../common/summaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { fetchUserDetails } from '../utils/fetchUser';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';
const Login = () => {

  const [data, setData] = useState({
    email: "",
    password: ""
  })

  const [showPassword, setShowPassword] = useState(false);
  const [validateValue, setValidateValue] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  } 

  useEffect(() => {
    const value = (Object.values(data)).every(val => val);
    setValidateValue(value);
  }, [data])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.login,
        data: data
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("accessToken", response.data?.data?.accessToken);
        localStorage.setItem("refreshToken", response.data?.data?.refreshToken);

        const userDetails = await fetchUserDetails();
        dispatch(setUserDetails(userDetails.data));

        setData({
          email: "",
          password: ""
        });
        
        navigate("/");
      }
    }
    catch(err) {
      AxiosToastError(err);
    }
    

  }

  return (
    <section className='w-full container mx-auto px-2'>
      <div className='bg-white my-6 w-full max-w-lg mx-auto rounded p-4'>
        <p className='text-center'>Login to <span className='text-primary-200 font-semibold'>Easybuy</span></p>
      
        <form action="" className='grid gap-5 mt-6' onSubmit={handleSubmit}>
           <div className='grid gap-1'> 
              <label htmlFor='email'>Email :</label>
              <input type='email' 
                      id='email'
                      name='email'
                      className='bg-blue-50 p-2 border rounded outline-none focus:border-primary-200'
                      value={data.email}
                      onChange={handleChange}
                      placeholder='Enter you email'
              />
           </div> 
           <div className='grid gap-1'> 
                <label htmlFor='pass'>Password :</label>
                <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
                    <input type={showPassword ? 'text' : 'password'}
                        id='pass'
                        name='password' 
                        minLength={8}
                        className='outline-none w-full'
                        value={data.password}
                        onChange={handleChange}
                        placeholder='Enter your password'
                    />
                    <div onClick={() => setShowPassword(prev => !prev)} className='cursor-pointer'> 
                    {
                        showPassword ? (
                        <FaEye/>
                        ) : (
                        <FaEyeSlash/>
                        )
                    }
                    </div>
                </div>
                <Link to={"/forgot-password"} className='block ml-auto hover:text-primary-200'>Forgot password?</Link>
           </div>  
           <button disabled={!validateValue} className={` ${validateValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500" }  text-white py-2 rounded font-semibold tracking-wide`}>Login</button>
        </form>
        <p>
          Don't have account ? <Link to={"/register"} className="font-semibold text-primary-200 hover:text-primary-100">Register</Link>
        </p>
      </div>
    </section>
  )
}

export default Login;
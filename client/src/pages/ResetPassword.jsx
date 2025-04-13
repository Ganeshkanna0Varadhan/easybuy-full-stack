import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Axios from '../utils/Axios';
import { SummaryApi } from '../common/summaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const ResetPassword = () => {
    const location = useLocation();
    const [data, setData] = useState({
        email: "",
        newPassword: "",
        confirmPassword: ""
    })

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [validateValue, setValidateValue] = useState(false);
    const navigate = useNavigate();
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

    useEffect(() => {
        // if (!(location?.state?.data?.success)) {
        //     navigate("/");
        // }

        if (location?.state?.email) {
            setData((prev) => {
                return {
                    ...prev,
                    email: location.state.email
                }
            })
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            if (data.newPassword !== data.confirmPassword) {
                toast.error("New password and Confirm password must be same");
                return;
            }
        
            const response = await Axios({
                ...SummaryApi.reset_password,
                data: data
            });
        
            if (response.data.error) {
                toast.error(response.data.message);
            }
        
            if (response.data.success) {
                toast.success(response.data.message);
                setData({
                    email: "",
                    newPassword: "",
                    confirmPassword: ""
                });
                navigate("/login");
            }
        }
        catch(err) {
          AxiosToastError(err);
        }
        
    
    }


    return (
        <section className='w-full container mx-auto px-2'>
        <div className='bg-white my-6 w-full max-w-lg mx-auto rounded p-4'>
          <p className='text-center'><span className='text-primary-200 font-semibold'>Reset password</span></p>
            <form action="" className='grid gap-5 mt-6' onSubmit={handleSubmit}>
                <div className='grid gap-1'> 
                    <label htmlFor='pass'>New Password :</label>
                    <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
                        <input type={showPassword ? 'text' : 'password'}
                            id='pass'
                            name='newPassword' 
                            minLength={8}
                            className='outline-none w-full'
                            value={data.newPassword}
                            onChange={handleChange}
                            placeholder='Enter your new password'
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
                </div>  
                <div className='grid gap-1'> 
                    <label htmlFor='cnfpass'>Confirm Password :</label>
                    <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
                        <input type={showConfirmPassword ? 'text' : 'password'}
                            id='cnfpass'
                            name='confirmPassword' 
                            minLength={8}
                            className='outline-none w-full'
                            value={data.confirmPassword}
                            onChange={handleChange}
                            placeholder='Enter your confirm password'
                        />
                        <div onClick={() => setShowConfirmPassword(prev => !prev)} className='cursor-pointer'> 
                        {
                            showPassword ? (
                            <FaEye/>
                            ) : (
                            <FaEyeSlash/>
                            )
                        }
                        </div>
                    </div>
                </div>  
                <button disabled={!validateValue} className={` ${validateValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500" }  text-white py-2 rounded font-semibold my-3 tracking-wide`}>Change Password</button>
            </form>
            <p>
                Already have account? <Link to={"/login"} className="font-semibold text-primary-200 hover:text-primary-100">Login</Link>
            </p>
        </div>
      </section>
    )
}

export default ResetPassword
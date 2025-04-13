import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import { SummaryApi } from '../common/summaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ForgotPasword = () => {

    const [data, setData] = useState({
      email: "",
    })
  
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
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await Axios({
          ...SummaryApi.forgot_password,
          data: data
        });
  
        if (response.data.error) {
          toast.error(response.data.message);
        }
  
        if (response.data.success) {
          toast.success(response.data.message);
          navigate("/verification-otp", {
            state: {
                email: data.email
            }
          });
          setData({
            email: "",
          });
        }
      }
      catch(err) {
        AxiosToastError(err);
      }
      
  
    }
  
    return (
      <section className='w-full container mx-auto px-2'>
        <div className='bg-white my-6 w-full max-w-lg mx-auto rounded p-4'>
          <p className='text-center'><span className='text-primary-200 font-semibold'>Forgot password</span></p>
        
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
             <button disabled={!validateValue} className={` ${validateValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500" }  text-white py-2 rounded font-semibold my-3 tracking-wide`}>Send OTP</button>
          </form>
          <p>
            Already have account? <Link to={"/login"} className="font-semibold text-primary-200 hover:text-primary-100">Login</Link>
          </p>
        </div>
      </section>
    )
  }
  
  export default ForgotPasword;
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import { SummaryApi } from '../common/summaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const OtpVerification = () => {
    const [data, setData] = useState(["","","","","",""]);
    const [validateValue, setValidateValue] = useState(false);
    const inputRef = useRef([]);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!location?.state?.email) {
            navigate('/forgot-password');
        }
        const value = data.every(val => val);
        setValidateValue(value);
    }, [data])
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await Axios({
          ...SummaryApi.otp_verification,
          data: {
            otp: data.join(""),
            email: location?.state?.email
          }
        });
  
        if (response.data.error) {
          toast.error(response.data.message);
        }
  
        if (response.data.success) {
          toast.success(response.data.message);
          setData(["","","","","",""]);
          navigate("/reset-password", {
            state: {
                data: response.data,
                email: location?.state?.email
            }
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
          <p className='text-center'><span className='text-primary-200 font-semibold'>OTP Verfication</span></p>
        
          <form action="" className='grid gap-5 mt-6' onSubmit={handleSubmit}>
             <div className='grid gap-1'> 
                <label htmlFor='otp'>Email :</label>
                <div className='flex items-center gap-2 justify-between mt-3'>
                    {
                        data.map((element, index) => {
                            return (
                                <input type='text'
                                        key={'otp'+[index]} 
                                        id='otp'
                                        ref={(ref) => {
                                            inputRef.current[index] = ref;
                                            return ref
                                        }}
                                        value={data[index]}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            const newData = [...data];
                                            newData[index] = value;
                                            setData(newData);

                                            if (value && index < 5) {
                                                inputRef.current[index+1].focus();
                                            }
                                        }}
                                        maxLength={1}
                                        className='bg-blue-50 w-full max-w-16 p-2 border
                                                    rounded outline-none
                                                    focus:border-primary-200
                                                    text-center font-bold'
                                />
                            )
                        })
                    }
                </div>
             </div> 
             <button disabled={!validateValue} className={` ${validateValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500" }  text-white py-2 rounded font-semibold my-3 tracking-wide`}>Verify OTP</button>
          </form>
          <p>
            Already have account? <Link to={"/login"} className="font-semibold text-primary-200 hover:text-primary-100">Login</Link>
          </p>
        </div>
      </section>
    )
  }
  
  export default OtpVerification;
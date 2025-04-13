import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import Header from './component/header';
import Footer from './component/footer';
import   { Toaster } from 'react-hot-toast';
import { fetchUserDetails } from './utils/fetchUser';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import Axios from './utils/Axios';
import { SummaryApi } from './common/summaryApi';
import { setAllCategory, setAllSubCategory, setLoadingCategory } from './store/productSlice';
import AxiosToastError from './utils/AxiosToastError';
import GlobalProvider from './provider/GlobalProvider';
import { BsCart4 } from 'react-icons/bs';
import { BiCartAdd } from 'react-icons/bi';
import CartMobileLink from './component/CartMobileLink';
function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  const fetchUser = async () => {
    const userData = await fetchUserDetails();
    if (userData) {
      dispatch(setUserDetails(userData.data));
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token"); // or however you store auth
    if (token) {
      fetchUser();
    }
    fetchCategory();
    fetchSubCategory();
  }, []);

  const fetchCategory = async () => {
      try {
        dispatch(setLoadingCategory(true));
        const response = await Axios({
            ...SummaryApi.getCategory,
        });

        const { data : responseData } = response;

        if (responseData.success) {
          dispatch(setAllCategory(responseData.data))
            // setCategoryData(responseData.data);
        }

      } catch (err) {
          AxiosToastError(err);
      } finally {
        dispatch(setLoadingCategory(false));
      }
  }

  const fetchSubCategory = async () => {
    try {
      const response = await Axios({
          ...SummaryApi.getSubCategory,
      });

      const { data : responseData } = response;

      if (responseData.success) {
        dispatch(setAllSubCategory(responseData.data))
      }

    } catch (err) {
        AxiosToastError(err);
    } 
  }

  return (
    <GlobalProvider>
      <Header/>
      <main className='min-h-[75vh]'>
        <Outlet/>
      </main>
      <Footer/>
      <Toaster/>
      {
        location.pathname !== '/checkout' && (
          <CartMobileLink/>
        )
      }
    </GlobalProvider>

  )
}

export default App;

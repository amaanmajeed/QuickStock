import './App.css';
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import AddProduct from './pages/AddProduct';
import ViewProduct from './pages/ViewProduct';
import EditProfile from './pages/EditProfile';
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Forgot from './pages/Forgot';
import ResetPassword from './pages/ResetPassword';
import Home from './pages/Home';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getLoginStatus } from './services/authService';
import { SET_LOGIN } from './redux/features/auth/authSlice';
import ViewUser from './pages/ViewUser';
import EditProduct from './pages/EditProduct';
import ChangePassword from './pages/ChangePassword';
// import Loader from './components/Loader';

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status))
    }
    loginStatus()
  }, [dispatch])
  
    return (
      <>
        <BrowserRouter>
          <ToastContainer />
          <Routes>
            <Route path="/products" element={<AddProduct />} />
            <Route path="/productdetails/:id" element={<ViewProduct/>} />
            <Route path="/editproduct/:id" element={<EditProduct/>} />
            <Route path="/profile/" element={<ViewUser/>} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/resetpassword/:resetToken" element={<ResetPassword />} />
            <Route path="/" element={<Home />}></Route>
          </Routes>
        </BrowserRouter>
        {/* <Loader/> */}
      </>
    );
  }

  export default App;


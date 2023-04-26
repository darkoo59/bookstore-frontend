import axios, { AxiosError, HttpStatusCode } from "axios";
import LoginForm from "../components/login-form";
import Navbar from "../components/navbar";
import BannerBackground from "../images/banner-background.png";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE_URL } from "../config";
const Login = () => {
  interface ErrorResponse {
    errorMessage: string;
  }
  const login = async (data: any) => {
    try {
      const response = await axios.post(API_BASE_URL+'/user/login', data, { withCredentials: true })
      if (response.status === HttpStatusCode.Ok) {
        const respData = response.data
        axios.defaults.headers.common['Authorization'] = `Bearer ${respData['access_token']}`
        window.location.replace('/');
        toast.success('Successfully logged in', {position: toast.POSITION.BOTTOM_CENTER});
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<ErrorResponse>;
        if (axiosError.response?.data.errorMessage.includes('Incorrect email or password')) {     
          toast.error(axiosError.response.data.errorMessage, {position: toast.POSITION.BOTTOM_CENTER});
        }
        else {
            toast.error('Sorry, we\'re experiencing some technical difficulties. Please try again later.', {position: toast.POSITION.BOTTOM_CENTER});
        }
      }
    }
  }

  return (
    <div>
        <ToastContainer/>
    <div className="home-container">
        <Navbar/>
        <div className="home-banner-containter">
            <div className="home-bannerImage-container">
            <img src={BannerBackground} alt="" />
            </div>
            </div>
            <div className="registration-container">
        </div>
    </div>
    <LoginForm onSubmit={login}/>
    </div>
  );
};

export default Login;
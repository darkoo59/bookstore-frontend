import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../components/navbar";
import RegistrationForm from "../components/registration-form";
import { API_BASE_URL } from '../config';
import BannerBackground from "../images/banner-background.png";
import { User } from "../model/user";

const Registration = () => {
  const navigate = useNavigate();

  const onRegistrationSubmit = async (user: User) => {
    try {
      await axios.post(API_BASE_URL + '/user/register', user)
      toast.success('User successfully registered. Redirecting to login in 5 seconds!', { position: toast.POSITION.BOTTOM_CENTER });
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<string>;
        if (axiosError.response?.status === 400) {
          toast.error(axiosError.response.data, { position: toast.POSITION.BOTTOM_CENTER });
        }
        else {
          const axiosError = err as AxiosError<string>;
          toast.error(axiosError.response?.data, { position: toast.POSITION.BOTTOM_CENTER });
        }
      }
    }
  }

  return (
    <div>
      <ToastContainer />
      <div className="home-container">
        <Navbar />
        <div className="home-banner-containter">
          <div className="home-bannerImage-container">
            <img src={BannerBackground} alt="" />
          </div>
        </div>
        <div className="registration-container">
        </div>
      </div>
      <RegistrationForm onSubmit={onRegistrationSubmit}></RegistrationForm>
    </div>
  );
};

export default Registration;
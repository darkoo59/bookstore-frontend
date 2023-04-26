import Navbar from "../components/navbar";
import RegistrationForm from "../components/registration-form";
import BannerBackground from "../images/banner-background.png";
import BannerImage from "../images/banner-image.png";
import { FiArrowRight } from "react-icons/fi";
import { toast, ToastContainer } from 'react-toastify';
import { User } from "../model/user";
import { API_BASE_URL } from '../config';
import axios, { AxiosError } from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
const Registration = () => {
    const navigate = useNavigate();
    interface ErrorResponse {
        error: string;
      }

      const onRegistrationSubmit = async (user: User) => {
        console.log(user)
        try {
          await axios.post(API_BASE_URL+'/user/register', user)
          toast.success('User successfully registered. Redirecting to login in 5 seconds!', {position: toast.POSITION.BOTTOM_CENTER});
          setTimeout(() => {
            navigate("/login");
          }, 5000);
        } catch (err: unknown) {
          if (axios.isAxiosError(err)) {
            const axiosError = err as AxiosError<string>;
            if (axiosError.response?.status === 400) {     
              toast.error(axiosError.response.data, {position: toast.POSITION.BOTTOM_CENTER});
            }
            else {
                const axiosError = err as AxiosError<string>;
                toast.error(axiosError.response?.data, {position: toast.POSITION.BOTTOM_CENTER});
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
    <RegistrationForm onSubmit={onRegistrationSubmit}></RegistrationForm>
    </div>
  );
};

export default Registration;

import * as React from "react";
import BannerBackground from "../images/banner-background.png";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { API_BASE_URL } from '../config';
import { Book } from '../model/book';
import { BookCard } from '../components/book-card';
import Navbar from "../components/navbar";
import { useIsAuthenticated } from "react-auth-kit";
import { OrderCard } from "../components/order-card";
import { MyOrder } from "../model/my-order";

const MyOrders = () => {
     const [orders, setOrders] = React.useState<MyOrder[]>([]);
    
    React.useEffect(() => {
      fetchOrders();
    }, []);
  
    const fetchOrders = async () => {
        const token = document.cookie.match('(^|;)\\s*' + "accessToken" + '\\s*=\\s*([^;]+)')?.pop() || '';
        const requestOptions = {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}`, },
        };
        const response = await fetch(API_BASE_URL+'/order/my-orders',requestOptions);
        const data = await response.json();
        setOrders(data);
    }
  return (
    <div>
    <div className="home-container">
    <Navbar/>
    <div className="home-banner-containter">
            <div className="home-bannerImage-container">
            <img src={BannerBackground} alt="" />
            </div>
    </div>
    </div>
    <div>
    </div>
    <div className="card-container">
    {orders.map((order) => (
            <React.Fragment key={order.id}>
                <OrderCard order={order} />
            </React.Fragment>
        ))}
        </div> 
    </div>
  );
};

export default MyOrders;
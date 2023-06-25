
import * as React from "react";
import Navbar from "../components/navbar";
import { OrderCard } from "../components/order-card";
import { API_BASE_URL } from '../config';
import BannerBackground from "../images/banner-background.png";
import { MyOrder } from "../model/my-order";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";

const MyOrders = () => {
  const [orders, setOrders] = React.useState<MyOrder[]>([]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const token = document.cookie.match('(^|;)\\s*' + "accessToken" + '\\s*=\\s*([^;]+)')?.pop() || '';
    
    const requestOptions = {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}`, },
    };
    const response = await fetch(API_BASE_URL + '/order/my-orders', requestOptions);
    const data = await response.json();
    setOrders(data);
  }
  return (
    <div>
      <div className="home-container">
        <Navbar />
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
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from "@mui/icons-material/Info";
import { Drawer, Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import axios, { AxiosError } from 'axios';
import React from 'react';
import { useIsAuthenticated } from "react-auth-kit";
import { ToastContainer, toast } from 'react-toastify';
import { API_BASE_URL } from '../config';
import { useShoppingCart } from "../context/ShoppingCartContext";
import { DiscountDTO } from '../dto/discountDTO';
import { Book } from '../model/book';
import { formatCurrency } from "../utilities/formatCurrency";
import { CartItem } from './cart-item';

type ShoppingCartProps = {
  isOpen: boolean
}

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart()
  const [books, setBooks] = React.useState<Book[]>([]);
  const [discount, setDiscount] = React.useState<DiscountDTO>({ price: 0.0, discountReason: undefined });
  const isAuthenticated = useIsAuthenticated()

  React.useEffect(() => {
    fetchBooks();
  }, []);

  React.useEffect(() => {
    if (isAuthenticated()) {
      fetchDiscount();
    }
  }, [closeCart])

  const fetchBooks = async () => {
    const response = await fetch(API_BASE_URL + '/book');
    const data = await response.json();
    setBooks(data);
  }

  const fetchDiscount = async () => {
    const items = []
    for (let i = 0; i < books.length; i++) {
      const item = {
        book: books[i],
        quantity: cartItems.find(j => j.id === books[i].id)?.quantity,
        price: books[i].price
      };
      if (item.quantity)
        items.push(item);
    }
    const token = document.cookie.match('(^|;)\\s*' + "accessToken" + '\\s*=\\s*([^;]+)')?.pop() || '';
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        items: items,
        totalPrice: cartItems.reduce((total, cartItem) => {
          const item = books.find(i => i.id === cartItem.id)
          return total + (item?.price || 0) * cartItem.quantity
        }, 0),
      }),
    };

    try {
      const response = await fetch(API_BASE_URL + '/order/discount', requestOptions);
      if (response.ok) {
        const data = await response.json();
        const updatedDiscount: DiscountDTO = {
          price: data.price,
          discountReason: data.discountReason,
        };
        setDiscount(updatedDiscount);
      } else {
        toast.warn(
          'Oops! Something went wrong on our end. We apologize for the inconvenience. Please try again later or contact our support team for assistance.', 
          { position: toast.POSITION.BOTTOM_CENTER }
        );
      }
    } catch (error) {}

  }

  const printMessage = () => {
    let messages = "";
    discount.discountReason?.map(message => {
      messages += `${message}\n`;
    });
    return messages;
  }

  const makeDeliveryPaymentOrder = async () => {
    const items = []
    for (let i = 0; i < books.length; i++) {
      const item = {
        bookId: books[i].id,
        quantity: cartItems.find(j => j.id === books[i].id)?.quantity,
        price: books[i].price
      };
      if (item.quantity)
        items.push(item);
    }

    try {
      toast.success('Order made succcessfully!', { position: toast.POSITION.BOTTOM_CENTER });
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<string>;
        toast.error(axiosError.response?.data, { position: toast.POSITION.BOTTOM_CENTER });
      }
    }
  }

  return (
    <Drawer anchor="right" open={isOpen} onClose={closeCart} PaperProps={{ style: { width: '25%' } }} >
      <ToastContainer />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Store
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={closeCart}
            sx={{ marginRight: -12 }}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Stack gap={3}>
        {cartItems.map(item => (
          <CartItem key={item.id} {...item} />
        ))}
        <div className="ms-auto fw-bold fs-8">
          Total:   {formatCurrency(cartItems.reduce((total, cartItem) => {
            const item = books.find(i => i.id === cartItem.id)
            return total + (item?.price || 0) * cartItem.quantity
          }, 0))}
        </div>

        {discount.discountReason !== undefined && discount.discountReason.length !== 0 ? <div className="d-flex align-items-center ms-auto">
          <div className="me-2 fw-bold fs-4">
            <InfoIcon titleAccess= { printMessage() } />
          </div>
          <div className="fw-bold fs-4">
            After discount: {formatCurrency(discount.price)}
          </div>
        </div> : null}
        <div className="d-flex align-items-center ms-auto">
          <button className="secondary-button" onClick={makeDeliveryPaymentOrder}>Delivery payment</button>
        </div>
      </Stack>
    </Drawer>
  )
}
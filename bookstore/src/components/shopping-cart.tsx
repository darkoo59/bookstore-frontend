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
import { API_BASE_URL, BANK_ACCOUNT_NUMBER } from '../config';
import { useShoppingCart } from "../context/ShoppingCartContext";
import { DiscountDTO } from '../dto/discountDTO';
import { Book } from '../model/book';
import { formatCurrency } from "../utilities/formatCurrency";
import { CartItem } from './cart-item';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { Category } from '@mui/icons-material';

type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart();
  const [books, setBooks] = React.useState<Book[]>([]);
  const [discount, setDiscount] = React.useState<DiscountDTO>({ price: 0.0, discountReason: undefined });
  const isAuthenticated = useIsAuthenticated()
  const [open, setOpen] = React.useState(false);
  const [ip, setIP] = React.useState("");

  const getIpAddress = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    console.log(res.data);
    setIP(res.data.ip);
  };

  const [formData, setFormData] = React.useState({
    accountNumber: BANK_ACCOUNT_NUMBER,
    ownerName: "",
    amount: discount.price === 0
    ? cartItems.reduce((total, cartItem) => {
        const item = books.find(i => i.id === cartItem.id);
        return total + ((item?.price || 0) * cartItem.quantity);
      }, 0)
    : discount.price,
    creditCardNumber: "",
    expirationDate: "",
    cvv_cvc: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    fetchBooks();
  }, []);

  React.useEffect(() => {
    if (isAuthenticated()) {
      fetchDiscount();
    }
  }, [closeCart]);

  React.useEffect(() => {
    getIpAddress()
  }, [])

  const fetchBooks = async () => {
    const response = await fetch(API_BASE_URL + '/book');
    const data = await response.json();
    setBooks(data);
  }

  const fetchDiscount = async () => {
    const items = [];
    for (let i = 0; i < books.length; i++) {
      const item = {
        book: books[i],
        quantity: cartItems.find(j => j.id === books[i].id)?.quantity,
        price: books[i].price
      };
      if (item.quantity)
        items.push(item);
    }
    const token =
      document.cookie
        .match("(^|;)\\s*" + "accessToken" + "\\s*=\\s*([^;]+)")
        ?.pop() || "";
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
        setFormData({
          accountNumber: BANK_ACCOUNT_NUMBER,
          ownerName: "",
          amount: discount.price === 0
          ? cartItems.reduce((total, cartItem) => {
              const item = books.find(i => i.id === cartItem.id);
              return total + ((item?.price || 0) * cartItem.quantity);
            }, 0)
          : discount.price,
          creditCardNumber: "",
          expirationDate: "",
          cvv_cvc: "",
        });
      } else {
        toast.warn(
          'Oops! Something went wrong on our end. We apologize for the inconvenience. Please try again later or contact our support team for assistance.',
          { position: toast.POSITION.BOTTOM_CENTER }
        );
      }
    } catch (error) { }

  }

  const printMessage = () => {
    let messages = "";
    discount.discountReason?.map(message => {
      messages += `${message}\n`;
    });
    return messages;
  }

  const makeCreditCardPaymentOrder = async () => {
    console.log('darko')
  }

  const makeDeliveryPaymentOrder = async () => {
    const items = [];
    for (let i = 0; i < books.length; i++) {
      const item = {
        bookId: books[i].id,
        quantity: cartItems.find((j) => j.id === books[i].id)?.quantity,
        price: books[i].price,
      };
      if (item.quantity) items.push(item);
    }
    const token =
      document.cookie
        .match("(^|;)\\s*" + "accessToken" + "\\s*=\\s*([^;]+)")
        ?.pop() || "";

    try {
      await axios.post(
        API_BASE_URL + "/order/delivery-payment",
        {
          items: items,
          totalPrice: discount.price
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );
      toast.success("Order made succcessfully!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<string>;
        toast.error(axiosError.response?.data, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    }
  };
  
  const handlePay = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8081/api/transaction", // Replace with your actual endpoint
        {
          ...formData,
          // Add any additional data you need to send to the server
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Forwarded-For": ip
          }
        });
        setOpen(false);
        toast.success("Transaction made successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        setFormData({
          accountNumber: BANK_ACCOUNT_NUMBER,
          amount: discount.price,
          creditCardNumber: "",
          expirationDate: "",
          cvv_cvc: "",
          ownerName: ""
        });
    }
      catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          toast.error(err.response?.data.error, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      }
  };

  return (
    <div>
      <ToastContainer />
    <Drawer anchor="right" open={isOpen} onClose={closeCart} PaperProps={{ style: { width: '25%' } }} >
      <ToastContainer />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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
            <InfoIcon titleAccess={printMessage()} />
          </div>
          <div className="fw-bold fs-4">
            After discount: {formatCurrency(discount.price)}
          </div>
        </div> : null}
        <div className="d-flex align-items-center ms-auto">
          <button className="secondary-button" onClick={makeDeliveryPaymentOrder}>Delivery payment</button>
          <button className="secondary-button" onClick={handleClickOpen}>Credit card payment</button>
        </div>
      </Stack>
    </Drawer>
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter your payment details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Recipient account number"
            type="text"
            fullWidth
            variant="standard"
            value={formData.accountNumber}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Amount of money"
            type="number"
            fullWidth
            variant="standard"
            value={formData.amount}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="Credit card number"
            type="text"
            fullWidth
            variant="standard"
            value={formData.creditCardNumber}
            onChange={(e) => setFormData({...formData, creditCardNumber: e.target.value})}
          />
          <TextField
            autoFocus
            required
            id="name"
            label="Expiration date"
            type="date"
            fullWidth
            variant="standard"
            value={formData.expirationDate}
            onChange={(e) => setFormData({...formData, expirationDate: e.target.value})}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="CVV/CVC"
            type="text"
            fullWidth
            variant="standard"
            value={formData.cvv_cvc}
            onChange={(e) => setFormData({...formData, cvv_cvc: e.target.value})}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="Name of the owner"
            type="text"
            fullWidth
            variant="standard"
            value={formData.ownerName}
            onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handlePay}>Pay</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

import React from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { Drawer, Stack } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { CartItem } from "./cart-item";
import { Book } from "../model/book";
import { API_BASE_URL } from "../config";
import { DiscountDTO } from "../dto/discountDTO";
import { useIsAuthenticated } from "react-auth-kit";
import InfoIcon from "@mui/icons-material/Info";
import axios, { AxiosError } from "axios";
import { ToastContainer, toast } from "react-toastify";

type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart();
  const [books, setBooks] = React.useState<Book[]>([]);
  const [discount, setDiscount] = React.useState<DiscountDTO>({
    finalPrice: 0.0,
    message: undefined,
  });
  const isAuthenticated = useIsAuthenticated();

  React.useEffect(() => {
    fetchBooks();
  }, []);

  React.useEffect(() => {
    if (isAuthenticated()) {
      fetchDiscount();
    }
  }, [closeCart]);

  const fetchBooks = async () => {
    const response = await fetch(API_BASE_URL + "/book");
    const data = await response.json();
    setBooks(data);
  };

  const fetchDiscount = async () => {
    const items = [];
    for (let i = 0; i < books.length; i++) {
      console.log("nova knjigaa");
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
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        items: items,
        totalPrice: cartItems.reduce((total, cartItem) => {
          const item = books.find((i) => i.id === cartItem.id);
          return total + (item?.price || 0) * cartItem.quantity;
        }, 0),
      }),
    };
    const response = await fetch(
      API_BASE_URL + "/order/discount",
      requestOptions
    );
    const data = await response.json();
    setDiscount(data);
  };

  const removeFromCart = () => {
    fetchDiscount();
    closeCart();
  };

  const printMessage = () => {
    let messageString = "";
    discount.message?.map((message) => {
      messageString += `${message}\n`;
    });
    return messageString;
  };

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
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        items: items,
        totalPrice: discount.finalPrice,
      }),
    };
    try {
      const response = await fetch(
        API_BASE_URL + "/order/delivery-payment",
        requestOptions
      );
      toast.success("Order maked succcessfully!", {
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

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={closeCart}
      PaperProps={{ style: { width: "25%" } }}
    >
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
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
        <div className="ms-auto fw-bold fs-8">
          Total:{" "}
          {formatCurrency(
            cartItems.reduce((total, cartItem) => {
              const item = books.find((i) => i.id === cartItem.id);
              return total + (item?.price || 0) * cartItem.quantity;
            }, 0)
          )}
        </div>

        {discount.message != undefined && discount.message[0] != "" ? (
          <div className="d-flex align-items-center ms-auto">
            <div className="me-2 fw-bold fs-4">
              <InfoIcon titleAccess={printMessage()} />
            </div>
            <div className="fw-bold fs-4">
              After discount: {formatCurrency(discount.finalPrice)}
            </div>
          </div>
        ) : null}
        <div className="d-flex align-items-center ms-auto">
          <button
            className="secondary-button"
            onClick={makeDeliveryPaymentOrder}
          >
            Delivery payment
          </button>
        </div>
      </Stack>
    </Drawer>
  );
}

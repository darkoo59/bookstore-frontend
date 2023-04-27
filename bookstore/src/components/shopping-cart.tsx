import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utilities/formatCurrency"
import { Drawer, List, ListItem, ListItemText, Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { CartItem } from './cart-item';
import { Book } from '../model/book';
import { API_BASE_URL } from '../config';

type ShoppingCartProps = {
  isOpen: boolean
}

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart()
  const [books, setBooks] = React.useState<Book[]>([]);
    
  React.useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const response = await fetch(API_BASE_URL+'/book');
    const data = await response.json();
    setBooks(data);
  }
  return (
<Drawer anchor="right" open={isOpen} onClose={closeCart} PaperProps={{ style: { width: '25%' } }} >
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
  <Stack gap = {3}>
    {cartItems.map(item => (
        <CartItem key={item.id} {...item} />
    ))}
    <div className="ms-auto fw-bold fs-5">
        Total:   {formatCurrency(cartItems.reduce((total,cartItem) => {
            const item = books.find(i => i.id === cartItem.id)
            return total + (item?.price || 0) * cartItem.quantity
        }, 0))}
    </div>
    </Stack>
</Drawer>
  )
}
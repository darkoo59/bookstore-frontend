import React from "react";
import { useShoppingCart } from "../context/ShoppingCartContext"
import { API_BASE_URL } from "../config";
import { Book } from "../model/book";
import { formatCurrency } from "../utilities/formatCurrency";
import { Button, Stack } from "@mui/material";

type CartItemProps = {
    id: number
    quantity: number
}
export function CartItem({id, quantity}: CartItemProps) {

    const [books, setBooks] = React.useState<Book[]>([]);
    
    React.useEffect(() => {
      fetchBooks();
    }, []);
  
    const fetchBooks = async () => {
      const response = await fetch(API_BASE_URL+'/book');
      const data = await response.json();
      setBooks(data);
    }

    const {removeFromCart} = useShoppingCart()

    const item = books.find(b => b.id === id)

    if(item == null) return null;

    return (
        <Stack direction="row" gap={2} className="d-flex align-items-center">
            <div className="me-auto">
                <div>
                    <span style={{fontSize: "1.15rem"}}>{item.title}</span> {quantity > 1 && (<span className="text-muted ml-20" style={{fontSize: "1.0rem"}}>x{quantity}</span>)}
                </div>
                <div className="text-muted" style={{fontSize: ".75rem"}}>{formatCurrency(item.price)}</div>
            </div>
            <div>{formatCurrency(item.price * quantity)}</div>
            <Button variant="outlined" onClick={() => removeFromCart(item.id)}>&times;</Button>
        </Stack>
    )
}
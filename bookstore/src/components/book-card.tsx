import { Book } from "../model/book";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useIsAuthenticated } from "react-auth-kit";
import { formatCurrency } from "../utilities/formatCurrency";
import { Button } from "@mui/material";
import { useShoppingCart } from "../context/ShoppingCartContext";

export function BookCard({ book } : {book : Book}) {
  const isAuthenticated = useIsAuthenticated()
  const {getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart} = useShoppingCart()
  let quantity = getItemQuantity(book.id)
    return (
      <Card variant="outlined" className="card">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {book.genre}
          </Typography>
          <Typography variant="h5" component="div" className="d-flex justify-content-between align-items-baseline mb-4">
            {book.title}
            <span className="ms-2 text-muted h3">{formatCurrency(book.price)}</span>
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {book.author}
          </Typography>
          <Typography variant="body2">
            <i>Publisher: </i>{book.publisher}
          </Typography>
          <Typography variant="body2">
            <i>Number of pages: </i>{book.numberOfPages}
          </Typography>
        </CardContent>
        {isAuthenticated() ? (<CardActions className="d-flex flex-column">
          <div className="mt-auto">{quantity === 0 ? (
        <button className="secondary-button" onClick={() => increaseCartQuantity(book.id)}>
                    Add to cart
                </button>) : (<div className="d-flex align-items-center flex-column" style={{ gap: ".5rem"}}>
                  <div className="d-flex align-items-center justify-content-center" style={{gap: ".5rem"}}>
                  <button className="secondary-button" onClick={() => decreaseCartQuantity(book.id)}>-</button>
                  <div><span className="fs-3">{quantity}</span> in cart</div>
                  <button className="secondary-button" onClick={() => increaseCartQuantity(book.id)}>+</button>
                </div>
                <button type="button" className="btn btn-danger rounded-circle" onClick={() => removeFromCart(book.id)}>Remove</button>
                 </div> )}
          </div>
        </CardActions>) : null}
      </Card>
    );
  }
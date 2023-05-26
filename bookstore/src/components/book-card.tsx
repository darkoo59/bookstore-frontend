import { Book } from "../model/book";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { useIsAuthenticated } from "react-auth-kit";
import { formatCurrency } from "../utilities/formatCurrency";
import { Button } from "@mui/material";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { useEffect, useState } from "react";
import axios, { AxiosError, HttpStatusCode } from "axios";
import { API_BASE_URL } from "../config";
import { ToastContainer, toast } from "react-toastify";
import { RatingDTO } from "../dto/ratingDTO";

export function BookCard({ book, userRating } : {book : Book, userRating : number}) {
  const isAuthenticated = useIsAuthenticated()
  const {getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart} = useShoppingCart()
  const [hover, setHover] = useState<number | null>(null);
  const [rating, setRating] = useState<number>(userRating);
  const [isHovered, setIsHovered] = useState(false);
  const [bookToPresent, setBookToPresent] = useState<Book>(book);

  interface ErrorResponse {
    errorMessage: string;
  }

  const rateBook = async (value: number | null) => {
    const token = document.cookie.match('(^|;)\\s*' + "accessToken" + '\\s*=\\s*([^;]+)')?.pop() || '';
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
                 'Authorization': `Bearer ${token}`, },
      body: JSON.stringify({
        bookId: bookToPresent.id,
        rating: value,
      }),
    };
    const response = await fetch(API_BASE_URL+'/rating/rate', requestOptions)

    const requestOptionsBook = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json',
                 'Authorization': `Bearer ${token}`, },
    };
    const responseBook = await fetch(API_BASE_URL+'/book/byId/'+bookToPresent.id, requestOptionsBook)
    const dataBook = await responseBook.json();
    setBookToPresent(dataBook)
  }

  let quantity = getItemQuantity(bookToPresent.id)
    return (
      <Card variant="outlined" className="card">
        <ToastContainer/>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {bookToPresent.genre}
          </Typography>
          <Typography variant="h5" component="div" className="d-flex justify-content-between align-items-baseline mb-4">
            {bookToPresent.title}
            <span className="ms-2 text-muted h3">{formatCurrency(bookToPresent.price)}</span>
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {bookToPresent.author}
          </Typography>
          <Typography variant="body2">
            <i>Publisher: </i>{bookToPresent.publisher}
          </Typography>
          <Typography variant="body2">
            <i>Number of pages: </i>{bookToPresent.numberOfPages}
          </Typography>
          <Typography variant="body2">
          <i>Average rating: </i>{bookToPresent.averageRating}
          </Typography>
          <Rating name="size-small"  defaultValue={bookToPresent.averageRating} precision={0.1} disabled />
          {isAuthenticated() ? (
          <div>
          <Typography variant="body2">
          <i>Your rating: </i>{rating != -1 ? (rating) : <i>not rated yet</i>}
          </Typography>
          <Rating name="size-small"  defaultValue={rating} precision={0.1} disabled />
          </div>) : null}
        {isAuthenticated() ? (
        <div style={{marginTop: '3%'}}>
        <Typography><i>Rate again:</i>
         </Typography>
         <Rating name="size-small" precision={0.1}
          onChange={(event, newValue) => {
            if(newValue){
            setRating(newValue)
            rateBook(newValue)
            }
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
            setIsHovered(true)
          }}
          />
         </div>
         ) : null}
         {isHovered && hover != -1 ? (<span className="ms-2 text-muted h3">{hover}</span>) : <span></span>}
        </CardContent>
        {isAuthenticated() ? (<CardActions className="d-flex align-items-left flex-column">
          <div className="mt-auto">{quantity === 0 ? (
        <button className="secondary-button" onClick={() => increaseCartQuantity(book.id)}>
                    Add to cart
                </button>) : (<div className="d-flex align-items-center flex-column" style={{ gap: ".5rem"}}>
                  <div className="d-flex align-items-center justify-content-center" style={{gap: ".5rem"}}>
                  <button className="secondary-button" onClick={() => decreaseCartQuantity(bookToPresent.id)}>-</button>
                  <div><span className="fs-3">{quantity}</span> in cart</div>
                  <button className="secondary-button" onClick={() => increaseCartQuantity(bookToPresent.id)}>+</button>
                </div>
                <button type="button" className="btn btn-danger rounded-circle" onClick={() => removeFromCart(bookToPresent.id)}>Remove</button>
                 </div> )}
          </div>
        </CardActions>) : null}
      </Card>
    );
  }
import { CardContent, Chip, Typography, Stack} from "@mui/material";
import Card from '@mui/material/Card';
import { formatCurrency } from "../utilities/formatCurrency";
import { BookWithCharacteristics } from "../model/bookWithCharacteristics";
import StarRateIcon from '@mui/icons-material/StarRate';

interface BookWithCharacteristicsCardProps {
  bookWithCharacteristics: BookWithCharacteristics
}

const BookWithCharacteristicsCard = ({ bookWithCharacteristics } : BookWithCharacteristicsCardProps ) => {
  //const isAuthenticated = useIsAuthenticated()
  //const {getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart} = useShoppingCart()
  //let quantity = getItemQuantity(bookWithCharacteristics.book.id)
    return (
      <Card variant="outlined" className="card">
        <CardContent>
          <Stack direction="row" spacing={1} sx={{ mb: 3 }}  useFlexGap flexWrap="wrap">
            { bookWithCharacteristics.suggested && <Chip label="Suggested" color="primary" icon={<StarRateIcon/>}/>}
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
              { bookWithCharacteristics.new && <Chip label="New" color="secondary" /> }
              { bookWithCharacteristics.popular && <Chip label="Popular" color="secondary" /> }
              { bookWithCharacteristics.goodRated && <Chip label="Good rated" color="secondary" /> }
              { bookWithCharacteristics.badRated && <Chip label="Bad rated" color="secondary" /> }
            </Stack> 
          </Stack> 
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {bookWithCharacteristics.book.genre}
          </Typography>
          <Typography variant="h5" component="div" className="d-flex justify-content-between align-items-baseline mb-4">
            {bookWithCharacteristics.book.title}
            <span className="ms-2 text-muted h3">{formatCurrency(bookWithCharacteristics.book.price)}</span>
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {bookWithCharacteristics.book.author}
          </Typography>
          <Typography variant="body2">
            <i>Publisher: </i>{bookWithCharacteristics.book.publisher}
          </Typography>
          <Typography variant="body2">
            <i>Number of pages: </i>{bookWithCharacteristics.book.numberOfPages}
          </Typography>
        </CardContent>
        {/* { {isAuthenticated() ? (<CardActions className="d-flex flex-column">
          <div className="mt-auto">{quantity === 0 ? (
        <button className="secondary-button" onClick={() => increaseCartQuantity(bookWithCharacteristics.book.id)}>
                    Add to cart
                </button>) : (<div className="d-flex align-items-center flex-column" style={{ gap: ".5rem"}}>
                  <div className="d-flex align-items-center justify-content-center" style={{gap: ".5rem"}}>
                  <button className="secondary-button" onClick={() => decreaseCartQuantity(bookWithCharacteristics.book.id)}>-</button>
                  <div><span className="fs-3">{quantity}</span> in cart</div>
                  <button className="secondary-button" onClick={() => increaseCartQuantity(book.id)}>+</button>
                </div>
                <button type="button" className="btn btn-danger rounded-circle" onClick={() => removeFromCart(book.id)}>Remove</button>
                 </div> )}
          </div>
        </CardActions>) : null} } */}
      </Card>
    );
}

export default BookWithCharacteristicsCard;
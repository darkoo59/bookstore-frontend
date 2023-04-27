import { Book } from "../model/book";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useIsAuthenticated } from "react-auth-kit";

export function BookCard({ book } : {book : Book}) {
  const isAuthenticated = useIsAuthenticated()
    return (
      <Card variant="outlined" className="card">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {book.genre}
          </Typography>
          <Typography variant="h5" component="div">
            {book.title}
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
        {isAuthenticated() ? <CardActions>
        <button className="secondary-button">
                    Add to cart
                </button>
        </CardActions> : null}
      </Card>
    );
  }
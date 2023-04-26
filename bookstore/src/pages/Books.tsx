import Navbar from "../components/Navbar";
import * as React from "react";
import BannerBackground from "../images/banner-background.png";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { API_BASE_URL } from '../config';
import { Book } from '../model/book';
  function BookCard({ book } : {book : Book}) {
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
        <CardActions>
        <button className="secondary-button">
                    Add to cart
                </button>
        </CardActions>
      </Card>
    );
  }

const Books = () => {
    const [books, setBooks] = React.useState([]);
    
    React.useEffect(() => {
      fetchBooks();
    }, []);
  
    const fetchBooks = async () => {
      const response = await fetch(API_BASE_URL+'/book');
      const data = await response.json();
      setBooks(data);
    }
  return (
    <div>
    <div className="home-container">
    <Navbar/>
    <div className="home-banner-containter">
            <div className="home-bannerImage-container">
            <img src={BannerBackground} alt="" />
            </div>
    </div>
    </div>
    <div>
    </div>
    <div className="card-container">
        {books.map((book) => (
            <BookCard book={book}/>
        ))}
        </div>
    </div>
  );
};

export default Books;
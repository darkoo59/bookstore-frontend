
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
import { BookCard } from '../components/book-card';
import Navbar from "../components/navbar";

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
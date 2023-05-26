
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
import { useIsAuthenticated } from "react-auth-kit";
import { toast } from "react-toastify";
import { BookWithCharacteristics } from "../model/bookWithCharacteristics";
import BookWithCharacteristicsCard from "../components/bookWithCharacteristics-card";

const Books = () => {
    const [books, setBooks] = React.useState<Book[]>([]);
    const [booksWithCharacteristics, setBookWithCharacteristics] = React.useState<BookWithCharacteristics[]>([]);
    const isAuthenticated = useIsAuthenticated();
    
    React.useEffect(() => {
      if (!isAuthenticated()) {
        fetchBooksWithCharacteristics();
      } else {
        fetchBooks();
      }
    }, []);
  
    const fetchBooks = async () => {
      const response = await fetch(API_BASE_URL+'/book');
      const data = await response.json();
      setBooks(data);
    }

    const fetchBooksWithCharacteristics = async () => {
      try {
        const response = await fetch(API_BASE_URL+'/book/characteristics');
        if (!response.ok) {
          toast.error("Error fetching books", { position: toast.POSITION.TOP_CENTER });
          return;
        }
        const data : BookWithCharacteristics[] = await response.json();
        setBookWithCharacteristics(data);
      } catch (error: any) {
        console.log(error);
        toast.error("Error fetching books", { position: toast.POSITION.TOP_CENTER });
      }
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
        <>
          { isAuthenticated() && books.map((book) => (
              <React.Fragment key={book.id}>
              <BookCard book={book}/>
              </React.Fragment>
          ))}
          { !isAuthenticated() && booksWithCharacteristics.map((bc) => ( <BookWithCharacteristicsCard bookWithCharacteristics={bc} key={bc.book.id}/> ))}
        </>
      </div>
    </div>
  );
};

export default Books;
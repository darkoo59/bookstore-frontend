
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
import { RatingDTO } from "../dto/ratingDTO";

const Books = () => {
    const [books, setBooks] = React.useState<Book[]>([]);
    const [userRatings, setUserRatings] = React.useState<RatingDTO[]>([]);
    const isAuthenticated = useIsAuthenticated()
    const [loading, setLoading] = React.useState(true);

    
    React.useEffect(() => {
      fetchBooks();
    }, []);

    React.useEffect(() => {
      if(isAuthenticated())
        fetchRatings();
    }, []);
  
    const fetchBooks = async () => {
      const response = await fetch(API_BASE_URL+'/book');
      const data = await response.json();
      setBooks(data);
      if(!isAuthenticated())
      setLoading(false)
    }

    const fetchRatings = async () => {
      const token = document.cookie.match('(^|;)\\s*' + "accessToken" + '\\s*=\\s*([^;]+)')?.pop() || '';
      const response = await fetch(API_BASE_URL+'/rating/user-ratings', {headers : {'Authorization': `Bearer ${token}`}});
      const data = await response.json();
      setUserRatings(data);
      setLoading(false);
    }

    const getUserRankingForBook = (bookId: number) => {
      const rating = userRatings.find((rating) => rating.bookId === bookId);
      if (rating) {
        return rating.rating;
      }
      return -1;
    };


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
      {loading ? (<p></p>) : (

        books.map((book) => (
            <React.Fragment key={book.id}>
            <BookCard book={book} userRating={getUserRankingForBook(book.id)}/>
            </React.Fragment>
        ))


        )}
        </div>
    </div>
  );
};

export default Books;
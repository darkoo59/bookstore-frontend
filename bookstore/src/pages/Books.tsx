
import * as React from "react";
import { BookCard } from '../components/book-card';
import Navbar from "../components/navbar";
import { API_BASE_URL } from '../config';
import BannerBackground from "../images/banner-background.png";
import { Book } from '../model/book';

const Books = () => {
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
            <React.Fragment key={book.id}>
            <BookCard book={book}/>
            </React.Fragment>
        ))}
        </div>
    </div>
  );
};

export default Books;
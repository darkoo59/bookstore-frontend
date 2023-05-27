import * as React from "react";
import BannerBackground from "../images/banner-background.png";
import { API_BASE_URL } from "../config";
import { Book } from "../model/book";
import { BookCard } from "../components/book-card";
import Navbar from "../components/navbar";
import { useIsAuthenticated } from "react-auth-kit";
import { toast } from "react-toastify";
import { BookWithCharacteristics } from "../model/bookWithCharacteristics";
import BookWithCharacteristicsCard from "../components/bookWithCharacteristics-card";
import { RatingDTO } from "../dto/ratingDTO";
import { Container, Grid } from "@mui/material";

const Books = () => {
  const [books, setBooks] = React.useState<Book[]>([]);
  const [booksWithCharacteristics, setBookWithCharacteristics] = React.useState<
    BookWithCharacteristics[]
  >([]);
  const isAuthenticated = useIsAuthenticated();
  const [userRatings, setUserRatings] = React.useState<RatingDTO[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchBooks = async () => {
    const response = await fetch(API_BASE_URL + "/book");
    const data = await response.json();
    setBooks(data);
    if (!isAuthenticated()) setLoading(false);
  };

  const fetchBooksWithCharacteristics = async () => {
    try {
      const response = await fetch(API_BASE_URL + "/book/characteristics");
      if (!response.ok) {
        toast.error("Error fetching books", {
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      }
      const data: BookWithCharacteristics[] = await response.json();
      setBookWithCharacteristics(data);
    } catch (error: any) {
      console.log(error);
      toast.error("Error fetching books", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  React.useEffect(() => {
    if (!isAuthenticated()) {
      fetchBooksWithCharacteristics();
    } else {
      fetchBooks();
    }
  }, [fetchBooks, fetchBooksWithCharacteristics]);

  React.useEffect(() => {
    if (isAuthenticated()) fetchRatings();
  }, []);

  

  const fetchRatings = async () => {
    const token =
      document.cookie
        .match("(^|;)\\s*" + "accessToken" + "\\s*=\\s*([^;]+)")
        ?.pop() || "";
    const response = await fetch(API_BASE_URL + "/rating/user-ratings", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUserRatings(data);
    setLoading(false);
  };

  const getUserRankingForBook = (bookId: number) => {
    const rating = userRatings.find((rating) => rating.bookId === bookId);
    if (rating) {
      return rating.rating;
    }
    return -1;
  };

  console.log(books);
  return (
    <div>
      <div className="home-container">
        <Navbar />
        <div className="home-banner-containter">
          <div className="home-bannerImage-container">
            <img src={BannerBackground} alt="" />
          </div>
        </div>
      </div>
      <div></div>
      {isAuthenticated() && (
        <div className="card-container">
          {isAuthenticated() &&
            books.map((book) => (
              <React.Fragment key={book.id}>
                <BookCard
                  book={book}
                  userRating={getUserRankingForBook(book.id)}
                />
              </React.Fragment>
            ))}
        </div>
      )}
      {!isAuthenticated() && (
        <Container>
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item lg={6}>
              {booksWithCharacteristics
                .filter((bc) => !bc.suggested)
                .map((bc) => (
                  <BookWithCharacteristicsCard
                    bookWithCharacteristics={bc}
                    key={bc.book.id}
                  />
                ))}
            </Grid>
            <Grid item lg={6}>
              {booksWithCharacteristics
                .filter((bc) => bc.suggested)
                .map((bc) => (
                  <BookWithCharacteristicsCard
                    bookWithCharacteristics={bc}
                    key={bc.book.id}
                  />
                ))}
            </Grid>
          </Grid>
        </Container>
      )}
    </div>
  );
};

export default Books;

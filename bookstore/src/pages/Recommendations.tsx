import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import BannerBackground from "../images/banner-background.png";
import { API_BASE_URL } from "../config";
import axios from "axios";
import { getToken } from "../utilities/utility";
import { BookCard } from "../components/book-card";
import { User } from "../model/user";
import { Book } from "../model/book";
import { Rating } from "../model/rating";
import { useIsAuthenticated } from "react-auth-kit";
import { FavouriteGenres } from "../components/favourite-genres";
import { Genre } from "../model/genre";

export const Recommendations = () => {
  const isAuthenticated = useIsAuthenticated();

  const [books, setBooks] = useState<Book[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [numberOfRatings, setNumberOfUserRatings] = useState<number>(0);

  const fetchBooks = async () => {
    setBooks([]);
    const token = getToken();
    try {
      const res = await axios.get(`${API_BASE_URL}/book/recommended`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(res.data);
    } catch (err) {}
  };

  const fetchGenres = async () => {
    const token = getToken();
    try {
      const res = await axios.get(`${API_BASE_URL}/genre`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGenres(res.data);
    } catch (err) {}
  };

  const fetchUserData = async () => {
    const token = getToken();
    try {
      const res = await axios.get(`${API_BASE_URL}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {}
  };

  const fetchNumberOfRatings = async () => {
    const token = getToken();
    try {
      const res = await axios.get(`${API_BASE_URL}/rating/number-of-ratings`, {
        headers: { Authorization: `Bearer ${token}`},
      });
      setNumberOfUserRatings(res.data);
    } catch(err) {}
  };

  useEffect(() => {
    fetchUserData();
    fetchBooks();
    fetchGenres();
    fetchNumberOfRatings();
  }, []);

  const getOwnRating = (bookId: number): Rating | null | undefined => {
    if (!user) return null;
    const book = books.find((book) => book.id === bookId);
    return book?.ratings?.find((rating) => rating.user.id === user?.id);
  };

  const handleUpdate = async (genres: Genre[]) => {
    const token = getToken();
    try {
      await axios.put(
        `${API_BASE_URL}/user/genre`,
        genres.map((g) => g.id),
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchUserData();
      fetchBooks();
    } catch (err) {}
  };

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
      {isAuthenticated() && (
        <>
        {numberOfRatings < 10 ? (
          <FavouriteGenres
            allGenres={genres}
            favourites={user?.genres ?? []}
            handleUpdate={handleUpdate}
          />) : null}
          <div className="card-container">
            {books.map((book, index) => (
              <BookCard
                key={index}
                book={book}
                userRating={getOwnRating(book.id)?.rating ?? -1}
              />
            ))}
          </div>
        </>
      )}
      {!isAuthenticated() && <div>Unauthorized access</div>}
    </div>
  );
};

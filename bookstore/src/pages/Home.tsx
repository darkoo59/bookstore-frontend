import Navbar from "../components/Navbar";
import BannerBackground from "../images/banner-background.png";
import BannerImage from "../images/banner-image.png";
import { FiArrowRight } from "react-icons/fi";
const Home = () => {
  return (
    <div className="home-container">
        <Navbar/>
        <div className="home-banner-containter">
            <div className="home-bannerImage-container">
            <img src={BannerBackground} alt="" />
            </div>
            <div className="home-text-section">
                <h1 className="primary-heading">
                    Your Favourite Bookstore On The Market
                </h1>
                <p className="primary-text">
                    Register now and start using our bookstore system for free.
                </p>
                <button className="secondary-button">
                    Register now <FiArrowRight />
                </button>
            </div>
        </div>
    </div>
  );
};

export default Home;
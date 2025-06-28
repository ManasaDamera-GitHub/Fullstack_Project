import React, { useState } from "react";
import { FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlineBookmarkAdded } from "react-icons/md";
import { useBooking } from "../pages/context/BookingContext";
import "../styles/Header.css";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("Select Location");
  const [cartItems] = useState(0);
  const { bookings } = useBooking(); // 👈 Access bookings

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="site-header">
      <div className="header-container">
        <div className="logo">
          <a href="/">
            <img src="/logo.png" alt="Company Logo" width={700} height={700} />
          </a>
        </div>

        <nav className="main-nav">
          <ul>
            <li>
              <a href="/women-salon/all-services">Beauty</a>
            </li>
            <li>
              <a href="/wall-panels">Wall Panels</a>
            </li>
            <li>
              <a href="/native">Native</a>
            </li>
          </ul>
        </nav>

        <div className="location-selector">
          <HiOutlineLocationMarker className="location-icon" />
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            aria-label="Select location"
          >
            <option value="Select Location">Select Location</option>
            <option value="New York">New York</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Chicago">Chicago</option>
          </select>
        </div>

        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products..."
            aria-label="Search products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button" aria-label="Search">
            <FiSearch className="search-icon" />
          </button>
        </form>

        <div className="user-actions">
          {/* Cart Icon */}
          <a href="/cart" className="cart-icon" aria-label="Cart">
            <FiShoppingCart className="cart-icon-img" />
            {cartItems > 0 && <span className="cart-count">{cartItems}</span>}
          </a>

          {/* My Bookings Icon */}
          <a
            href="/my-bookings"
            className="booking-icon"
            aria-label="My Bookings"
          >
            <MdOutlineBookmarkAdded className="user-icon" />
            {bookings.length > 0 && (
              <span className="cart-count">{bookings.length}</span>
            )}
          </a>

          {/* Logout */}
          <a href="/" className="login-icon" aria-label="Logout">
            <FiUser className="user-icon" />
            Logout
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;

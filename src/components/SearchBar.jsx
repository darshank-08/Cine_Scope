import React, { useState } from 'react';
import styles from "./search.module.css";
import logo from "../assets/logo.png";
import { FaSearch } from "react-icons/fa";
import Navbar from './Navbar';

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState("");

  function handleChange(e) {
    e.preventDefault();
    onSearch(input);
  }

  return (
    <div className={styles.wrapper}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <img src={logo} alt="Site Logo" />
        </div>

        <form onSubmit={handleChange} className={styles.form}>
          <div className={styles.input_container}>
            <FaSearch className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search movies..."
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <button type="submit" className={styles.searchButton}>Search</button>
        </form>

        <Navbar />
      </nav>
    </div>
  );
};

export default SearchBar;
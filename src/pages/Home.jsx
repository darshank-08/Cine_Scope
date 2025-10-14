import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import SearchBar from "../components/SearchBar";
import TopMovie from "../components/TopMovie";
import TrendingCard from "../components/TrendingCard";
import { FaFire } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  const navigate = useNavigate();

  const handleSearch = (value) => {
    navigate("/SearchResult", { state: { search: value } });
  };

  useEffect(() => {
    async function getData() {
      try {
        // changed endpoint from “trending/movie” ➜ “trending/all”
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`
        );
        if (!response.ok) throw new Error("Failed to fetch trending content");
        const data = await response.json();

        // Filter out “person” entries so only movies and TV shows remain
        const filtered = data.results.filter(
          (item) => item.media_type !== "person"
        );
        setMovies(filtered);
      } catch (err) {
        setError(err.message);
      }
    }
    getData();
  }, [apiKey]);

  if (error) return <p className={styles.error}>Error: {error}</p>;
  if (!movies.length) return <p className={styles.loading}>Loading...</p>;

  return (
    <div className={styles.root}>
      <div className={styles.src_container}>
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Top Hero Movie */}
      <TopMovie heroMovie={movies[0]} />

      {/* Trending Grid */}
      <div className={styles.container}>
        <div className={styles.sectionTitle}>
          <FaFire className={styles.icon} />
          <h2>Trending</h2>
        </div>

        <div className={styles.trend}>
          {movies.slice(1,9).map((movie) => (
            <TrendingCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
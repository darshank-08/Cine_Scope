import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from "./search.module.css"; 
import SearchedMovieCard from '../components/searchedMovieCard';

const SearchResult = () => {
  const location = useLocation();

  const searchTerm = location.state?.search;
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!searchTerm) {
      setLoading(false);
      return;
    }

    async function getData() {
      setLoading(true);
      setError("");
      try {
        const url = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${encodeURIComponent(searchTerm)}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch movie data");
        const data = await response.json();


        if (data.results && data.results.length > 0) {
          // Take the first non‑person item
          const firstResult = data.results.find(
            item => item.media_type !== "person"
          );
          setMovie(firstResult);
          console.log(firstResult);
        } else {
          setError("No matching results");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [searchTerm]);

  if (loading) return <h1>Searching…</h1>;
  if (error) return <h1>{error}</h1>;
  if (!movie) return null;

  return (
    <div className={styles.trending}>
      <div
        className={styles.hero}
        style={{
          backgroundImage: movie.backdrop_path
            ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
            : "none"
        }}
      >
        <SearchedMovieCard movie={movie}/>
        <div>
          
        </div>
          <div className={styles.title}>
            {movie.title && <h1>{movie.title}</h1>}
            {movie.name && <h1>{movie.name}</h1>}
          </div>
      </div>
    </div>
  );
};

export default SearchResult;
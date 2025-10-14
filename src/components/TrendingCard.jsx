import React from "react";
import styles from "./trend.module.css";
import { useNavigate } from "react-router-dom";

const TrendingCard = ({ movie }) => {
  if (!movie) return null; // safety check

  const navigation = useNavigate()

  function HandleChange(){
    navigation(`/movie/${movie.id}`, {state: {movie}} )
  }

  return (
    <div className={styles.movieCard} onClick={HandleChange}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className={styles.poster}
      />
      <h3 className={styles.movieName}>{movie.title || movie.name}</h3>
    </div>
  );
};

export default TrendingCard;

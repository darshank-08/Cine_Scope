import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./fev.module.css";

const Favorites = () => {
  const location = useLocation();
  const navigation = useNavigate();
  const movie = location.state?.movie;
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem("new Film")) || [];
    setMovieList(storedMovies);
  }, []);

  useEffect(() => {
    if (!movie) return;

    const stored = JSON.parse(localStorage.getItem("new Film")) || [];
    const alreadyExists = stored.find((m) => m.id === movie.id);
    if (alreadyExists) return;

    const updated = [...stored, movie];
    localStorage.setItem("new Film", JSON.stringify(updated));
    setMovieList(updated);
  }, [movie]);

  const handleClearAll = () => {
    localStorage.removeItem("new Film");
    setMovieList([]);
  };

  const HomePage = () => {
    navigation(`/`);
  };

  if (!movieList || movieList.length < 1) {
    return (
      <div className={styles.empty}>
        <h2 className={styles.heading}>Favorites</h2>
        <h3 style={{ color: "white" }}>No movies saved yet.</h3>
        <button onClick={HomePage} className={styles.home_btn}>
          Home
        </button>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.headerRow}>
        <h2 className={styles.heading}>Your Favorite Movies ❤️</h2>
      </div>

      <div className={styles.buttons}>
        <button onClick={handleClearAll} className={styles.clearBtn}>
          Remove All
        </button>
        <button onClick={HomePage} className={styles.home_btn}>
          Home
        </button>
      </div>

      <div className={styles.grid}>
        {movieList.map((e) => (
          <div className={styles.card} key={e.id}>
            <div className={styles.posterBox}>
              <img
                src={
                  e.poster_path
                    ? `https://image.tmdb.org/t/p/w500${e.poster_path}`
                    : "https://via.placeholder.com/300x450?text=No+Poster"
                }
                alt={e.title || e.name}
                className={styles.poster}
              />
              <span className={styles.heart}>♥</span>
            </div>
            <div className={styles.details}>
              <h3>{e.title || e.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
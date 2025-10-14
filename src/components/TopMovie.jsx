import { useNavigate } from "react-router-dom";
import styles from "./movie.module.css";

const TopMovie = ({ heroMovie }) => {

  const navigation = useNavigate()

  function handleClick(){
    navigation(`/movie/${heroMovie.id}`, {state:{movie: heroMovie}})
  }

  // Handle case when heroMovie is not yet available
  if (!heroMovie) return <p className={styles.loading}>Loading...</p>;

  return (
    <div className={styles.trending}>
      <div
        className={styles.hero}
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${heroMovie.backdrop_path})`,
        }}
      >
        <div className={styles.overlay}>
          <h1 className={styles.title}>{heroMovie.title}</h1>
          <p className={styles.description}>
            {heroMovie.overview ? heroMovie.overview.slice(0, 150) + "..." : ""}
          </p>
          <button className={styles.watchBtn} onClick={handleClick}>WATCH DETAILS</button>
        </div>
      </div>
    </div>
  );
};

export default TopMovie;

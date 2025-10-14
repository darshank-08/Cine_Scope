import { useLocation, useNavigate } from "react-router-dom";
import styles from "./detail.module.css";
import { useEffect, useState } from "react";
import { IoArrowRedoOutline } from "react-icons/io5";
import { IoIosAdd } from "react-icons/io";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const Details = () => {
  const location = useLocation();
  const navigation = useNavigate();
  const movie = location.state?.movie || location.state?.heroMovie;

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function goToFevs() {
    navigation(`/Fevorites`, { state: { movie: details } });
  }

  useEffect(() => {
    if (!movie) {
      setLoading(false);
      setError("Movie not found.");
      return;
    }

    async function fetchMostPopularAndDetails() {
      try {
        const type =
          movie.media_type || (movie.first_air_date ? "tv" : "movie");
        let targetId = movie.id;

        // 🔍 if we don’t have a valid ID, find the most popular match
        if (!targetId && movie.name) {
          const searchUrl = `https://api.themoviedb.org/3/search/${type}?api_key=${apiKey}&query=${encodeURIComponent(
            movie.name
          )}`;
          const res = await fetch(searchUrl);
          const data = await res.json();

          if (data.results.length > 0) {
            // choose the most popular one
            data.results.sort((a, b) => b.popularity - a.popularity);
            targetId = data.results[0].id;
          }
        }

        if (!targetId) throw new Error("No matching movie found");

        const url = `https://api.themoviedb.org/3/${type}/${targetId}?api_key=${apiKey}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch movie details");
        const data = await res.json();
        setDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMostPopularAndDetails();
  }, [movie]);

  if (loading) return <p className={styles.loading}>Loading please wait…</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!details) return null;

  const {
    backdrop_path,
    poster_path,
    title,
    name,
    tagline,
    overview,
    vote_average,
    release_date,
    first_air_date,
    runtime,
    episode_run_time,
    genres,
  } = details;

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: backdrop_path
          ? `url(https://image.tmdb.org/t/p/original${backdrop_path})`
          : "none",
      }}
    >
      <div className={styles.content}>
        <div className={styles.image_container}>
          <div
            className={styles.image}
            style={{
              backgroundImage: poster_path
                ? `url(https://image.tmdb.org/t/p/original${poster_path})`
                : `url(https://via.placeholder.com/500x750?text=No+Image)`,
            }}
          ></div>
        </div>

        <div className={styles.info_container}>
          <div className={styles.info_content_box}>
            <div className={styles.headings}>
              <h1>{title || name}</h1>
              {tagline && <p className={styles.tagline}>{tagline}</p>}
            </div>

            <div className={styles.overview}>
              <p>{overview}</p>
            </div>

            <div className={styles.extra_info}>
              {vote_average && (
                <p className={styles.rating}>⭐ {vote_average.toFixed(1)}</p>
              )}
              {release_date && (
                <p className={styles.date}>
                  Release Date: <span>{release_date}</span>
                </p>
              )}
              {first_air_date && (
                <p className={styles.date}>
                  First Air Date: <span>{first_air_date}</span>
                </p>
              )}
              {runtime && (
                <p className={styles.date}>
                  Runtime:{" "}
                  <span>
                    {Math.floor(runtime / 60)}h {runtime % 60}m
                  </span>
                </p>
              )}
              {episode_run_time && episode_run_time.length > 0 && (
                <p className={styles.date}>
                  Episode Length: <span>{episode_run_time[0]} m</span>
                </p>
              )}
              {genres && genres.length > 0 && (
                <p className={styles.date}>
                  Genres:{" "}
                  <span>{genres.map((g) => g.name).join(", ")}</span>
                </p>
              )}

              <div className={styles.buttons}>
                <button className={styles.trailer_btn}>
                  WATCH TRAILER <span><IoArrowRedoOutline /></span>
                </button>
                <button className={styles.add_btn} onClick={goToFevs}>
                  ADD FAVORITES <span><IoIosAdd /></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;

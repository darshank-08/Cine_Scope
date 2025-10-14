
import { useNavigate } from "react-router-dom";
import style from "./searchedMovieCard.module.css";


const SearchedMovieCard = ({ movie }) => {
  if (!movie) return null;
  console.log(movie)
  const navigate = useNavigate()

  function handleClick(){
    navigate(`/movie/${movie.id}`, {state:{movie: movie}})
  }

  const link = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

  return (
    <div className={style.card_container} onClick={handleClick}>
      <div>
        <img src={link} alt=""  className={style.poster}/>
      </div>
      
    </div>
  );
};

export default SearchedMovieCard;
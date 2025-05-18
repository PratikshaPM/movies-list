// components/MovieList.tsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectMovie } from "../store/moviesSlice";
import "./MovieList.css";

const MovieList = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.filteredMovies);

  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <li
          key={movie.episode_id}
          className="movie-item"
          onClick={() => dispatch(selectMovie(movie))}
        >
          <div className="episode">Episode {movie.episode_id}</div>
          <div className="title">{movie.title}</div>
          <div className="date">{movie.release_date}</div>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;

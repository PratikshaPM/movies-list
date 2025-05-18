import React from "react";
import { useSelector } from "react-redux";
import "./MovieDetail.css";

const MovieDetail = () => {
  const movie = useSelector((state) => state.movies.selectedMovie);

  if (!movie) {
    return (
      <div className="movie-detail">Select a movie to see the details</div>
    );
  }

  return (
    <div className="movie-detail">
      <h2>
        Episode {movie.episode_id} - {movie.title}
      </h2>
      <p>{movie.opening_crawl}</p>
      <p>
        <b>Directed by:</b> {movie.director}
      </p>
    </div>
  );
};

export default MovieDetail;

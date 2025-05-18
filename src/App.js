import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "./store/moviesSlice";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.movies.error);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <div className="app">
      <SearchBar />
      {error && <div className="error">{error}</div>}
      <div className="content">
        <div className="left-panel">
          <MovieList />
        </div>
        <div className="right-panel">
          <MovieDetail />
        </div>
      </div>
    </div>
  );
};

export default App;

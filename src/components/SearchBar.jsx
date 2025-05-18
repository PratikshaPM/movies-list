import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm, setSortOrder } from "../store/moviesSlice";
import "./SearchBar.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const sortOrder = useSelector((state) => state.movies.sortOrder);

  return (
    <div className="header-controls">
      <select
        value={sortOrder}
        onChange={(e) => dispatch(setSortOrder(e.target.value))}
        className="sort-dropdown"
      >
        <option value="year">Sort by Year</option>
        <option value="episode">Sort by Episode</option>
      </select>
      <input
        type="text"
        placeholder="Type to search ..."
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        className="search-box"
      />
    </div>
  );
};

export default SearchBar;

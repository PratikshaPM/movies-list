// store/moviesSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await fetch("https://swapi.py4e.com/api/films/?format=json");
  if (!response.ok) throw new Error("Failed to fetch movies");
  const data = await response.json();
  return data.results;
});

const initialState = {
  movies: [],
  filteredMovies: [],
  selectedMovie: null,
  searchTerm: "",
  sortOrder: "year",
  status: "idle",
  error: null,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    selectMovie(state, action) {
      state.selectedMovie = action.payload;
    },
    setSortOrder(state, action) {
      state.sortOrder = action.payload;
      sortAndFilter(state);
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload.toLowerCase();
      sortAndFilter(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
        sortAndFilter(state);
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";
      });
  },
});

function sortAndFilter(state) {
  let filtered = state.movies.filter((m) =>
    m.title.toLowerCase().includes(state.searchTerm)
  );

  if (state.sortOrder === "year") {
    filtered.sort(
      (a, b) =>
        new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
    );
  } else {
    filtered.sort((a, b) => a.episode_id - b.episode_id);
  }
  state.filteredMovies = filtered;
}

export const { selectMovie, setSortOrder, setSearchTerm } = moviesSlice.actions;
export default moviesSlice.reducer;
export const moviesSliceObject = moviesSlice;

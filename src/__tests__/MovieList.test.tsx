import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MovieList from '../components/MovieList';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import moviesReducer, { moviesSliceObject } from '../store/moviesSlice';

const mockMovies = [
  { episode_id: 1, title: 'A New Hope', release_date: '1977-05-25' },
  { episode_id: 2, title: 'The Empire Strikes Back', release_date: '1980-05-17' },
];

function renderWithRedux(component, initialState = {}) {
  const store = configureStore({
    reducer: { movies: moviesReducer },
    preloadedState: {
      movies: {
        ...moviesSliceObject.getInitialState(),
        filteredMovies: mockMovies,
        ...initialState,
      },
    },
  });
  return render(<Provider store={store}>{component}</Provider>);
}

test('renders movie list with titles', () => {
  renderWithRedux(<MovieList />);
  expect(screen.getByText('A New Hope')).toBeInTheDocument();
  expect(screen.getByText('The Empire Strikes Back')).toBeInTheDocument();
});

test('clicking a movie dispatches selectMovie', () => {
  const { store } = renderWithRedux(<MovieList />);
  const movieItem = screen.getByText(/A New Hope/i);
  fireEvent.click(movieItem);
  expect(store.getState().movies.selectedMovie.title).toBe('A New Hope');
});

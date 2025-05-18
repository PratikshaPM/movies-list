import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieDetail from '../components/MovieDetail';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../store/moviesSlice';

import { moviesSliceObject } from '../store/moviesSlice';

const mockStateWithSelectedMovie = {
  selectedMovie: {
    episode_id: 1,
    title: 'A New Hope',
    opening_crawl: 'It is a period of civil war...',
    director: 'George Lucas'
  }
};

test('renders selected movie details', () => {
  const store = configureStore({ 
    reducer: { movies: moviesReducer },
     preloadedState: { 
        movies: { 
            ...moviesSliceObject.getInitialState(), 
            ...mockStateWithSelectedMovie 
        } 
    } 
    });
  render(
    <Provider store={store}>
      <MovieDetail />
    </Provider>
  );
  expect(screen.getByText('Episode 1 - A New Hope')).toBeInTheDocument();
  expect(screen.getByText('George Lucas')).toBeInTheDocument();
});
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HeaderControls from '../components/SearchBar';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../store/moviesSlice';

const renderWithRedux = () => {
  const store = configureStore({ reducer: { movies: moviesReducer } });
  render(
    <Provider store={store}>
      <HeaderControls />
    </Provider>
  );
  return store;
};

test('Test search bar and sort option', () => {
  renderWithRedux();
  expect(screen.getByPlaceholderText('Type to search ...')).toBeInTheDocument();
  expect(screen.getByText('Sort by Year')).toBeInTheDocument();
});
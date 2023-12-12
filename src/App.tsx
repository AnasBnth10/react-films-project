import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FavoriteFilmsPage from './components/app/pages/favorite-films/FavoriteFilmsPage';
import Home from './components/app/pages/home/Home';
import SearchFilmPage from './components/app/pages/search-film/SearchFilmPage';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route index path="/" element={<Home />} />
          <Route path="favorite-films" element={<FavoriteFilmsPage />} />
          <Route path="search" element={<SearchFilmPage />} />
          
      </Routes>
    </BrowserRouter>
      
      
    </div>
  );
}

export default App;

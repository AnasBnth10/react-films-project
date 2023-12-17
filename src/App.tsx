import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FavoriteFilmsPage from './components/app/pages/favorite-films/FavoriteFilmsPage';
import Home from './components/app/pages/home/Home';
import SearchFilmPage from './components/app/pages/search-film/SearchFilmPage';
import { UserService } from './services/user.service';
import { User } from './components/app/models/user-model';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { userState } from './db/UserFavoriteFilms';


function App() {

  useEffect(() => {
    UserService.getCurrentUserData();
  },[]);
  return (
    <RecoilRoot>
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route index path="/" element={<Home />} />
          <Route path="favorite-films" element={<FavoriteFilmsPage />} />
          <Route path="search" element={<SearchFilmPage />} />
          
      </Routes>
    </BrowserRouter>
      
      
    </div>
    </RecoilRoot>
  );
}

export default App;

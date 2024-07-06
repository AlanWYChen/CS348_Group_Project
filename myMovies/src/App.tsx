import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieList from './pages/movieList';
import MovieInfo from './pages/movieInfo';
import NavBar from "./components/NavBar/navbar";
import Home from "./pages/home";
import AllMovies from './pages/AllMovies';

import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element= {<AllMovies />}/>
            <Route path="/all_movies" element={<MovieList />}/>
          </Routes>
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/movie/:id" element={<MovieInfo />} />
          </Routes>
        </main>
    </Router>
  );
};

export default App;
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieList from "./pages/movieList";
import MovieInfo from "./pages/movieInfo";
import NavBar from "./components/NavBar/navbar";
import Home from "./pages/home";
import AllMovies from "./pages/AllMovies";
import SavedList from "./pages/savedlists";
import ListInfo from "./pages/viewlist";
import About from "./pages/about";

import "./App.css";

const App: React.FC = () => {
	return (
		<Router>
			<NavBar/>
			<main className="main-content">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about-us" element={<About />} />
					<Route path="/all_movies" element={<AllMovies />} />
					<Route path="/savedlists" element={<SavedList />} />
				</Routes>
			</main>
			<Routes>
				<Route path="/movie/:id" element={<MovieInfo />} />
				<Route path="/savedlists/:id" element={<ListInfo />} />
			</Routes>
		</Router>
	);
};

export default App;

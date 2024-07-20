import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieInfo from "./pages/movieInfo";
import NavBar from "./components/NavBar/navbar";
import Home from "./pages/home";
import AllMovies from "./pages/AllMovies";
import SavedList from "./pages/savedLists";
import About from "./pages/about";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import { AuthProvider } from "./components/authContext";

import "./App.css";
import Register from "./pages/register";

const App: React.FC = () => {
	return (
		<AuthProvider>
			<Router>
			<NavBar/>
			<main className="main-content">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about-us" element={<About />} />
					<Route path="/all_movies" element={<AllMovies />} />
					<Route path="/savedlists" element={<SavedList />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</main>
			<Routes>
				<Route path="/movie/:id" element={<MovieInfo />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</Router>
		</AuthProvider>
	);
};

export default App;

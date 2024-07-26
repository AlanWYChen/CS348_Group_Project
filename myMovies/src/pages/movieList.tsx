import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./movieList.css";

interface Movie {
	id: number;
	title: string;
	imageUrl: string;
}

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const MovieList: React.FC = () => {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState<string>("");

	const [currentPage, setCurrentPage] = useState<number>(1);
	const moviesPerPage = 10;

	useEffect(() => {
		const getMovies = async () => {
			try {
				const response = await axios.get(`${SERVER_URL}/all_movies`);
				setMovies(response.data);
			} catch (err) {
				setError("Failed to fetch movies");
			} finally {
				setLoading(false);
			}
		};

		getMovies();
	}, []);

	const filteredMovies = movies.filter(movie =>
		movie.title.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const indexOfLastMovie = currentPage * moviesPerPage;
	const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
	const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

	const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

	const handleNextPage = () => {
		setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
	};

	const handlePreviousPage = () => {
		setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<div>
			<h1>Movie List</h1>
			<input
				type="text"
				placeholder="Search movies..."
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				className="search-bar"
			/>
			<div className="movie-grid">
				{currentMovies.map((movie) => (
					<div className="movie-box" key={movie.id}>
						<Link to={`/movie/${movie.id}`}>
							<img src={"https://image.tmdb.org/t/p/w500/6WBeq4fCfn7AN0o21W9qNcRF2l9.jpg"} alt={movie.title} className="movie-image" />
							<div className="movie-title">{movie.title}</div>
						</Link>
					</div>
				))}
			</div>
			<div className="pagination">
				<button onClick={handlePreviousPage} disabled={currentPage === 1}>
					Previous
				</button>
				<span>Page {currentPage} of {totalPages}</span>
				<button onClick={handleNextPage} disabled={currentPage === totalPages}>
					Next
				</button>
			</div>
		</div>
	);
};

export default MovieList;

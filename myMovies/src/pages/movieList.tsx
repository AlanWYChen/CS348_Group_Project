import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./movieList.css"; // Assuming you have a CSS file for styling

interface Movie {
	id: number;
	title: string;
	imageUrl: string; // Assuming this property exists
}

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const MovieList: React.FC = () => {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState<string>("");

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
				{filteredMovies.map((movie) => (
					<div className="movie-box" key={movie.id}>
						<Link to={`/movie/${movie.id}`}>
							<img src="https://upload.wikimedia.org/wikipedia/en/4/4d/Shrek_%28character%29.png" alt={movie.title} className="movie-image" />
							<div className="movie-title">{movie.title}</div>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};

export default MovieList;

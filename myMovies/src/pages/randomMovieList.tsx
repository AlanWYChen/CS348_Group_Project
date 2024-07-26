import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface Movie {
	id: number;
	title: string;
}
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

// const movies: Movie[] = [
//   { id: 1, title: 'Inception' },
//   { id: 2, title: 'The Dark Knight' },
//   { id: 3, title: 'Interstellar' },
// ];

const RandomMovies: React.FC = () => {
	const [movies, setMovies] = useState<Movie[]>();

	useEffect(() => {
		const getMovies = async () => {
			const response = await axios.get(SERVER_URL + "/all_movies");
			console.log(response.data);
			const shuffled = response.data.sort(() => 0.5 - Math.random());
			// Get sub-array of first n elements after shuffled
			let selected = shuffled.slice(0, 10);
			setMovies(selected);
		};

		getMovies();
	}, []);

	return (
		<div>
			<h1>Recommended Movies</h1>
			<div className="movie-grid">
				{movies && movies.map((movie) => (
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

export default RandomMovies;

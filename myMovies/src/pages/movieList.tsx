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

const MovieList: React.FC = () => {
	const [movies, setMovies] = useState<Movie[]>();

	useEffect(() => {
		const getMovies = async () => {
			const response = await axios.get(SERVER_URL + "/all_movies");
			console.log(response.data);
			setMovies(response.data);
		};

		getMovies();
	}, []);

	return (
		<div>
			<h1>Movie List</h1>
			<ul>
				{movies &&
					movies.map((movie) => (
						<li key={movie.id}>
							<Link to={`/movie/${movie.id}`}>{movie.title}</Link>
						</li>
					))}
			</ul>
		</div>
	);
};

export default MovieList;

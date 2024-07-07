import React from 'react';
import { Link } from 'react-router-dom';

interface Movie {
  id: number;
  title: string;
}


const movies: Movie[] = [
  { id: 1, title: 'Inception' },
  { id: 2, title: 'The Dark Knight' },
  { id: 3, title: 'Interstellar' },
];

const MovieList: React.FC = () => {
  return (
    <div>
      <h1>Movie List</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;

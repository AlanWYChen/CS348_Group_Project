import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import "./movieInfo.css";

interface Movie {
  id: number;
  title: string;
  cast: string;
  director: string;
  synopsis: string;
}

const movies: Movie[] = [
  {
    id: 1,
    title: 'Inception',
    cast: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page',
    director: 'Christopher Nolan',
    synopsis: 'A thief who steals corporate secrets through the use of dream-sharing technology...',
  },
  {
    id: 2,
    title: 'The Dark Knight',
    cast: 'Christian Bale, Heath Ledger, Aaron Eckhart',
    director: 'Christopher Nolan',
    synopsis: 'When the menace known as the Joker emerges from his mysterious past...',
  },
  {
    id: 3,
    title: 'Interstellar',
    cast: 'Matthew McConaughey, Anne Hathaway, Jessica Chastain',
    director: 'Christopher Nolan',
    synopsis: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity’s survival...',
  },
];

type RouteParams = {
  id: string;
};

const MovieInfo: React.FC = () => {
  const { id } = useParams<RouteParams>();

  if (!id) return <div>Movie not found</div>;

  const movie = movies.find(m => m.id === parseInt(id));
  const [rating, setRating] = useState<number>(0);

  const handleRating = (rate: number) => {
    setRating(rate);
    // Here you would typically send the rating to a server
    console.log(`User rated ${rate} stars for movie ${movie?.title}`);
  };

  if (!movie) return <div>Movie not found</div>;

  return (
    <div>
      <div>
        <img src="https://mmos.com/wp-content/uploads/2021/07/assassins-creed-infinity-logo-art-banner.jpg" alt="Banner"/>
      </div>
      <h1>{movie.title}</h1>
      <p><strong>Cast:</strong> {movie.cast}</p>
      <p><strong>Director:</strong> {movie.director}</p>
      <p><strong>Synopsis:</strong> {movie.synopsis}</p>
      <div>
        <strong>Rating:</strong>
        {[1, 2, 3, 4, 5].map(star => (
          <span
            key={star}
            style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'grey' }}
            onClick={() => handleRating(star)}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
};

export default MovieInfo;

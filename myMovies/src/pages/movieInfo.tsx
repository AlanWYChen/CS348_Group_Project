import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AxiosRequestConfig, RawAxiosRequestHeaders }  from 'axios';

import "./movieInfo.css";
const SERVER_URL = import.meta.env.VITE_SERVER_URL

interface Movie {
  id: number;
  title: string;
  //cast: string;
  //director: string;
  //synopsis: string;
}

const movies: Movie[] = [
  {
    id: 1,
    title: '[Dummy Movie Info Page] Inception',
    //cast: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page',
    //director: 'Christopher Nolan',
    //synopsis: 'A thief who steals corporate secrets through the use of dream-sharing technology...',
  },
  {
    id: 2,
    title: 'The Dark Knight',
    //cast: 'Christian Bale, Heath Ledger, Aaron Eckhart',
    //director: 'Christopher Nolan',
    //synopsis: 'When the menace known as the Joker emerges from his mysterious past...',
  },
  {
    id: 3,
    title: 'Interstellar',
    //cast: 'Matthew McConaughey, Anne Hathaway, Jessica Chastain',
    //director: 'Christopher Nolan',
    //synopsis: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity’s survival...',
  },
];

type RouteParams = {
  id: string;
};

const MovieInfo: React.FC = () => {
  const { id } = useParams<RouteParams>();

  const [movies, setMovies] = useState<Movie[]>();

	useEffect(() => {
		const getMovies = async () => {
			const response = await axios.get(SERVER_URL + "/all_movies");
			console.log(response.data);
			setMovies(response.data);
		};

		getMovies();
	}, []);

  // TODO: Fix the routing --> commenting the axios request which gets the data 

  /*
  const [movieInfo, setMovieInfo] = useState<Movie>();

  useEffect(() => {
    const getMovieInfo = async () => {
    const response = await axios.get(SERVER_URL + `/movie_info`);
    console.log(response);
    setMovieInfo(response.data);
  };

  getMovieInfo(); 
  }, [id])
  */

  if (!id) return <div>Movie not found</div>;

  let movie = movies?.find(m => m.id === parseInt(id));
  //movies.find(m => m.id === parseInt(id));
  const [rating, setRating] = useState<number>(0);

  const handleRating = (rate: number) => {
    setRating(rate);
    // Here you would typically send the rating to a server
    console.log(`User rated ${rate} stars for movie ${movie?.title}`);

    

  };

  if (!movie) return;
  //return <div>Movie not found</div>;

  return (
    <div>
      <div>
        <img src="https://mmos.com/wp-content/uploads/2021/07/assassins-creed-infinity-logo-art-banner.jpg" alt="Banner"></img>
      </div>
      <h1>{movie.title}</h1>
      <p><strong>Cast:</strong> {"[WIP]"}</p>
      <p><strong>Director:</strong> {"[WIP]"}</p>
      <p><strong>Synopsis:</strong> {"[WIP]"}</p>
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

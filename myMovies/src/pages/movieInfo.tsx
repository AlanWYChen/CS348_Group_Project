import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import "./movieInfo.css";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

interface Movie {
  id: number;
  title: string;
  release_date: string;
  genre: string;
}

interface Rating {
  id: number;
  rating: number;
}

interface Comment {
  id: number;
  user: string;
  text: string;
}

type RouteParams = {
  id: string;
};

const MovieInfo: React.FC = () => {
  const { id } = useParams<RouteParams>();

  const [movie, setMovie] = useState<Movie[]>([]);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [userRating, setUserRating] = useState<number>(0);
  const [newComment, setNewComment] = useState<string>('');
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const getMovie = async () => {
      try {
        const response = await axios.get<Movie[]>(`${SERVER_URL}/movie?id=${id}`);
        console.log(response);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    const getRatings = async () => {
      try {
        const response = await axios.get<Rating[]>(`${SERVER_URL}/movies/${id}/ratings`);
        setRatings(response.data);
      } catch (error) {
        console.error("Error fetching ratings:", error);
      }
    };

    const getComments = async () => {
      try {
        const response = await axios.get<Comment[]>(`${SERVER_URL}/movies/${id}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    getMovie();
    getRatings();
    getComments();
  }, [id]);

  if (!movie || movie.length === 0) return <div>Loading...</div>;

  const handleRating = async (rate: number) => {
    try {
      await axios.post(`${SERVER_URL}/movies/${id}/rate`, { rating: rate });
      setUserRating(rate);
      setRatings(prev => {
        const existingRatingIndex = prev.findIndex(r => r.id === userRating);
        if (existingRatingIndex !== -1) {
          // Update existing rating
          const updatedRatings = [...prev];
          updatedRatings[existingRatingIndex] = { id: userRating, rating: rate };
          return updatedRatings;
        }
        // Add new rating
        return [...prev, { id: Date.now(), rating: rate }];
      });
    } catch (error) {
      console.error("Error submitting rating:", error);
      alert("There was an error submitting your rating. Please try again.");
    }
  };

  const handleCommentSubmit = async () => {
    if (!newComment || !userName) return;

    try {
      await axios.post(`${SERVER_URL}/movies/${id}/comment`, { user: userName, text: newComment });
      setComments(prev => [...prev, { id: Date.now(), user: userName, text: newComment }]);
      setNewComment('');
      setUserName('');
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("There was an error submitting your comment. Please try again.");
    }
  };

  const averageRating = ratings.reduce((acc, { rating }) => acc + rating, 0) / ratings.length || 0;

  console.log(movie);

  return (
    <div className="movie-info-container">
      <div className="movie-info">
        <div className="banner">
          <img src="https://mmos.com/wp-content/uploads/2021/07/assassins-creed-infinity-logo-art-banner.jpg" alt="Banner" />
        </div>
        <h1>{movie[0].title}</h1>
        <p><strong>Cast:</strong> {`[WIP]`} </p>
        <p><strong>Release Date:</strong> {movie[0].release_date}</p>
        <p><strong>Genre:</strong> {movie[0].genre}</p>

        <div className="rating">
          <strong>Average Rating:</strong> {averageRating.toFixed(1)} ★
          <div className="rating-input">
            <strong>Rate this movie:</strong>
            {[1, 2, 3, 4, 5].map(star => (
              <span
                key={star}
                className={star <= userRating ? 'gold' : ''}
                onClick={() => handleRating(star)}
              >
                ★
              </span>
            ))}
          </div>
          <div className="rating-list">
            <strong>All Ratings:</strong>
            {ratings.length ? (
              <ul>
                {ratings.map(({ rating }, index) => (
                  <li key={index}>{rating} ★</li>
                ))}
              </ul>
            ) : (
              <p>No ratings yet.</p>
            )}
          </div>
        </div>

        <div className="comments">
          <h2>Comments</h2>
          <div className="comment-form">
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Your name"
            />
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment"
            />
            <button onClick={handleCommentSubmit}>Submit Comment</button>
          </div>
          <div className="comment-list">
            {comments.length ? (
              <ul>
                {comments.map(({ user, text }, index) => (
                  <li key={index}><strong>{user}:</strong> {text}</li>
                ))}
              </ul>
            ) : (
              <p>No comments yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;

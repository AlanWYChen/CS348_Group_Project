import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import "./movieInfo.css";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

interface Movie {
  id: number;
  title: string;
  cast: string;
  director: string;
  synopsis: string;
  ratings: number[]; // Array to store multiple ratings
  comments: { user: string; text: string }[]; // Array to store comments
}

type RouteParams = {
  id: string;
};

const MovieInfo: React.FC = () => {
  const { id } = useParams<RouteParams>();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [userRating, setUserRating] = useState<number>(0);
  const [newComment, setNewComment] = useState<string>('');
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const getMovie = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/movie/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    getMovie();
  }, [id]);

  if (!movie) return <div>Movie not found</div>;

  const handleRating = async (rate: number) => {
    if (!movie) return;

    try {
      await axios.post(`${SERVER_URL}/movies/${id}/rate`, { rating: rate });
      setUserRating(rate);
      setMovie(prev => ({
        ...prev!,
        ratings: [...prev!.ratings, rate]
      }));
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  const handleCommentSubmit = async () => {
    if (!movie || !newComment || !userName) return;

    try {
      await axios.post(`${SERVER_URL}/movies/${id}/comment`, { user: userName, text: newComment });
      setMovie(prev => ({
        ...prev!,
        comments: [...prev!.comments, { user: userName, text: newComment }]
      }));
      setNewComment('');
      setUserName('');
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const averageRating = movie.ratings.reduce((acc, rate) => acc + rate, 0) / movie.ratings.length || 0;

  return (
    <div className="movie-info-container">
      <div className="movie-info">
        <div className="banner">
          <img src="https://mmos.com/wp-content/uploads/2021/07/assassins-creed-infinity-logo-art-banner.jpg" alt="Banner" />
        </div>
        <h1>{movie.title}</h1>
        <p><strong>Cast:</strong> {movie.cast}</p>
        <p><strong>Director:</strong> {movie.director}</p>
        <p><strong>Synopsis:</strong> {movie.synopsis}</p>

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
            {movie.ratings.length ? (
              <ul>
                {movie.ratings.map((rate, index) => (
                  <li key={index}>{rate} ★</li>
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
            {movie.comments.length ? (
              <ul>
                {movie.comments.map((comment, index) => (
                  <li key={index}><strong>{comment.user}:</strong> {comment.text}</li>
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

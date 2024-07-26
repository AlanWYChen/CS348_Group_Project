import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../components/authContext";
import axios, { AxiosResponse, AxiosError } from "axios";

import "./movieInfo.css";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

interface Movie {
	id: number;
	title: string;
	release_date: string;
	genres: string;
}

interface Rating {
	user_id: number;
	movie_id: number;
	stars: number;
}

interface Comment {
	username: string;
	content: string;
}

interface UserList {
	id: number;
	list_name: string;
}

type RouteParams = {
	id: string;
};

interface Director {
	name: string;
}

interface Writer {
	name: string;
}

interface OverallRating {
	avg_rating: number;
	num_ratings: number;
}

const MovieInfo: React.FC = () => {
	const { id } = useParams<RouteParams>();
	const { uid } = useAuth();
	const [movie, setMovie] = useState<Movie[]>([]);
	const [ratings, setRatings] = useState<Rating[]>([]);
	const [comments, setComments] = useState<Comment[]>([]);
	const [userRating, setUserRating] = useState<number>(0);
	const [newComment, setNewComment] = useState<string>("");
	const [userName, setUserName] = useState<string>("");
	const [userLists, setUserLists] = useState<UserList[]>([]);
	const [selectedList, setSelectedList] = useState<number | null>(null);
	const [directors, setDirectors] = useState<Director[]>([]);
	const [writers, setWriters] = useState<Writer[]>([]);
	const [overallRating, setOverallRating] = useState<OverallRating>({ avg_rating: 0, num_ratings: 0 });

	useEffect(() => {
		const getMovie = async () => {
			try {
				const response = await axios.get<Movie[]>(
					`${SERVER_URL}/movie?id=${id}`
				);
				setMovie(response.data);
				console.log(response.data);
			} catch (error) {
				console.error("Error fetching movie:", error);
			}
		};

		const getRatings = async () => {
			try {
				const response = await axios.get(
					`${SERVER_URL}/get_rating?user_id=${uid}&movie_id=${id}`
				);
				setRatings(response.data);
			} catch (error) {
				console.error("Error fetching ratings:", error);
			}
		};

		const getComments = async () => {
			try {
				const response = await axios.get(
					`${SERVER_URL}/movie_comments?movie_id=${id}`
				);
				console.log(response.data);
				setComments(response.data);
			} catch (error) {
				console.error("Error fetching comments:", error);
			}
		};

		const getUserLists = async () => {
			await axios
				.get(`${SERVER_URL}/user_lists?user_id=${uid}`)
				.then((response: AxiosResponse) => {
					setUserLists(response.data);
					if (response.data.length > 0) {
						setSelectedList(response.data[0].id); // Set the first list as the default selected list
					}
					console.log(response);
				})
				.catch((reason: AxiosError) => {
					console.error("Error fetching user lists:", reason);
				});
		};

		const getDirectors = async () => {
			await axios
				.get(`${SERVER_URL}/get_director?movie_id=${id}`)
				.then((response: AxiosResponse) => {
					setDirectors(response.data);
					console.log(response);
				})
				.catch((reason: AxiosError) => {
					console.error("Error fetching director:", reason);
				});
		};

		const getWriters = async () => {
			await axios
				.get(`${SERVER_URL}/get_writer?movie_id=${id}`)
				.then((response: AxiosResponse) => {
					setWriters(response.data);
					console.log(response);
				})
				.catch((reason: AxiosError) => {
					console.error("Error fetching writers:", reason);
				});
		};

		const getOverallRating = async () => {
			await axios
				.get(`${SERVER_URL}/get_avg_rating?movie_id=${id}`)
				.then((response: AxiosResponse) => {
					setOverallRating(response.data);
					console.log(response.data);
				})
				.catch((reason: AxiosError) => {
					console.error("Error fetching ratings:", reason);
				});
		}

		getMovie();
		getRatings();
		getComments();
		getUserLists();
		getDirectors();
		getWriters();
		getOverallRating();
	}, [id, uid]);

	if (!movie || movie.length === 0) return <div>Loading...</div>;

	const handleRating = async (rate: number) => {
		try {
			console.log(uid, id, rate);

			await axios.post(`${SERVER_URL}/add_rating?`, {
				user_id: uid,
				movie_id: id,
				stars: rate,
			});
			setUserRating(rate);
			setRatings((prev) => {
				const existingRatingIndex = prev.findIndex(
					(r) => r.movie_id === userRating
				);
				if (existingRatingIndex !== -1) {
					// Update existing rating
					const updatedRatings = [...prev];
					updatedRatings[existingRatingIndex] = {
						user_id: uid,
						movie_id: userRating,
						stars: rate,
					};
					return updatedRatings;
				}
				// Add new rating
				return [...prev, { user_id: uid, movie_id: Date.now(), stars: rate }];
			});
		} catch (error) {
			console.error("Error submitting rating:", error);
			alert("There was an error submitting your rating. Please try again.");
		}
	};

	const handleCommentSubmit = async () => {
		if (!newComment) return;

		console.log(uid, id, newComment);

		try {
			await axios.post(`${SERVER_URL}/movie_comment`, {
				user_id: uid,
				movie_id: id,
				content: newComment,
			});

			setComments((prev) => [
				...prev,
				{ id: Date.now(), username: userName, content: newComment },
			]);
			setNewComment("");
			setUserName("");
		} catch (error) {
			console.error("Error submitting comment:", error);
			alert("There was an error submitting your comment. Please try again.");
		}
	};

	const handleAddToList = async () => {
		if (!movie || !selectedList) return;

		try {
			await axios.post(
				`${SERVER_URL}/add_movie_to_list?list_id=${selectedList}&movie_id=${id}`
			);

			alert(`${movie[0].title} has been added to your list.`);
		} catch (error) {
			console.error("Error adding movie to list:", error);
			alert(
				"There was an error adding the movie to your list. Please try again."
			);
		}
	};

	return (
		<div className="movie-info-container">
			<div className="movie-info">
				<div className="banner">
					<img
						src="https://mmos.com/wp-content/uploads/2021/07/assassins-creed-infinity-logo-art-banner.jpg"
						alt="Banner"
					/>
				</div>
				<div className="movie-details-and-list">
					<div className="movie-details">
						<h1>{movie[0].title}</h1>
						<p>
							<strong>Director:</strong>{" "}
							{directors.reduce(
								(accumulator, currentValue) =>
									currentValue.name + ", " + accumulator,
								""
							)}
						</p>
						<p>
							<strong>Writer:</strong>{" "}
							{writers.reduce(
								(accumulator, currentValue) =>
									currentValue.name + ", " + accumulator,
								""
							)}
						</p>
						<p>
							<strong>Release Date:</strong> {movie[0].release_date}
						</p>
						<p>
							<strong>Genre:</strong> {movie[0].genres}
						</p>

						<div className="rating">
							<strong>Average Rating:</strong> {overallRating.avg_rating.toFixed(1)} ★
							<div className="rating-input">
								<strong>Rate this movie:</strong>
								{[1, 2, 3, 4, 5].map((star) => (
									<span
										key={star}
										className={star <= userRating ? "gold" : ""}
										onClick={() => handleRating(star)}
									>
										★
									</span>
								))}
							</div>
							<div className="rating-list">
								<strong>All Ratings:</strong>
								{overallRating.num_ratings > 0 ? (
									<p> {overallRating.num_ratings} </p>
								) : (
									<p>No ratings yet.</p>
								)}
							</div>
						</div>
					</div>
					<div className="add-to-list">
						<h2>Add to List</h2>
						<select
							value={selectedList ?? ""}
							onChange={(e) => setSelectedList(Number(e.target.value))}
						>
							{userLists.length > 0 ? (
								userLists.map((list) => (
									<option key={list.id} value={list.id}>
										{list.list_name}
									</option>
								))
							) : (
								<></>
							)}
						</select>
						<button onClick={handleAddToList}>Add to Selected List</button>
					</div>
				</div>

				<div className="comments">
					<h2>Comments</h2>
					<div className="comment-form">
						<textarea
							value={newComment}
							onChange={(e) => setNewComment(e.target.value)}
							placeholder="Add a comment"
						/>
						<button onClick={handleCommentSubmit}>Submit Comment</button>
					</div>
					<div className="comment-list">
						{comments.length > 0 ? (
							<ul>
								{comments.map(({ username: user, content: text }, index) => (
									<li key={index}>
										<div>
											{" "}
											{user}: {text}{" "}
										</div>
									</li>
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

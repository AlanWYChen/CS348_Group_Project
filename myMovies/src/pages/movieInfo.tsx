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
	const [comments, setComments] = useState<Comment[]>([]);
	const [userRating, setUserRating] = useState<number>(0);
	const [newComment, setNewComment] = useState<string>("");
	const [userName, setUserName] = useState<string>("");
	const [userLists, setUserLists] = useState<UserList[]>([]);
	const [selectedList, setSelectedList] = useState<number | null>(null);
	const [directors, setDirectors] = useState<Director[]>([]);
	const [writers, setWriters] = useState<Writer[]>([]);
	const [overallRating, setOverallRating] = useState<OverallRating>({ avg_rating: 0, num_ratings: 0 });
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [
					movieResponse,
					ratingResponse,
					commentsResponse,
					userListsResponse,
					directorsResponse,
					writersResponse,
					overallRatingResponse,
				] = await Promise.all([
					axios.get<Movie[]>(`${SERVER_URL}/movie?id=${id}`),
					axios.get(`${SERVER_URL}/get_rating?user_id=${uid}&movie_id=${id}`),
					axios.get(`${SERVER_URL}/movie_comments?movie_id=${id}`),
					axios.get(`${SERVER_URL}/user_lists?user_id=${uid}`),
					axios.get(`${SERVER_URL}/get_director?movie_id=${id}`),
					axios.get(`${SERVER_URL}/get_writer?movie_id=${id}`),
					axios.get(`${SERVER_URL}/get_avg_rating?movie_id=${id}`),
				]);

				setMovie(movieResponse.data);
				setUserRating(ratingResponse.data[0].stars);
				setComments(commentsResponse.data);
				setUserLists(userListsResponse.data);
				setDirectors(directorsResponse.data);
				setWriters(writersResponse.data);
				setOverallRating(overallRatingResponse.data[0]);

				if (userListsResponse.data.length > 0) {
					setSelectedList(userListsResponse.data[0].id); // Set the first list as the default selected list
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [id, uid]);

	const handleRating = async (rate: number) => {
		try {
			await axios.post(`${SERVER_URL}/add_rating`, {
				user_id: uid,
				movie_id: id,
				stars: rate,
			});
			setUserRating(rate);

			const overallRatingResponse = await axios.get(`${SERVER_URL}/get_avg_rating?movie_id=${id}`);
			setOverallRating(overallRatingResponse.data[0]);
		} catch (error) {
			console.error("Error submitting rating:", error);
			alert("There was an error submitting your rating. Please try again.");
		}
	};

	const handleCommentSubmit = async () => {
		if (!newComment) return;

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

	if (loading) return <div>Loading...</div>;

	if (!movie || movie.length === 0) return <div>No movie found</div>;

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
					<MovieDetails
						movie={movie[0]}
						directors={directors}
						writers={writers}
						userRating={userRating}
						handleRating={handleRating}
						overallRating={overallRating}
					/>
					<UserLists
						userLists={userLists}
						selectedList={selectedList}
						setSelectedList={setSelectedList}
						handleAddToList={handleAddToList}
					/>
				</div>
				<Comments
					comments={comments}
					newComment={newComment}
					setNewComment={setNewComment}
					userName={userName}
					setUserName={setUserName}
					handleCommentSubmit={handleCommentSubmit}
				/>
			</div>
		</div>
	);
};

const MovieDetails: React.FC<{
	movie: Movie;
	directors: Director[];
	writers: Writer[];
	userRating: number;
	handleRating: (rate: number) => void;
	overallRating: OverallRating;
}> = ({ movie, directors, writers, userRating, handleRating, overallRating }) => {
	return (
		<div className="movie-details">
			<h1>{movie.title}</h1>
			<p>
				<strong>Director:</strong>{" "}
				{directors.map((director) => director.name).join(", ")}
			</p>
			<p>
				<strong>Writer:</strong>{" "}
				{writers.map((writer) => writer.name).join(", ")}
			</p>
			<p>
				<strong>Release Date:</strong> {movie.release_date}
			</p>
			<p>
				<strong>Genre:</strong> {movie.genres}
			</p>
			<div className="rating">
				<strong>Average Rating:</strong> {(+overallRating.avg_rating).toFixed(1)} ★
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
	);
};

const UserLists: React.FC<{
	userLists: UserList[];
	selectedList: number | null;
	setSelectedList: React.Dispatch<React.SetStateAction<number | null>>;
	handleAddToList: () => void;
}> = ({ userLists, selectedList, setSelectedList, handleAddToList }) => {
	return (
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
					<option value="">No lists available</option>
				)}
			</select>
			<button onClick={handleAddToList}>Add to List</button>
		</div>
	);
};

const Comments: React.FC<{
	comments: Comment[];
	newComment: string;
	setNewComment: React.Dispatch<React.SetStateAction<string>>;
	userName: string;
	setUserName: React.Dispatch<React.SetStateAction<string>>;
	handleCommentSubmit: () => void;
}> = ({ comments, newComment, setNewComment, userName, setUserName, handleCommentSubmit }) => {
	return (
		<div className="comments">
			<h2>Comments</h2>
			{comments.length > 0 ? (
				<ul>
					{comments.map((comment, index) => (
						<li key={index}>
							<strong>{comment.username}</strong>: {comment.content}
						</li>
					))}
				</ul>
			) : (
				<p>No comments yet.</p>
			)}
			<div className="comment-form">
				<input
					type="text"
					placeholder="Your name"
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
				/>
				<textarea
					placeholder="Your comment"
					value={newComment}
					onChange={(e) => setNewComment(e.target.value)}
				></textarea>
				<button onClick={handleCommentSubmit}>Submit Comment</button>
			</div>
		</div>
	);
};

export default MovieInfo;

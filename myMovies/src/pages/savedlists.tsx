import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../components/authContext";
import "./savedLists.css";
import axios from "axios";
import { AxiosResponse, AxiosError } from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

interface Movie {
	id: number;
	title: string;
	external_id: string;
	imageUrl: string;
	loading: boolean;
}

interface List {
	id: number;
	list_name: string;
}

interface movie_results {
	poster_path: string;
}

const initialLists: List[] = [
	{
		id: 1,
		list_name: "Liked",
	},
];

const SavedList: React.FC = () => {
	const [sList, setSList] = useState<List[]>(initialLists);
	const [currentListContent, setCurrentListContent] = useState<Movie[]>([]);
	const [selectedList, setSelectedList] = useState<List | null>(null);
	const [newListTitle, setNewListTitle] = useState<string>("");
	const [editMode, setEditMode] = useState<boolean>(false);

	const { uid } = useAuth();

	useEffect(() => {
		const getLists = async () => {
			try {
				const response: AxiosResponse = await axios.get(
					`${SERVER_URL}/user_lists?user_id=${uid}`
				);
				setSList(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		getLists();
	}, [uid]);

	useEffect(() => {
		currentListContent.map((movie) => {
			//console.log(movie.external_id);
			movie.loading = true;
			axios
				.get(`https://api.themoviedb.org/3/find/${movie.external_id}`, {
					params: {
						api_key: "3eb9eb6e4cdd56770769f662f9ce34ec",
						external_source: "imdb_id",
					},
				})
				.then((response: AxiosResponse) => {
					const { movie_results: a } = response.data;
					movie.imageUrl = a[0]["poster_path"];
					//console.log(a[0]["poster_path"]);
					movie.loading = false;
				})
				.catch((reason: AxiosError) => {
					movie.imageUrl = "";
					movie.loading = false;
					console.error("Error fetching image:" + movie.title, reason.code);
				});
		});

		setCurrentListContent([...currentListContent]);

	}, [selectedList]);

	const handleListClick = async (id: number) => {
		const list = sList.find((s) => s.id === id);
		if (list) {
			try {
				const response: AxiosResponse = await axios.get(
					`${SERVER_URL}/movies_in_list?list_id=${list.id}`
				);
				//console.log(response.data);
				setCurrentListContent(response.data);
				setSelectedList(list);
			} catch (error) {
				console.log(error);
			}
		}
	};

	const handleCreateList = async () => {
		if (newListTitle.trim() !== "") {
			try {
				const response: AxiosResponse = await axios.post(
					`${SERVER_URL}/user_lists`,
					{
						user_id: uid,
						list_name: newListTitle,
					}
				);
				const createdList = response.data;
				setSList((prevLists) => [...prevLists, createdList]);
				setNewListTitle("");
			} catch (error) {
				console.log(error);
			}
		} else {
			alert("Please enter a name for the new list");
		}
	};

	const handleRemoveMovie = async (
		e: React.MouseEvent,
		movieToRemove: string
	) => {
		e.stopPropagation();
		if (selectedList) {
			const movie_id = currentListContent.find(
				(movie) => movie.title === movieToRemove
			)?.id;

			if (!movie_id) return;

			try {
				await axios.delete(
					`${SERVER_URL}/remove_movie_from_list?movie_id=${movie_id}&list_id=${selectedList.id}`
				);
				const updatedMovies = currentListContent.filter(
					(movie) => movie.title !== movieToRemove
				);
				setCurrentListContent(updatedMovies);
			} catch (error) {
				console.error(error);
			}
		}
	};

	const toggleEditMode = () => {
		setEditMode(!editMode);
	};

	function movieImage(movie: Movie) {
		return movie.loading
			? "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
			: movie.imageUrl === "" || movie.imageUrl === undefined
			? "https://upload.wikimedia.org/wikipedia/en/4/4d/Shrek_%28character%29.png"
			: `https://image.tmdb.org/t/p/w500/${movie.imageUrl}`;
	}

	return (
		<div className="saved-list-container">
			<div className="saved-list-sidebar">
				<input
					type="text"
					placeholder="Enter new list name"
					value={newListTitle}
					onChange={(e) => setNewListTitle(e.target.value)}
					className="search-bar"
				/>
				<button onClick={handleCreateList}>Create New List</button>
				<div className="saved-list-grid">
					{sList.length > 0 ? (
						sList.map((saved) => (
							<div className="saved-list-box" key={saved.id}>
								<div
									onClick={() => handleListClick(saved.id)}
									className="saved-list-link"
								>
									<div className="saved-list-title">{saved.list_name}</div>
								</div>
							</div>
						))
					) : (
						<></>
					)}
				</div>
			</div>
			<div className="saved-list-content">
				{selectedList ? (
					<div>
						<div className="title-button-container">
							<button onClick={toggleEditMode} className="edit-button">
								{editMode ? "Done" : "Edit"}
							</button>
							<h1 className="list-title">{selectedList.list_name}</h1>
						</div>
						<div className="movie-grid">
							{currentListContent.length > 0 ? (
								currentListContent.map((movie) => (
									<div className="movie-box" key={movie.id}>
										<div className="movie-link-wrapper">
											<Link to={`/movie/${movie.id}`}>
												<img
													src={movieImage(movie)}
													alt={movie.title}
													className="movie-image"
													onLoad={() => {console.log("loaded")}}
												/>
												<div className="movie-title">{movie.title}</div>
											</Link>
											{editMode && (
												<button
													className="remove-button"
													onClick={(e) => handleRemoveMovie(e, movie.title)}
												>
													Remove
												</button>
											)}
										</div>
									</div>
								))
							) : (
								<></>
							)}
						</div>
					</div>
				) : (
					<div>Select a list to view its content</div>
				)}
			</div>
		</div>
	);
};

export default SavedList;

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
	imageUrl: string;
}

interface List {
	id: number;
	list_name: string;
}

const initialLists: List[] = [
	{
		id: 1,
		list_name: "Liked",
	},
];

const initialListContent: Movie[] = [
		{ id: 1, title: "test1", imageUrl: "" },
		{ id: 2, title: "test2", imageUrl: "" },
		{ id: 3, title: "test3", imageUrl: "" },
	];

const SavedList: React.FC = () => {
	const [sList, setSList] = useState<List[]>(initialLists);
	const [currentListContent, setCurrentListContent] =
		useState<Movie[]>(initialListContent);
	const [selectedList, setSelectedList] = useState<List | null>(null);
	const [newListTitle, setNewListTitle] = useState<string>("");
	const [editMode, setEditMode] = useState<boolean>(false);
	const [newList, setNewList] = useState();

	const { uid } = useAuth();

	useEffect(() => {
		const getLists = async () => {
			await axios
				.get(`${SERVER_URL}/user_lists?user_id=${uid}`)
				.then((response: AxiosResponse) => {
					setSList(response.data);
					console.log(response);
				})
				.catch((reason: AxiosError) => {
					console.log(reason);
				});
		};
		getLists();
	}, [uid]);

	const handleListClick = async (id: number) => {
		const list = sList.find((s) => s.id === id);
		if (list) {
			await axios
				.get(`${SERVER_URL}/movies_in_list?list_id=${list.id}`)
				.then((response: AxiosResponse) => {
					setCurrentListContent(response.data);
					console.log(response);
				})
				.catch((reason: AxiosError) => {
					console.log(reason);
				});
			setSelectedList(list);
		}
	};

	const handleCreateList = async () => {
		
		if (newListTitle.trim() !== "") {
			await axios
			.post(`${SERVER_URL}/user_lists?user_id=${uid}&list_name=${newListTitle}`)
			.then((response: AxiosResponse) => {
				setNewList(response.data);
				console.log(response);
			})
			.catch((reason: AxiosError) => {
				console.log(reason);
			});

			if (newList === undefined) return;

			setSList([...sList, newList]);
			setNewListTitle("");
		} else {
			alert("Please enter a name for the new list");
		}
	};

	const handleRemoveMovie = async (movieToRemove: string) => {
		if (selectedList) {
			const updatedMovies = currentListContent.filter(
				(movie) => movie.title !== movieToRemove
			);
			const updatedList = { ...selectedList, movies: updatedMovies };

			setSelectedList(updatedList);
			setSList(
				sList.map((list) => (list.id === updatedList.id ? updatedList : list))
			);
		}
	};

	const toggleEditMode = () => {
		setEditMode(!editMode);
	};

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
								<Link
									to="#"
									onClick={() => handleListClick(saved.id)}
									className="saved-list-link"
								>
									<div className="saved-list-title">{saved.list_name}</div>
								</Link>
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
							{currentListContent.length > 0 ? currentListContent.map((movie) => (
								<div className="movie-box" key={movie.id}>
									<Link to={`/movie/${movie.id}`}>
										<img
											src="https://upload.wikimedia.org/wikipedia/en/4/4d/Shrek_%28character%29.png"
											alt={movie.title}
											className="movie-image"
										/>
										<div className="movie-title">
											{movie.title}
											{editMode && (
												<button
													className="remove-button"
													onClick={() => handleRemoveMovie(movie.title)}
												>
													Remove
												</button>
											)}
										</div>
									</Link>
								</div>
							)) : <></>}
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

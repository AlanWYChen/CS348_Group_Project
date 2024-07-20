import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./savedLists.css";

interface Movie {
	id: number;
	title: string;
	imageUrl: string; // Assuming this property exists
}

interface Saved {
	id: number;
	title: string[];
	movies: Movie[];
}

const initialLists: Saved[] = [
	{
		id: 1,
		title: ["Liked"],
		movies: [
			{ id: 1, title: "test1", imageUrl: "" },
			{ id: 2, title: "test2", imageUrl: "" },
			{ id: 3, title: "test3", imageUrl: "" },
		],
	},
];

const SavedList: React.FC = () => {
	const [sList, setSList] = useState<Saved[]>(initialLists);
	const [selectedList, setSelectedList] = useState<Saved | null>(null);
	const [newListTitle, setNewListTitle] = useState<string>("");
	const [editMode, setEditMode] = useState<boolean>(false);

	const handleListClick = (id: number) => {
		const list = sList.find((s) => s.id === id);
		if (list) {
			setSelectedList(list);
		}
	};

	const handleCreateList = () => {
		if (newListTitle.trim() !== "") {
			const newList = {
				id: sList.length + 1,
				title: [newListTitle],
				movies: [],
			};
			setSList([...sList, newList]);
			setNewListTitle("");
		} else {
			alert("Please enter a name for the new list");
		}
	};

	const handleRemoveMovie = (movieToRemove: string) => {
		if (selectedList) {
			const updatedMovies = selectedList.movies.filter(
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
				<button onClick={toggleEditMode} className="edit-button">
					{editMode ? "Done" : "Edit"}
				</button>
				<div className="saved-list-grid">
					{sList.map((saved) => (
						<div className="saved-list-box" key={saved.id}>
							<Link
								to="#"
								onClick={() => handleListClick(saved.id)}
								className="saved-list-link"
							>
								<div className="saved-list-title">{saved.title[0]}</div>
							</Link>
						</div>
					))}
				</div>
			</div>
			<div className="saved-list-content">
				{selectedList ? (
					<div>
						<h1>{selectedList.title[0]}</h1>
						<div className="movie-grid">
							{selectedList.movies.map((movie, index) => (
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
							))}
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

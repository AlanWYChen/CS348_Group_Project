import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

// import "./movieInfo.css";

interface Saved {
    id: number;
    title:string[];
}

const sList: Saved[] = [
    {
      id: 1,
      title: ["Iron Man", "Iron Man 2", "Iron Man 3"]
    },
    {
      id: 2,
      title: ["Steel Man", "Steel Man 2", "Steel Man 3"]
    },
    {
      id: 3,
      title: ["Gold Man", "Gold Man 2", "Gold Man 3"]
    },
  ];

type RouteParams = {
  id: string;
};

const ListInfo: React.FC = () => {
  const { id } = useParams<RouteParams>();

  if (!id) return <div>List not found</div>;

  const list = sList.find(s => s.id === parseInt(id));

  if (!list) return <div>List not found</div>;

  return (
    <div>
      <h1>{list.id}</h1>
      {list.title &&
					list.title.map((movie) => (
						<li key={movie}>
							<Link to={"/"}>{movie}</Link>
						</li>
					))}
    </div>
  );
};

export default ListInfo;

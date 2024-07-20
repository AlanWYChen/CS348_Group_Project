import React from 'react';
import { useParams, Link } from 'react-router-dom';

// Define the Saved interface
interface Saved {
  id: number;
  title: string[];
}

// Sample saved lists
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

// Define the type for route parameters
type RouteParams = {
  id: string;
};

const ListInfo: React.FC = () => {
  const { id } = useParams<RouteParams>();

  // Handle invalid or missing ID parameter
  if (!id) return <div>List not found</div>;

  const list = sList.find(s => s.id === parseInt(id, 10));

  // Handle list not found
  if (!list) return <div>List not found</div>;

  return (
    <div>
      <h1>List {list.id}</h1>
      <ul>
        {list.title.map((movie, index) => (
          <li key={index}>
            <Link to="/">{movie}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListInfo;

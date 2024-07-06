import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieList from './movieList';
import MovieInfo from './movieInfo';


const AllMovies: React.FC = () => {
    return (
        <MovieList />
    );
};

export default AllMovies;
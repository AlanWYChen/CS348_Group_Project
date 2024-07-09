import React from "react";
import RandomMovies from "./randomMovieList";

const Home: React.FC = () => {
    return (
        <div id="home_content">
            <h1>Welcome to the Home Page of Film Folio!</h1>
            <RandomMovies />
        </div>
    );
};

export default Home;
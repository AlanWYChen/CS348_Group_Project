import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/navbar";
import Home from "./pages/home";
import MovieList from "./pages/welcome_list";

const App = () => {
 return (
   <Router>
     <NavBar />
     <main className="main-content">
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/movie_list" element={<MovieList />} />
         {/* Define other routes that you need*/}
       </Routes>
     </main>
   </Router>
 );
};

export default App;
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/navbar";
import Home from "./pages/home";
import MovieInfo from "./pages/movieInfo";

const App = () => {
 return (
   <Router>
     <NavBar />
     <main className="main-content">
       <Routes>
         <Route path="/" element={<Home />} />
         {/* Define other routes that you need*/}
         <Route path="/about-us" element={<MovieInfo />}/>
       </Routes>
     </main>
   </Router>
 );
};

export default App;
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/navbar";
import Home from "./pages/home";

const App = () => {
 return (
   <Router>
     <NavBar />
     <main className="main-content">
       <Routes>
         <Route path="/" element={<Home />} />
         {/* Define other routes that you need*/}
       </Routes>
     </main>
   </Router>
 );
};

export default App;
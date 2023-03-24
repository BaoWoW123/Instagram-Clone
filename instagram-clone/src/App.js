import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Post from "./components/Post";
import Profile from "./components/Profile";
import './styles/App.css'
const App = () => {
  return (
    <div className="App">
      
      <div className="header">
        <div>Itstagram</div>
        <input type='text' placeholder='Search'/>
        <div className="navBar">
          <div><Link to='/'>Home</Link></div>
          <div><Link to='/post'>Post</Link></div>
          <div><Link to='/profile'>Profile</Link></div>
        </div>
      </div>
     <Routes>
      <Route index element={<Home/>}/>
      <Route path="/post" element={<Post/>}/>
     <Route path="/profile" element={<Profile/>}/>
     </Routes>
    </div>
  );
}

export default App;

import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Post from "./components/Post";
import Profile from "./components/Profile";
import "./styles/App.css";
import home from './assets/navBar/home.png'
import search from './assets/navBar/search.png'
import explore from './assets/navBar/explore.png'
import message from './assets/navBar/message.png'
import notification from './assets/navBar/notification.png'
import create from './assets/navBar/create.png'
import more from './assets/navBar/more.png'

const App = () => {
  return (
    <div className="App">
      <div className="header">
        <div className="title">Itstagram</div>
        <div className="navBar">
          <div>
            <Link to="/"><img src={home}/>Home</Link>
          </div>
          <div>
            <Link to="/"><img src={search}/>Search</Link>
          </div>
          <div>
            <Link to="/"> <img src={explore}/>Explore</Link>
          </div>
          <div>
            <Link to="/"> <img src={explore}/>Reels</Link>
          </div>
          <div>
            <Link to="/"><img src={message}/>Messages</Link>
          </div>
          <div>
            <Link to="/"><img src={notification}/>Notifications</Link>
          </div>
          <div>
            <Link to="/post"><img src={create}/>Create</Link>
          </div>
          <div>
            <Link to="/profile">Profile</Link>
          </div>
          <div >
            <Link to="/"><img src={more}/>More</Link>
          </div>
        </div>
      </div>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/post" element={<Post />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;

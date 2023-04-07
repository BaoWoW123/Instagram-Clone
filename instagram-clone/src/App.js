import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Post from "./components/Post";
import Profile from "./components/Profile";
import "./styles/App.css";
import home from "./assets/navBar/home.png";
import search from "./assets/navBar/search.png";
import explore from "./assets/navBar/explore.png";
import message from "./assets/navBar/message.png";
import notification from "./assets/navBar/notification.png";
import create from "./assets/navBar/create.png";
import more from "./assets/navBar/more.png";
import reels from "./assets/navBar/reels.png";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, db } from "./firebase";

const App = () => {
  const navigate = useNavigate();

  const signInGoogle = async () => {
    let accImg = document.querySelector('.accImg')
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    navigate("/")
    setTimeout(function(){updatePage(auth)},1)//delayed updatePage(), can't await navigate()
  };
  const signOutGoogle = () => {
    const moreMenu = document.querySelector(".moreMenu");
    if (moreMenu.className === "moreMenu") {
      moreMenu.className = "moreMenu hidden";
    }
    try {
      signOut(getAuth());
      navigate("/login");
    } catch (error) {
      console.log("signout error", error);
    }
  };

  const updatePage = (auth) => {
    let acc = document.querySelector(".rightDivAcc");
    let accImg = document.querySelector('.accImg')
    accImg.src = auth.currentUser.photoURL;
    acc.firstChild.textContent = auth.currentUser.displayName;
    acc.lastChild.textContent = auth.currentUser.email;
  };

  const firebaseAuth = () => { 
    onAuthStateChanged(getAuth());
  };

  const showMore = () => {
    const moreMenu = document.querySelector(".moreMenu");
    if (moreMenu.className === "moreMenu hidden") {
      moreMenu.className = "moreMenu";
      moreMenu.style.backgroundColor = "lightgray";
    } else {
      moreMenu.className = "moreMenu hidden";
      moreMenu.style.backgroundColor = "none";
    }
  };
  return (
    <div className="App">
      <div className="header">
        <div className="title">Itstagram</div>
        <div className="navBar">
          <div>
            <Link to="/">
              <img src={home} />
              Home
            </Link>
          </div>
          <div>
            <Link to="/">
              <img src={search} />
              Search
            </Link>
          </div>
          <div>
            <Link to="/">
              {" "}
              <img src={explore} />
              Explore
            </Link>
          </div>
          <div>
            <Link to="/">
              {" "}
              <img src={reels} />
              Reels
            </Link>
          </div>
          <div>
            <Link to="/">
              <img src={message} />
              Messages
            </Link>
          </div>
          <div>
            <Link to="/">
              <img src={notification} />
              Notifications
            </Link>
          </div>
          <div>
            <Link to="/post">
              <img src={create} />
              Create
            </Link>
          </div>
          <div>
            <Link to="/profile">Profile</Link>
          </div>
          <div className="moreWrapper">
            <div>
              <div className="moreMenu hidden">
                <div>Settings</div>
                <div>Your Activity</div>
                <div>Saved</div>
                <div>Switch Appearance</div>
                <div>Report a problem</div>
                <div>Switch Accounts</div>
                <div onClick={signOutGoogle}>Log out</div>
              </div>
              <div onClick={showMore}>
                <img src={more} />
                More
              </div>
            </div>
          </div>
        </div>
      </div>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/post" element={<Post />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login signIn={signInGoogle} />} />
      </Routes>
    </div>
  );
};

export default App;

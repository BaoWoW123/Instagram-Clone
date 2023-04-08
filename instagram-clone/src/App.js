import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Post from "./components/Post";
import Profile from "./components/Profile";
import "./styles/App.css";
import Signup from "./components/Signup";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "./firebase";

const App = () => {

  let [user, setUser] = useState(); 
  const navigate = useNavigate();

  const logInEmail = (email, pw) => {
    signInWithEmailAndPassword(getAuth(), email, pw).then((userInfo) => {
      console.log('signed in', userInfo)
      navigate('/home')
    }).catch((error) => {
      alert(error)
    })
  }
  const createAcc = (email, pw) => {
    createUserWithEmailAndPassword(getAuth(), email, pw).then((userInfo) => {
      //signed in
      console.log('created email acc', userInfo)
      navigate('/home')
    }).catch((error) => {
      alert(error)
    })
  }

  const routeSignup = () => {
    navigate('/signup')
  }

  const routeLogin = () => {
    navigate('/login')
  }

  const signInGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    setUser(user = auth)//user resets on restart
    navigate("/home")
    setTimeout(function(){updatePage(auth)},1)//delayed updatePage(), can't await navigate()
  };
  const signOutAcc = () => {
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

  useEffect(() => {
    
  }, [])

  
  return (
    <div className="App">
      <Routes>
        <Route index path='/' element={<Login signInGoogle={signInGoogle} logInEmail={logInEmail} routeSignup={routeSignup}  />} />
        <Route path='/login' element={<Login signInGoogle={signInGoogle} logInEmail={logInEmail}  routeSignup={routeSignup}/>} />
        <Route path="/post" element={<Post signOut={signOutAcc}/>} />
        <Route path="/profile" element={<Profile signOut={signOutAcc}/>} />
        <Route path="/home" element={<Home signOut={signOutAcc}/>} />
        <Route path="/signup" element={<Signup createAcc={createAcc} routeLogin={routeLogin} signInGoogle={signInGoogle}/>} />
      </Routes>
    </div>
  );
};

export default App;

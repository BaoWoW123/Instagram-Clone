import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
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
import { auth, database } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const App = () => {
  let [user, setUser] = useState({});
  let [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  const logInEmail = (email, pw) => {
    signInWithEmailAndPassword(getAuth(), email, pw)
      .then((userInfo) => {
        console.log("signed in", userInfo);
        navigate("/home");
      })
      .catch((error) => {
        alert(error);
      });
  };
  const createAcc = (email, pw, name, username) => {
    createUserWithEmailAndPassword(getAuth(), email, pw)
      .then((userInfo) => {
        setUser(userInfo.user);
        storeAcc(userInfo.user, name, username);
        navigate("/home");
      })
      .catch((error) => {
        alert(error);
      });
  };
  const storeAcc = async (user, name, username) => {
    //adds new user to database
    console.log("user", user);
    try {
      await setDoc(doc(database, "users", user.uid), {
        fullname: name,
        profileImg: user.photoURL,
        username: username,
      });
    } catch (error) {
      console.log("error setting new user doc", error);
    }
  };

  const routeSignup = () => {
    navigate("/signup");
  };

  const routeLogin = () => {
    navigate("/login");
  };

  const signInGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    setUser(auth.currentUser);
    getUserInfo(auth.currentUser);
    localStorage.setItem("user", JSON.stringify(auth.currentUser)); //only for google sign in
    navigate("/home", {}, () => {
      updatePage();
    });
  };
  const signOutAcc = async () => {
    const moreMenu = document.querySelector(".moreMenu");
    if (moreMenu.className === "moreMenu") {
      moreMenu.className = "moreMenu hidden";
    }
    try {
      setUser({});
      localStorage.removeItem("user");
      await signOut(getAuth());
      navigate("/login");
    } catch (error) {
      console.log("signout error", error);
    }
  };

  const getUserInfo = async (user) => {
    const userRef = doc(database, "users", `${user.uid}`);
    const userData = (await getDoc(userRef)).data();
    setUserInfo(userData);
  };
  const updatePage = async () => {};

  const firebaseAuth = () => {
    onAuthStateChanged(getAuth());
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe();
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user"); //sets user based on local storage item
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          index
          path="/"
          element={
            <Login
              signInGoogle={signInGoogle}
              logInEmail={logInEmail}
              routeSignup={routeSignup}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              signInGoogle={signInGoogle}
              logInEmail={logInEmail}
              routeSignup={routeSignup}
            />
          }
        />
        <Route
          path="/post"
          element={<Post signOut={signOutAcc} userInfo={userInfo} />}
        />
        <Route
          path="/profile"
          element={
            <Profile
              signOut={signOutAcc}
              setUser={setUser}
              user={user}
              userInfo={userInfo}
              getUserInfo={getUserInfo}
            />
          }
        />
        <Route
          path="/home"
          element={
            <Home
              signOut={signOutAcc}
              user={user}
              setUser={setUser}
              userInfo={userInfo}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <Signup
              createAcc={createAcc}
              routeLogin={routeLogin}
              signInGoogle={signInGoogle}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;

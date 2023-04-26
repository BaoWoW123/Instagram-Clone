import "../styles/Home.css";
import { testImgArr, testPostArr } from "./testImages";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import { auth, database } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import PostList from "./PostList";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  let [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const showNext = () => {
    const followers = document.querySelectorAll(".follower");
    followers.forEach((el) => {
      return (el.style.transform = "translateX(-360px)");
    });
    const prevBtn = document.querySelector(".storiesPrevBtn");
    const nextBtn = document.querySelector(".storiesNextBtn");
    nextBtn.className = "storiesNextBtn hidden";
    prevBtn.className = "storiesPrevBtn";
  };

  const showPrev = () => {
    const followers = document.querySelectorAll(".follower");
    followers.forEach((el) => {
      return (el.style.transform = "translateX(0px)");
    });
    const prevBtn = document.querySelector(".storiesPrevBtn");
    const nextBtn = document.querySelector(".storiesNextBtn");
    nextBtn.className = "storiesNextBtn";
    prevBtn.className = "storiesPrevBtn hidden";
  };

  const getFeed = async () => {
    const userId = props.user.uid;
    const userRef = doc(database, "users", `${userId}`);
    let followersPostsArr = [];
    let followersArray = [];
    const userDoc = (await getDoc(userRef)).data();

    //if user has no followers, add test followers
    if (!userDoc) {
      return alert(
        "Error loading feed.This usually occurs when refreshing. Please relog in again"
      );
    } else if (userDoc.followersArr == undefined) {
      updateDoc(userRef, {
        followersArr: ["testUser1", "testUser2"],
      });
      console.log("added fake followers", userDoc);
    }

    followersArray = userDoc.followersArr;
    //loop over followers and their posts
    for (let i = 0; i < followersArray.length; i++) {
      let followerPostsRef = doc(database, "users", followersArray[i]);
      let postsRef = collection(followerPostsRef, "posts");
      let followerPosts = await getDocs(postsRef);

      followerPosts.docs.forEach((doc) => {
        followersPostsArr.push(doc.data());
      });
    }
    followersPostsArr.sort((a, b) => new Date(b.date) - new Date(a.date));
    try {
      setPosts(followersPostsArr);
    } catch (error) {
      console.log("error displaying feed", error);
    }
  };

  useEffect(() => {
    //IMPORTANT: Tests can't run with hook active
    const unsubscribe = auth.onAuthStateChanged((user) => {
      props.setUser(user);
    });

    return unsubscribe();
  }, []);

  useEffect(() => {
    //goes to login page if no user found
    if (!props.user) {
      navigate("/");
    }
    getFeed();
  }, []);

  return (
    <div className="Home" aria-label="Home">
      <NavBar signOut={props.signOut} userInfo={props.userInfo} />
      <div className="feed">
        <div className="storiesContainer">
          <button className="storiesNextBtn" onClick={showNext}>
            {">"}
          </button>
          <button className="storiesPrevBtn hidden" onClick={showPrev}>
            {"< "}
          </button>
          <div className="storiesWrapper">
            {testImgArr.map((el, i) => {
              return (
                <div className="follower" key={i}>
                  <div className="followerImg">
                    <img src={el.img} />
                  </div>
                  <div>{el.username}</div>
                </div>
              );
            })}
          </div>
        </div>
        <PostList posts={posts} userInfo={props.userInfo} />
      </div>
      <div className="rightDiv">
        <div>
          <div className="suggestSwitchAcc">
            <img
              className="accImg"
              src={props.userInfo ? props.userInfo.profileImg : ""}
              width={70}
              height={70}
            />
            <div className="rightDivAcc">
              <div>{props.user ? props.user.displayName : "display name"}</div>
              <div>
                {props.userInfo
                  ? `@${props.userInfo.username}`
                  : "display username"}
              </div>
            </div>
          </div>
          <button>Switch</button>
        </div>
        <div className="suggestions">
          <div>
            Suggestions For You{" "}
            <button style={{ color: "black" }}>See All</button>
          </div>
          {testImgArr.map((el, i) => {
            if (i < 5) {
              return (
                <div className="suggestionFollowers" key={i}>
                  <div>
                    <img src={el.img} />
                    <div>
                      <div className="suggestFollowerName">{el.username}</div>
                      <div>
                        Followed by {el.username} + {i + 3} more
                      </div>
                    </div>
                  </div>
                  <button>Follow</button>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;

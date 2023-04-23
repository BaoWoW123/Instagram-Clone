import "../styles/Home.css";
import { testImgArr, testPostArr } from "./testImages";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import { auth, database } from "../firebase";
import { collection, getDocs, query } from "firebase/firestore";
import PostList from "./PostList";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const [posts, setPosts] = useState([]);
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
    //const followersRef = collection(database ,'users', 'testUser1', 'followers')
    const followerId = "testUser2";
    const postsRef = collection(database, "users", followerId, "posts");
    const postsQ = query(postsRef);
    const postsQSnap = await getDocs(postsQ);
    const tempPostArr = [];
    postsQSnap.forEach((doc) => {
      tempPostArr.unshift(doc.data());
    });
    await setPosts(tempPostArr);
    try {
    } catch (error) {
      console.log("error displaying feed", error);
    }
  };

  useEffect(() => {
    //IMPORTANT: Tests can't run with hook active
    getFeed();
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
  }, [props.user]);

  return (
    <div className="Home" aria-label="Home">
      <NavBar signOut={props.signOut} />
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
        <PostList posts={posts} />
      </div>
      <div className="rightDiv">
        <div>
          <div className="suggestSwitchAcc">
            <img
              className="accImg"
              src={props.user ? props.user.photoURL : ""}
            />
            <div className="rightDivAcc">
              <div>{props.user ? props.user.displayName : "display name"}</div>
              <div>{props.user ? props.user.email : "display username"}</div>
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

import "../styles/Home.css";
import { testImgArr, testPostArr } from "./testImages";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import { auth, database } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import PostList from "./PostList";
import { useNavigate } from "react-router-dom";
import heart from "../assets/navBar/heart.png";
import bookmark from "../assets/navBar/bookmark.png";
import message from "../assets/navBar/message.png";
import send from "../assets/navBar/send.png";

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
    
    if (!userDoc && userId != undefined) {
      console.log('creating')
      await setDoc(doc(database, "users", `${userId}`), {
        fullName: props.user.displayName,
        profileImg: props.user.photoURL,
        username: props.user.displayName, //UPDATE, full name shouldnt be username
      })
    }
    //if user has no followers, add test followers
    if (!userDoc) {
      alert(
        "Error loading feed.This usually occurs when refreshing. Please relog in again"
      );
      return navigate('/login')
    } else if (userDoc.followersArr == undefined) {
      updateDoc(userRef, {
        followersArr: ["testUser1", "testUser2"],
      });
      followersArray = ["testUser1", "testUser2"];
      console.log("added fake followers");
    } else followersArray = userDoc.followersArr;

    followersArray.push(userId)

    //loop over followers, their posts, and comments
    for (let i = 0; i < followersArray.length; i++) {
      let followerRef = doc(database, "users", followersArray[i]);
      let postsRef = collection(followerRef, "posts");
      let followerPosts = await getDocs(postsRef);
      let followerInfo = (await getDoc(followerRef)).data();

      for (const post in followerPosts.docs) {
        const currentPost = followerPosts.docs[post];
        const commentsRef = collection(
          doc(postsRef, `${currentPost.id}`),
          "comments"
        );
        const commentsData = (await getDocs(commentsRef)).docs;
        let commentArr = [];

        if (commentsData.length >= 1) {
          for (const comment in commentsData) {
            const currentComment = commentsData[comment];
            const commentData = (
              await getDoc(doc(commentsRef, `${currentComment.id}`))
            ).data();
            commentArr.push(commentData);
          }
          commentArr.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          );
        }
        followersPostsArr.push({
          post: currentPost.data(),
          user: followerInfo,
          commentsData: commentArr,
        });
      }
    }
    followersPostsArr.sort(
      (a, b) => new Date(b.post.date) - new Date(a.post.date)
    );
    setPosts(followersPostsArr);
  };

  //Creates post with DOM manipulation
  const viewPost = (post) => {
    const homePage = document.querySelector(".Home");
    const fullPostWrapper = document.createElement("div");
    const fullPost = document.createElement("div");
    const img = document.createElement("img");
    const postFeedWrapper = document.createElement("div");
    const postFeedPoster = document.createElement("div");
    const posterImg = document.createElement("img");
    const posterUsername = document.createElement("b");
    const caption = document.createElement("div");
    const commentsWrapper = document.createElement("div");
    const fullPostUserWrapper = document.createElement("div");
    const postBtn = document.createElement("button");
    const postInfoWrapper = document.createElement("div");
    const postInfo = document.createElement("div");
    const postInfoLikes = document.createElement("b");
    const postInfoDate = document.createElement("div");
    const postInfoBtns = document.createElement("div");
    const postInfoLike = document.createElement("img");
    const postInfoMsg = document.createElement("img");
    const postInfoSend = document.createElement("img");
    const postInfoBookmark = document.createElement("img");
    let commentInput = document.createElement("input");

    fullPost.className = "fullPost";
    fullPostWrapper.className = "fullPostWrapper";
    postFeedWrapper.className = "postFeedWrapper";
    postFeedPoster.className = "postFeedPoster";
    commentsWrapper.className = "commentsWrapper";
    fullPostUserWrapper.className = "fullPostUserWrapper";
    postBtn.className = "fullPostPostBtn";
    commentInput.className = "fullPostCommentInput";
    postInfoWrapper.className = "fullPostInfoWrapper";
    commentInput.placeholder = "Add a comment...";
    postBtn.textContent = "Post";
    postInfoBtns.className = "fullPostInfoBtns";
    postInfoWrapper.className = "fullPostInfoWrapper";
    postInfo.className = "fullPostInfo";
    img.src = post.post.postImg;
    posterImg.src = post.user.profileImg;
    postInfoLike.src = heart;
    postInfoBookmark.src = bookmark;
    postInfoSend.src = send;
    postInfoMsg.src = message;
    caption.textContent = post.post.caption;
    posterUsername.textContent = `@${post.user.username}`;
    postInfoLikes.textContent = `${Math.ceil(Math.random() * 10)} likes`;
    postInfoDate.textContent = `${Math.floor(
      new Date(new Date().getTime() - new Date(post.post.date)) /
        (1000 * 3600 * 24)
    )} DAYS AGO`;

    postInfoBtns.append(postInfoLike);
    postInfoBtns.append(postInfoMsg);
    postInfoBtns.append(postInfoSend);
    postInfoBtns.append(postInfoBookmark);
    postInfo.appendChild(postInfoLikes);
    postInfo.appendChild(postInfoDate);

    postFeedPoster.appendChild(posterImg);
    postFeedPoster.appendChild(posterUsername);
    postFeedPoster.appendChild(caption);
    postInfoWrapper.appendChild(postInfoBtns);
    postInfoWrapper.appendChild(postInfo);
    fullPostUserWrapper.appendChild(commentInput);
    fullPostUserWrapper.appendChild(postBtn);
    homePage.appendChild(fullPostWrapper);
    fullPostWrapper.appendChild(fullPost);
    fullPost.appendChild(img);
    fullPost.appendChild(postFeedWrapper);
    postFeedWrapper.appendChild(postFeedPoster);
    postFeedWrapper.appendChild(commentsWrapper);
    postFeedWrapper.appendChild(postInfoWrapper);
    postFeedWrapper.appendChild(fullPostUserWrapper);

    post.commentsData.map(async (comment) => {
      const commentWrapper = document.createElement("div");
      const commenterImg = document.createElement("img");
      const commenterUsername = document.createElement("b");
      const commentText = document.createElement("div");
      const usersRef = collection(database, "users");
      const q = query(
        usersRef,
        where("username", "==", `${comment.commentBy}`)
      );
      const commenter = await getDocs(q);
      if (commenter.size > 1) alert("same usernames in comments");
      const commenterData = commenter.docs[0].data();
      commentWrapper.className = "commentWrapper";
      commenterImg.src = commenterData.profileImg;
      commenterUsername.textContent = comment.commentBy;
      commentText.textContent = comment.comment;

      commentWrapper.appendChild(commenterImg);
      commentWrapper.appendChild(commenterUsername);
      commentWrapper.appendChild(commentText);
      commentsWrapper.appendChild(commentWrapper);
    });

    postFeedWrapper.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
    });
    fullPostWrapper.addEventListener("click", (e) => {
      homePage.removeChild(fullPostWrapper);
    });
    postBtn.addEventListener('click', () => {postComment(commentInput, post)})
  };

  const postComment = async (input, post) => {
    const userRef = doc(database, "users", post.post.id);
    const postsRef = collection(userRef, "posts");
    const postRef = doc(postsRef, post.post.postId);
    const commentsRef = collection(postRef, "comments");
    let commentInput = input;
    if (commentInput.value === '') return;

    const commentData = {
      comment: commentInput.value,
      commentBy: props.userInfo.username,
      date: new Date().toLocaleTimeString([], {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };

    await addDoc(commentsRef, commentData);
    commentInput.value = "";
    console.log('added comment')
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
        <PostList posts={posts} userInfo={props.userInfo} viewPost={viewPost} postComment={postComment}/>
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

import postDot from "../assets/navBar/post.png";
import bookmark from "../assets/navBar/bookmark.png";
import send from "../assets/navBar/send.png";
import postmessage from "../assets/navBar/postmessage.png";
import like from "../assets/navBar/heart.png";
import "../styles/Home.css";
import { useEffect, useState } from "react";
import { database } from "../firebase";
import { addDoc, collection, doc } from "firebase/firestore";
import "../styles/Post.css";

const PostList = ({ posts, userInfo }) => {
  let [loading, setLoading] = useState(true);

  const postComment = async (e, post) => {
    const userRef = doc(database, "users", post.post.id);
    const postsRef = collection(userRef, "posts");
    const postRef = doc(postsRef, post.post.postId);
    const commentsRef = collection(postRef, "comments");
    const commentInput = e.target.parentNode.firstChild;
    
    const commentData = {
      comment: commentInput.value,
      commentBy: userInfo.username,
      date: new Date().toLocaleTimeString([], {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    
    await addDoc(commentsRef, commentData);
    commentInput.value = "";
  };

  useEffect(() => {
    if (posts) return setLoading(false);
  }, [posts]);

  return (
    <>
      {loading == true ? (
        <div
          style={{ margin: "0px 35%", textAlign: "center", fontSize: "20px" }}
        >
          Loading
          <div className="loading" style={{ margin: "auto" }}>
            <div></div>
          </div>
        </div>
      ) : (
        <div className="posts">
          {posts.map((post, i) => {
            return (
              <div className="post" key={i}>
                <div>
                  <div className="postInfo">
                    <img
                      src={post.user.profileImg}
                      style={{ width: "50px", marginRight: "10px" }}
                    />
                    <div style={{ fontWeight: "bold" }}>
                      @{post.user.username}
                    </div>
                    <div>{post.date}</div>
                  </div>
                  <img src={postDot} />
                </div>
                <img src={post.post.postImg} />
                <div className="postDescrip">
                  <div className="postNavBar">
                    <div>
                      <img src={like} />
                      <img src={postmessage} />
                      <img src={send} />
                    </div>
                    <div>Nav Dots here</div>
                    <div>
                      <img src={bookmark} />
                    </div>
                  </div>
                  <div className="postLikes">
                    <div>Images here</div>
                    <div>
                      Like by <b>username</b> and <b>others</b>
                    </div>
                  </div>
                  <div className="postCaption">
                    <div>
                      <b>@{post.user.username}</b> {post.post.caption}
                    </div>
                    <div>View {Math.ceil(Math.random() * 10)} comments</div>
                  </div>
                  <div className="postComment">
                    <input type="text" placeholder="Add a comment..."></input>
                    <button onClick={(e) => postComment(e, post)}>Post</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default PostList;

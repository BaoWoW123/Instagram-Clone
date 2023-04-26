import postDot from "../assets/navBar/post.png";
import bookmark from "../assets/navBar/bookmark.png";
import send from "../assets/navBar/send.png";
import postmessage from "../assets/navBar/postmessage.png";
import like from "../assets/navBar/heart.png";
import "../styles/Home.css";
import { testImgArr } from "./testImages";
import { useEffect, useId, useState } from "react";
import { database } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import '../styles/Post.css'

const PostList = ({ posts, userInfo }) => {
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    if (posts) return setLoading(false)
  }, [posts])

  return (
   <>
      {loading == true ? (
        <div style={{margin:'0px 35%', textAlign:'center', fontSize:'20px'}}>
          Loading
        <div className="loading" style={{margin:'auto'}}> 
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
                <img src={userInfo.profileImg} style={{width:'50px', marginRight:'10px'}}/>
                <div style={{ fontWeight: "bold" }}>@{userInfo.username}</div>
                <div>{post.date}</div>
              </div>
              <img src={postDot} />
            </div>
            <img src={post.postImg} />
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
                  <b>@{userInfo.username}</b> {post.caption}
                </div>
                <div>View {Math.ceil(Math.random() * 10)} comments</div>
              </div>
              <div className="postComment">
                <input type="text" placeholder="Add a comment..."></input>
                <button>Post</button>
              </div>
            </div>
          </div>
        );
      })}
         </div>
      ) }
    </>
  );
};

export default PostList;

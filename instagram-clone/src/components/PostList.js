import postDot from "../assets/navBar/post.png";
import bookmark from "../assets/navBar/bookmark.png";
import send from "../assets/navBar/send.png";
import postmessage from "../assets/navBar/postmessage.png";
import like from "../assets/navBar/heart.png";
import "../styles/Home.css";
import { testImgArr } from "./testImages";

const PostList = ({ posts }) => {
  return (
    <div className="posts">
      {posts.map((post, i) => {
        return (
          <div className="post" key={i}>
            <div>
              <div className="postInfo">
                <img src={testImgArr[0].img} />
                <div style={{ fontWeight: "bold" }}>{}Username here</div>
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
                  <b>{}Username here</b> {post.caption}
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
  );
};

export default PostList;

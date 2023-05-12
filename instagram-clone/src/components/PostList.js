import postDot from "../assets/navBar/post.png";
import bookmark from "../assets/navBar/bookmark.png";
import send from "../assets/navBar/send.png";
import postmessage from "../assets/navBar/postmessage.png";
import like from "../assets/navBar/heart.png";
import "../styles/Home.css";
import { useEffect, useState } from "react";
import "../styles/Post.css";

const PostList = ({ posts, viewPost, postComment }) => {
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    if (posts.length >= 1) return setLoading(false);
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
          {posts.map((post) => {
            return (
              <div className="post" key={post.post.postId}>
                <div>
                  <div className="postInfo">
                    <img
                      src={post.user.profileImg}
                      style={{ width: "50px", marginRight: "10px" }}
                    />
                    <div style={{ fontWeight: "bold" }}>
                      @{post.user.username}
                    </div>
                    <div>{post.post.date}</div>
                  </div>
                  <img src={postDot} />
                </div>
                <img src={post.post.postImg} onClick={()=>viewPost(post)}/>
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
                    {post.commentsData.length ? (
                      <div className="viewComment" onClick={()=>viewPost(post)}>
                        {post.commentsData.length >= 2 ? (
                          <>View all {post.commentsData.length} comments</>
                        ) : (
                          <>View one comment</>
                        )}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="postComment">
                    <input type="text" placeholder="Add a comment..." className="postCommentInput"></input>
                    <button onClick={(e) => {
                      let input = e.target.parentNode.firstChild
                      postComment(input, post)
                      }
                    }>Post</button>
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

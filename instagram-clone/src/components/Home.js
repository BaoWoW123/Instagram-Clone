import "../styles/Home.css";
import { testImgArr, testPostArr } from "./testImages";
import post from "../assets/navBar/post.png";
import bookmark from "../assets/navBar/bookmark.png";
import send from "../assets/navBar/send.png";
import postmessage from "../assets/navBar/postmessage.png";
import like from "../assets/navBar/heart.png";

const Home = () => {
    
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

  return (
    <div className="Home" aria-label="Home">
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
                <div className="follower" data-id={i}>
                  <div className="followerImg">
                    <img src={el.img} />
                  </div>
                  <div>{el.username}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="posts">
          {testPostArr.map((el, i) => {
            return (
              <div className="post">
                <div>
                  <div className="postInfo">
                    <img src={el.img} />
                    <div style={{ fontWeight: "bold" }}>{el.username}</div>
                  </div>
                  <img src={post} />
                </div>
                <img src={el.post} />
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
                    <div>Images</div>
                    <div>
                      Like by <b>username</b> and <b>others</b>
                    </div>
                  </div>
                  <div className="postCaption">
                    <div>
                      <b>{el.username}</b> Some captions here and there or maybe
                      everywhere
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
      </div>
      <div className="rightDiv">
        <div>
          <div className="suggestSwitchAcc">
            <img src={testImgArr[0].img} />
            <div>
              <div>Account Username</div>
              <div>Some username</div>
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
                <div className="suggestionFollowers">
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

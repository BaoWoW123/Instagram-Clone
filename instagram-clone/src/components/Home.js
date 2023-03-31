import "../styles/Home.css";
import { testImgArr, testPostArr } from "./testImages";
import post from "../assets/navBar/post.png";
const Home = () => {
  const followers = document.querySelectorAll(".follower");

  const showNext = async () => {
    await followers.forEach((el) => {
      el.style.transform = "translateX(-360px)";
    });
    const prevBtn = document.querySelector(".storiesPrevBtn");
    const nextBtn = document.querySelector(".storiesNextBtn");
    nextBtn.className = "storiesNextBtn hidden";
    prevBtn.className = "storiesPrevBtn";
  };

  const showPrev = async () => {
    await followers.forEach((el) => {
      el.style.transform = "translateX(0px)";
    });
    const prevBtn = document.querySelector(".storiesPrevBtn");
    const nextBtn = document.querySelector(".storiesNextBtn");
    nextBtn.className = "storiesNextBtn";
    prevBtn.className = "storiesPrevBtn hidden";
  };

  return (
    <div className="Home">
      <div className="feed">
        <div className="storiesContainer">
          <button className="storiesNextBtn" onClick={showNext}>
            {">"}
          </button>
          <button className="storiesPrevBtn hidden" onClick={showPrev}>
            {"< "}
          </button>
          <div className="storiesWrapper">
            {/* slider-wrapper */}

            {testImgArr.map((el, i) => {
              return (
                <div className="follower" data-id={i}>
                  {" "}
                  {/* slider */}
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
          <div>
            <h1>Home</h1>
          </div>
          {testPostArr.map((el) => {
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
                <div className="postDescrip">hola</div>
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
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;

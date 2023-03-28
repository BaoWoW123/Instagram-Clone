import "../styles/Home.css";
import testImgArr from "./testImages";

const Home = () => {
  return (
    <div className="Home">
      <div className="feed">
        <div className="followers">
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
        <div className="posts">
          <div>
            <h1>Home</h1>
          </div>
          <div>test</div>
          <div>anoterh test</div>
        </div>
      </div>
      <div className="rightDiv">
        <div>
          <div className="suggestSwitchAcc">
            <img src={testImgArr[0].img} />
            <div >
              <div >Account Username</div>
              <div>Some username</div>
            </div>
          </div>
          <button>Switch</button>
        </div>
        <div className="suggestions">
          <div>
            Suggestions For You <button style={{color:'black'}}>See All</button>
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

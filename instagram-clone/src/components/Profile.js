import "../styles/Profile.css";
import NavBar from "./NavBar";
import likes from "../assets/navBar/likes.png";
import comment from "../assets/navBar/comment.png";
import { testImgArr } from "./testImages";

const Profile = (props) => {
  return (
    <div className="profilePage" aria-label="Profile">
      <NavBar signOut={props.signOut} />
      <div className="profile">
        <div className="topProfile">
          <img src={testImgArr[3].img} />
          <div className="profileInfo">
            <div>
              Username
              <div className="profileInfoBtns">
                {" "}
                {/* SHOULDN'T DISPLAY ON OWN PROFILE */}
                <button type="button">Follow</button>
                <button type="button">{"v"}</button>
                <button type="button">···</button>
              </div>
            </div>
            <div style={{ display: "flex", padding: "20px 0px", gap: "50px" }}>
              <div>100 posts</div>
              <div>300 followers</div>
              <div>500 following</div>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <div>Username</div>
              <div>Insert bio here</div>
              <div>aWebsite.com</div>
            </div>
          </div>
        </div>
        <div>
          <div className="userPostsNavBar">
            <div>Posts</div>
            <div>Reels</div>
            <div>Videos</div>
            <div>Tagged</div>
          </div>
          <div className="userPosts">
            {testImgArr.map((el, i) => {
              return (
                <div className="userPost" key={i}>
                  <img src={el.img} />
                  <div className="userPostInfo">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img src={likes} /> {i + 1}
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img src={comment} /> {i + 3}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

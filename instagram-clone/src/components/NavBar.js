import { Link } from "react-router-dom"
import home from "../assets/navBar/home.png";
import search from "../assets/navBar/search.png";
import explore from "../assets/navBar/explore.png";
import message from "../assets/navBar/message.png";
import notification from "../assets/navBar/notification.png";
import create from "../assets/navBar/create.png";
import more from "../assets/navBar/more.png";
import reels from "../assets/navBar/reels.png";
import { testImgArr } from "./testImages";
import { useEffect } from "react";

const NavBar = (props) => {
    const showMore = () => {
        const moreMenu = document.querySelector(".moreMenu");
        if (moreMenu.className === "moreMenu hidden") {
          moreMenu.className = "moreMenu";
          moreMenu.style.backgroundColor = "lightgray";
        } else {
          moreMenu.className = "moreMenu hidden";
          moreMenu.style.backgroundColor = "none";
        }
      };

    return (
        <div className="header">
        <div className="title">Itstagram</div>
        <div className="navBar">
          <div>
            <Link to="/home">
              <img src={home} />
              Home
            </Link>
          </div>
          <div>
            <Link to="/home">
              <img src={search} />
              Search
            </Link>
          </div>
          <div>
            <Link to="/home">
              {" "}
              <img src={explore} />
              Explore
            </Link>
          </div>
          <div>
            <Link to="/home">
              {" "}
              <img src={reels} />
              Reels
            </Link>
          </div>
          <div>
            <Link to="/home">
              <img src={message} />
              Messages
            </Link>
          </div>
          <div>
            <Link to="/home">
              <img src={notification} />
              Notifications
            </Link>
          </div>
          <div>
            <Link to="/post">
              <img src={create} />
              Create
            </Link>
          </div>
          <div>
            <Link to="/profile">  
                <img src={(props.userInfo) ? props.userInfo.profileImg : testImgArr[3].img} style={{width:'48px', height:'48px', borderRadius:'50%'}}/>
                Profile</Link>
          </div>
          <div className="moreWrapper">
            <div>
              <div className="moreMenu hidden">
                <div>Settings</div>
                <div>Your Activity</div>
                <div>Saved</div>
                <div>Switch Appearance</div>
                <div>Report a problem</div>
                <div>Switch Accounts</div>
                <div onClick={props.signOut}>Log out</div>
              </div>
              <div onClick={showMore}>
                <img src={more} />
                More
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default NavBar
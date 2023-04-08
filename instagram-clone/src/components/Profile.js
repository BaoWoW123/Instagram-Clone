import "../styles/Profile.css";
import NavBar from "./NavBar";

const Profile = (props) => {
  return (
    <div className="Profile" aria-label="Profile">
      <NavBar signOut={props.signOut}/>
      <h1>Profile</h1>
    </div>
  );
};

export default Profile;

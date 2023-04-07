import "../styles/Login.css";
import google from "../assets/misc/googleLogo.png";
const Login = (props) => {
  const showPassword = (e) => {
    e.preventDefault();
    const pw = document.querySelector(".password");
    return pw.type === "password" ? (pw.type = "text") : (pw.type = "password");
  };

  return (
    <div className="loginPage">
      <div>
        <fieldset>
          <form className="loginForm">
            <h1>Itstagram</h1>
            <input type="text" placeholder="Email" />
            <div className="passwordDiv">
              <input
                type="password"
                className="password"
                placeholder="Password"
              />
              <button onClick={showPassword}>Show</button>
            </div>
            <button className="loginBtn" >
              Log in
            </button>
            <h2>
              <span className="OR">OR</span>
            </h2>
            <span className="googleLogin" >
              <img src={google} />
              <div onClick={props.signIn}>Login with Google</div>
            </span>
            <div>Forgot password?</div>
          </form>
        </fieldset>
        <fieldset>
          <div className="signUp">
            Don't have an account? <button>Sign up</button>
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default Login;

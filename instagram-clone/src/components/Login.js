import "../styles/Forms.css";
import google from "../assets/misc/googleLogo.png";

const Login = (props) => {
  const showPassword = (e) => {
    e.preventDefault();
    const pw = document.querySelector(".password");
    return pw.type === "password" ? (pw.type = "text") : (pw.type = "password");
  };

  const logInEmail = (e) => {
    e.preventDefault()
    if (e.key === 'Enter' || e.type==='click') {
      const email = document.querySelector('.email').value
      const pw = document.querySelector('.password').value
      props.logInEmail(email, pw)
    }
  }

  return (
    <div className="loginPage">
      <div>
        <fieldset>
          <form className="loginForm">
            <h1>Itstagram</h1>
            <input type="email" placeholder="Email" className="email"/>
            <div className="passwordDiv">
              <input
                type="password"
                className="password"
                placeholder="Password"
              />
              <button type="button" onClick={showPassword}>Show</button>
            </div>
            <button className="loginBtn" onClick={logInEmail} >
              Log in
            </button>
            <h2>
              <span className="OR">OR</span>
            </h2>
            <span className="googleLogin" >
              <img src={google} />
              <div onClick={props.signInGoogle}>Login with Google</div>
            </span>
            <div>Forgot password?</div>
          </form>
        </fieldset>
        <fieldset>
          <div className="signUp">
            Don't have an account? <button onClick={props.routeSignup}>Sign up</button>
          </div>
        </fieldset>
        <fieldset className="testAccLogin">
            <button onClick={() =>props.signInTestAcc('test@gmail.com', 'test123')}> Sign in with test account</button>
          </fieldset>
      </div>
    </div>
  );
};

export default Login;

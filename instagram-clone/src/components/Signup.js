import '../styles/Forms.css'
import google from '../assets/misc/googleLogo.png'
import { useNavigate } from 'react-router-dom';
const Signup = (props) => {
    const showPassword = (e) => {
        e.preventDefault();
        const pw = document.querySelector(".pwSignup");
        return pw.type === "password" ? (pw.type = "text") : (pw.type = "password");
      };
      const signup = (e) => {
        e.preventDefault()
        const email = document.querySelector('.email').value
        const name = document.querySelector('.fullName').value
        const username = document.querySelector('.username').value
        const pw = document.querySelector('.pwSignup').value
        props.createAcc(email, pw, name, username)
      }

  return (
    <div className="signupPage">
      <div>
        <fieldset>
          <form className="signupForm">
            <h1>Itstagram</h1>
            <div>Sign up to see photos and videos from your friends.</div>
            <span className="googleLogin-signupPage" onClick={props.signInGoogle}>
              <img src={google} />
              <div>Login with Google</div>
            </span>
            <h2>
              <span className="OR">OR</span>
            </h2>
            <input type="email" placeholder="Email" className="email"  required/>
            <input type="text" placeholder="Full Name"className='fullName'  required/>
            <input type="text" placeholder="Username" className='username' required/>
            <div className="pwSignupWrapper">
              <input
                type="password"
                className="pwSignup"
                placeholder="Password"
               required/>
              <button onClick={showPassword}>Show</button>
            </div>
            <span className='ToS'>
                <div>People who use our service may have uploaded your contact information to Instagram. Learn More.</div>
                <div>By signing up, you agree to our Terms, Privacy Policy and Cookies Policy.</div>
            </span>
            <button className="createAccBtn" onClick={signup}>
              Sign up
            </button>   
          </form>
        </fieldset>
        <fieldset>
          <div className="login-signupPage">
            Have an account? <button onClick={props.routeLogin}>Log in</button>
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default Signup;

import { useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

//this component renders the sign in page
const UserSignIn = ({ context }) => {

  const emailAddress = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await context.actions
      .signIn(emailAddress.current.value, password.current.value)
      .then(() => {
        //attempt to return back to previous page after signing in
        if (location.state?.from) {
          navigate(location.state.from);
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        if (error.status === 404) {
          navigate("/notfound");
        } else if (error.status === 500) {
          navigate("/error")
        } else {
          navigate("/error");
        }
      });
  };

  //main component to render
  return (
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            defaultValue=""
            ref={emailAddress}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            defaultValue=""
            ref={password}
          />
          <button className="button" type="submit">
            Sign In
          </button>
          <Link className="button button-secondary" to="/">
            Cancel
          </Link>
        </form>
        <p>
          Don't have a Jedi user account? Click here to{" "}
          <Link to="/signup">sign up</Link>!
        </p>
      </div>
    </main>
  );
};

export default UserSignIn;
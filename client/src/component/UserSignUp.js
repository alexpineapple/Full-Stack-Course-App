
import React, { useRef, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

//this component is a user sign up page
const UserSignUp = ({ context }) => {

  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  //user fields variables
  const firstName = useRef(null);
  const lastName = useRef(null);
  const emailAddress = useRef(null);
  const password = useRef(null);

  //setting up submittion request
  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      emailAddress: emailAddress.current.value,
      password: password.current.value,
    };

    context.data
      .createUser(user)
      .then((errors) => {
        if (errors.length) {
          setErrors(errors);
        } else {
          //use context to sign in, then navigate to home page
          context.actions.signIn(emailAddress.current.value, password.current.value)
            .then(() => {
              navigate("/");
            });
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
  function handleCancel() {
    navigate("/");
  }

  //main component to render
  return (
    <div className="form--centered">
      <h2>Sign Up</h2>

      {/* check & display any validation errors */}
      {errors && errors.length ? (
        <div className="validation--errors">
          <h3>Validation Errors</h3>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* begin form here */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          defaultValue=""
          ref={firstName}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          defaultValue=""
          ref={lastName}
        />
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
          Sign Up
        </button>
        <button onClick={handleCancel} className="button button-secondary">
          Cancel
        </button>
      </form>
      <p> Already have a Jedi user account? Click here to {" "}
        <NavLink to="/signin">sign in</NavLink>!
      </p>
    </div>

  );
};

export default UserSignUp;
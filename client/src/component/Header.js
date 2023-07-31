import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

class HeaderClass extends React.PureComponent {

  //component to render
  render() {
    const { context, navigateWithState } = this.props;
    const authUser = context.authenticatedUser;

    return (
      <header>
        <div className="wrap header--flex">
          <h1 className="header--logo">
            <a onClick={() => navigateWithState("/")}> Master Yoda's Jedi Training Courses </a>
          </h1>
          <nav>

            {/* Check if a user is currently signed in! */}
            {authUser ? (
              <ul className="header--signedin">
                <li>{`Welcome, ${authUser.firstName} ${authUser.lastName}!`}</li>
                <li>
                  <a onClick={() => navigateWithState("/signout")}>
                    Sign Out
                  </a>
                </li>
              </ul>
            ) : (
              
              //user not signed in!!
              <ul className="header--signedout">
                <li>
                  <a className="signup" onClick={() => navigateWithState("/signup")}>
                    Sign Up
                  </a>
                </li>
                <li>
                  <a className="signin" onClick={() => navigateWithState("/signin")}>
                    Sign In
                  </a>
                </li>
              </ul>
            )}
          </nav>
        </div>
      </header>
    );
  }
}

// Functional Component Wrapper
const Header = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigateWithState = (path) => {
    navigate(path, { state: { from: location.pathname } });
  }

  return <HeaderClass {...props} navigateWithState={navigateWithState} />;
}

export default Header;

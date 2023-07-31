import React, { Component } from "react";
import Cookies from "js-cookie";

//"Data" contains the useful API calls used througout the app!
import Data from "./Data";

//Code source: 'React Authentication' treehouse course
const Context = React.createContext();

export class Provider extends Component {
  constructor() {
    super();
    this.data = new Data();
    this.cookie = Cookies.get("authenticatedUser");
    this.state = {
      authenticatedUser: this.cookie ? JSON.parse(this.cookie) : null,
    };
  }

  render() {
    const { authenticatedUser } = this.state;
    const value = {
      authenticatedUser,
      data: this.data,
      actions: { // Add the 'actions' property and object
        signIn: this.signIn,
        signOut: this.signOut,
      },
    };
    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }

  //user sign in for context
  signIn = async (username, password) => {
    const user = await this.data.getUser(username, password);
    const plainText = password;

    if (user !== null) {
      user.password = plainText;
      this.setState(() => {
        return {
          authenticatedUser: user,
        };
      });
      //set the cookie for the authenticated user
      Cookies.set("authenticatedUser", JSON.stringify(user), { expires: 1 });
    }
    return user;
  };

  //user sign out for context
  signOut = () => {
    this.setState({ authenticatedUser: null });
    //remove cookie! No more cookies for you!
    Cookies.remove("authenticatedUser");
  };
}

export const Consumer = Context.Consumer;

//recycable function to update a component to use context
export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {(context) => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
}
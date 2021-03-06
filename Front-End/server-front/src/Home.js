import React, { useContext } from "react";
import { Link } from "@reach/router";
import SignInContext from "./signInContext";
import Profile from "./profile";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const Home = () => {
  const [signInState, setSignInState] = useContext(SignInContext);
  if (signInState[0] === "Signed Out") {
    return (
     
      <div className="main-body" id="root">
        <h1 className="header font center purple-text">Server Health Monitor</h1>
          <div className="description">
            <p className=" black-text font center text-darken-3 flow-text">
              This is a new and improved Server Health Monitor. Join now if you
              dont want to screw up your remote server! &#128526;
            </p>
          <div>
            <p><Link
              to="/signup"
              style={{ textDecoration: "none", color: "black" }}
            >
              Dont have an account?Click here to create one!
            </Link>
            </p>
            <p>
            <Link
              to="/signupin"
              style={{ textDecoration: "none", color: "black" }}
            >
              Already have an account?Click here to login!
            </Link>
            </p>
          </div>
          
        </div>
      </div>
     
    );
  } else {
    return (
      
      <Profile
        status={signInState[0]}
        username={signInState[1]}
        password={signInState[2]}
      ></Profile>
      
    );
  }
};
export default Home;

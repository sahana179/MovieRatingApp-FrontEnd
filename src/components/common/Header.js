import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../common/use-auth";
const Header = () => {
  let auth = useAuth();
  useEffect(() => {
    console.log("from header auth.user", auth.user);
  });
  const activeStyle = { color: "#f15B2A" };
  return (
    <nav>
      <NavLink to="/" activeStyle={activeStyle} exact>
        Home
      </NavLink>
      {" | "}
      <NavLink to="/movies" activeStyle={activeStyle} exact>
        movies
      </NavLink>
      {" | "}
      <NavLink to="/logout" activeStyle={activeStyle}>
        Logout
      </NavLink>
      {" | "}
      <NavLink
        to="/about"
        activeStyle={activeStyle}
        className="d-inline-flex p-4"
      >
        Welcome {auth.user.username}
      </NavLink>
    </nav>
  );
};

export default Header;

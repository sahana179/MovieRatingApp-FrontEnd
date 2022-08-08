import React, { useContext, createContext, useState } from "react";
// import { useNavigate } from "react-router-dom";

import useAuth from "../common/use-auth";

const LogoutPage = () => {
  let auth = useAuth();
  let signout = () => {
    auth.signout(() => {
      // navigate("/movies");
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={signout}
        className="btn btn-primary btn-block mb-4"
      >
        Do you want to Signout
      </button>
    </>
  );
};

export default LogoutPage;

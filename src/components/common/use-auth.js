import React, { useContext, createContext, useState } from "react";
import { authenticateUser } from "../../api/userApi";
const authContext = createContext();
const fakeAuth = {
  isAuthenticated: false,
  signin(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function useAuth() {
  return useContext(authContext);
}

export function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = (userid, password) => {
    let data = { username: userid, password: password };
    // alert("userid : " + userid);
    authenticateUser(data)
      .then((response) => {
        setUser(response);
      })
      .catch((response) => {
        console.log(response);
      });

    // return fakeAuth.signin(() => {
    //   setUser(response);
    // });
  };

  const signout = (cb) => {
    return fakeAuth.signout(() => {
      setUser(null);
      cb();
    });
  };

  return {
    user,
    signin,
    signout,
  };
}

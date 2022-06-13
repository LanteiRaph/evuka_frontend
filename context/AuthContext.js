import { useRouter } from "next/router";
import { useState, createContext, useEffect } from "react";
import { NEXT_BACKEND_URI } from "../config/app";
import { useSelector, useDispatch } from "react-redux";
import { addUser, removeUser } from "../redux/Slice/Auth";

//Create the shared context.
const AuthContext = createContext();

//Compile the auth context to be shared.
export const AuthContextProvider = ({ children }) => {
  //Extract the user from the state
  const user = useSelector((state) => state.auth.user);
  // const [user, setUser] = useState({});
  //Handle Auth error
  const [authError, setAuthError] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  const dispatch = useDispatch();

  const router = useRouter();

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  //Login an existing user
  const login = async ({ email, password }) => {
    const res = await fetch(`${NEXT_BACKEND_URI}/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      // setUser(data.user)

      await checkUserLoggedIn();

      router.push("/");
    } else {
      setAuthError(data.detail);
    }
  };

  //Create a new user:
  const signup = async ({ email, password, name }) => {
    const res = await fetch(`${NEXT_BACKEND_URI}/signup`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await res.json();

    if (res.ok) {
      // setUser(data)

      await login({ email, password });
    } else {
      if (data.name) {
        setAuthError(data.name[0]);
      } else if (data.email) {
        setAuthError(data.email[0]);
      } else {
        setAuthError(data.password.join("\n"));
      }
    }
  };

  const logout = async () => {
    const res = await fetch(`${NEXT_BACKEND_URI}/logout`, {
      method: "POST",
    });

    if (res.ok) {

      // push user if necessary
      dispatch(removeUser());
    }
  };

  //Chck if a user is looged in or not.
  const checkUserLoggedIn = async () => {
    //Fethch users
    const res = await fetch(`${NEXT_BACKEND_URI}/user`);

    //Chekc status and respond
    if (res.ok) {
      const data = await res.json();
      console.log(data)
      dispatch(addUser(data.user));
      //setUser(data.user);
    } else {
      console.log('error')
      //setUser(null)
      dispatch(addUser(null));
    }
    //Update the authready state value
    setAuthReady(true);

    return;
  };

  const clearUser = () => {
    // setUser(null);
    dispatch(removeUser());
  };

  return (
    <AuthContext.Provider
      value={{ user, authError, login, signup, logout, clearUser }}
    >
      {authReady && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

import React, { useContext, useEffect, useState } from "react";
import MainLayout from "../../components/layout/main";
import FormInput from "../../components/auth/FormInput";
import AuthBtn from "../../components/auth/AuthBtn";
import Link from "next/link";
import AuthContext from "../../context/AuthContext";
import { toast } from "react-toastify";
import cookie from "cookie";

const login = () => {
  //Compile th state nneded for the auth
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authReady, setAuthReady] = useState(false);

  //Extract the needed methods from the store(Context Provider)
  const { login, authError, clearUser } = useContext(AuthContext);

  //On load clear any new user.
  useEffect(() => {clearUser()}, []);


  //Handle the submit(Login a user to the applicaion)
  const handleSubmit = async (e) => {
    e.preventDefault();

    setAuthReady(true);
    await login({ email, password });
    setAuthReady(false);
  };

  //Incase of any error responde back to the user.
  useEffect(() => {authError && toast.error(authError)}, [authError]);

  return (
    <MainLayout>
      <section className="flex justify-center pt-20 min-h-screen">
        <div className="w-10/12 md:w-7/12 lg:w-4/12">
          <h2 className="text-xl md:text-2xl font-medium py-3 border-b pl-5">
            Log In and Start Learning!
          </h2>

          <form action="" onSubmit={handleSubmit} className="w-full py-4">
            <FormInput
              inputVal={email}
              setInput={setEmail}
              type="email"
              iconName="mail"
              placeholder="Email"
              name="email"
            />
            <FormInput
              inputVal={password}
              setInput={setPassword}
              type="password"
              iconName="lock-closed"
              placeholder="Password"
              name="password"
            />

            <AuthBtn
              disabled={authReady}
              action={!authReady ? "Log In" : "Please wait..."}
            />

            <p className="md:text-lg my-2 text-center ">
              Do not have an account?{" "}
              <span className="text-blue-600 font-medium">
                <Link href="/auth/signup">Sign Up</Link>
              </span>
            </p>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

//Get all data needed from the server.
export const getServerSideProps = async ({ req, res }) => {
  //Check if any user is registered.
  if (req.headers.cookie) {
    //Get the cookies for the current session
    let cookies = cookie.parse(req.headers.cookie);
    //If any exsist redirect the usr back tthe home page
    if (cookies && cookies.refresh_token) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  }

  //No cookies avilable.
  return {
    props: {},
  };
};

export default login;

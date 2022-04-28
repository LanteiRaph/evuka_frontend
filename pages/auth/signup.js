import React, { useContext, useEffect, useState } from "react";
import MainLayout from "../../components/layouts/main";
import FormInput from "../../components/auth/FormInput";
import AuthBtn from "../../components/auth/AuthBtn";
import Link from "next/link";
import AuthContext from "../../context/AuthContext";
import { toast } from "react-toastify";
import cookie from "cookie";

const signup = () => {
  //Extrcact all nneded method form the context provider
  const { signup, authError, clearUser } = useContext(AuthContext);

  //Clear any user on load.
  useEffect(() => clearUser(), []);


  //Compile the state needed to handle sign up (Local state)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authReady, setAuthReady] = useState(false);

  //Incase of an error.
  useEffect(() => authError && toast.error(authError), [authError]);

  //Handle the signup
  const handleSubmit = async (e) => {
    //Prevent the default action
    e.preventDefault();

    //Update the state
    setAuthReady(true);
    await signup({ name, email, password });
    setAuthReady(false);
  };

  return (
    <MainLayout>
      <section className="flex justify-center pt-20 min-h-screen">
        <div className="w-10/12 md:w-7/12 lg:w-4/12">
          <h2 className="text-xl md:text-2xl font-medium py-3 border-b pl-5">
            Sign Up and Start Learning!
          </h2>

          <form onSubmit={handleSubmit} className="w-full py-4">
            <FormInput
              inputVal={name}
              setInput={setName}
              type="text"
              iconName="person"
              placeholder="Full Name"
              name="full_name"
            />
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
              action={!authReady ? "Sign Up" : "Please wait ..."}
            />

            <p className="text-center text-xs inline-block pb-4 border-b w-full">
              By signing up, you agree to our Terms of Use and Privacy Policy.
            </p>

            <p className="md:text-lg my-2 text-center ">
              Already have an account?{" "}
              <span className="text-blue-600 font-medium">
                <Link href="/auth/login">Log In</Link>
              </span>
            </p>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

//returns server side data as rpoper for the current component
export const getServerSideProps = async ({ req, res }) => {
  //Check if cookies are availbale
  if (req.headers.cookie) {
    //Get cookies...
    let cookies = cookie.parse(req.headers.cookie);

    //Check the status f the cookies anf=d refresh token.
    if (cookies && cookies.refresh_token) {
      //redirect back to the home page, user avilable
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  }

  //N user found..
  return {
    props: {},
  };
};

export default signup;

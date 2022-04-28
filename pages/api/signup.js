import { BACKEND_URI } from "../../config/app";

//Signup a user: returns user data on succeful sign in else error
export default async (req, res) => {
    //Only post methods are allowed.
  if (req.method === "POST") {
      //destructure the reqeust body to obtain the data needed
    const { email, password, name } = req.body;
    //make request
    const resAPI = await fetch(`${BACKEND_URI}/auth/users/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await resAPI.json();
    //Check status and respond accodingly.
    if (resAPI.ok) {
      res.status(200).json(data);
      return;
    } else {
      // send error message
      res.status(401).json(data);
      return;
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(403).json({ message: `Method  ${req.method} not allowed` });
  }
};

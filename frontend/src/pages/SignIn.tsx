import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

import { useRecoilState } from "recoil";
import { loginDetails } from "../atom";
import "../App.css";

import axios from "axios";
import { Link } from "react-router-dom";
import BG from "../assets/Signin.jpg";
import { Helmet } from "react-helmet-async";
import { useMetaTags } from "../components/hooks";

export const SignIn = () => {
  const [logindetails, setLoginDetails] = useRecoilState(loginDetails);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const tags = useMetaTags({
    page: "SignIn",
  });
  console.log("Hi from signup component");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginDetails((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (!logindetails.username || !logindetails.password) {
        alert("Fill all the fields");
        setIsSubmitting(false);
      } else {
        const response = await axios.post(
          "http://localhost:8787/api/v1/user/signin",
          logindetails
        );

        if (response.data.msg === "Logged in successfully") {
          localStorage.setItem("token", response.data.token);
        } else {
          alert("Incorrect username or password");
        }
      }
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      alert("An error occured while submitting the form");
    }
  };

  return (
    <div className="bg-yellow-50  h-screen w-full">
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{tags.title || "Sign In - Your Website Name"}</title>
        <meta
          name="description"
          content={tags.description || "Sign in to access your account."}
        />
        <meta name="robots" content="noindex" />
        <link
          rel="canonical"
          href={tags.canonicalURL || window.location.href}
        />

        {/* Viewport Meta Tag */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      <div
        className="bg-yellow-50 w-full  h-screen   flex justify-center items-center lg:items-end flex-col bg-cover bg-center bg-no-repeat "
        style={{ backgroundImage: `url(${BG})` }}
      >
        <div className="  bg-yellow-50 bg-opacity-70 rounded-lg shadow-md p-5 lg:mr-20">
          <div className="font-extrabold text-3xl text-center">Log In</div>
          <div className="font-semibold text-lg text-center mt-5">
            Don't have an account ?{" "}
            <Link to="/sign-up" className="underline">
              SignUp
            </Link>
            <br></br>
            or login as{" "}
            <Link to="/admin/sign-in" className="underline">
              Admin
            </Link>
          </div>
          <form>
            <div className=" ml-2 mt-2 ">
              <Input
                typeOf="text"
                holder="johnDoe"
                displayName="Username"
                condition="two"
                name="username"
                onChange={handleChange}
                value={logindetails.username}
              />
              <Input
                typeOf="password"
                holder="********"
                displayName="Password"
                condition="two"
                name="password"
                onChange={handleChange}
                value={logindetails.password}
              />
            </div>
            <Button
              type="Sign In"
              onClick={handleSubmit}
              disabled={isSubmitting}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

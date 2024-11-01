import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { CitySelect } from "../components/CitySelect";
import { useRecoilState } from "recoil";
import { formDataState } from "../atom";
import "../App.css";
import Image from "../assets/Image.jpeg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Background from "../assets/Signin.jpg";
import { useMetaTags } from "../components/hooks";
import { Helmet } from "react-helmet-async";

export const SignUp = () => {
  const [formData, setFormData] = useRecoilState(formDataState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const tags = useMetaTags({
    page: "SignUp",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (
        !formData.city ||
        !formData.email ||
        !formData.firstName ||
        !formData.interestedIn ||
        !formData.lastName ||
        !formData.mobileNumber ||
        !formData.password ||
        !formData.state ||
        !formData.username
      ) {
        alert("Please fill all the fields");
        setIsSubmitting(false);
      } else {
        const response = await axios.post(
          "http://localhost:8787/api/v1/user/signup",
          formData
        );
        console.log(response.data);
        if (response.data.msg === "An error occurred in creating user") {
          alert("Username not available.");
          setIsSubmitting(false);
        } else {
          let token = response.data.generatedToken;
          token = "Bearer " + token;
          localStorage.setItem("token", token);
          setIsSubmitting(false);
          alert("Your account has been created successfully!");
          navigate("/homepage");
        }
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred while submitting the form");
    }
  };

  return (
    <div className="bg-yellow-50 h-full min-h-screen flex flex-col md:flex-row">
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{tags.title || "Sign Up - Your Website Name"}</title>
        <meta
          name="description"
          content={tags.description || "Create an account to get started."}
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href={tags.canonicalURL || window.location.href}
        />

        {/* Open Graph Meta Tags */}
        <meta
          property="og:title"
          content={tags.ogTitle || "Sign Up - Your Website Name"}
        />
        <meta
          property="og:description"
          content={tags.ogDescription || "Join us and enjoy our services."}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={tags.ogURL || window.location.href} />
        <meta
          property="og:image"
          content={tags.ogImage || "path_to_image.jpg"}
        />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={tags.twitterTitle || "Sign Up - Your Website Name"}
        />
        <meta
          name="twitter:description"
          content={
            tags.twitterDescription || "Sign up to access exclusive features."
          }
        />
        <meta
          name="twitter:image"
          content={tags.twitterImage || "path_to_image.jpg"}
        />

        {/* Viewport Meta Tag */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <div
        className=" w-full h-full flex justify-center items-center sm:items-end flex-col p-5 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <div className=" bg-white rounded-lg shadow-md p-5 w-full max-w-md opacity-80">
          <div className="font-extrabold text-2xl text-center">
            Create an Account
          </div>
          <div className="font-semibold text-sm text-center mt-2">
            Already have an account?{" "}
            <Link to="/sign-in" className="underline">
              Login
            </Link>
          </div>
          <form>
            <div className="flex flex-col md:flex-row justify-between mt-4 space-y-4 md:space-y-0 md:space-x-4">
              <Input
                typeOf="text"
                holder="Enter your First Name"
                displayName="First Name"
                condition="one"
                name="firstName"
                onChange={handleChange}
                value={formData.firstName}
              />
              <Input
                typeOf="text"
                holder="Enter your Last Name"
                displayName="Last Name"
                condition="one"
                name="lastName"
                onChange={handleChange}
                value={formData.lastName}
              />
            </div>
            <div className="mt-4">
              <CitySelect />
            </div>
            <div className="mt-4 space-y-4">
              <Input
                typeOf="text"
                holder="CSE, ECE"
                displayName="Interested In"
                condition="two"
                name="interestedIn"
                onChange={handleChange}
                value={formData.interestedIn}
              />
              <Input
                typeOf="email"
                holder="example@gmail.com"
                displayName="Email"
                condition="two"
                name="email"
                onChange={handleChange}
                value={formData.email}
              />
              <Input
                typeOf="tel"
                holder="99********"
                displayName="Mobile No."
                condition="two"
                name="mobileNumber"
                onChange={handleChange}
                value={formData.mobileNumber}
              />
            </div>
            <div className="mt-4 space-y-4">
              <Input
                typeOf="text"
                holder="johnDoe"
                displayName="Username"
                condition="two"
                name="username"
                onChange={handleChange}
                value={formData.username}
              />
              <Input
                typeOf="password"
                holder="********"
                displayName="Password"
                condition="two"
                name="password"
                onChange={handleChange}
                value={formData.password}
              />
            </div>
            <div className="mt-6">
              <Button
                type="Sign Up"
                onClick={handleSubmit}
                disabled={isSubmitting}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const TypingAnimation = ({ text }: { text: string }) => {
  const [typeText, setTypeText] = useState("");

  useEffect(() => {
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setTypeText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 50); // Typing speed in milliseconds

    return () => clearInterval(interval);
  }, [text]);

  return <div className="italic text-xl">{typeText}</div>;
};

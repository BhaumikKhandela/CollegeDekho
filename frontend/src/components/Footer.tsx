import axios from "axios";
import { useState } from "react";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebook, FaInstagram } from "react-icons/fa6";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [submission, setSubmission] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const submit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setSubmission(true);
      const submitEmail = async () => {
        const response = await axios.post(
          "http://localhost:8787/api/v1/user/newsletter",
          {
            email: email,
          }
        );

        if (
          response.data.msg ===
          "Your email added to newsletter list successfully"
        ) {
          alert(
            "Thank you for subscribing to our newsletter! You've successfully joined our community, and we're excited to keep you updated with our latest news and offers."
          );
        } else {
          alert("An error occurred");
        }

        setSubmission(false);
      };

      submitEmail();
    } catch (error) {
      console.log(error);
      alert("An error occurred from your side");
      setSubmission(false);
    }
  };
  return (
    <footer className="bg-amber-100 ">
      <div className="flex justify-center items-center p-10  py-20 bg-yellow-50">
        <div className="bg-teal-700  text-white  rounded-lg  sm:text-center md:text-2xl md:w-3/5 w-full p-10 md:p-24 shadow-xl">
          <p className="sm:text-4xl text-center">
            {" "}
            Subscribe To our News Letter
          </p>
          <div className=" mt-5 flex justify-center itmes-center sm:text-lg">
            <input
              type="email"
              value={email}
              onChange={handleInputChange}
              placeholder="Enter your Email"
              className="rounded-full px-10 py-2 text-black"
            ></input>
            <div className="relative">
              <button
                disabled={submission}
                onClick={submit}
                className="absolute right-0 top-0 text-white bg-teal-500 rounded-full px-4  py-2 "
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-amber-100 pl-5 py-5 sm:flex gap-10 pt-5 ">
        <div className="">
          <span className="font-semibold">Company</span>
          <div className="py-3">
            <nav>
              <ul>
                <li>About Us</li>
                <li>How To Work?</li>
                <li>Services</li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="">
          <span className="font-semibold">Support</span>
          <div className="py-3">
            <nav>
              <ul>
                <li>FAQ</li>
                <li>Help Center</li>
                <li>Career</li>
                <li>Privacy</li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="">
          <span className="font-semibold">Contact Info</span>
          <div className="py-3">
            <nav>
              <ul>
                <li>Contact No: 8448034781</li>
                <li>Email: aantiqueinfotech.sol@gmail.com</li>
                <li>Address: Indirapuran niti khand 1 546</li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="">
          <span className="font-semibold">Our Social Media</span>
          <div className="py-3">
            <nav>
              <ul className="flex gap-2 text-2xl">
                <li>
                  <button>
                    <FaFacebook />
                  </button>
                </li>
                <li>
                  <button>
                    <FaInstagram />
                  </button>
                </li>
                <li>
                  <button>
                    <BsTwitterX />
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

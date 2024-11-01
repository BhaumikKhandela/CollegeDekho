import { FiSend } from "react-icons/fi";
import { TopBar } from "../components/TopBar";
import { MdLocationOn } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { Footer } from "../components/Footer";
import { useMetaTags } from "../components/hooks";
import { Helmet } from "react-helmet-async";

export const ContactUs = () => {
  const tags = useMetaTags({
    page: "ContactUs",
  });
  return (
    <div className="h-full w-full bg-white flex flex-row">
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{tags.title || "Contact Us - Your Website Name"}</title>
        <meta
          name="description"
          content={
            tags.description || "Get in touch with us for inquiries or support."
          }
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href={tags.canonicalURL || window.location.href}
        />

        {/* Open Graph Meta Tags */}
        <meta
          property="og:title"
          content={tags.ogTitle || "Contact Us - Your Website Name"}
        />
        <meta
          property="og:description"
          content={
            tags.ogDescription ||
            "Reach out to our team for any queries or support."
          }
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
          content={tags.twitterTitle || "Contact Us - Your Website Name"}
        />
        <meta
          name="twitter:description"
          content={
            tags.twitterDescription ||
            "Have questions or need support? Contact us today!"
          }
        />
        <meta
          name="twitter:image"
          content={tags.twitterImage || "path_to_image.jpg"}
        />

        {/* Viewport Meta Tag */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <div className="h-full z-10">
        <TopBar />
      </div>
      <div className="flex-1 bg-yellow-50 h-full">
        <h1 className="text-2xl lg:text-5xl flex justify-center font-extrabold p-5 lg:m-5">
          Contact Us
        </h1>
        <div className="h-full grid grid-cols-1 lg:grid-cols-2 my-20">
          <div className="bg-white m-5 border-2 shadow-md rounded-lg p-2">
            <h1 className="p-2 mt-2 text-xl lg:text-2xl font-bold">
              Send us a message
            </h1>
            <p className="p-2 text-sm">
              We'd love to hear from you. Fill out the form below and we'll get
              back to you as soon as possible.
            </p>
            <div className="p-2 font-semibold mt-5">
              <div className="flex flex-col m-1">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  className="border-2 p-2 rounded-lg"
                ></input>
              </div>
              <div className="flex flex-col m-1">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="text"
                  placeholder="your@email.com"
                  className="border-2 p-2 rounded-lg"
                ></input>
              </div>
              <div className="flex flex-col m-1">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  placeholder="Your message"
                  className="border-2 p-2 rounded-lg"
                ></textarea>
              </div>
            </div>
            <div className="w-full flex justify-center">
              <button className="text-white font-extrabold bg-green-500 flex p-2 rounded-lg m-2 w-full justify-center">
                Send Message
                <FiSend size={20} className="mt-1 ml-1" />
              </button>
            </div>
          </div>
          <div className="bg-white m-5 shadow-md rounded-lg p-2 border-2">
            <h1 className="p-2 mt-2 text-xl lg:text-2xl font-bold flex justify-center">
              Contact Information
            </h1>
            <div className="flex flex-col gap-5 lg:gap-20 mt-10 mb-2 p-2">
              <div className="flex gap-2 lg:text-xl">
                <MdLocationOn className="text-green-500" /> Indirapuran niti
                khand 1 546
              </div>
              <div className="flex gap-2 lg:text-xl">
                <FaPhone className="text-green-500 mt-1" /> 8448034781
              </div>
              <div className="flex gap-2 lg:text-xl">
                <HiOutlineMail className="text-green-500 mt-1" />{" "}
                aantiqueinfotech.sol@gmail.com
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

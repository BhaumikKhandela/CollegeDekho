import { useEffect, useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { TopBar } from "../components/TopBar";
import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Searching } from "../atom";
import { Link } from "react-router-dom";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import Lottie from "lottie-react";
import animationData from "../assets/Animation.json";
import { CiMonitor } from "react-icons/ci";
import { GiPencilRuler, GiPuzzle } from "react-icons/gi";
import { PiCertificateLight } from "react-icons/pi";
import { TitleCard } from "../components/TitleCard";
import Eanimation from "../assets/EAnimation.json";
import Manimation from "../assets/Manimation.json";
import Mbaanimation from "../assets/Mbaanimation.json";
import { Footer } from "../components/Footer";
import LAnimation from "../assets/LAnimation.json";
import { RiHeartsFill } from "react-icons/ri";
import { Helmet } from "react-helmet-async";
import { useMetaTags } from "../components/hooks/index";
interface CoursesAndColleges {
  id: number;
  name: string;
  type?: "college" | "course";
}

interface Articles {
  id: number;
  title: string;
  type?: "article";
}

export const HomePage = () => {
  const [searchValue, setSearchValue] = useState("");
  const setType = useSetRecoilState(Searching);
  const tags = useMetaTags({
    page: "Homepage",
  });
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8787/api/v1/blog/search/college-course-article/${searchValue}`
        );
        const courses = response.data.courses.map((d: CoursesAndColleges) => ({
          ...d,
          type: "course",
        }));
        const colleges = response.data.colleges.map(
          (d: CoursesAndColleges) => ({ ...d, type: "college" })
        );
        const articles = response.data.articles.map((d: Articles) => ({
          ...d,
          type: "article",
        }));

        const searchedArray = [...colleges, ...courses, ...articles];

        setType(searchedArray);
      } catch (error) {
        console.error(error);
        setType([]);
      }
    };
    const timeout = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchValue, setType]);
  return (
    <div className="flex">
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{tags.title || "Default Title"}</title>
        <meta
          name="description"
          content={tags.description || "Default description"}
        />
        <meta name="keywords" content={tags.keywords || "Default keywords"} />
        <meta name="robots" content={tags.robots || "index, follow"} />
        <link
          rel="canonical"
          href={tags.canonicalURL || window.location.href}
        />

        {/* Open Graph Meta Tags */}
        {tags.ogTitle && <meta property="og:title" content={tags.ogTitle} />}
        {tags.ogDescription && (
          <meta property="og:description" content={tags.ogDescription} />
        )}
        {tags.ogImage && <meta property="og:image" content={tags.ogImage} />}
        {tags.ogAltImageText && (
          <meta property="og:image:alt" content={tags.ogAltImageText} />
        )}
        {tags.ogURL && <meta property="og:url" content={tags.ogURL} />}
        {tags.ogType && <meta property="og:type" content={tags.ogType} />}
        {tags.ogLocale && <meta property="og:locale" content={tags.ogLocale} />}
        {tags.ogSiteName && (
          <meta property="og:site_name" content={tags.ogSiteName} />
        )}

        {/* Twitter Card Meta Tags */}
        {tags.twitterCard && (
          <meta name="twitter:card" content={tags.twitterCard} />
        )}
        {tags.twitterTitle && (
          <meta name="twitter:title" content={tags.twitterTitle} />
        )}
        {tags.twitterDescription && (
          <meta name="twitter:description" content={tags.twitterDescription} />
        )}
        {tags.twitterImage && (
          <meta name="twitter:image" content={tags.twitterImage} />
        )}
        {tags.twitterImageAltText && (
          <meta name="twitter:image:alt" content={tags.twitterImageAltText} />
        )}
        {tags.twitterSite && (
          <meta name="twitter:site" content={tags.twitterSite} />
        )}
        {tags.twitterCreator && (
          <meta name="twitter:creator" content={tags.twitterCreator} />
        )}

        {/* Pinterest Meta Tags */}
        {tags.pinterestImage && (
          <meta property="pinterest:image" content={tags.pinterestImage} />
        )}
        {tags.pinterestImageAltText && (
          <meta
            property="pinterest:image:alt"
            content={tags.pinterestImageAltText}
          />
        )}
        {tags.pinterestDescription && (
          <meta
            property="pinterest:description"
            content={tags.pinterestDescription}
          />
        )}
      </Helmet>
      <div className="min-w-16 bg-white h-screen">
        <div className="fixed top-0 left-0 h-full z-50">
          <TopBar />
        </div>
      </div>
      <div className="flex-1 bg-amber-50 h-full">
        <main>
          <div>
            <SearchBar handleOnChange={handleOnChange} value={searchValue} />
          </div>
          <section className="md:flex justify-between mb-10">
            <div className="mt-20 mx-6">
              <div className="my-2">
                <span className="text-5xl text-black font-extrabold mx-2">
                  The
                </span>
                <span className="text-5xl text-green-500 font-extrabold">
                  Smart
                </span>
              </div>
              <div>
                <span className="text-5xl text-black font-extrabold mx-2">
                  Choice For
                </span>
                <span className="text-5xl text-green-500 font-extrabold mx-1">
                  Future
                </span>
              </div>
              <div className="my-1 ml-1">
                <span className="text-sm text-gray-500 mx-2">
                  Unlock Your Potential with TargetStudy: Where Knowledge Meets
                  Opportunity
                </span>
              </div>
              <div className="flex bg-white rounded-full w-fit shadow-md my-10 mx-2">
                <HiOutlineMagnifyingGlass className="mt-3 mx-2" />
                <input
                  className="focus:outline-none"
                  placeholder="search for a location ..."
                  type={"text"}
                ></input>
                <div className="bg-green-500 rounded-full p-2">
                  <button className="text-white font-semibold">Continue</button>
                </div>
              </div>
            </div>
            <div>
              <Lottie
                animationData={animationData}
                loop={true}
                className="h-56 md:h-[520px]"
              />
            </div>
          </section>
          <section className="lg:flex justify-center bg-gradient-to-b from-yellow-50 to-white hidden">
            <div className="flex justify-between bg-green-600 rounded-xl w-4/5  overflow-scroll p-8">
              <div className="flex m-2 gap-2">
                <div className="bg-white opacity-55 h-24 w-24 rounded-lg flex justify-center items-center">
                  <CiMonitor size={40} />
                </div>
                <div>
                  <div>
                    <span className="text-white font-bold text-lg">
                      Learn The Latest Skills
                    </span>
                  </div>
                  <div className="w-48">
                    <span className="text-white text-start text-sm">
                      Goatman can be real , but its most cases are seen from
                      west
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex m-2 gap-2">
                <div className="bg-white opacity-55 h-24 w-24 rounded-lg flex justify-center items-center">
                  <GiPencilRuler size={40} />
                </div>
                <div>
                  <div>
                    <span className="text-white font-bold text-lg">
                      Get Ready For a Career
                    </span>
                  </div>
                  <div className="w-48">
                    <span className="text-white text-start text-sm">
                      Goatman can be real , but its most cases are seen from
                      west
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex m-2 gap-2">
                <div className="bg-white opacity-55 h-24 w-24 rounded-lg flex justify-center items-center">
                  <PiCertificateLight size={40} />
                </div>
                <div>
                  <div>
                    <span className="text-white font-bold text-lg">
                      Earn a Certificate
                    </span>
                  </div>
                  <div className="w-48">
                    <span className="text-white text-start text-sm">
                      Goatman can be real , but its most cases are seen from
                      west
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="bg-yellow-50 mb-10 pb-28">
            <div className="flex justify-center items-center text-black font-bold text-3xl md:text-4xl py-20 ">
              Explore Different Careers Options
            </div>
            <div className=" lg:flex justify-center gap-5">
              <TitleCard
                title={"Engineering"}
                animationdata={Eanimation}
                collegesNumber={"2000"}
                coursesNumber={"40000"}
              />
              <TitleCard
                title={"Medical"}
                animationdata={Manimation}
                collegesNumber={"5000"}
                coursesNumber={"10000"}
              />
              <TitleCard
                title={"MBA"}
                animationdata={Mbaanimation}
                collegesNumber={"3000"}
                coursesNumber={"8000"}
              />
            </div>
          </section>
          <section className="flex justify-evenly mx-5 p-16">
            <div>
              <Lottie
                animationData={LAnimation}
                loop={true}
                className="h-96"
              ></Lottie>
            </div>
            <div>
              <div>
                <span className="text-black font-bold text-5xl mr-4 ml-2">
                  Premium
                </span>
                <span className="text-green-500 font-bold  text-5xl">
                  Learning
                </span>
              </div>
              <div className="my-4">
                <span className="text-black font-bold text-5xl  mx-2">
                  Experience
                </span>
              </div>
              <div>
                <div className="flex justify-evenly gap-5 my-10 mx-2">
                  <div className="h-12 w-12 bg-green-500 rounded-xl flex justify-center items-center scale-125">
                    <RiHeartsFill className="text-red-500" size={30} />
                  </div>
                  <div>
                    <h2 className="text-black font-semibold text-xl">
                      Easily Accessilbe
                    </h2>
                    <span className="text-gray-500">
                      Learning Will feel Very Comfortable with CourseLab
                    </span>
                  </div>
                </div>
                <div className="flex justify-evenly gap-5 my-10 mx-2">
                  <div className="h-12 w-12 bg-green-500 rounded-xl flex justify-center items-center scale-125">
                    <GiPuzzle className="text-red-500" size={30} />
                  </div>
                  <div>
                    <h2 className="text-black font-semibold text-xl">
                      Fun Learning Experience
                    </h2>
                    <span className="text-gray-500">
                      Learning Will feel Very Comfortable with CourseLab
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {searchValue && <MapResult />}
        </main>
        <Footer />
      </div>
    </div>
  );
};

const MapResult = () => {
  const [result, setResult] = useRecoilState(Searching);
  console.log(result);
  return (
    <div className="fixed bg-white top-16 right-8 left-20 z-50  border-2  gap-5 flex-row h-1/3 overflow-y-scroll rounded-md">
      {result.map((d) => {
        if (d.type === "courses") {
          return (
            <div
              className="flex justify-between border-b-2 my-2 bg-white p-2 mx-2 rounded-lg"
              key={d.id}
            >
              <span className="font-extrabold">{d.name}</span>{" "}
              <span>{d.type}</span>
            </div>
          );
        } else if (d.type === "college") {
          const collegeName = d.name?.replace(/ /g, "-");
          return (
            <Link to={`/colleges/${d.field.name}/${collegeName}/${d.id}`}>
              <div
                className="flex justify-between border-b-2 my-2 bg-white p-2 mx-2 rounded-lg"
                key={d.id}
              >
                <span className="font-extrabold">{d.name}</span>{" "}
                <span>{d.type}</span>
              </div>
            </Link>
          );
        } else {
          return (
            <div
              className="flex justify-between border-2 my-2 bg-white p-2 mx-2"
              key={d.id}
            >
              <span className="font extrabold">{d.title}</span>{" "}
              <span>{d.type}</span>
            </div>
          );
        }
      })}
    </div>
  );
};

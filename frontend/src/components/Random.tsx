import { useEffect, useState } from "react";
import { TopBar } from "./TopBar";
import { useRecoilState, useRecoilValue } from "recoil";
import { fieldName, Searching, typed } from "../atom";
import axios from "axios";
import { FaFilter, FaLocationDot } from "react-icons/fa6";
import { LiaUniversitySolid } from "react-icons/lia";
import { Pagination } from "./Pagination";
import { PiFlagPennantFill } from "react-icons/pi";
import { BsFillCameraFill } from "react-icons/bs";
import { MapResult, SearchBar } from "./SearchBar";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import {
  RiCheckboxBlankCircleFill,
  RiCheckboxBlankCircleLine,
} from "react-icons/ri";
import { IoMdSearch } from "react-icons/io";
import { VscSettings } from "react-icons/vsc";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { Link } from "react-router-dom";
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
export const Random = ({
  field,
  display,
}: {
  field: string;
  display: string;
}) => {
  const [value, setValue] = useState("");
  const [type, setType] = useRecoilState(Searching);
  const [filterApplied, setFilterApplied] = useState(false);
  const [locationSelected, setLocationSelected] = useState<string[]>([]);
  const [locationInput, setLocationInput] = useState("");
  const [locationAppear, setLocationAppear] = useState(false);
  const [courseInput, setCourseInput] = useState("");
  const [courseAppear, setCourseAppear] = useState(false);
  const [courseSelected, setCourseSelected] = useState<string[]>([]);
  const [ownershipSelected, setOwnershipSelected] = useState<string[]>([]);
  const [ownershipInput, setOwnershipInput] = useState("");
  const [ownershipAppear, setOwnershipAppear] = useState(false);
  const [courses, setCourses] = useState<String[]>([""]);
  const [locations, setLocations] = useState<String[]>([""]);

  console.log("Length of the courses" + courseSelected.length);
  const [post, setPost] = useState([
    {
      colleges: [
        {
          id: 1,
          name: "National Institute",
          location: "Suratkal",
          founded: "1994",
          ranking: [{ basedOn: "IRF", Rank: "10" }],
        },
      ],
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(6);

  useEffect(() => {
    try {
      setLoading(true);
      const colleges = async () => {
        const res = await axios.get(
          `http://localhost:8787/api/v1/blog/bulk/${field}`,
          {
            headers: {
              authorization: localStorage.getItem("token"),
            },
          }
        );
        if (Array.isArray(res.data.data)) {
          setPost(res.data.data);
          setLoading(false);
        } else {
          setPost([]);
          setLoading(false);
        }
      };
      colleges();
    } catch (error) {
      console.error(error);
      setPost([]);
    }
  }, []);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        let fieldId: number;
        if (field === "Engineering") {
          fieldId = 1;
        } else if (field === "Medical") {
          fieldId = 2;
        } else {
          fieldId = 3;
        }
        const response = await axios.get(
          `http://localhost:8787/api/v1/blog/locations-courses-ownership/filter/${fieldId}`
        );
        if (Array.isArray(response.data.location)) {
          setLocations(response.data.location);
          console.log("this is location array" + response.data.location);
        }
        if (Array.isArray(response.data.courses)) {
          setCourses(response.data.courses);
          console.log("this is courses array" + response.data.courses);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchOptions();
  }, []);

  const handleFilterButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      setFilterApplied(true);
      const filter = async () => {
        let fieldId: number;
        if (field === "Engineering") {
          fieldId = 1;
        } else if (field === "Medical") {
          fieldId = 2;
        } else {
          fieldId = 3;
        }
        const response = await axios.post(
          `http://localhost:8787/api/v1/blog/filter/location-courses-ownership-available/${fieldId}`,
          {
            locations: locationSelected,
            courses: courseSelected,
            ownership: ownershipSelected,
          }
        );

        if (Array.isArray(response.data.colleges)) {
          if (response.data.colleges.length == 0) {
            setPost([]);
            setLoading(false);
          }
          setPost([response.data]);
          setLoading(false);
        } else {
          setPost([]);
          setLoading(false);
        }
      };
      filter();
    } catch (error) {
      console.error(error);
      setLoading(true);
      setPost([]);
    }
  };
  useEffect(() => {
    const handleSearch = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8787/api/v1/blog/search/college-course-article/${value}`
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
  }, [value, setType]);
  const handleRemoveButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setLocationSelected([]);
      setCourseSelected([]);
      setOwnershipSelected([]);
      setLoading(true);
      setFilterApplied(false);
      const colleges = async () => {
        const allColleges = await axios.get(
          `http://localhost:8787/api/v1/blog/bulk/${field}`,
          {
            headers: {
              authorization: localStorage.getItem("token"),
            },
          }
        );
        if (Array.isArray(allColleges.data.data)) {
          setPost(allColleges.data.data);
          setLoading(false);
        } else {
          setPost([]);
          setLoading(false);
        }
      };

      colleges();
    } catch (error) {
      console.log(error);
      setPost([]);
    }
  };

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = post[0].colleges?.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  return (
    <div className="flex">
      <div className="min-w-16 bg-white h-screen">
        <div className="fixed top-0 left-0 h-full z-50">
          <TopBar />
        </div>
      </div>
      <div className="flex-1 bg-amber-50 h-full">
        <SearchBar handleOnChange={handleOnChange} value={value} />
        <div className="xl:flex xl:gap-5">
          <div className="p-5 mx-2 my-5 xl:w-[390px]">
            <div className="border-2 flex-grow p-5 bg-white shadow-md rounded-md">
              <div className="flex justify-center">
                <div className="flex">
                  <VscSettings className=" mr-2 mt-0.5 text-green-500 text-2xl sm:text-4xl" />
                  <span className="sm:text-2xl text-lg font-extrabold">
                    Filter
                  </span>
                </div>
              </div>
              <div className="my-1">
                <div
                  onClick={() => {
                    setLocationAppear((c) => !c);
                  }}
                  className="flex justify-between border-2 rounded-md my-2 p-1 hover:cursor-pointer"
                >
                  Location
                  {locationAppear ? (
                    <MdOutlineKeyboardArrowUp className="mt-1" />
                  ) : (
                    <MdOutlineKeyboardArrowDown className="mt-1" />
                  )}
                </div>
                {locationAppear && (
                  <DropBox
                    customInput={locationInput}
                    customSetInput={setLocationInput}
                    field={locations}
                    fieldSelected={locationSelected}
                    setFieldSelected={setLocationSelected}
                    placeholder="Enter the location"
                  />
                )}
                <div
                  onClick={() => {
                    setCourseAppear((c) => !c);
                  }}
                  className="flex justify-between border-2 rounded-md my-2 p-1 hover:cursor-pointer"
                >
                  Courses offered
                  {courseAppear ? (
                    <MdOutlineKeyboardArrowUp className="mt-1" />
                  ) : (
                    <MdOutlineKeyboardArrowDown className="mt-1" />
                  )}
                </div>
                {courseAppear && (
                  <DropBox
                    customInput={courseInput}
                    customSetInput={setCourseInput}
                    field={courses}
                    fieldSelected={courseSelected}
                    setFieldSelected={setCourseSelected}
                    placeholder="Enter the course"
                  />
                )}
              </div>
              <div
                onClick={() => {
                  setOwnershipAppear((c) => !c);
                }}
                className="flex justify-between border-2 rounded-md my-2 p-1 hover:cursor-pointer"
              >
                Ownership
                {ownershipAppear ? (
                  <MdOutlineKeyboardArrowUp className="mt-1" />
                ) : (
                  <MdOutlineKeyboardArrowDown className="mt-1" />
                )}
              </div>
              {ownershipAppear && (
                <DropBox
                  customInput={ownershipInput}
                  customSetInput={setOwnershipInput}
                  field={[{ name: "public/Government" }, { name: "private" }]}
                  fieldSelected={ownershipSelected}
                  setFieldSelected={setOwnershipSelected}
                  placeholder="Enter the type"
                />
              )}
              {filterApplied ? (
                <button
                  onClick={handleRemoveButton}
                  className="bg-green-500 text-white rounded-lg w-full p-2 font-bold mt-5"
                >
                  Remove All
                </button>
              ) : (
                <button
                  onClick={handleFilterButton}
                  className="bg-green-500 text-white rounded-lg w-full p-2 font-bold mt-5"
                >
                  Apply Filter
                </button>
              )}
            </div>
          </div>
          <div className="md:flex-col border-2 shadow-md rounded-md p-2 md:mt-5 md:mr-2 md:w-full xl:w-2/3 bg-white ">
            <div className="sm:flex-1 mx-2.5 my-2.5 p-2 ">
              <div className="font-extrabold flex justify-center mb-5"></div>
            </div>
            <div className="">
              <div className="font-extrabold flex justify-center">
                <div className="flex">
                  <LiaUniversitySolid className=" mr-1 text-green-500 text-2xl sm:text-4xl" />
                  <span className="sm:text-2xl">{display} Colleges</span>
                </div>
              </div>
              <Posts post={currentPost} loading={loading} field={field} />
            </div>
          </div>
        </div>

        <Pagination
          totalPosts={post[0].colleges.length}
          postsPerPage={postPerPage}
          currentPage={currentPage}
          type={"general"}
          setCurrentPage={setCurrentPage}
        />
      </div>
      {value && <MapResult />}
    </div>
  );
};

const Posts = ({ post, loading, field }: any) => {
  if (loading) {
    return (
      <div className="w-full">
        <ul>
          <PostsLoading />
          <PostsLoading />
          <PostsLoading />
          <PostsLoading />
          <PostsLoading />
          <PostsLoading />
          <PostsLoading />
          <PostsLoading />
          <PostsLoading />
          <PostsLoading />
        </ul>
      </div>
    );
  }

  if (!loading && post.length == 0) {
    return (
      <div className="flex justify-center">
        <div>
          <div className="flex justify-center mt-20">
            <HiMagnifyingGlass className="size-24 text-gray-500" />
          </div>
          <div className="text-center mt-5">
            <h1 className="font-bold text-4xl">No Matches Found</h1>
            <span className="text-gray-500 mt-2">
              Sorry, your search did not return any results. Please try a
              different search term or clear your filters.
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ul className="mt-10">
      {post.map((college: any) => {
        const collegeName = college?.name.replace(/ /g, "-");

        return (
          <Link
            to={`/colleges/${field}/${collegeName}/${college?.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <li key={college?.id}>
              <div className="flex bg-white border-2 shadow-md px-1 py-2 mx-1 my-5 rounded-lg">
                <div className="bg-pink-200 flex justify-center items-center mx-1 h-20 w-32 sm:w-80 sm:h-36 rounded-lg">
                  <div className=" text-white text-xl p-2 m-0.5">
                    <BsFillCameraFill />
                  </div>
                </div>
                <div className="flex-col flex items-center justify-center my-1 mr-5 ml-2 sm:mx-5">
                  <h3 className=" font-extrabold text-center sm:text-4xl rounded-lg  p-2">
                    {college.ranking?.[0]?.Rank || "NA"}
                  </h3>
                  <h4 className="text-center text-sm sm:text-lg">
                    {college.ranking?.[0]?.basedOn || "IRF"}
                  </h4>
                </div>
                <div className="w-full text-start  sm:mr-64 sm:mt-10">
                  <h2 className="font-extrabold sm:text-xl  border-b-2 text-blue-500">
                    {college?.name || "Name"}
                  </h2>
                  <div className="mt-5 text-sm sm:text-lg sm:flex sm:justify-center sm:gap-10 sm:mt-10">
                    <span className="flex gap-1">
                      |
                      <PiFlagPennantFill className="mt-1 text-green-500 ml-0.5" />{" "}
                      Est. {college?.founded || "NA"} |
                    </span>
                    <span className="flex gap-1">
                      {" "}
                      |
                      <FaLocationDot className="mt-0.5 text-green-500 ml-0.5" />{" "}
                      Location {college?.location} |
                    </span>
                  </div>
                </div>
              </div>
            </li>
          </Link>
        );
      })}
    </ul>
  );
};

const PostsLoading = () => {
  return (
    <li>
      <div className="flex border-2 shadow-md px-1 py-2 mx-1 my-5 bg-gray-100 animate-pulse w-full">
        <div className="bg-pink-200 flex justify-center items-center mx-1 h-20 w-32 sm:w-80 sm:h-52 rounded-lg animate-pulse">
          <div className=" text-white text-xl p-2 m-0.5">
            <BsFillCameraFill />
          </div>
        </div>
        <div className="flex-col flex items-center justify-center my-1 mr-5 ">
          <h1 className="font-extrabold text-center bg-gray-300 text-gray-300 rounded-lg animate-pulse ">
            41
          </h1>
          <h2 className="text-center text-sm bg-gray-300 text-gray-300 rounded-lg mt-2 animate-pulse ">
            IRF
          </h2>
        </div>
        <div className="w-full text-start">
          <h1 className="font-extrabold text-xl bg-gray-300 text-gray-300 rounded-lg animate-pulse ">
            Name
          </h1>
          <div className="mt-5 text-sm flex gap-5">
            <span className=" bg-gray-300 text-gray-300 rounded-lg animate-pulse ">
              | Est.1998 |
            </span>{" "}
            <span className="flex gap-1  bg-gray-300 text-gray-300 rounded-lg animate-pulse ">
              {" "}
              <FaLocationDot className="mt-0.5 text-gray-300 ml-0.5 animate-pulse  " />{" "}
              Location{" "}
            </span>
          </div>
        </div>
      </div>
    </li>
  );
};
interface Dropbox {
  customInput: string;
  placeholder: string;
  customSetInput: React.Dispatch<React.SetStateAction<string>>;
  field: any[];
  fieldSelected: string[];
  setFieldSelected: React.Dispatch<React.SetStateAction<string[]>>;
  level?: string;
  college?: string;
}
export const DropBox = ({
  customInput,
  customSetInput,
  field,
  fieldSelected,
  setFieldSelected,
  placeholder,
}: Dropbox) => {
  console.log("Hi from inside the field" + field);
  return (
    <ul className="border-2 rounded-md my-2 p-2 overflow-y-auto max-h-32">
      <div className="sticky top-0 border-2 rounded-md bg-white flex justify-center">
        <input
          type="text"
          placeholder={placeholder}
          value={customInput}
          onChange={(e) => {
            customSetInput(e.target.value.toLowerCase());
          }}
          className="w-full p-1 outline-none"
        />
        <IoMdSearch className="mt-2 mx-2" />
      </div>

      {field.map((d, index) => (
        <li
          key={index}
          onClick={() => {
            setFieldSelected((prevData) => {
              if (fieldSelected.includes(d.name)) {
                return prevData.filter((name) => name !== d.name);
              } else {
                return [...prevData, d.name];
              }
            });
          }}
          className={`flex justify-between overflow-x-auto hover:bg-green-200 hover:cursor-pointer font-semibold p-1 rounded-md ${
            d.name?.toLowerCase().includes(customInput) ? "block" : "hidden"
          }`}
        >
          {<span>{d.name}</span>}
          {fieldSelected.includes(d.name) ? (
            <RiCheckboxBlankCircleFill className="mt-1 text-green-500  border-2 rounded-full" />
          ) : (
            <RiCheckboxBlankCircleLine className="mt-1 " />
          )}
        </li>
      ))}
    </ul>
  );
};

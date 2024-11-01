import { BiSolidSchool } from "react-icons/bi";
import { TopBar } from "./TopBar";
import { useEffect, useMemo, useState } from "react";
import { Overview } from "./Overview";
import { Placement } from "./Placement";
import { Faqs } from "./Faqs";
import { CoursesView } from "./CoursesView";
import { useRecoilState } from "recoil";
import { collegeSelected } from "../atom";
import axios from "axios";
import { useCollegeHook } from "./hooks";
import { TiArrowForward } from "react-icons/ti";
import { RiArrowDropDownLine, RiQuestionAnswerFill } from "react-icons/ri";
import { useParams } from "react-router-dom";

interface Courses {
  name: string;
  duration: string;
  fees: string;
  seats: number;
  cutoff: number;
  placement: {
    year: string;
    averagePackage: string;
    medianPackage: string;
    highestPackage: string;
  }[];
  admission: { id: number; requirement: string[] }[];
}
interface CollegeData {
  id: number;
  name: string;
  location: string;
  description: string;
  ownership: string;
  founded: string;
  logo: string;
  collegeWebsiteLink: string;
  image: string[];
  fieldId: number;
  metatitle: string;
  metadescription: string;
  metakeywords: string;
  metablogURL: string;
  field: {
    id: number;
    name: string;
  };
  courses: Courses[];
  ranking: { Rank: string; basedOn: string }[];
  admission: {
    requirement: string[];
  }[];
  hostelFess: {
    type: string;
    amount: string;
  }[];
  faqs: { question: string; answer: string }[];
}
export const CollegeDetails = () => {
  const [activeState, setActiveState] = useState([
    { name: "overview", active: true },
    { name: "courses", active: false },
    { name: "Placement", active: false },
    { name: "Faqs", active: false },
  ]);
  const { field, collegeName, id } = useParams();

  const derivedActiveState = activeState.filter((d) => d.active === true);
  const { loading, college } = useCollegeHook({
    id: parseInt(id || "0"),
    field: field || "",
    collegeName: collegeName || "",
  });

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const buttonName = (e.target as HTMLButtonElement).name.trim();

    setActiveState(
      activeState.map((d) => ({
        ...d,
        active: d.name === buttonName,
      }))
    );
  };

  return (
    <div className="flex w-full">
      <div className="min-w-16 bg-white h-screen">
        <div className="fixed top-0 left-0 h-full z-50">
          <TopBar />
        </div>
      </div>
      <div className="flex-1">
        <div className="p-5 border-b-2 rounded-b-lg bg-emerald-500 shadow-xl w-full">
          <div className="flex">
            <div className="bg-pink-200 flex justify-center items-center m-2 h-12 w-12 lg:h-20 lg:w-20 rounded-lg">
              <BiSolidSchool className="text-white" size={30} />
            </div>

            <h1 className=" font-extrabold text-lg sm:text-3xl mt-3 lg:mt-8 lg:ml-5">
              {college.name}
            </h1>
          </div>
          <div className="  gap-2 md:flex justify-between my-5 md:gap-10 sm:text-xl sm:mt-10 sm:mx-5 bg-emerald-500">
            <div>
              <button
                onClick={handleOnClick}
                name="overview"
                className={`hover:border-b-black hover:border-b-4 p-2 transition-all duration-100 ease-in-out ${activeState
                  .filter((d) => d.name === "overview")
                  .map((d) =>
                    d.active === true ? "border-b-black border-b-2" : ""
                  )}`}
              >
                Overview
              </button>
            </div>
            <div>
              <button
                onClick={handleOnClick}
                name="courses"
                className={`hover:border-b-black hover:border-b-4 p-2 transition-all duration-100 ease-in-out ${activeState
                  .filter((d) => d.name === "courses")
                  .map((d) =>
                    d.active === true ? "border-b-black border-b-2" : ""
                  )}`}
              >
                Courses
              </button>
            </div>
            <div>
              <button
                onClick={handleOnClick}
                name="Placement"
                className={`hover:border-b-black hover:border-b-4 p-2 transition-all duration-100 ease-in-out ${activeState
                  .filter((d) => d.name === "Placement")
                  .map((d) =>
                    d.active === true ? "border-b-black border-b-2" : ""
                  )}`}
              >
                Placement
              </button>
            </div>
            <div>
              <button
                onClick={handleOnClick}
                name="Faqs"
                className={`hover:border-b-black hover:border-b-4 p-2 transition-all duration-100 ease-in-out ${activeState
                  .filter((d) => d.name === "Faqs")
                  .map((d) =>
                    d.active === true ? "border-b-black border-b-2" : ""
                  )}`}
              >
                FAQs
              </button>
            </div>
          </div>
        </div>
        <div>
          {derivedActiveState.map((d) => {
            switch (d.name) {
              case "overview":
                if (loading) {
                  return <OverviewSkeleton />;
                } else {
                  return <Overview collegeData={college} />;
                }
              case "courses":
                if (loading) {
                  return <CoursesSkeleton />;
                } else {
                  return <CoursesView collegeData={college} />;
                }

              case "Placement":
                if (loading) {
                  return <PlacementSkeleton />;
                } else {
                  return <Placement collegeData={college} />;
                }

              case "Faqs":
                if (loading) {
                  return <FaqSkeleton />;
                } else {
                  return <Faqs collegeData={college} />;
                }

              default:
                return <Overview collegeData={college} />;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export const OverviewSkeleton = () => {
  return (
    <div className="border-2 p-5 shadow-lg rounded-md">
      <div className="border-2 p-5 shadow-lg rounded-md">
        <h1 className="font-extrabold sm:text-3xl">
          About University Of Excellence
        </h1>
        <p className="text-sm sm:text-lg mt-10 text-start text-gray-200 bg-gray-200 rounded-full animate-pulse">
          {" "}
          "Indian Institute of Technology Delhi (more popularly known as IIT
          Delhi) is one of the most prestigious universities in India. "
        </p>
        <p className="text-sm sm:text-lg mt-10 text-start text-gray-200 bg-gray-200 rounded-full animate-pulse">
          {" "}
          "Indian Institute of Technology Delhi (more popularly known as IIT
          Delhi) is one of the most prestigious universities in India. "
        </p>
        <p className="text-sm sm:text-lg mt-10 text-start text-gray-200 bg-gray-200 rounded-full animate-pulse">
          {" "}
          "Indian Institute of Technology Delhi (more popularly known as IIT
          Delhi) is one of the most prestigious universities in India. "
        </p>

        <div className="p-5 flex justify-center itmes-center my-10">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-green-500 text-white">
                <th className="border p-2 text-sm text-left">Particular</th>
                <th className="border p-2 text-sm text-left">Highlight</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-green-100 hover:bg-green-200">
                <td className="border p-2 text-sm">Establishment Year</td>
                <td className="border p-2 text-sm text-gray-200 bg-gray-200  animate-pulse">
                  {" "}
                  "NA"
                </td>
              </tr>
              <tr className="hover:bg-green-200">
                <td className="border p-2 text-sm">Ownership</td>
                <td className="border p-2 text-sm text-gray-200 bg-gray-200  animate-pulse">
                  {" "}
                  Government
                </td>
              </tr>
              <tr className="bg-green-100 hover:bg-green-200">
                <td className="border p-2 text-sm">Ranking</td>
                <td className="border p-2 text-sm text-gray-200 bg-gray-200  animate-pulse">
                  <span> "NA"</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex">
          <span className="text-blue-500">Link:</span>
          <div className="flex">
            <TiArrowForward className="mt-1 ml-2" />
            <span className=" text-gray-200 bg-gray-200 rounded-full animate-pulse">
              College Website link
            </span>
          </div>
        </div>
        <div className="mt-10">
          <h1 className="font-extrabold sm:text-3xl">
            Hostel Related Information
          </h1>
          <div className="p-5 flex justify-center itmes-center my-5">
            <table className="min-w-full border-collapse mt-5">
              <thead>
                <tr className="bg-green-500 text-white">
                  <th className="border p-2 text-sm text-left">Type</th>
                  <th className="border p-2 text-sm text-left">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2 text-sm  text-gray-200 bg-gray-200  animate-pulse">
                    Type
                  </td>
                  <td className="border p-2 text-sm  text-gray-200 bg-gray-200  animate-pulse">
                    Amount
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <span className="font-extrabold sm:text-3xl">
            Admission Requirements
          </span>
          <div className="">
            <ul className="ml-5">
              <li className="my-2 font-semibold  text-gray-200 bg-gray-200 rounded-full animate-pulse">
                requirement
              </li>
              <li className="my-2 font-semibold  text-gray-200 bg-gray-200 rounded-full animate-pulse">
                requirement
              </li>
              <li className="my-2 font-semibold  text-gray-200 bg-gray-200 rounded-full animate-pulse">
                requirement
              </li>
              <li className="my-2 font-semibold  text-gray-200 bg-gray-200 rounded-full animate-pulse">
                requirement
              </li>
              <li className="my-2 font-semibold  text-gray-200 bg-gray-200 rounded-full animate-pulse">
                requirement
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CoursesSkeleton = () => {
  return (
    <div className="border-2 rounded-lg shadow-md">
      <div className="border-2 p-5 shadow-lg rounded-md m-5">
        <div>
          <h1 className="font-extrabold sm:text-3xl">Courses Offered Here</h1>
          <div className="sm:p-5 flex justify-center itmes-center mt-2">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-green-500 text-white">
                  <th className="border p-2 text-xs sm:text-sm text-left">
                    Name
                  </th>
                  <th className="border p-2 text-xs sm:text-sm text-left">
                    Duration
                  </th>
                  <th className="border p-2 text-xs  sm:text-sm text-left">
                    Fees
                  </th>
                  <th className="border p-2 text-xs  sm:text-sm text-left">
                    Seats
                  </th>
                  <th className="border p-2 text-xs sm:text-sm text-left">
                    Eligibility
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2 text-xs sm:text-sm text-gray-200 bg-gray-200 animate-pulse">
                    NAME
                  </td>
                  <td className="border p-2 text-xs sm:text-sm  text-gray-200 bg-gray-200 animate-pulse">
                    DURATION
                  </td>
                  <td className="border p-2 text-xs sm:text-sm  text-gray-200 bg-gray-200 animate-pulse">
                    FEES
                  </td>
                  <td className="border p-2 text-xs sm:text-sm  text-gray-200 bg-gray-200 animate-pulse">
                    SEATS
                  </td>
                  <td className="border p-2 text-xs sm:text-sm  text-gray-200 bg-gray-200 animate-pulse">
                    REQUIREMENT
                  </td>
                </tr>
                <tr>
                  <td className="border p-2 text-xs sm:text-sm text-gray-200 bg-gray-200 animate-pulse">
                    NAME
                  </td>
                  <td className="border p-2 text-xs sm:text-sm  text-gray-200 bg-gray-200 animate-pulse">
                    DURATION
                  </td>
                  <td className="border p-2 text-xs sm:text-sm  text-gray-200 bg-gray-200 animate-pulse">
                    FEES
                  </td>
                  <td className="border p-2 text-xs sm:text-sm  text-gray-200 bg-gray-200 animate-pulse">
                    SEATS
                  </td>
                  <td className="border p-2 text-xs sm:text-sm  text-gray-200 bg-gray-200 animate-pulse">
                    REQUIREMENT
                  </td>
                </tr>
                <tr>
                  <td className="border p-2 text-xs sm:text-sm text-gray-200 bg-gray-200 animate-pulse">
                    NAME
                  </td>
                  <td className="border p-2 text-xs sm:text-sm  text-gray-200 bg-gray-200 animate-pulse">
                    DURATION
                  </td>
                  <td className="border p-2 text-xs sm:text-sm  text-gray-200 bg-gray-200 animate-pulse">
                    FEES
                  </td>
                  <td className="border p-2 text-xs sm:text-sm  text-gray-200 bg-gray-200 animate-pulse">
                    SEATS
                  </td>
                  <td className="border p-2 text-xs sm:text-sm  text-gray-200 bg-gray-200 animate-pulse">
                    REQUIREMENT
                  </td>
                </tr>
                <tr>
                  <td className="border p-2 text-xs sm:text-sm text-gray-200 bg-gray-200 animate-pulse">
                    NAME
                  </td>
                  <td className="border p-2 text-xs sm:text-sm  text-gray-200 bg-gray-200 animate-pulse">
                    DURATION
                  </td>
                  <td className="border p-2 text-xs sm:text-sm  text-gray-200 bg-gray-200 animate-pulse">
                    FEES
                  </td>
                  <td className="border p-2 text-xs sm:text-sm  text-gray-200 bg-gray-200 animate-pulse">
                    SEATS
                  </td>
                  <td className="border p-2 text-xs sm:text-sm  text-gray-200 bg-gray-200 animate-pulse">
                    REQUIREMENT
                  </td>
                </tr>
                <tr>
                  <td className="border p-2 text-xs sm:text-sm text-gray-200 bg-gray-200 animate-pulse">
                    NAME
                  </td>
                  <td className="border p-2 text-xs sm:text-sm  text-gray-200 bg-gray-200 animate-pulse">
                    DURATION
                  </td>
                  <td className="border p-2 text-xs sm:text-sm  text-gray-200 bg-gray-200 animate-pulse">
                    FEES
                  </td>
                  <td className="border p-2 text-xs sm:text-sm  text-gray-200 bg-gray-200 animate-pulse">
                    SEATS
                  </td>
                  <td className="border p-2 text-xs sm:text-sm  text-gray-200 bg-gray-200 animate-pulse">
                    REQUIREMENT
                  </td>
                </tr>
                <tr>
                  <td className="border p-2 text-xs sm:text-sm text-gray-200 bg-gray-200 animate-pulse">
                    NAME
                  </td>
                  <td className="border p-2 text-xs sm:text-sm  text-gray-200 bg-gray-200 animate-pulse">
                    DURATION
                  </td>
                  <td className="border p-2 text-xs sm:text-sm  text-gray-200 bg-gray-200 animate-pulse">
                    FEES
                  </td>
                  <td className="border p-2 text-xs sm:text-sm  text-gray-200 bg-gray-200 animate-pulse">
                    SEATS
                  </td>
                  <td className="border p-2 text-xs sm:text-sm  text-gray-200 bg-gray-200 animate-pulse">
                    REQUIREMENT
                  </td>
                </tr>
                <tr>
                  <td className="border p-2 text-xs sm:text-sm text-gray-200 bg-gray-200 animate-pulse">
                    NAME
                  </td>
                  <td className="border p-2 text-xs sm:text-sm  text-gray-200 bg-gray-200 animate-pulse">
                    DURATION
                  </td>
                  <td className="border p-2 text-xs sm:text-sm  text-gray-200 bg-gray-200 animate-pulse">
                    FEES
                  </td>
                  <td className="border p-2 text-xs sm:text-sm  text-gray-200 bg-gray-200 animate-pulse">
                    SEATS
                  </td>
                  <td className="border p-2 text-xs sm:text-sm  text-gray-200 bg-gray-200 animate-pulse">
                    REQUIREMENT
                  </td>
                </tr>
                <tr>
                  <td className="border p-2 text-xs sm:text-sm text-gray-200 bg-gray-200 animate-pulse">
                    NAME
                  </td>
                  <td className="border p-2 text-xs sm:text-sm  text-gray-200 bg-gray-200 animate-pulse">
                    DURATION
                  </td>
                  <td className="border p-2 text-xs sm:text-sm  text-gray-200 bg-gray-200 animate-pulse">
                    FEES
                  </td>
                  <td className="border p-2 text-xs sm:text-sm  text-gray-200 bg-gray-200 animate-pulse">
                    SEATS
                  </td>
                  <td className="border p-2 text-xs sm:text-sm  text-gray-200 bg-gray-200 animate-pulse">
                    REQUIREMENT
                  </td>
                </tr>
                <tr>
                  <td className="border p-2 text-xs sm:text-sm text-gray-200 bg-gray-200 animate-pulse">
                    NAME
                  </td>
                  <td className="border p-2 text-xs sm:text-sm  text-gray-200 bg-gray-200 animate-pulse">
                    DURATION
                  </td>
                  <td className="border p-2 text-xs sm:text-sm  text-gray-200 bg-gray-200 animate-pulse">
                    FEES
                  </td>
                  <td className="border p-2 text-xs sm:text-sm  text-gray-200 bg-gray-200 animate-pulse">
                    SEATS
                  </td>
                  <td className="border p-2 text-xs sm:text-sm  text-gray-200 bg-gray-200 animate-pulse">
                    REQUIREMENT
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PlacementSkeleton = () => {
  return (
    <div className="border-2 rounded-lg shadow-md">
      <div className="border-2 p-5 shadow-lg rounded-md m-5">
        <div>
          <h1 className="font-extrabold sm:text-3xl">Courses Offered Here</h1>
          <div className="sm:p-5 flex justify-center itmes-center mt-2">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-green-500 text-white">
                  <th className="border p-2 text-xs sm:text-sm text-left">
                    Name
                  </th>
                  <th className="border p-2 text-xs sm:text-sm text-left">
                    Year
                  </th>
                  <th className="border p-2 text-xs sm:text-sm text-left">
                    Average Package
                  </th>
                  <th className="border p-2 text-xs  sm:text-sm text-left">
                    Median Package
                  </th>
                  <th className="border p-2 text-xs  sm:text-sm text-left">
                    Heighest Package
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2 text-xs sm:text-sm text-gray-200 bg-gray-200 animate-pulse">
                    Name
                  </td>

                  <td className="border p-2 text-xs sm:text-sm text-gray-200 bg-gray-200 animate-pulse">
                    Year
                  </td>
                  <td className="border p-2 text-xs sm:text-sm text-gray-200 bg-gray-200 animate-pulse">
                    Average Package
                  </td>
                  <td className="border p-2 text-xs sm:text-sm text-gray-200 bg-gray-200 animate-pulse">
                    Median Package
                  </td>
                  <td className="border p-2 text-xs sm:text-sm text-gray-200 bg-gray-200 animate-pulse">
                    Heighest Package
                  </td>
                </tr>
                <tr>
                  <td className="border p-2 text-xs sm:text-sm text-gray-200 bg-gray-200 animate-pulse">
                    Name
                  </td>

                  <td className="border p-2 text-xs sm:text-sm text-gray-200 bg-gray-200 animate-pulse">
                    Year
                  </td>
                  <td className="border p-2 text-xs sm:text-sm text-gray-200 bg-gray-200 animate-pulse">
                    Average Package
                  </td>
                  <td className="border p-2 text-xs sm:text-sm text-gray-200 bg-gray-200 animate-pulse">
                    Median Package
                  </td>
                  <td className="border p-2 text-xs sm:text-sm text-gray-200 bg-gray-200 animate-pulse">
                    Heighest Package
                  </td>
                </tr>
                <tr>
                  <td className="border p-2 text-xs sm:text-sm text-gray-200 bg-gray-200 animate-pulse">
                    Name
                  </td>

                  <td className="border p-2 text-xs sm:text-sm text-gray-200 bg-gray-200 animate-pulse">
                    Year
                  </td>
                  <td className="border p-2 text-xs sm:text-sm text-gray-200 bg-gray-200 animate-pulse">
                    Average Package
                  </td>
                  <td className="border p-2 text-xs sm:text-sm text-gray-200 bg-gray-200 animate-pulse">
                    Median Package
                  </td>
                  <td className="border p-2 text-xs sm:text-sm text-gray-200 bg-gray-200 animate-pulse">
                    Heighest Package
                  </td>
                </tr>
                <tr>
                  <td className="border p-2 text-xs sm:text-sm text-gray-200 bg-gray-200 animate-pulse">
                    Name
                  </td>

                  <td className="border p-2 text-xs sm:text-sm text-gray-200 bg-gray-200 animate-pulse">
                    Year
                  </td>
                  <td className="border p-2 text-xs sm:text-sm text-gray-200 bg-gray-200 animate-pulse">
                    Average Package
                  </td>
                  <td className="border p-2 text-xs sm:text-sm text-gray-200 bg-gray-200 animate-pulse">
                    Median Package
                  </td>
                  <td className="border p-2 text-xs sm:text-sm text-gray-200 bg-gray-200 animate-pulse">
                    Heighest Package
                  </td>
                </tr>
                <tr>
                  <td className="border p-2 text-xs sm:text-sm text-gray-200 bg-gray-200 animate-pulse">
                    Name
                  </td>

                  <td className="border p-2 text-xs sm:text-sm text-gray-200 bg-gray-200 animate-pulse">
                    Year
                  </td>
                  <td className="border p-2 text-xs sm:text-sm text-gray-200 bg-gray-200 animate-pulse">
                    Average Package
                  </td>
                  <td className="border p-2 text-xs sm:text-sm text-gray-200 bg-gray-200 animate-pulse">
                    Median Package
                  </td>
                  <td className="border p-2 text-xs sm:text-sm text-gray-200 bg-gray-200 animate-pulse">
                    Heighest Package
                  </td>
                </tr>
                <tr>
                  <td className="border p-2 text-xs sm:text-sm text-gray-200 bg-gray-200 animate-pulse">
                    Name
                  </td>

                  <td className="border p-2 text-xs sm:text-sm text-gray-200 bg-gray-200 animate-pulse">
                    Year
                  </td>
                  <td className="border p-2 text-xs sm:text-sm text-gray-200 bg-gray-200 animate-pulse">
                    Average Package
                  </td>
                  <td className="border p-2 text-xs sm:text-sm text-gray-200 bg-gray-200 animate-pulse">
                    Median Package
                  </td>
                  <td className="border p-2 text-xs sm:text-sm text-gray-200 bg-gray-200 animate-pulse">
                    Heighest Package
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FaqSkeleton = () => {
  return (
    <div className="border-2 p-5 shadow-lg rounded-md">
      <div className="border-2 p-5 shadow-lg rounded-md">
        <div className="flex">
          <RiQuestionAnswerFill size={40} />
          <h1 className="font-extrabold sm:text-3xl ml-5">
            Some FAQs related to University of Excellence
          </h1>
        </div>
        <div className="mt-20">
          <div className="my-5 hover:cursor-pointer">
            <div className="flex justify-between text-lg border-b-2 rounded-lg font-bold my-4">
              Question
              <RiArrowDropDownLine size={40} />
            </div>
            <div>
              <span>Ans</span>
              <p className="ml-2 bg-gray-200 text-gray-200 rounded-full animate-pulse">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>
          </div>
          <div className="my-5 hover:cursor-pointer">
            <div className="flex justify-between text-lg border-b-2 rounded-lg font-bold my-4">
              Question
              <RiArrowDropDownLine size={40} />
            </div>
            <div>
              <span>Ans</span>
              <p className="ml-2 bg-gray-200 text-gray-200 rounded-full animate-pulse">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>
          </div>
          <div className="my-5 hover:cursor-pointer">
            <div className="flex justify-between text-lg border-b-2 rounded-lg font-bold my-4">
              Question
              <RiArrowDropDownLine size={40} />
            </div>
            <div>
              <span>Ans</span>
              <p className="ml-2 bg-gray-200 text-gray-200 rounded-full animate-pulse">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>
          </div>
          <div className="my-5 hover:cursor-pointer">
            <div className="flex justify-between text-lg border-b-2 rounded-lg font-bold my-4">
              Question
              <RiArrowDropDownLine size={40} />
            </div>
            <div>
              <span>Ans</span>
              <p className="ml-2 bg-gray-200 text-gray-200 rounded-full animate-pulse">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>
          </div>
          <div className="my-5 hover:cursor-pointer">
            <div className="flex justify-between text-lg border-b-2 rounded-lg font-bold my-4">
              Question
              <RiArrowDropDownLine size={40} />
            </div>
            <div>
              <span>Ans</span>
              <p className="ml-2 bg-gray-200 text-gray-200 rounded-full animate-pulse">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

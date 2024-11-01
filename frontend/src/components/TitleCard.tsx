import Lottie from "lottie-react";
import MbaanimationData from "../assets/Mbaanimation.json";
import { HiMiniBuildingLibrary } from "react-icons/hi2";
import { IoIosSchool } from "react-icons/io";
export const TitleCard = ({
  title,
  animationdata,
  collegesNumber,
  coursesNumber,
}: any) => {
  return (
    <div className="bg-white p-5 shadow-2xl m-5 flex-grow border-2  rounded-xl transition-transform duration-300 ease-in-out hover:scale-105">
      <div className="border-b-2 p-2">
        <div className="flex justify-center">
          <Lottie
            animationData={animationdata}
            loop={true}
            className=" h-44 md:h-56"
          />
        </div>
        <div className="my-2">
          <h2 className="font-semibold text-start text-xl">{title}</h2>
        </div>
      </div>
      <div className="flex gap-5 mt-6">
        <div className="flex justify-between gap-1">
          <HiMiniBuildingLibrary size={20} />
          <span className="text-sm">{collegesNumber}+ colleges</span>
        </div>
        <div className="flex justify-between gap-1">
          <IoIosSchool size={20} />
          <span className="text-sm">{coursesNumber}+ courses</span>
        </div>
      </div>
      <div className="bg-white flex justify-center items-center mt-10">
        <button className="bg-green-500 py-1 px-3 rounded-full border-2 text-white transition-transform duration-300 ease-in-out  text-xl font-semibold shadow-lg hover:scale-110">
          Explore
        </button>
      </div>
    </div>
  );
};

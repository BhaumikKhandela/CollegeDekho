import React, { useState, useEffect } from "react";
import { dummyData } from "../assets/data";
import { IoLocationOutline } from "react-icons/io5";
import { LuDot } from "react-icons/lu";

export const SliderBox = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(1);

  const slideCount = dummyData.length;

  // Handle sliding to the next item
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + slidesToShow >= slideCount ? 0 : prevIndex + slidesToShow
    );
  };

  // Handle sliding to the previous item
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - slidesToShow < 0
        ? slideCount - slidesToShow
        : prevIndex - slidesToShow
    );
  };

  // Dynamically adjust number of slides to show based on screen size
  const updateSlidesToShow = () => {
    const width = window.innerWidth;
    if (width >= 1024) {
      setSlidesToShow(3); // 3 slides on large screens
    } else if (width >= 768) {
      setSlidesToShow(2); // 2 slides on medium screens
    } else {
      setSlidesToShow(1); // 1 slide on small screens
    }
  };

  useEffect(() => {
    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, [slidesToShow]);

  const getSlideStyles = () => ({
    transform: `translateX(-${(currentIndex * 100) / slidesToShow}%)`,
    transition: "transform 0.5s ease-in-out",
    width: `${(100 * dummyData.length) / slidesToShow}%`,
  });

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex justify-between items-center">
        {/* Previous Button */}
        <button
          className="absolute left-0 bg-white p-2 rounded-full shadow-md z-10"
          onClick={prevSlide}
        >
          &#8592;
        </button>

        {/* Slider Container */}
        <div className="w-full overflow-hidden">
          <div className="flex" style={getSlideStyles()}>
            {dummyData.map((d, index) => (
              <div
                key={index}
                className="bg-white border-2 rounded-lg p-5 shadow-md transition-transform"
                style={{
                  width: `${100 / slidesToShow}%`, // Each slide takes a percentage of the total width
                }}
              >
                <div className="border-b-2 pb-2">
                  <div className="flex justify-between">
                    <h2 className="font-extrabold text-start text-sm lg:text-2xl">
                      {d.name}
                    </h2>
                    <div className="w-14 h-10 rounded-lg bg-white border-2"></div>
                  </div>
                  <div className="flex gap-1 mt-2 text-sm mb-2">
                    <IoLocationOutline className="mt-0.5" />
                    <span>{d.location}</span>
                    <span>
                      <LuDot className="text-gray-500" size={20} />
                    </span>
                    <span>
                      #{d.rank} {d.basedOn}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between text-gray-500 text-sm mt-10">
                  <div>
                    <h2 className="text-lg">Courses offered</h2>
                    <span className="text-blue-500">
                      {d.coursesOffered} courses
                    </span>
                  </div>
                  <div>
                    <h2 className="text-lg">Fee Range</h2>
                    <span className="text-black">{d.FeeRange}</span>
                  </div>
                </div>
                <div className="flex justify-center mt-20 mb-5">
                  <button className="text-white bg-green-500 p-3 font-bold rounded-full border-2 shadow-xl hover:scale-110 transition-transform duration-300 ease-in-out transform">
                    Explore more
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button
          className="absolute right-0 bg-white p-2 rounded-full shadow-md z-10"
          onClick={nextSlide}
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

import Image from "../assets/Image.jpeg";
import { LuChevronFirst } from "react-icons/lu";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUserDoctor } from "react-icons/fa6";
import {
  MdEmail,
  MdOutlineEngineering,
  MdOutlineFormatColorText,
} from "react-icons/md";
import { HiOutlinePresentationChartBar } from "react-icons/hi";
import { GoHomeFill } from "react-icons/go";
import { useRecoilState, useRecoilValue } from "recoil";
import { expansion } from "../atom";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ImNewspaper } from "react-icons/im";
import { FaRegUserCircle } from "react-icons/fa";

interface SideBarItemsProps {
  name: string;
  icon: React.ReactNode;
  active: boolean;
}

const SideBarItemsComponent = ({ name, icon, active }: SideBarItemsProps) => {
  const expanded = useRecoilValue(expansion);
  const [hovered, setHovered] = useState(false);

  return (
    <li
      className={`relative flex items-center py-2 px-3 my-10 mx-2 font-medium rounded-md cursor-pointer transition-colors ${
        active
          ? "bg-gradient-to-tr from-green-200 to-green-100 text-teal-700"
          : "hover:bg-green-100 text-gray-600"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className={`flex items-center justify-center transition-transform transform hover:scale-125 hover:text-green-500 ${
          expanded ? "mr-3" : ""
        }`}
      >
        {icon}
      </span>
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "ml-3" : "w-0 opacity-0"
        }`}
      >
        {name}
      </span>
      {/* Tooltip dialog box */}
      {!expanded && hovered && (
        <div className="absolute left-full ml-2 bg-white border border-gray-300 shadow-lg p-2 rounded-md whitespace-nowrap">
          {name}
        </div>
      )}
    </li>
  );
};

const SideBarItems = React.memo(SideBarItemsComponent);

export default SideBarItems;

export const TopBar = () => {
  const [expanded, setExpanded] = useRecoilState(expansion);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside
      className={`transition-all duration-500 ease-in-out ${
        expanded
          ? "fixed top-0 left-0 bg-white h-full border-r-2 border-spacing-2 z-30 w-[200px] sm:w-[250px] md:w-[265px]"
          : "w-16 h-full border-r-2"
      }`}
    >
      <nav className="h-full">
        <div className="flex flex-row border-b-2 items-center">
          <Link to="/homepage">
            <div className="h-[90px] ml-1 transition-all duration-500 ease-in-out">
              <img
                src={Image}
                alt="NTS Education"
                className={`overflow-hidden transition-all ${
                  expanded ? "w-48 sm:w-56 md:w-64 mt-1" : "w-0"
                }`}
              />
            </div>
          </Link>

          <button
            onClick={() => {
              setExpanded((c) => !c);
            }}
            className="group bg-slate-50 flex items-center mb-1 p-3 mr-2 ml-1 hover:bg-green-50 rounded-md shadow-sm transition-all duration-300 ease-in-out"
          >
            {expanded ? (
              <LuChevronFirst className="group-hover:text-green-500 text-xl font-extrabold" />
            ) : (
              <RxHamburgerMenu className="text-xl font-extrabold" />
            )}
          </button>
        </div>
        <ul>
          <Link to="/homepage">
            <SideBarItems
              name="Home"
              icon={<GoHomeFill />}
              active={isActive("/homepage")}
            />
          </Link>
          <Link to="/about-us">
            <SideBarItems
              name="About"
              icon={<MdOutlineFormatColorText />}
              active={isActive("/about-us")}
            />
          </Link>
          <Link to="/colleges/Medical">
            <SideBarItems
              name="Medical"
              icon={<FaUserDoctor />}
              active={isActive("/colleges/Medical")}
            />
          </Link>
          <Link to="/colleges/Engineering">
            <SideBarItems
              name="Engineering"
              icon={<MdOutlineEngineering />}
              active={isActive("/colleges/Engineering")}
            />
          </Link>
          <Link to="/colleges/MBA">
            <SideBarItems
              name="Management"
              icon={<HiOutlinePresentationChartBar />}
              active={isActive("/colleges/MBA")}
            />
          </Link>
          <Link to="/colleges/articles">
            <SideBarItems
              name="Articles"
              icon={<ImNewspaper />}
              active={isActive("/colleges/articles")}
            />
          </Link>
          <Link to="/contact-us">
            <SideBarItems name="Contact" icon={<MdEmail />} active={false} />
          </Link>
          <Link to="/sign-in">
            <SideBarItems
              name="User"
              icon={<FaRegUserCircle />}
              active={false}
            />
          </Link>
        </ul>
      </nav>
    </aside>
  );
};

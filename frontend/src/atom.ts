import { atom } from "recoil";
interface Data {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  city: { value: string; label: string } | null;
  state: { value: string; label: string } | null;
  interestedIn: string;
  email: string;
  mobileNumber: string;
}
export const formDataState = atom<Data>({
  key: "formDataState",
  default: {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    city: null,
    state: null,
    interestedIn: "",
    email: "",
    mobileNumber: "",
  },
});

export const visibility = atom({
  key: "visible",
  default: false,
});

export const loginDetails = atom({
  key: "loginDetails",
  default: {
    username: "",
    password: "",
  },
});

export const expansion = atom({
  key: "expand",
  default: false,
});

export const dataArray = atom({
  key: "dataArray",
  default: [],
});

export const adminSideBarExpansion = atom({
  key: "AdminSideBar",
  default: false,
});

export const collegeCreated = atom({
  key: "collegecreated",
  default: false,
});

export const fieldSelected = atom({
  key: "fieldSelected",
  default: "1",
});

export const newCollege = atom({
  key: "newCollege",
  default: {
    name: "",
    location: "",
    founded: "",
    description: "",
    requirement: [""],
    faqs: [{ question: "", answer: "" }],
    basedOn: "",
    rank: "",
    metatitle: "",
    metadescription: "",
    metakeywords: "",
    metablogURL: "",
  },
});

export const Courses = atom({
  key: "courses",
  default: [
    {
      name: "",
      duration: "",
      seats: "",
      cutoff: "",
      fees: "",
      placement: [
        {
          year: "",
          averagePackage: "",
          medianPackage: "",
          heighestPackage: "",
        },
      ],
      admission: [""],
    },
  ],
});

export const collegeId = atom({
  key: "collegeId",
  default: 1,
});

export const Searching = atom({
  key: "searching",
  default: [
    {
      id: -1,
      name: "",
      type: "",
      title: undefined,
      field: { id: -1, name: "" },
    },
  ],
});

export const typed = atom({
  key: "typed",
  default: [{ id: -1, name: undefined, type: "", title: undefined }],
});

export const fieldName = atom({
  key: "fieldName",
  default: "",
});

export const selectedIcons = atom({
  key: "selectedIcons",
  default: {
    home: false,
  },
});

export const blogSearch = atom({
  key: "blogSearched",
  default: false,
});

export const collegeSelected = atom({
  key: "collegeSelected",
  default: -1,
});

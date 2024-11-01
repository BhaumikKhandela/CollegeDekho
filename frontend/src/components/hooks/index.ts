import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
export const useCollegeHook = ({
  id,
  field,
  collegeName,
}: {
  id: number;
  field: string;
  collegeName: string;
}) => {
  const [loading, setLoading] = useState(true);
  const [college, setCollege] = useState<CollegeData>({
    id: 0,
    name: "",
    location: "",
    description: "",
    ownership: "",
    founded: "",
    logo: "",
    collegeWebsiteLink: "",
    image: [""],
    fieldId: 0,
    metatitle: "",
    metadescription: "",
    metakeywords: "",
    metablogURL: "",
    field: {
      id: 0,
      name: "",
    },
    courses: [
      {
        name: "",
        duration: "",
        fees: "",
        seats: 0,
        cutoff: 0,
        placement: [
          {
            year: "",
            averagePackage: "",
            medianPackage: "",
            highestPackage: "",
          },
        ],
        admission: [{ id: 0, requirement: [""] }],
      },
    ],
    ranking: [{ Rank: "", basedOn: "" }],
    admission: [
      {
        requirement: [""],
      },
    ],
    hostelFess: [
      {
        type: "",
        amount: "",
      },
    ],
    faqs: [{ question: "", answer: "" }],
  });
  const navigate = useNavigate();
  const nameOfCollege = collegeName.toLowerCase().replace(/-/g, " ");

  useEffect(() => {
    const collegeData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8787/api/v1/blog/college-blog/${field}/${nameOfCollege}/${id}`,
          {
            headers: {
              authorization: localStorage.getItem("token") || "",
            },
          }
        );

        if (response.data.msg === "blog does not exist") {
          alert("The blog you are trying to access does not exist");
          navigate("/homepage");
        } else if (response.data.data[0].colleges.length === 0) {
          alert("An error occurred while fetching the blog");
          navigate("/homepage");
        } else if (response.data.data[0].colleges.length != 0) {
          setCollege(response.data.data[0].colleges[0]);
          console.log(response.data.data[0].colleges[0]);
          setLoading(false);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        alert("An error occurred while fetching the blog");
        navigate("/homepage");
      }
    };

    collegeData();
  }, [id, collegeName, field]);

  return { loading, college };
};

interface MetaTags {
  title: string;
  description: string;
  keywords?: string;
  robots?: string;
  canonicalURL?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogAltImageText?: string;
  ogURL?: string;
  ogType?: string;
  ogLocale?: string;
  ogSiteName?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterImageAltText?: string;
  twitterSite?: string;
  twitterCreator?: string;
  pinterestImage?: string;
  pinterestImageAltText?: string;
  pinterestDescription?: string;
}

export const useMetaTags = ({ page }: { page: string }) => {
  const [tags, setTags] = useState<MetaTags>({
    title: "Default Title", // Default value
    description: "Default description", // Default value
    keywords: "", // Default value
    robots: "index, follow", // Default value
    canonicalURL: window.location.href, // Use current URL as default
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    ogAltImageText: "",
    ogURL: "",
    ogType: "",
    ogLocale: "",
    ogSiteName: "",
    twitterCard: "",
    twitterTitle: "",
    twitterDescription: "",
    twitterImage: "",
    twitterImageAltText: "",
    twitterSite: "",
    twitterCreator: "",
    pinterestImage: "",
    pinterestImageAltText: "",
    pinterestDescription: "",
  });

  useEffect(() => {
    const fetchMetaTags = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8787/api/v1/seo/pages/tags",
          {
            params: {
              page: page,
            },
          }
        );
        if (response.data.Tags) {
          setTags(response.data.Tags);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMetaTags();
  }, []);

  return tags;
};

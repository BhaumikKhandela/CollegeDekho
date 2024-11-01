import { useEffect, useState } from "react";
import { MapResult, SearchBar } from "../components/SearchBar";
import { TopBar } from "../components/TopBar";
import axios from "axios";
import { NewspaperIcon } from "@heroicons/react/16/solid";
import { ArticleCard, ArticleCardSkeleton } from "../components/ArticleCard";
import { useNavigate } from "react-router-dom";

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
interface Blog {
  id: number;
  title: string;
  image: string[];
  author: string;
  metatitle: string;
  metadescription: string;
  metakeywords: string;
  blogURL: string;
  htmlContent: string;
  published: boolean;
  created: string;
  updatedAt: string;
}
export const ArticlesList = () => {
  const [value, setValue] = useState("");
  const [result, setResult] = useState([
    { id: -1, name: undefined, type: "", title: undefined },
  ]);
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
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

        setResult(searchedArray);
      } catch (error) {
        console.error(error);
        setResult([]);
      }
    };

    const debounce = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => {
      clearTimeout(debounce);
    };
  }, [value]);

  useEffect(() => {
    try {
      setLoading(true);
      const fetchArticles = async () => {
        const response = await axios.get(
          `http://localhost:8787/api/v1/blog/pagination/articles`,
          {
            params: {
              page: page,
              limit: 4,
            },
            headers: {
              authorization: localStorage.getItem("token"),
            },
          }
        );
        console.log("here is the length of articles " + articles.length);
        if (Array.isArray(response.data.data)) {
          setArticles((prevData) => [...prevData, ...response.data.data]);

          setLoading(false);
        }
      };

      fetchArticles();
    } catch (error) {
      console.error("An error occurred while fetching articles", error);
      setArticles([]);
    }
  }, [page]);

  return (
    <div className="flex">
      <div className="min-w-16 bg-white h-screen">
        <div className="fixed top-0 left-0 h-full z-50">
          <TopBar />
        </div>
      </div>

      <div className="flex-1 bg-amber-50">
        <SearchBar handleOnChange={handleOnChange} value={value} />
        <div>
          <div className="text-center my-10">
            <h1 className="text-4xl font-extrabold">Articles</h1>
          </div>
          <div className="p-5 my-4 mx-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {articles.map((d, index) => (
                <ArticleCard
                  identifier={index}
                  title={d.title}
                  author={d.author}
                  blogURL={d.blogURL}
                  id={d.id}
                />
              ))}
            </div>
            {loading && <Loading />}
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setPage((c) => c + 1);
                }}
                className="bg-green-400 text-white rounded-full font-bold p-3"
              >
                Load More
              </button>
            </div>
          </div>
        </div>
      </div>
      {value && <MapResult />}
    </div>
  );
};

const Loading = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <ArticleCardSkeleton />
      <ArticleCardSkeleton />
      <ArticleCardSkeleton />
      <ArticleCardSkeleton />
      <ArticleCardSkeleton />
      <ArticleCardSkeleton />
      <ArticleCardSkeleton />
      <ArticleCardSkeleton />
      <ArticleCardSkeleton />
      <ArticleCardSkeleton />
      <ArticleCardSkeleton />
      <ArticleCardSkeleton />
    </div>
  );
};

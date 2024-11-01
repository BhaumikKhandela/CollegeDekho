import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { AuthorAvatar } from "../components/AuthorAvatar";
import { TopBar } from "../components/TopBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Footer } from "../components/Footer";
interface Article {
  id: number;
  title: string;
  author: string;
  image: string[];
  metatitle: string;
  metadescription: string;
  metakeywords: string;
  blogURL: string;
  htmlContent: string;
  published: string;
  created: string;
  updatedAt: string;
}

interface Articles {
  id: number;
  title: string;
  blogURL: string;
}
export const Article = () => {
  const { id } = useParams();

  const [article, setArticle] = useState<Article | null>(null); //current article
  const [articles, setArticles] = useState<Articles[]>([]); //links to other articles
  useEffect(() => {
    const fetchArtcile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8787/api/v1/blog/article/${id}`
        );

        setArticle(response.data.blog);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8787/api/v1/blog/random/articles"
        );

        if (Array.isArray(response.data.blogs) && response.data.blogs != 0) {
          setArticles(response.data.blogs);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchArtcile();
    fetchArticles();
  }, []);
  const htmlContent = `
   <article class="prose lg:prose-lg mx-auto">
  <header class="animate-pulse">
    <div class="h-8 bg-gray-300 rounded mb-2"></div>
    <div class="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
  </header>
  
  <figure class="animate-pulse">
    <div class="h-40 bg-gray-300 rounded mb-2"></div>
    <div class="h-4 bg-gray-300 rounded w-1/2"></div>
  </figure>

  <section class="animate-pulse">
    <div class="h-4 bg-gray-300 rounded mb-2"></div>
    <div class="h-4 bg-gray-300 rounded mb-2"></div>
    <div class="h-4 bg-gray-300 rounded mb-2"></div>
  </section>

  <section class="animate-pulse">
    <div class="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
    <div class="h-4 bg-gray-300 rounded mb-2"></div>
    <blockquote class="h-16 bg-gray-300 rounded mb-2"></blockquote>
    <div class="h-4 bg-gray-300 rounded mb-2"></div>
  </section>

  <section class="animate-pulse">
    <div class="h-4 bg-gray-300 rounded mb-2"></div>
    <div class="h-4 bg-gray-300 rounded mb-2"></div>
  </section>

  <section class="animate-pulse">
    <div class="h-4 bg-gray-300 rounded mb-2"></div>
    <div class="h-4 bg-gray-300 rounded mb-2"></div>
  </section>

  <footer class="animate-pulse">
    <div class="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
    <div class="h-4 bg-gray-300 rounded mb-2"></div>
  </footer>
</article>
`;

  return (
    <div className="flex">
      <div className="min-w-16 bg-white h-screen">
        <div className="fixed top-0 left-0 h-full z-50">
          <TopBar />
        </div>
      </div>
      <div className="flex-1  bg-amber-50">
        <div>
          <div className="m-5">
            <AuthorAvatar name={article ? article.author : ""} />
          </div>
          <div className="md:flex justify-between">
            <div className="  shadow-2xl  md:ml-2  m-2 bg-white md:w-3/4">
              <h1 className="font-extrabold text-center text-blue-500 text-4xl m-5 mb-20">
                {article ? <span>{article.title}</span> : "Title of the Blog"}
              </h1>
              <div
                dangerouslySetInnerHTML={{
                  __html: article ? article.htmlContent : htmlContent,
                }}
                className="m-5"
              />
            </div>
            <div className="md:w-1/4 border-2 bg-white shadow-lg m-2">
              <h1 className="text-center text-xl font-bold text-blue-500 m-2 border-b-2 pb-3">
                Some other articles
              </h1>

              <ul className="">
                {articles.map((d) => (
                  <a
                    href={`/blogs/${d.blogURL}/${d.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <li id={d.id.toString()} className="my-5 p-2 flex">
                      <MdOutlineKeyboardArrowRight
                        size={20}
                        className="mt-0.5 flex-shrink-0"
                      />{" "}
                      <span>{d.title}</span>
                    </li>
                  </a>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

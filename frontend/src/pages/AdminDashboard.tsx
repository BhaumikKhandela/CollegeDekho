import { useEffect, useState } from "react"
import { AdminSideBar } from "../components/AdminSideBar"
import axios from "axios";
import { BsFillCameraFill } from "react-icons/bs";
import { Pagination } from "../components/Pagination";
import { useRecoilState } from "recoil";
import { blogSearch } from "../atom";
interface Blog{
    id: number
    title: string,
    created: string,
    author: string,
    published: boolean
}
interface RecentBlog{
    
        id: number,
        title: string,
        author: string,
        metatitle: string,
        metadescription: string,
        metakeywords: string,
        blogURL: string,
        htmlContent: string,
        published: boolean,
        created: string,
        updatedAt: string
      
}
interface SearchResult{
    id: number,
    title: string
}
export const AdminDashboard = () => {
    const [posts,setPosts] = useState<Blog[]>([{
        "id": 1,
        "title": "The Future of Technology",
        "author": "Jane Doe",
        "published": true,
        "created": "2024-08-10T12:34:56.789Z"
    },
    {
        "id": 2,
        "title": "Understanding Artificial Intelligence",
        "author": "John Smith",
        "published": true,
        "created": "2024-08-10T12:34:56.789Z"
    },
    {
        "id": 3,
        "title": "The Rise of Quantum Computing",
        "author": "Alice Johnson",
        "published": true,
        "created": "2024-08-11T14:22:13.456Z"
    },
    {
        "id": 4,
        "title": "Exploring Machine Learning",
        "author": "Robert Brown",
        "published": true,
        "created": "2024-08-12T16:45:29.123Z"
    },
    {
        "id": 5,
        "title": "Blockchain Beyond Bitcoin",
        "author": "Emily Davis",
        "published": true,
        "created": "2024-08-13T09:30:00.000Z"
    },
    {
        "id": 6,
        "title": "The Impact of 5G Technology",
        "author": "Michael Lee",
        "published": true,
        "created": "2024-08-14T11:15:45.678Z"
    },
    {
        "id": 7,
        "title": "Cybersecurity Trends for 2024",
        "author": "Sarah Wilson",
        "published": true,
        "created": "2024-08-15T13:25:12.345Z"
    },
    {
        "id": 8,
        "title": "Future of Augmented Reality",
        "author": "David Harris",
        "published": true,
        "created": "2024-08-16T15:40:33.789Z"
    },
    {
        "id": 9,
        "title": "Advances in Natural Language Processing",
        "author": "Laura Martinez",
        "published": true,
        "created": "2024-08-17T17:55:22.456Z"
    },
    {
        "id": 10,
        "title": "Understanding the Internet of Things",
        "author": "James Walker",
        "published": true,
        "created": "2024-08-18T19:10:11.123Z"
    }
      ]);
    const [blogsLoading,setBlogsLoading] = useState(true);
    const [recentBlogsLoading,setRecentBlogsLoading] = useState(true);
    const [currentPage,setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(10);
    const [searchedPost,setSearchPost] = useState("");
    const [searching,setSearching] = useRecoilState(blogSearch);
    const [postsSearched,setPostsSearched] = useState([]);
    const [searchedWord, setSearchedWord] = useState("");
    const [recentBlogs,setRecentBlogs] = useState([
        {
          "id": 1,
          "title": "The Future of Technology",
          "author": "Jane Doe",
          "metatitle": "The Future of Technology | Tech Insights",
          "metadescription": "Explore the latest trends and predictions in technology.",
          "metakeywords": "technology, future, trends",
          "blogURL": "the-future-of-technology",
          "htmlContent": "<p>This is a detailed blog post about the future of technology...</p>",
          "published": true,
          "created": "2024-08-10T12:34:56.789Z",
          "updatedAt": "2024-08-10T12:34:56.789Z"
        },
        {
          "id": 2,
          "title": "Understanding Artificial Intelligence",
          "author": "John Smith",
          "metatitle": "Understanding Artificial Intelligence | AI Explained",
          "metadescription": "A comprehensive guide to understanding AI and its applications.",
          "metakeywords": "AI, artificial intelligence, guide",
          "blogURL": "understanding-artificial-intelligence",
          "htmlContent": "<p>Artificial Intelligence is transforming various industries...</p>",
          "published": true,
          "created": "2024-08-09T10:15:30.123Z",
          "updatedAt": "2024-08-09T10:15:30.123Z"
        },
        {
          "id": 3,
          "title": "How to Build a Modern Web Application",
          "author": "Alice Johnson",
          "metatitle": "How to Build a Modern Web Application | Development Tips",
          "metadescription": "Step-by-step guide on building a modern web application from scratch.",
          "metakeywords": "web application, development, guide",
          "blogURL": "how-to-build-a-modern-web-application",
          "htmlContent": "<p>Building a modern web application involves several key steps...</p>",
          "published": true,
          "created": "2024-08-08T08:45:12.456Z",
          "updatedAt": "2024-08-08T08:45:12.456Z"
        },
        {
          "id": 4,
          "title": "Best Practices for Effective SEO",
          "author": "Emily Davis",
          "metatitle": "Best Practices for Effective SEO | SEO Tips",
          "metadescription": "Learn the best practices for optimizing your website for search engines.",
          "metakeywords": "SEO, search engine optimization, best practices",
          "blogURL": "best-practices-for-effective-seo",
          "htmlContent": "<p>Effective SEO is crucial for improving your website's visibility...</p>",
          "published": true,
          "created": "2024-08-07T14:22:01.789Z",
          "updatedAt": "2024-08-07T14:22:01.789Z"
        },
        {
          "id": 5,
          "title": "Top 10 Tips for Successful Remote Work",
          "author": "Michael Brown",
          "metatitle": "Top 10 Tips for Successful Remote Work | Work from Home",
          "metadescription": "Discover the top tips for thriving in a remote work environment.",
          "metakeywords": "remote work, work from home, tips",
          "blogURL": "top-10-tips-for-successful-remote-work",
          "htmlContent": "<p>Remote work can be challenging; here are some tips to succeed...</p>",
          "published": true,
          "created": "2024-08-06T11:30:45.234Z",
          "updatedAt": "2024-08-06T11:30:45.234Z"
        }
     ]);
     useEffect(()=>{
        try{
            const searchedPostResult = async() => {
                const response = await axios.get(`http://localhost:3000/api/v1/blog/Admin/search/${searchedPost}`,{
                    headers:{
                        'authorization': localStorage.getItem('token')
                    }
                });
                if(Array.isArray(response.data)){
                    setPosts(response.data);
                }else{
                    setPosts([]);
                }

            }
            searchedPostResult();
        } catch(error){
            console.error(error);
            setPosts([]);
        }
     },[searchedPost]);

     useEffect(()=>{
        try{
            const searchingPosts = async() => {
                const response = await axios.get(`http://localhost:3000/api/v1/blog/Admin/normal-search/${searchedWord}`,{
                    headers:{
                        'authorization' : localStorage.getItem('token')
                    }
                });

                if(Array.isArray(response.data.blogs)){
                    setPostsSearched(response.data.blog.slice(0,6));
                }else{
                     setPostsSearched([]);
                }
            }
            
            searchingPosts();

        }catch(error){
            console.error(error);
            setPostsSearched([]);
        }
     },[searchedWord]);

    useEffect(()=>{
    try{
        const fetchRecentBlogs = async() => {
            const response = await axios.get('http://localhost:3000/api/v1/blog/Admin/latest-blogs',{
                headers:{
                    'authorization': localStorage.getItem('token')
                }
            });
            if(Array.isArray(response.data.LatestBlogs)){
                setRecentBlogsLoading(false);
                setRecentBlogs(response.data.LatestBlogs);
            } else{
                setRecentBlogs([]);
            }
           
        }
        fetchRecentBlogs();
    }catch(error){
        console.error(error);
        setRecentBlogs([]);
    }
    },[]);
    
    
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = posts.slice(indexOfFirstPost,indexOfLastPost);

    const handleOnChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setSearchPost(e.target.value);
    }
    const handleOnChangeTopSearchBar = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedWord(e.target.value);
    }
    return( 
        <div className="flex">
         <AdminSideBar />
         <div className="flex-1 bg-gray-50">
            <div className="w-full  flex justify-end p-2 mr-5">
                <input type="text"  placeholder="Search blog posts..." value={searchedWord} onChange={handleOnChangeTopSearchBar} className="py-2 px-1 rounded-md pl-8 sm:w-1/4 border-2"></input>
            </div>
            <div className=" mx-5 border-2 my-20  p-4 shadow-2xl rounded-md bg-white">
                <div className="sm:flex justify-between">
                <h1 className="font-extrabold text-3xl my-10 ml-5">Recent Blog Posts</h1>
                <h2 className="font-extrabold text-xl underline ml-5 my-10 sm:mr-5 ">View all</h2>
                </div>
                
                <RecentBlogsPosts recentBlogs={recentBlogs} loading={recentBlogsLoading} />
             
            </div>
            <div className=" mx-5 border-2 my-20  p-4 shadow-2xl rounded-md bg-white">
                <h1 className="font-extrabold text-3xl my-10 ml-5 sm:text-4xl">Blog Posts</h1>
                <div className="sm:flex sm:justify-end flex justify-center my-5">
                    <input type="text" placeholder="Search blogs by title" value={searchedPost} onChange={handleOnChange} className="py-2 px-1 rounded-md border-2 pl-8 sm:w-1/4"></input>
                </div>
                <BlogPosts posts={posts} loading={blogsLoading}/>
                <Pagination totalPosts={posts.length} postsPerPage={postPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} type={"admin"}/>

                <div>

                </div>
            </div>
         </div>
        </div>
    )
}

const RecentBlogsPosts = ({recentBlogs, loading}:{recentBlogs: RecentBlog[], loading: boolean}) => {
     if(loading){
        return(
            <ul>
            <RecentBlogLoader/>
            <RecentBlogLoader/>
            <RecentBlogLoader/>
            <RecentBlogLoader/>
            <RecentBlogLoader/>
            <RecentBlogLoader/>
            <RecentBlogLoader/>
            <RecentBlogLoader/>
            <RecentBlogLoader/>
            <RecentBlogLoader/>
            <RecentBlogLoader/>
            <RecentBlogLoader/>
            
            </ul>
        )
     }
    return (
        <div>
        {recentBlogs.map((d)=>(
            <div key={d.id} className="sm:flex my-4  p-1 mx-2">
                <div className="bg-pink-200 flex justify-center items-center mx-1 h-32 w-auto sm:w-32 sm:h-32 rounded-lg">
                    <div className=" text-white text-xl p-2 m-0.5">
                    <BsFillCameraFill />
                    </div>
                </div>
                <div className="sm:ml-5">
                    <h1 className="font-extrabold my-0.5 sm:text-lg">{d.title}</h1>
                    <span className="text-gray-400">Published on {d.created.split('T')[0]}</span><br></br>
                    <div className="sm:mt-9 text-gray-400">Author: <span className="text-black font-semibold">{d.author}</span></div>
                    
                </div>
            </div>
        ))}
        </div>
    )
}

const BlogPosts = ({posts,loading}: {posts: Blog[], loading: boolean}) => {
    if(loading){
    return (
        <ul>
       <Loader/>
       <Loader/>
       <Loader/>
       <Loader/>
       <Loader/>
       <Loader/>
       <Loader/>
       <Loader/>
       <Loader/>
       <Loader/>
       
        </ul>
    )
    }
    return(
<div className="mt-10">
                {posts.map((d)=>(
                    <div key={d.id} className="sm:flex my-8  p-1 mx-2 border-b-2">
                        <div className="sm:ml-5">
                            <h1 className="font-extrabold my-0.5  text-lg sm:text-4xl">{d.title}</h1>
                            <span className="text-gray-400">created on {d.created.split('T')[0]}</span><br></br>
                            <div className="sm:mt-9 text-gray-400">Author: <span className="text-black font-semibold">{d.author}</span></div>
                            <div className="text-gray-400 my-4">
                                status {d.published ? <span className="font-bold border-2 text-black px-2 py-1 rounded-full">published</span> : <span>Draft</span>}
                            </div>
                            <div className="flex gap-4 mt-5 mb-2 ">
                             change status: <div className="bg-black rounded-full text-white flex justify-center px-2"><button>{d.published ? "Remove" : "Publish"}</button></div>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
    )
}
const RecentBlogLoader = () => {
    return (
        <li>
        <div className="sm:flex my-4  p-1 mx-2">
            <div className="bg-pink-200 flex justify-center items-center mx-1 h-32 w-auto sm:w-32 sm:h-32 rounded-lg animate-pulse">
                <div className=" text-white text-xl p-2 m-0.5">
                <BsFillCameraFill />
                </div>
            </div>
            <div className="sm:ml-5">
                <h1 className="font-extrabold my-0.5 sm:text-lg animate-pulse rounded-full bg-gray-200 text-gray-200">Title of the Blog</h1>
                <span className=" animate pulse bg-gray-200 rounded-full text-gray-200">Published on Soem random date</span><br></br>
                <div className="sm:mt-9 animate-pulse rounded-full bg-gray-200 text-gray-200">Author: <span className="font-semibold rounded-full bg-gray-200 text-gray-200">Some person</span></div>
                
            </div>
        </div>
        </li>
    )
}
const Loader = () => {
    return (
        <li>
        <div  className="sm:flex my-8  p-1 mx-2 border-b-2">
                        <div className="sm:ml-5">
                            <h1 className="font-extrabold my-0.5  text-lg sm:text-4xl bg-gray-200 rounded-full text-gray-200 animate-pulse">The Future of Technology</h1>
                            <span className=" bg-gray-200 rounded-full text-gray-200 animate-pulse">created on 2024-08-12</span><br></br>
                            <div className="sm:mt-9  bg-gray-200 rounded-full text-gray-200 animate-pulse">Author: <span className=" bg-gray-200 rounded-full text-gray-200 animate-pulse">Robert Brown</span></div>
                            <div className="my-4  bg-gray-200 rounded-full text-gray-200 animate-pulse">
                                status: Unknown
                            </div>
                            <div className="flex gap-4 mt-5 mb-2  bg-gray-200 rounded-full text-gray-200 animate-pulse ">
                             change status: <div className="  bg-gray-200  text-gray-200 animate-pulse rounded-full  flex justify-center px-2"><button> "Publish"</button></div>
                            </div>
                        </div>
                    </div>     
        </li>
    )
}

const SearchingResult = () => {
    return (
        <div>

        </div>
    )
}

const searchedResult = ({searchResult}:{searchResult: SearchResult[]}) => {
    return (
        <div className="fixed">
        {searchResult.map((d,index)=>(
            <div key={index}>
              {d.title}
            </div>
        ))}
        </div>
    )
}
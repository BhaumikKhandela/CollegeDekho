
import { TbPhoto } from "react-icons/tb"
import { useNavigate } from "react-router-dom"
import { AuthorAvatar } from "./AuthorAvatar";

export const ArticleCard = ({id,identifier,title,author,blogURL}: {identifier:number,title:string,author:string,blogURL:string,id: number}) => {
    const navigate = useNavigate();
    const handleOnClick = ()=>{
     navigate(`/blogs/${blogURL}/${id}`);
    }

    return(
        <div onClick={handleOnClick} key={identifier} className="hover:cursor-pointer my-5 shadow-2xl  hover:scale-105 transform transition-transform duration-300 ease-in-out">
            <div className="bg-pink-200 flex justify-center items-center  h-72 w-auto">
            <TbPhoto className="text-white"/>
            </div>
            <div className="bg-white   border-black border-b-2 p-5 ">
            <h1 className="font-bold text-xl">{title}</h1>
            <div className="mt-2 ">
             <AuthorAvatar name={author} />
            </div>
            
            
            </div>
        </div>
    )
}

export const ArticleCardSkeleton = () => {
    return (
        <div className="animate-pulse">
            <div className="hover:cursor-pointer my-5 shadow-md rounded-b-lg">
            <div className="bg-pink-200 flex justify-center items-center rounded-lg h-72 w-auto">
            <TbPhoto className="text-white"/>
            </div>
            <div className="bg-gray-200  rounded-b-lg border-black border-b-2 p-5 ">
            <h1 className="font-bold text-xl bg-gray-400 text-gray-400 rounded-full">This is an article.</h1>
            
            </div>
        </div>
        </div>
    )
}
import { IoCaretBackSharp, IoCaretForwardSharp } from "react-icons/io5";

export const Pagination = ({totalPosts,postsPerPage,currentPage,setCurrentPage,type}: any)=>{
const prevThreeArr = Array.from({length: 3}, (_,index)=> currentPage - 1 -index).filter((value) => value>0).reverse();
console.log(prevThreeArr);
const nextThreeArr = Array.from({length: 3}, (_,index) => currentPage + index).filter((value) => value <= Math.ceil(totalPosts/postsPerPage));
// console.log(nextThreeArr);
const newArr = [...prevThreeArr,...nextThreeArr];



    return(
        <div className=" w-full flex justify-center gap-5 mt-20">
            <button onClick={()=>{
                if(currentPage != 1){
                    setCurrentPage(currentPage - 1); 
                
                }
                else{
                    setCurrentPage(1);
            
                }
                }} className=" flex items-center  rounded-md text-lg gap-2">{<IoCaretBackSharp />}Previous</button>
            <div className="">
            {newArr.map((d,index)=>(
               <button className={`border-2 rounded-md text-sm sm:text-lg font-extrabold px-1 py-0.5 sm:px-3 sm:py-1 mx-0.5 sm:mx-2  ${d === currentPage ? "bg-black text-white" : "bg-white"}`} key={index} onClick={()=>{setCurrentPage(d)}}>
                 {d}
               </button>
            ))}
            </div>
            <button  onClick={()=>{
                if(currentPage != Math.ceil(totalPosts/postsPerPage)){
                    setCurrentPage(currentPage + 1);
                }else{
                    setCurrentPage(Math.ceil(totalPosts/postsPerPage));
                }
            }} className="flex items-center  rounded-md text-lg gap-2">Next{<IoCaretForwardSharp />}</button>
  
        </div>
    )
}
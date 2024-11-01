import { useRecoilState } from "recoil";
import { Searching } from "../atom";
import { Link } from "react-router-dom";
interface SearchBarComponents{
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    value: string
}
export const SearchBar = ({handleOnChange,value}:SearchBarComponents) => {
    return (
        <div className="ml-1 realtive flex justify-end mr-2">
        
            <input onChange={handleOnChange} type="text" value = {value} placeholder="Search Courses, Colleges or Exams" className="my-2 mr-3  w-full p-2 pl-7 py-3 rounded-full focus:outline-green-300 border shadow-md"/>
            
            <div className="relative">
                <button className="absolute right-0 top-0 text-white bg-green-500 rounded-full px-4  py-3  my-2">Search</button>
                </div>
            
            
        </div>
        
    )
}

export const MapResult = () => {
    const [result,setResult] = useRecoilState(Searching);
  console.log(result);
  return (
    <div className="fixed bg-white top-16 right-8 left-20 z-50  border-2  gap-5 flex-row h-1/3 overflow-y-scroll rounded-md">
    {result.map((d) => {

       if(d.type === "courses"){
        return <div className="flex justify-between border-b-2 my-2 bg-white p-2 mx-2 rounded-lg" key={d.id}>
        <span className="font-extrabold">{d.name}</span> <span>{d.type}</span>
        </div>
       } else if(d.type === "college"){
        const collegeName = d.name?.replace(/ /g, '-')
        return <Link to={`/colleges/${d.field.name}/${collegeName}/${d.id}`}>
            <div className="flex justify-between border-b-2 my-2 bg-white p-2 mx-2 rounded-lg" key={d.id}>
        <span className="font-extrabold">{d.name}</span> <span>{d.type}</span>
       </div>
        </Link>
     }else{ 
       return <div className="flex justify-between border-2 my-2 bg-white p-2 mx-2" key={d.id}>
        <span className="font extrabold">{d.title}</span> <span>{d.type}</span>
       </div>}
})}
    </div>
  )
}




    import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { MdOutlineArrowOutward } from "react-icons/md";
import { TiArrowForward } from "react-icons/ti";
interface Courses{
    name: string,
    duration: string,
    fees: string,
    seats: number,
    cutoff: number
    placement: {year: string, averagePackage: string, medianPackage: string, highestPackage: string}[],
    admission: {id: number, requirement: string[]}[]
    

}
interface CollegeData{
    id: number,
    name: string,
    location: string,
    description: string,
    ownership: string,
    founded: string,
    logo: string,
    collegeWebsiteLink: string,
    image: string[],
    fieldId: number,
    metatitle: string,
    metadescription: string,
    metakeywords: string,
    metablogURL: string,
            field: {
                id: number,
                name: string
            },
            courses: Courses[],
            ranking: {Rank: string, basedOn: string}[],
            admission: {
                requirement: string[]
            }[],
            hostelFess: {
                type: string,
                amount: string
            }[],
            faqs: {question: string, answer: string}[]
}

        export const Overview = ({collegeData}: {collegeData: CollegeData} )=>{

            const [open,setOpen] = useState(false);
            const [showReadMe,setShowReadMe] = useState(false);
            const ref = useRef<HTMLParagraphElement>(null);
           
            
           
            useEffect(()=>{
                if(ref.current){
                setShowReadMe( ref.current.scrollHeight !== ref.current.clientHeight)
                }
            },[]);
            
            return(
                <div className="border-2 p-5 shadow-lg rounded-md">
                <div className="border-2 p-5 shadow-lg rounded-md">
                    <h1 className="font-extrabold sm:text-3xl">About {collegeData.name}</h1>
                    <p style={ open ? {} : { WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                display: '-webkit-box'}}
                ref={ref}
                className="text-sm sm:text-lg mt-10 text-start text-gray-700">{ collegeData.description ? collegeData.description : "Indian Institute of Technology Delhi (more popularly known as IIT Delhi) is one of the most prestigious universities in India. IIT Delhi has been ranked 4 under the 'Overall' category and 2 under the 'Engineering' category by the NIRF Ranking 2024. The institute has also ranked 1st by India Today 2023 under the Engineering category, and 1st by the India Today 2023 under the Engineering (Government) category. IIT Delhi is popular for its flagship programmes, i.e. MTech and BTech courses"}</p>
                    <div className="flex justify-end mt-5 mx-5">
                    { showReadMe && <button onClick={()=>{
                    setOpen(c => !c);
                }} className="text-bold border-2 rounded-lg sm:p-2 bg-gray-200">{open ? "Read Less" :"Read More..."} </button>}
                    </div> 
                <div className="p-5 flex justify-center itmes-center my-10">
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-green-500 text-white">
                        <th className="border p-2 text-sm text-left">Particular</th>
                        <th className="border p-2 text-sm text-left">Highlight</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-green-100 hover:bg-green-200">
                        <td className="border p-2 text-sm">Establishment Year</td>
                        <td className="border p-2 text-sm">{collegeData?.founded || "NA"}</td>
                        </tr>
                        <tr className="hover:bg-green-200">
                        <td className="border p-2 text-sm">Ownership</td>
                        <td className="border p-2 text-sm">{collegeData?.ownership || "Government"}</td>
                        </tr>
                        <tr className="bg-green-100 hover:bg-green-200">
                        <td className="border p-2 text-sm">Ranking</td>
                        <td className="border p-2 text-sm"><span>{collegeData?.ranking?.[0]?.Rank || "NA"}</span><span>{collegeData?.ranking?.[0]?.basedOn || ""}</span> </td>
                        </tr>
                    </tbody>
                </table>

                </div>
                <div className="flex">
                   <span className="text-blue-500">Link:</span>
                   <div className="flex">
                   <TiArrowForward className="mt-1 ml-2"/>
                   <a href={collegeData?.collegeWebsiteLink || "https://www.google.com"} target="_blank" rel="noopener noreferrer" className="underline mx-1">College Website</a>

                   </div>
                   
                </div>
                <div className="mt-10">
                    <h1 className="font-extrabold sm:text-3xl">Hostel Related Information</h1>
                    <div className="p-5 flex justify-center itmes-center my-5">
                    <table className="min-w-full border-collapse mt-5">
                        <thead>
                            <tr className="bg-green-500 text-white">
                                <th className="border p-2 text-sm text-left">
                                    Type
                                </th>
                                <th className="border p-2 text-sm text-left">
                                    Amount
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {collegeData?.hostelFess?.map((d,index)=> (
                                <tr key={index} className={`${(index+1) % 2 === 0 ? "hover:bg-green-200": "bg-green-100 hover:bg-green-200"}`}>
                                    <td className="border p-2 text-sm">{d.type}</td>
                                    <td className="border p-2 text-sm">{d.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                    

                </div>
                <div>
                    <span className="font-extrabold sm:text-3xl">Admission Requirements</span>
                    <div className="">
                        <ul className="ml-5">
                        {collegeData?.admission?.[0]?.requirement.map((d,index)=>(
                         <li key={index} className="my-2 font-semibold">
                         {`${index + 1}.${d}`}
                         </li>
                         ))}
                        </ul>
                  
                    </div>
                </div>
                </div>
                
                
                </div>
            )
        }
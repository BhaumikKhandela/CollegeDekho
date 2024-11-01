import { RiArrowDropDownLine, RiQuestionAnswerFill } from "react-icons/ri"
import { useRecoilState } from "recoil";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
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
interface FaqArray{
    number: number,
    open: boolean
}
export const Faqs = ({collegeData}: {collegeData: CollegeData}) => {
   
    const [frequentlyAskedQuestions,setFrequentlyAskedQuestions] = useState<FaqArray[]>([]);

    useEffect(()=>{
        const initialFaqs = collegeData?.faqs.map((d,index)=>(
            {number: index, open: false}
        ));
        setFrequentlyAskedQuestions(initialFaqs);
    },[])
    
const handleFaqs = (index: number)=>{
       console.log("index is " + index);

            setFrequentlyAskedQuestions((prevFaqs) =>
                prevFaqs.map((faq) =>
                    faq.number === index
                        ? { ...faq, open: !faq.open } 
                        : faq // Keep the rest unchanged
                )
            );
          

        
}
          
    return(
        <div className="border-2 p-5 shadow-lg rounded-md">
            <div className="border-2 p-5 shadow-lg rounded-md">
                <div className="flex">
                <RiQuestionAnswerFill size={40}/><h1 className="font-extrabold sm:text-3xl ml-5">Some FAQs related to {collegeData.name}</h1>
            
                </div>
            <div className="mt-20">
                {collegeData?.faqs.map((d,index)=> (
                    <div key={index} onClick={()=>handleFaqs(index)} className="my-5 hover:cursor-pointer">
                        <div className="flex justify-between text-lg border-b-2 rounded-lg font-bold my-4">
                        {`Q) ${d.question}`}<RiArrowDropDownLine size={40} className={`ml-1 transform transition-transform duration-300 ${frequentlyAskedQuestions.find((d) => d.number === index)?.open ? "rotate-180" : ""}`}/>
                        </div>
                        <div className={`flex text-gray-400 ${frequentlyAskedQuestions.find((d) => d.number === index)?.open ? "block" : "hidden"} `}>
                        <span>{`Ans)`}</span><p className="ml-2">{d.answer ? d.answer : ""}</p>
                        </div>
                   
                    </div>
                ))}
            </div>
            </div>
          
        </div>
    )
}
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

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
export const CoursesView = ({collegeData}: {collegeData: CollegeData}) => {
   
    
    return (
    <div className="border-2 rounded-lg shadow-md">
        <div className="border-2 p-5 shadow-lg rounded-md m-5">
         <div>
                    <h1 className="font-extrabold sm:text-3xl">Courses Offered Here</h1>
                    <div className="sm:p-5 flex justify-center itmes-center mt-2">
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="bg-green-500 text-white">
                                <th className="border p-2 text-xs sm:text-sm text-left">
                                    Name
                                </th>
                                <th className="border p-2 text-xs sm:text-sm text-left">
                                    Duration
                                </th>
                                <th className="border p-2 text-xs  sm:text-sm text-left">
                                    Fees
                                </th>
                                <th className="border p-2 text-xs  sm:text-sm text-left">
                                    Seats
                                </th>
                                <th className="border p-2 text-xs sm:text-sm text-left">
                                    Eligibility
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {collegeData?.courses.map((d,index)=> (
                                <tr key={index} className={`${(index+1) % 2 === 0 ? "hover:bg-green-200": "bg-green-100 hover:bg-green-200"}`}>
                                    <td className="border p-2 text-xs sm:text-sm">{d.name}</td>
                                    <td className="border p-2 text-xs sm:text-sm">{d.duration}</td>
                                    <td className="border p-2 text-xs sm:text-sm">{d.fees}</td>
                                    <td className="border p-2 text-xs sm:text-sm">{d.seats}</td>
                                    <td className="border p-2 text-xs sm:text-sm">{d.admission[0].requirement.map(dd => <li>{dd}</li>)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                    

                </div>
                </div>
    </div>
    )
}
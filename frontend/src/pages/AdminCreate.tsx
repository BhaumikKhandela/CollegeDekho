import { MdOutlineEngineering } from "react-icons/md"
import { AdminSideBar } from "../components/AdminSideBar"
import { FaUserDoctor } from "react-icons/fa6"
import { HiPresentationChartBar } from "react-icons/hi"
import { useRecoilState } from "recoil"
import { fieldSelected } from "../atom"

export const AdminCreate = ()=>{
    

    const [selectedField,setSelectedField] = useRecoilState(fieldSelected);

    const engineeringHandle = (e: React.MouseEvent<HTMLButtonElement,MouseEvent>)=>{
        e.preventDefault();
        setSelectedField('1');
    }
    const medicalHandle = (e: React.MouseEvent<HTMLButtonElement,MouseEvent>)=>{
        e.preventDefault();
        setSelectedField('2');
    }

    const mbaHandle = (e: React.MouseEvent<HTMLButtonElement,MouseEvent>)=>{
        e.preventDefault();
        setSelectedField('3');
    }
   

    return(
        <div className="flex ">
            <div>
             <AdminSideBar/>
            </div>
            
            <div className="flex-1 h-screen  flex justify-center items-center flex-col">
             
            <h1 className="text-3xl font-extrabold sm:text-5xl  mb-40">SELECT A FIELD</h1>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-32  text-xl sm:text-4xl text-black  text-center font-extrabold ">
               
            
             <div className={` flex  gap-2 bg-black text-white p-12 rounded-lg shadow-2xl my-2`} key={'1'}>
                <button onClick={engineeringHandle}>
                <MdOutlineEngineering /> Engineering 
                </button>
                           
             </div>
             <div className={`flex  gap-2 bg-black text-white p-12 rounded-lg shadow-md my-2`} key={'2'}>
                <button onClick={medicalHandle}>
                    <FaUserDoctor />  Medical
                </button>
            
             </div>
             <div className={` flex  gap-2 bg-black text-white p-12 rounded-lg shadow-md my-2`} key={'3'}>
                <button onClick={mbaHandle}>
                <HiPresentationChartBar /> MBA
                </button>
            
             </div>
            </div>
            </div>
        </div>
    )
}
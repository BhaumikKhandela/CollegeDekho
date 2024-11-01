
import { useRecoilState } from "recoil"
import { AdminSideBar } from "../components/AdminSideBar"
import { PhaseOne, PhaseTwo } from "../components/Phases"
import { collegeCreated } from "../atom"


export const CollegeBlog = ()=>{
   

    const [created,setCreated] = useRecoilState(collegeCreated);
    

    return(
        <div className="flex">
         <div className="">
           <AdminSideBar/>
        </div>
        {/* {created ? <PhaseTwo/> : <PhaseOne/>} */}
        <PhaseTwo/>
      

        
        

       
        </div>
    )
}
import { LuChevronFirst, LuLayoutDashboard } from 'react-icons/lu'
import Image from '../assets/Image.jpeg'
import { MdCreate, MdOutlineDashboardCustomize } from 'react-icons/md'
import { BsFillTagsFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'
import { adminSideBarExpansion } from '../atom'
import { useRecoilState } from 'recoil'
import { RxDashboard, RxHamburgerMenu } from 'react-icons/rx'
export const AdminSideBar = ()=>{
    const [expand,setExpand] = useRecoilState(adminSideBarExpansion);
    return(
        <aside className={`tansition duration-300 ${expand ? "fixed top-0 left-0 bg-white h-full border-r-2 border-spacing-2 z-30 w-[265px]" : " w-16 h-screen  border-r-2 " }`}>
        <nav className="h-full">
        <div className="flex flex-row border-b-2 items-center ">
            <div className="h-[90px] ml-1">
            <img src={Image} alt="NTS Education" className={`overflow-hidden transition-all ${
                expand ? "w-64 mt-1 " : "w-0 "
            }`}/>
            </div>
        
       <button onClick={()=>{setExpand(c=>!c)}}className=" group bg-slate-100 flex items-center mb-1 p-3 mr-2 ml-1 hover:bg-black hover:text-white rounded-md shadow-sm">
       {expand?<LuChevronFirst className=" group-hover:text-white text-xl font-extrabold"/> : <RxHamburgerMenu className="  text-xl font-extrabold"/>}
       </button>
     </div>
        <ul>
            <Link to='/admin/panel/dashboard'><SideBarItems icon={<LuLayoutDashboard />} name='Dashboard' active={false}/></Link>
            <Link to='/admin/panel/create'><SideBarItems icon={<MdCreate />} name='Create College'  active={false} /></Link> 
            <Link to='/signin'><SideBarItems icon={<BsFillTagsFill />} name="Update Meta Tags" active={false} /></Link> 
        </ul>
        </nav>
        
       </aside>
    )
}

interface SideBarItmes{
    icon: React.ReactNode,
    name: string,
    active: boolean
}

const SideBarItems = ({icon,name,active}: SideBarItmes)=>{
    const [expand,setExpand] = useRecoilState(adminSideBarExpansion)
    return (
        <li
        className={`relative flex items-center py-2 px-3 my-10 mx-2 font-medium rounded-md cursor-pointer transition-colors ${
          active
            ? "bg-black text-white"
            : "hover:bg-black hover:text-white"
        }`}
      >
        <span className='py-2 transition-colors ${
          active
            ? "bg-black text-white"
            : "hover:bg-black hover:text-white"
        }`'>
        {icon}
        </span>
        
        
        <span className={`overflow-hidden transition-all  ${expand ? "ml-3" : "w-0 opacity-0 "}`}>
          {expand ? name : ""}
        </span>
      </li>
    )
}
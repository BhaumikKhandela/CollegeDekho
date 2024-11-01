import { useNavigate } from "react-router-dom"

interface Prop{
    type: string,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>,
    disabled: boolean
}
export const Button = ({type,onClick,disabled}: Prop)=>{
   
    return(
        <div className="bg-green-400 mt-5  rounded-md ml-1 mr-1">
            <button onClick={onClick} disabled={disabled}className="w-full text-center font-bold text-white p-2">{type}</button>
        </div>
    )
}
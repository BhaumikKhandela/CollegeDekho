interface AdminInputBoxComp{
    title: string,
    placeholder: string,
    name: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>)=> void
    
}
export const AdminInputBox = ({title, placeholder,name,onChange}: AdminInputBoxComp)=>{
    return(
        <div>
            <h2>{title}</h2>
              <input type="text" placeholder={placeholder} name={name} onChange={onChange} className="p-2 my-2 border-2 rounded-md w-full"></input>
              
        </div>
        
    )
}
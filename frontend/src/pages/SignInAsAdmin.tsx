import { useEffect, useState } from "react"
import { Button } from "../components/Button"
import { Input } from "../components/Input"

import { useRecoilState } from "recoil"
import {  loginDetails } from "../atom"
import '../App.css';
import Image from '../assets/Image.jpeg'
import axios from "axios"
import { useNavigate } from "react-router-dom"


export const SignInAsAdmin = () =>{
   const [logindetails,setLoginDetails] = useRecoilState(loginDetails)
    const[isSubmitting,setIsSubmitting] = useState(false);
    console.log("Hi from signup component");
   const navigate = useNavigate();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value} = e.target
        setLoginDetails((prevData)=>({...prevData,[name]:value}))
    }
    
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>)=> {
        e.preventDefault();
        setIsSubmitting(true);
        if(!logindetails.username || !logindetails.password ){
            alert("Please fill all the fields");
            setIsSubmitting(false);
        }else{
try{
   
        const response = await axios.post('http://localhost:8787/api/v1/admin/login', logindetails);
         console.log(response.data.msg);
         if(response.data.msg === "incorrect email or password"){
            alert(response.data.msg);
         }else{
         localStorage.setItem('token',"Bearer "+ response.data.msg);
         navigate("/admin/panel");
         }
         
    }catch(error){
    console.log(error);
    alert("An error occured while submitting the form");
    } finally{
        setIsSubmitting(false);
        
    }

}}

    return(
        <div className="bg-yellow-50  h-screen flex flex-col  md:flex-row  ">
            <div className="bg-yellow-50 w-full  h-screen  md:w-1/2 flex justify-center items-center flex-col  ">
            <div className="  bg-white w-96 rounded-lg shadow-md p-5 ml-5 mr-2">
            <div className="font-extrabold text-3xl text-center">
              Sign In
             </div>
             <div className="font-semibold text-lg text-center mt-5">
             Login as Admin
             </div>
             <form>
             <div className=" ml-2 mt-2 ">
                <Input typeOf="text" holder="johnDoe" displayName="Username" condition="two" name="username" onChange={handleChange} value={logindetails.username}/>
                <Input typeOf="password" holder="********" displayName="Password" condition="two" name="password" onChange={handleChange} value={logindetails.password} />
             </div>
             <Button type="Sign In" onClick={handleSubmit} disabled={isSubmitting}/>

             </form>
             
            </div>
            
             
            </div>
           <div className="bg-green-400 w-full md:w-1/2  flex justify-center items-center flex-col hidden md:flex ">
           <div className=" bg-white rounded-lg shadow-md font-extrabold text-3xl ">
            <img src={Image} alt="NTS Education" className="w-full h-52 rounded-lg shadow-md" />
           </div>
            <div className="pt-5 pr-7 pl-7 " >
               <TypingAnimation text="Join us to discover your path to the best colleges."/>
               
            </div>
           </div>
        </div>
    )
}

const TypingAnimation = ({ text }: { text: string }) => {
   const [typeText, setTypeText] = useState('');

   useEffect(() => {
       let currentIndex = 0;
       
       const interval = setInterval(() => {
           if (currentIndex <= text.length) {
               setTypeText(text.slice(0, currentIndex));
               currentIndex++;
           } else {
               clearInterval(interval);
           }
       }, 50); // Typing speed in milliseconds

       return () => clearInterval(interval);
   }, [text]);

   return <div className=" italic text-xl ">{typeText}</div>;
};

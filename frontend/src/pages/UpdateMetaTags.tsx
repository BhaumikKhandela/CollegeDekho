import { useEffect, useState } from "react"
import { AdminSideBar } from "../components/AdminSideBar"
import axios from "axios";

export const UpdateMetaTags = ()=>{
    const [selectField,setSelectField] = useState(0);
    const [colleges,setColleges] = useState([{id: -1, name: "No options"}]);
    const [formData,setFormData] = useState({metatitle:"",metadescription:"",metakeywords:"",metablogURL:""});
    const [collegeId,setCollegeId] = useState(-1);
    const [isSubmitting,setIsSubmitting] = useState(false);

    useEffect(()=>{
        if(selectField !== 0){

            try{

        const findColleges = async ()=>{


            const collegeFound = await  axios.get(`http://localhost:8787/api/v1/blog/Admin/find-colleges/${selectField}`);

            if(Array.isArray(collegeFound.data.college)){
            setColleges(collegeFound.data.college)
            setCollegeId(collegeFound.data.college.id);

            } else{
                console.error("Unexpected response format", collegeFound.data);
                setColleges([{id: -1,name: "xyz"}]);
            }
 
             
         }

         findColleges();
 
            } catch(error){
                console.error(error);

            }

        

        }
    },[selectField])

    const handleInputField = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        e.preventDefault();

        const {name,value} = e.target;

        setFormData((prevData)=>({...prevData,[name]: value}));
    }

    const handleSubmit = async(e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        setIsSubmitting(true);

        try{
            const token = localStorage.getItem("token")
            const updatedTags = await axios.post(`http://localhost:8787/api/v1/blog/Admin/update-meta/${selectField}/${collegeId}`,formData,{
                headers:{
                    'authorization': `Bearer ${token}`
                }
            }
                
            );

        alert("Form submitted successfully")
        }catch(error){
            console.error(error);
            alert("An error occurred while submitting the form")
        }finally{
            setIsSubmitting(false);
        }
        
    
    }

    const fieldSelected = (e: React.ChangeEvent<HTMLSelectElement>)=>{

        e.preventDefault();
     const field = e.target.value;
     if(field === "Medical"){
        setSelectField(2);
     }else if(field === "MBA"){
        setSelectField(3)
     }else if(field === "Engineering"){
        setSelectField(1)
     }
     
    }
    return(
        <div className="flex flex-row">
        <AdminSideBar/>
        <div className="flex-1 h-screen bg-slate-100">
        <form>
            <div className="flex justify-end mt-10 mr-10">
                <select onChange={fieldSelected} defaultValue="Select a field" className="p-2 rounded-lg border-2">
                    <option disabled value="Select a field">Select a field</option>
                    <option >Engineering</option>
                    <option>Medical</option>
                    <option>MBA</option>
                </select>
                <select className="p-2 rounded-lg border-2" defaultValue="Select a College">
                    <option disabled value="Select a College">Select a College</option>
                    {colleges.map((c)=>(
                        <option>{c.name}</option>
                    ))}
                </select>
            </div>
       
            <div className="bg-white rounded-lg mt-5 h-screen overflow-y-auto">
            <h1 className="font-extrabold text-3xl p-5">Update College Meta Tag</h1>
            <div className="my-5 p-5">
                <h1 className="font-bold text-xl">Meta Title</h1>
                <input placeholder="Enter the Meta Title" name="metatitle" value={formData.metatitle} onChange={handleInputField} className="py-2 px-3 w-full rounded-lg border-2 mt-5"></input>
            </div>
            <div className="my-5 p-5">
                <h1 className="font-bold text-xl">Meta description</h1>
                <textarea placeholder="Enter the Meta description" name="metadescription" value={formData.metadescription} onChange={handleInputField} className="py-2 px-3 w-full rounded-lg border-2 mt-5 "></textarea>
            </div>
            <div className="my-5 p-5">
                <h1 className="font-bold text-xl">Meta Keywords</h1>
                <input placeholder="Enter the Meta Keywords" name="metakeywords" value={formData.metakeywords} onChange={handleInputField} className="py-2 px-3 w-full rounded-lg border-2 mt-5"></input>
            </div>
            <div className="mt-5 p-5">
                <h1 className="font-bold text-xl">Meta Blog URL</h1>
                <p className="text-gray-700 mb-4">
    Please enter the path that will follow <strong>/colleges/</strong> in the URL. For example, if you enter <strong>my-college</strong>, the full URL will be <strong>domainname/colleges/my-college</strong>.
  </p>
                <input placeholder="Enter what need to be displayed after /colleges/" name="metablogURL" value={formData.metablogURL} onChange={handleInputField} className="py-2 px-3 w-full rounded-lg border-2 mt-5"></input>
            </div>
            <div className="my-5 p-5">
                <h1 className="font-bold text-xl">Meta Keywords</h1>
                <input placeholder="Enter the Meta Keywords" name="metakeywords" value={formData.metakeywords} onChange={handleInputField} className="py-2 px-3 w-full rounded-lg border-2 mt-5"></input>
            </div>
            <div className=" flex justify-center sm:flex sm:justify-end mr-5 ">
            <button className="bg-black text-white p-5 rounded-lg " onClick={handleSubmit} disabled={isSubmitting}>Submit</button>
            </div>
            </div>
            
            
        </form>
        </div>
        </div>
    )
}
import React, { memo, useState } from "react"
import { HiPlus } from "react-icons/hi"
import { AdminInputBox } from "./AdminInputBox";
import { useRecoilState } from "recoil";
import { collegeCreated, collegeId, Courses, fieldSelected, newCollege } from "../atom";
import axios from "axios";

export const PhaseOne = ()=>{
    const [college,setCollege] = useRecoilState(newCollege);
    const [created,setCreated] = useRecoilState(collegeCreated);
    const [selectedField,setSelectedField] = useRecoilState(fieldSelected)
    const [inputfield,setInputField] = useState([""]);
    const [faqs,setFaqs] = useState([{question: "", answer: ""}]);
    const [addInputField,setAddInputField] = useState([""]);
    const [addFaqs,setAddFaqs] = useState([{question: "", answer: ""}]);
    const [isSubmitting,setIsSubmitting] = useState(false);
    const [Id,setId] = useRecoilState(collegeId);
    const handleAddField = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();
        setAddInputField([...addInputField,""]);
        
    }

    const handleFaqs = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();
        setAddFaqs([...addFaqs,{question:"", answer:""}]);
        
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        const {name,value} = e.target;
        setCollege((prevData)=>({...prevData, [name]: value}));
    }
   const handleFaqChange = (index: number,field: string,value: string)=>{
    const newFaqs = faqs.map((faq,i)=>(
            i===index ? {...faq, [field]: value} : faq
    ) );

    setFaqs(newFaqs);
    

    setCollege((prevData)=>({...prevData, faqs: newFaqs}));

   }
   const handleCriteriaChange = (index: number, value: string)=>{
    const newCriteria = inputfield.map((field,i)=>(
        i===index ? value : field
    ));

    setInputField(newCriteria);

    setCollege((prevData)=>({...prevData, requirement: newCriteria}));

   }
const handleNextButton = async(e: React.MouseEvent<HTMLButtonElement>)=>{
      e.preventDefault();
      setIsSubmitting(true);

      try{
        const token = localStorage.getItem("token");
        const response = await axios.post(`http://localhost:8787/api/v1/blog/Admin/create/college/${selectedField}`, college,{
            headers:{
                'authorization' : `Bearer ${token}`
            }

           
        });
            setId(response.data.id);
            alert(response.data.msg);
            setCreated(true);
      }catch(error){
        console.log(error);
        alert("An error occured while submitting the form");
      }finally{
        setIsSubmitting(false);
        
      }
}

    return(
        <div className="flex-1 h-screen bg-slate-50 flex justify-center items-center ">
        <div className="bg-white p-5 rounded-md border-2 sm:w-full sm:mx-5 max-w-screen-lg h-full overflow-y-auto mt-20">
            <h1 className="text-3xl">Create a new College Blog Post</h1>
            <h2 className="text-gray-700 text-sm">Fill out the form below to create a new blog post.</h2>
            <form className="mt-5 sm:mt-20 ">
                <div className="sm:flex ">
                    <div className="sm:flex flex-col sm:w-1/2 sm:mr-5">
                    <h1 className="">Name</h1>
                <input type="text" placeholder="Enter the college name" name="name" onChange={handleOnChange} value={college.name} className="p-2 my-2 border-2 rounded-md w-full"></input>
                
                    </div>
                    <div className="sm:flex flex-col sm:w-1/2">
                    <h1>Location</h1>
                <input type ="text" placeholder="Enter the location" name="location" onChange={handleOnChange} value={college.location} className="p-2 my-2 border-2 rounded-md w-full"></input>
                
                    </div>
                
                </div>
                <div className="sm:flex">
                    <div className="sm:flex flex-col sm:w-1/2 sm:mr-5">
                    <h1>Founded</h1>
                <input type="date" placeholder="dd/mm/yyyy" name="founded" onChange={handleOnChange} value={college.founded} className="p-2 my-2 border-2 rounded-md w-full sm:mt-5"></input>
                
                    </div>
                    <div className="sm:flex flex-col sm:w-1/2">
                    <h1>Description</h1>
                <textarea placeholder="Write a brief discription about the college" name="description" onChange={handleOnChange} value={college.description} className="p-2 my-2 border-2 rounded-md w-full"></textarea>
                
                    </div>
                
                </div>
                <div className="sm:flex">
                    <div className="sm:flex flex-col sm:w-1/2 sm:mr-5">
                        <h1>Based On</h1>
                        <input type="text" placeholder="Ranking basis" name="basedOn" onChange={handleOnChange} value={college.basedOn} className="p-2 my-2 border-2 rounded-md w-full sm:mt-5"></input>
                    </div>
                    <div className="sm:flex flex-col sm:w-1/2 ">
                        <h1>Rank</h1>
                        <input type="text" placeholder="Enter the Rank or leave empty" name="rank" onChange={handleOnChange} value={college.rank} className="p-2 my-2 border-2 rounded-md w-full sm:mt-5"></input>
                    </div>

                </div>
                <div className="sm:flex my-2">
                    <div className="sm:flex flex-col sm:w-1/2 sm:mr-5">
                    <h1 className="">Meta Title</h1>
                <input type="text" placeholder="Enter the Meta Title" name="metatitle" onChange={handleOnChange} value={college.metatitle} className="p-2 my-2 border-2 rounded-md w-full"></input>
                
                    </div>
                    <div className="sm:flex flex-col sm:w-1/2">
                    <h1>Meta Description</h1>
                <input type ="text" placeholder="Enter the Meta Description" name="metadescription" onChange={handleOnChange} value={college.metadescription} className="p-2 my-2 border-2 rounded-md w-full"></input>
                
                    </div>
                
                </div>
                <div className="sm:flex my-2">
                    <div className="sm:flex flex-col sm:w-1/2 sm:mr-5">
                    <h1 className="">Meta Keywords</h1>
                <input type="text" placeholder="Enter the Meta Keywords" name="metakeywords" onChange={handleOnChange} value={college.metakeywords} className="p-2 my-2 border-2 rounded-md w-full"></input>
                
                    </div>
                    <div className="sm:flex flex-col sm:w-1/2">
                    <h1>Blog URL: domainname/colleges/</h1>
                    <p className="text-gray-700 mb-4">
    Please enter the path that will follow <strong>/colleges/</strong> in the URL. For example, if you enter <strong>my-college</strong>, the full URL will be <strong>domainname/colleges/my-college</strong>.
  </p>
                <input type ="text" placeholder="Enter what need to be displayed after /colleges/" name="metablogURL" onChange={handleOnChange} value={college.metablogURL} className="p-2 my-2 border-2 rounded-md w-full"></input>
                
                    </div>
                
                </div>
                <div >
                    <h1>College Admission criteria if any</h1>
                    {inputfield.map((field,index)=>(
                        <input key={index} type="text" placeholder={`criteria ${index + 1}`} value={field} onChange={(e)=> handleCriteriaChange(index,e.target.value)} className="p-2 my-2 border-2 rounded-md w-full"></input>
                    ))}
                    <div className="my-2 flex justify-center">
                    <button className="bg-black text-white text-xl py-2 px-4 ml-5 rounded-lg" onClick={handleAddField}><HiPlus /></button>
                    </div>
                    
                </div>
                <div>
                    <h1>FAQs</h1>
                   {faqs.map((faq,index)=>(
                    <div key={index}>
                        <input type="text" placeholder={`Question ${index+1}`} value={faq.question} onChange={(e)=> handleFaqChange(index,'question',e.target.value)} className="p-2 my-2 border-2 rounded-md w-full"></input>
                    <input type="text" placeholder={`Answer ${index+1}`} value={faq.answer} onChange={(e)=> handleFaqChange(index,'answer',e.target.value)} className="p-2 my-2 border-2 rounded-md w-full mb-8"></input>
                   
                    </div>
                    ))}
                    <div className="my-2 flex justify-center">
                         <button className="bg-black text-white text-xl py-2 px-4 ml-5 rounded-lg" onClick={handleFaqs}><HiPlus/></button>
                    </div>
                   
                </div>
                
              <button className="bg-black text-white w-full p-2 rounded-md sm:mt-10" onClick={handleNextButton} >Next</button>
                </form>
        </div>
        </div>
    )
}



export const PhaseOnePointFive = ()=>{
    const [course,setCourse] = useRecoilState(Courses);
    const [criteriaCount,setCriteriaCount] = useState(2);
    const [criteriaInput,setCriteriaInput] = useState([""]);
    const [criteria,setCriteria] = useState([""]);
    const [placementRecords,setPlacementRecords] = useState([{year:"",averagePackage:"",medianPackage:"",heighestPackage:""}]);
    const [placementData,setPlacementData] = useState([{year:"",averagePackage:"",medianPackage:"",heighestPackage:""}]);
    const [save,setSave] = useState(false);
    const [courseStructure,setCourseStructure] = useState({

        name:"",
        duration:"",
        seats:"",
        cutoff:"",
        fees:"",
        placement: [{
            year:"",
            averagePackage:"",
            medianPackage:"",
            heighestPackage:""
        }],
        admission:[""]

    });

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        const {name,value} = e.target;
        setCourseStructure((prevData)=>({...prevData,[name]:value}));
    }

    const handleCriteriaInput = (e: React.MouseEvent<HTMLButtonElement,MouseEvent>)=>{
        e.preventDefault();
        setCriteriaInput([...criteriaInput,""]);
        setCriteriaCount(c=>c+1);
    }
    
    const handlePlacementAddition = (e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        setPlacementRecords(prevData=>([...prevData,{year:"",averagePackage:"",medianPackage:"",heighestPackage:""}]));
    }
    
    const handlePlacementOnChange = (index: number,field: string, value: string)=>{
        
      const newPlacement = placementRecords.map((p,i)=>(
        i === index ? {...p,[field]: value} : p
      ));

      setPlacementData(newPlacement);
      setCourseStructure((prevData)=>({...prevData,placement:newPlacement}))

    }

    const handleOnChangeCriteria = (index: number, value: string)=>{

        const newCriteria = criteria.map((c,i)=>(
            i === index ? value : c
        ));

        setCriteria(newCriteria);
        setCourseStructure((prevData)=>({...prevData,admission:newCriteria}));
    }
    
    const handleSave = (e: React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault();
        setCourse((prevData)=>([...prevData,courseStructure]));
        setSave(true);
    }

    return(
        <div className="flex-1 h-screen bg-slate-50 flex justify-center items-center">
            <div key="idone" className="  bg-white p-5 rounded-md border-2 w-full sm:mx-5 h-full max-w-screen-lg overflow-y-auto">
              
             <div  className="w-full border-2 p-5 rounded-md my-5">
              <h1 className="text-2xl mb-10">Course Information </h1>
             <AdminInputBox title="Name" placeholder="Enter the name of the course" name="name" onChange={handleOnChange} ></AdminInputBox>
             <AdminInputBox title="Duration" placeholder="Enter the duration of the course" name="duration" onChange={handleOnChange} ></AdminInputBox>
             <AdminInputBox title="Seats Available" placeholder="Enter the seats available for the course" name="seats" onChange={handleOnChange}></AdminInputBox>
             <AdminInputBox title="Fees" placeholder="Enter the fees of the course" name="fees" onChange={handleOnChange}></AdminInputBox>
             <AdminInputBox title="Cutoff" placeholder="Last year cutoff" name="cutoff" onChange={handleOnChange}></AdminInputBox>
             </div>

             <div  className="w-full border-2 p-5 rounded-md my-5">
             <h1 className="text-2xl mb-10"> Placement Information </h1>
             {placementRecords.map((p,index)=>(
                <div key={index}>
                    <div>
            <h2>Year</h2>
              <input type="text" placeholder="Enter year" name="year" value={p.year} onChange={(e)=>handlePlacementOnChange(index,e.target.name,e.target.value)} className="p-2 my-2 border-2 rounded-md w-full"></input>
              
        </div>
        <div>
            <h2>Average Package</h2>
              <input type="text" placeholder="Enter the average package" name="averagePackage" value={p.averagePackage} onChange={(e)=>handlePlacementOnChange(index,e.target.name,e.target.value)} className="p-2 my-2 border-2 rounded-md w-full"></input>
              
        </div>
        <div>
            <h2>Median Package</h2>
              <input type="text" placeholder="Enter the median package" name="medianPackage" value={p.medianPackage} onChange={(e)=>handlePlacementOnChange(index,e.target.name,e.target.value)} className="p-2 my-2 border-2 rounded-md w-full"></input>
              
        </div>
        <div>
            <h2>Heighest Package</h2>
              <input type="text" placeholder="Enter the heighest package" name="heighestPackage" value={p.heighestPackage} onChange={(e)=>handlePlacementOnChange(index,e.target.name,e.target.value)} className="p-2 my-2 border-2 rounded-md w-full"></input>
              
        </div>
                </div>
             ))}
             <div className="flex justify-center">
                <button className="bg-black text-white text-xl py-2 px-4 ml-5 rounded-lg" onClick={handlePlacementAddition}><HiPlus/></button>
             </div>
             
             </div>
             
             <div className="w-full border-2 p-5 rounded-md my-5">
            
             <h1 className="text-2xl mb-10">Admission criteria</h1> 

             {criteriaInput.map((d,index)=>(
              
               
                 <input type="text" placeholder={`criteria ${index+1}`} value={d} onChange={(e)=>handleOnChangeCriteria(index,e.target.value)} className="p-2 my-2 border-2 rounded-md w-full"></input>
                 
           
             ))}
             <div className="flex justify-center">
                <button className="bg-black text-white text-xl py-2 px-4 ml-5 rounded-lg" onClick={handleCriteriaInput}><HiPlus/></button>
             </div>
             </div>
             <div>
        <button className="bg-black text-white text-xl py-2 px-4 mt-1 rounded-lg" onClick={handleSave} disabled={save}>{save ? "Saved" : "Save"}</button>    
         <span className="text-red-700 text-xl font-extrabold ml-1">Warning</span>: Once you save the data , it cannot be edited. Please review your information before saving.
         </div>  
            </div>
           
       
          
        </div>
    )
}


export const PhaseTwo = ()=>{
    
   
    const [courses,setCourses] = useRecoilState(Courses);
    const [newForm,setNewForm] = useState([{}]);
    const [submit,setSubmit] = useState(false);
    const [Id,setId] = useRecoilState(collegeId);
    const handleSubmitButton = async(e: React.MouseEvent<HTMLButtonElement>)=>{
       
        e.preventDefault();
        setSubmit(true);

        try{
            const token = localStorage.getItem("token");

            const response = await axios.post(`http://localhost:8787/Admin/create/course/${Id}`,courses,{
                headers:{
                    'authorization': `Bearer ${token}`
                }
            });

            alert(response.data.msg);

        }catch(error){
            console.log(error);
            alert("An error occurred while submitting the form");
            setSubmit(false);
        }finally{
            setSubmit(false);
        }
    }
    
    const handleOnClickButton = (e: React.MouseEvent<HTMLButtonElement,MouseEvent>)=>{
        e.preventDefault();
        setNewForm([...newForm,{}]);
    }
    return(
        <form className="flex-1">
        {newForm.map(d=>(
            <PhaseOnePointFive/>
        ))}
        <div className="flex justify-center my-5 gap-2">
        <button  className="bg-black text-white p-5 rounded-lg mt-10 flex" >Submit</button>
        
        <button onClick={handleOnClickButton} className="bg-black text-white p-5 rounded-lg mt-10 flex gap-2" ><HiPlus className="mt-1"/>Create a new course</button>
        </div>
        </form>
    )
}
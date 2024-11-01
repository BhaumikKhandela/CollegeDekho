import { MdOutlineArrowRightAlt } from "react-icons/md"
import { TopBar } from "../components/TopBar"
import { useNavigate } from "react-router-dom"


export const AboutUs = () => {
    return (
        <div className="flex">
            <div className="h-full z-10">
             <TopBar />
            </div>
            <div className="flex-1">
              <Header />
              <section className="bg-green-100">
                
                <h1 className="flex justify-center font-extrabold text-green-600 lg:text-5xl  text-2xl p-5 pt-10">Who We Are</h1>
                <div className="lg:my-20 lg:flex">
                    <div className="p-5">
                    <p className="text-green-600 px-5 md:text-2xl">
                    Founded in 2024, our platform was born from a simple idea: to make quality education accessible to all. We understand the challenges students face when making crucial decisions about their future, and we're here to provide the guidance and information needed to make informed choices.
                    </p>
                    <p className="text-green-600 p-5 md:text-2xl">
                    Our team of education experts, career counselors, and tech enthusiasts work tirelessly to bring you the most up-to-date and comprehensive information about colleges, courses, and career paths.
                    </p>
                    </div>
                    <div className="p-5">
                        <div className="flex">
                            <div className="bg-gray-200 h-52 w-60 rounded-lg m-2 shadow-md">
                            
                            </div>
                            <div className="bg-gray-200 h-52 w-60 rounded-lg m-2 shadow-md">
                               
                            </div>
                        </div>
                        <div className="flex">
                            <div className="bg-gray-200 h-52 w-60 rounded-lg m-2 shadow-md">
                               
                            </div>
                            <div className="bg-gray-200 h-52 w-60 rounded-lg m-2 shadow-md">
                               
                            </div>
                        </div>
                       
                    </div>
                    
                </div>
               
              </section>
              <section className="bg-white">
                    <h1 className="flex justify-center text-green-600 lg:text-5xl text-2xl p-5 font-extrabold">What We Do</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:mt-10 lg:p-5">
                        <div className="border-green-400 p-2 border-2 rounded-xl m-2">
                         <h1 className="text-green-600 flex justify-center font-bold text-xl lg:text-2xl">College Information</h1>
                         <p className="text-green-500 mt-5 p-2 flex justify-center">
                         Comprehensive details on colleges across the country
                         </p>
                        </div>
                        <div className="border-green-400 p-2 border-2 rounded-xl m-2">
                         <h1 className="text-green-600 flex justify-center font-bold text-xl lg:text-2xl">Admission Help</h1>
                         <p className="text-green-500 mt-5 p-2 flex justify-center">
                            Guidance on admission processes and requirements
                         </p>
                        </div>
                        <div className="border-green-400 p-2 border-2 rounded-xl m-2">
                         <h1 className="text-green-600 flex justify-center font-bold text-xl lg:text-2xl">Career Guidance</h1>
                         <p className="text-green-500 mt-5 p-2 flex justify-center">
                            Insights into various career paths and opportunities
                         </p>
                        </div>
                    </div>
                </section>
                <section className="bg-green-100">
                    <h1 className="text-green-600 flex justify-center lg:text-5xl text-2xl p-5 font-extrabold">Our Mission & Vision</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 m-2 lg:mt-10">
                        <div className="m-5">
                         <p className="text-green-600 m-2 lg:text-2xl">
                         Our mission is to empower students with the knowledge and resources they need to make informed decisions about their education and future careers. We envision a world where every student has access to quality information and guidance, enabling them to unlock their full potential and pursue their dreams.
                         </p>
                        </div>
                        <div className="m-5">
                          <div className="bg-gray-200 rounded-lg shadow-xl h-52 w-full lg:h-96 p-5">
                            
                          </div>
                        </div>
                    </div>

                </section>
                <Footer />
            </div>
        </div>
    )
}

const Header = () => {
    const navigate = useNavigate();
    return (
        <section className="w-full bg-gradient-to-r from-teal-600 to-green-500 p-2">
         <h1 className="lg:text-5xl  text-3xl text-white font-extrabold p-5">Empowering Students to Make the Right Educational Choices</h1>
         <p className="lg:text-xl  text-white p-5 lg:mt-5">We provide comprehensive information about colleges, courses, and careers to help you navigate your educational journey with confidence</p>
         <button onClick={()=>{
            navigate("/homepage")
         }}className="border-2 p-2 rounded-md m-5 bg-white text-green-700 flex hover:scale-105 transform transition-transform duration-300 ease-in-out">Start Exploring <MdOutlineArrowRightAlt className="m-1"/></button>
        </section>
    )
}

const Footer = () => {
    const navigate = useNavigate();
    return(
        <section className="w-full bg-gradient-to-r from-teal-600 to-green-500 p-2">
          <h1 className="flex justify-center lg:text-5xl text-3xl text-white font-extrabold p-5">Ready to Start Your Educational Journey?</h1>
          <p className="flex justify-center lg:text-xl text-white p-5 lg:mt-5">
          Explore colleges, courses, and career paths tailored to your interests and goals.
          </p>
          <div className="flex justify-center">
          <button onClick={()=>{
            navigate("/sign-up")
          }} className="border-2 p-2 rounded-md m-5 bg-white text-green-700 flex hover:scale-105 transform transition-transform duration-300 ease-in-out">Start Your Journey <MdOutlineArrowRightAlt className="mt-1"/></button>
        
          </div>
          </section>
    )
}
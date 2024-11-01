import { useNavigate } from "react-router-dom"


export const HardPopup = ()=>{
    const navigate = useNavigate();
    return(
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-30">
            <div className="w-4/5 sm:w-3/5 bg-teal-700 rounded-xl px-20 py-10 ">
                <h1 className="text-xl sm:text-4xl text-center font-extrabold  text-gray-200">Welcome to <span className="text-yellow-100">NTS </span><span className="text-yellow-100">Education</span> !</h1>
                <p className="text-sm sm:text-lg mt-16 text-white text-center">To continue exploring and enjoying all the features of our site, please log in or sign up for free. By creating an account, you can save favorites, personalize your experience, and more!</p>
                <div className="flex justify-center">
                    <button onClick={()=>{navigate("/sign-in")}}className="mr-1 sm:mr-5 text-indigo-700 mt-10 border-2 p-2 px-3 bg-white rounded-lg text-lg font-bold hover:bg-cyan-500 hover:text-white">Login</button>
                    
                    
                    <button onClick={()=>{navigate("/sign-up")}}className="ml-1 sm:ml-5 text-indigo-700  mt-10 border-2 p-2 bg-white rounded-lg text-lg font-bold hover:bg-cyan-500 hover:text-white">Signup</button>
                </div>
            </div>
        </div>
    )
} 
import { AdminSideBar } from "../components/AdminSideBar"
import Typing from 'react-typing-effect'
export const AdminPanel = ()=>{
    return(
        <div className="flex flex-row">
            <div className=" ">
            <AdminSideBar/>
            </div>
            <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex-1 flex items-center justify-center h-screen">
        <div className="text-center p-10 rounded-lg bg-white bg-opacity-20 shadow-2xl">
          <Typing
            text={[
              "🎉 Welcome, Mr. Rahul Chandrawansi! 🎉",
              "We're thrilled to have you back! 🌟",
              "Dive in and manage your content effortlessly. 🚀",
              "Enjoy a seamless experience with our intuitive admin panel. 💼",
              "P.S. If you find any bugs, remember: I'm just a humble developer, not a wizard! 🧙‍♂️",
              "But seriously, I hope you enjoy the site as much as I enjoyed building it! 😄"
            ]}
            speed={50}
            eraseDelay={2000}
            className="text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-lg"
          />
        </div>
      </div>
        </div>
    )
}
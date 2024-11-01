import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { SignUp } from "./pages/SignUp";
import { RecoilRoot } from "recoil";
import { SignIn } from "./pages/SignIn";
import { SignInAsAdmin } from "./pages/SignInAsAdmin";
import { HomePage } from "./pages/HomePage";
import { AdminPanel } from "./pages/AdminPanel";
import { AdminCreate } from "./pages/AdminCreate";
import { CollegeBlog } from "./pages/CollegeBlog";
import { UpdateMetaTags } from "./pages/UpdateMetaTags";
import { CollegesListEngineering } from "./pages/CollegesListEngineering.tsx";
import { CollegesListMedical } from "./pages/CollegesListMedical.tsx";
import { CollegesListMBA } from "./pages/CollegesListMBA.tsx";
import { Blog } from "./pages/Blog.tsx";
import { AdminDashboard } from "./pages/AdminDashboard.tsx";
import { CollegeDetails } from "./components/CollegeDetails.tsx";
import { ArticlesList } from "./pages/ArticlesList.tsx";
import { Article } from "./pages/Article.tsx";
import { AboutUs } from "./pages/AboutUs.tsx";
import { ContactUs } from "./pages/ContactUs.tsx";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <>
      <HelmetProvider>
        <RecoilRoot>
          <BrowserRouter>
            <Routes>
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/admin/sign-in" element={<SignInAsAdmin />} />
              <Route path="/admin/panel" element={<AdminPanel />} />
              <Route
                path="/admin/panel/dashboard"
                element={<AdminDashboard />}
              />
              <Route path="/admin/panel/create" element={<AdminCreate />} />
              <Route
                path="/admin/panel/create/collegeblog"
                element={<CollegeBlog />}
              />
              <Route
                path="/admin/panel/update-tags"
                element={<UpdateMetaTags />}
              />
              <Route path="/admin/panel/create/blog" element={<Blog />} />
              <Route path="/homepage" element={<HomePage />} />
              <Route
                path="/colleges/Engineering"
                element={<CollegesListEngineering />}
              />
              <Route
                path="/colleges/Medical"
                element={<CollegesListMedical />}
              />
              <Route path="/colleges/MBA" element={<CollegesListMBA />} />
              <Route
                path="/colleges/:field/:collegeName/:id"
                element={<CollegeDetails />}
              />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/colleges/articles" element={<ArticlesList />} />
              <Route path="/blogs/:slug/:id" element={<Article />} />
              <Route path="/contact-us" element={<ContactUs />} />
            </Routes>
          </BrowserRouter>
        </RecoilRoot>
      </HelmetProvider>
    </>
  );
}

export default App;

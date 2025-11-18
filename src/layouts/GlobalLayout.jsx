import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import BackToTopButton from "../components/TopButton";

export default function Layout() {
   return (
      <div className="bg-base-300 min-h-screen flex flex-col justify-between">
         <div>
            <Navbar />
            <div>
               { }
               <Outlet />
            </div>
         </div>
         <BackToTopButton />
         <Footer />
      </div>
   )
}
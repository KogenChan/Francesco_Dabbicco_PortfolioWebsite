import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackToTopButton from "../components/TopButton";
import { useGlobalLoading } from "../context/LoadingContext";
import Loader from "../components/Loader";
import SEO from "../components/SEO";

export default function Layout() {
   const { showLoader, isVisible } = useGlobalLoading();

   return (
      <div className="bg-base-300 min-h-screen flex flex-col justify-between">
         <SEO />
         {showLoader && <Loader isVisible={isVisible} />}
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
};
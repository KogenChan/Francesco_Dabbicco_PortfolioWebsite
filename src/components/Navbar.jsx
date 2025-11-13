import { Link } from "react-router";
import routes from "../routing/routes.min";
import { RiBrushAiFill } from "react-icons/ri";

export default function Navbar() {
   return (
      <nav className="bg-white font-sans w-full m-0 absolute">
            <div className="container mx-auto h-16 content-center">
               <div className="my-auto flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <RiBrushAiFill className="text-4xl" />
                     <Link to={routes.home} className="text-sm font-semibold hover:text-accent-content transition-colors duration-100">Home</Link>
                     <Link to={routes.home} className="text-sm font-semibold hover:text-accent-content transition-colors duration-100">Opere</Link>
                     <Link to={routes.home} className="text-sm font-semibold hover:text-accent-content transition-colors duration-100">Installazioni</Link>
                  </div>

                  <div className="flex items-center">
                     <Link to={routes.home} className="text-sm font-semibold hover:text-accent-content transition-colors duration-100">Contatti</Link>
                  </div>
               </div>
            </div>
      </nav>
   );
};
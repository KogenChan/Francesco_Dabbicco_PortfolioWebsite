import { Link } from "react-router";
import routes from "../routing/routes.min";

export default function Navbar() {
   return (
      <nav className="bg-white font-sans w-full m-0 absolute">
            <div className="container mx-auto h-16 content-center">
               <div className="my-auto flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <img src="../../public/media/logo.webp" alt="Francesco Dabbicco Logo" width={40} height={40} />
                     <Link to={routes.home} className="text-sm font-semibold hover:text-secondary-content transition-colors duration-100">Home</Link>
                     <Link to={routes.works} className="text-sm font-semibold hover:text-accent-content transition-colors duration-100">Opere</Link>
                     <Link to={routes.installations} className="text-sm font-semibold hover:text-accent-content transition-colors duration-100">Installazioni</Link>
                  </div>

                  <div className="flex items-center">
                     <Link to={routes.contact} className="text-sm font-semibold hover:text-accent-content transition-colors duration-100">Contatti</Link>
                  </div>
               </div>
            </div>
      </nav>
   );
};
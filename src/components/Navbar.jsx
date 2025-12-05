import { useState } from "react";
import { Link, useLocation } from "react-router";
import routes from "../routing/routes.min";

export default function Navbar() {
   const [isOpen, setIsOpen] = useState(false);
   const location = useLocation();

   const isActive = (path) => {
      if (path === routes.home) {
         return location.pathname === path;
      }
      return location.pathname.startsWith(path);
   };

   return (
      <nav className="bg-white font-sans w-full m-0 absolute z-50">
         <div className="container mx-auto h-16 content-center">
            <div className="my-auto flex items-center justify-between">
               {/* Desktop Navigation */}
               <div className="flex">
                  <Link to={routes.home}>
                     <img src="../../public/media/logo.webp" alt="Francesco Dabbicco Logo" width={40} height={40} className="-ms-1 me-3" />
                  </Link>
                  <div className="hidden md:flex items-center gap-4">
                     <Link to={routes.home} className="text-sm font-semibold hover:text-secondary-content transition-colors duration-100">Home</Link>
                     <Link to={routes.works} className="text-sm font-semibold hover:text-accent-content transition-colors duration-100">Opere</Link>
                     <Link to={routes.installations} className="text-sm font-semibold hover:text-accent-content transition-colors duration-100">Installazioni</Link>
                  </div>
               </div>

               <div className="hidden md:flex items-center">
                  <Link to={routes.contact} className="text-sm font-semibold hover:text-accent-content transition-colors duration-100">Contatti</Link>
               </div>

               {/* Hamburger Button */}
               <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="md:hidden p-0 pt-0.5 focus:outline-none"
                  aria-label="Toggle menu"
               >
                  <div className="w-6 h-6 relative flex items-center justify-center">
                     <span className={`absolute h-0.5 bg-base-content transition-all duration-300 origin-center ${isOpen ? 'rotate-45 w-full' : '-translate-y-2.5 w-6'}`}></span>
                     <span className={`absolute h-0.5 w-6 bg-base-content transition-all duration-300 ${isOpen ? 'scale-x-0' : 'scale-x-100'}`}></span>
                     <span className={`absolute h-0.5 bg-base-content transition-all duration-300 origin-center ${isOpen ? '-rotate-45 w-full' : 'translate-y-2.5 w-6'}`}></span>
                  </div>
               </button>
            </div>
         </div>

         {/* Mobile Menu */}
         <div className={`md:hidden overflow-hidden navShadow transition-all duration-300 ${isOpen ? 'max-h-64' : 'max-h-0'}`}>
            <div className="mx-auto p-0 flex flex-col bg-secondary border-t border-b border-base-content">
               <Link
                  to={routes.home}
                  className={`font-semibold hover:text-secondary-content transition-colors duration-100 px-4 py-3 ${isActive(routes.home) ? 'bg-accent-content font-light text-white' : ''}`}
                  onClick={() => setIsOpen(false)}
               >
                  Home
               </Link>
               <Link
                  to={routes.works}
                  className={`font-semibold hover:text-accent-content transition-colors duration-100 px-4 py-3 ${isActive(routes.works) ? 'bg-accent-content font-light text-white' : ''}`}
                  onClick={() => setIsOpen(false)}
               >
                  Opere
               </Link>
               <Link
                  to={routes.installations}
                  className={`font-semibold hover:text-accent-content transition-colors duration-100 px-4 py-3 ${isActive(routes.installations) ? 'bg-accent-content font-light text-white' : ''}`}
                  onClick={() => setIsOpen(false)}
               >
                  Installazioni
               </Link>
               <Link
                  to={routes.contact}
                  className={`font-semibold hover:text-accent-content transition-colors duration-100 px-4 py-3 ${isActive(routes.contact) ? 'bg-accent-content font-light text-white' : ''}`}
                  onClick={() => setIsOpen(false)}
               >
                  Contatti
               </Link>
            </div>
         </div>
      </nav>
   );
};
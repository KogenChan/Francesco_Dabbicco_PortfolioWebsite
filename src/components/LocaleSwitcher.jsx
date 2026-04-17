import { useState, useRef, useEffect } from "react";
import { useLocale } from "../context/LocaleContext";
import { PiGlobeHemisphereWestLight } from "react-icons/pi";

const LOCALES = [
   { code: "it", label: "Italiano", flag: "https://flagcdn.com/w40/it.png" },
   { code: "en", label: "English", flag: "https://flagcdn.com/w40/gb.png" },
];

export const LocaleSwitcher = () => {
   const { locale, setLocale } = useLocale();
   const [open, setOpen] = useState(false);
   const ref = useRef(null);

   const current = LOCALES.find((l) => l.code === locale);

   useEffect(() => {
      const handleClickOutside = (e) => {
         if (ref.current && !ref.current.contains(e.target)) {
            setOpen(false);
         }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
   }, []);

   return (
      <div ref={ref} className="relative">
         {/* Trigger */}
         <button
            onClick={() => setOpen((prev) => !prev)}
            className="flex items-center gap-1.5 hover:opacity-70 transition-opacity duration-100 -me-1 cursor-pointer"
         >
            <PiGlobeHemisphereWestLight className="text-3xl" />
            <span className={`text-xs hidden md:block transition-transform duration-300 ${open ? "rotate-180" : ""}`}>▾</span>
         </button>

         {/* Dropdown */}
         <div className={`absolute right-0 mt-[17px] w-40 bg-white z-50 overflow-hidden  transition-all duration-300 ${open ? "max-h-23 navShadow" : "max-h-0"}`}>
            <ul>
               {LOCALES.map((l) => (
                  <li
                     key={l.code}
                     onClick={() => {
                        setLocale(l.code);
                        setOpen(false);
                     }}
                     className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold cursor-pointer hover:text-secondary-content transition-colors duration-100
                        ${l.code === locale ? "bg-accent-content font-light text-white" : ""}`}
                  >
                     <img src={l.flag} alt={l.label} className={`w-7 h-5 object-cover ${l.code === locale ? "shadow-xs shadow-black/50" : ""}`} />
                     <span className="flex-1">{l.label}</span>
                     {l.code === locale && <span className="text-white">✓</span>}
                  </li>
               ))}
            </ul>
         </div>
      </div>
   );
};
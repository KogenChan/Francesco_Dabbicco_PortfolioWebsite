import { useState, useRef, useEffect } from "react";
import { useLocale } from "../context/LocaleContext";

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
         {/* Trigger — flag only */}
         <button
            onClick={() => setOpen((prev) => !prev)}
            className="flex items-center gap-1.5 hover:opacity-70 transition-opacity duration-100 -me-1 cursor-pointer"
         >
            <img src={current.flag} alt={current.label} className="w-[30px] h-[18px] object-cover" />
            <span className={`text-xs transition-transform duration-200 ${open ? "rotate-180" : ""}`}>▾</span>
         </button>

         {/* Dropdown */}
         {open && (
            <ul className="absolute right-0 mt-4 w-40 bg-white border-2 border-accent shadow-md z-50 overflow-hidden">
               {LOCALES.map((l) => (
                  <li
                     key={l.code}
                     onClick={() => {
                        setLocale(l.code);
                        setOpen(false);
                     }}
                     className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold cursor-pointer hover:text-secondary-content transition-colors duration-100
                ${l.code === locale ? "bg-accent-content/10 text-accent-content" : ""}`}
                  >
                     <img src={l.flag} alt={l.label} className="w-5 h-3.5 object-cover" />
                     <span className="flex-1">{l.label}</span>
                     {l.code === locale && <span className="text-accent-content">✓</span>}
                  </li>
               ))}
            </ul>
         )}
      </div>
   );
};
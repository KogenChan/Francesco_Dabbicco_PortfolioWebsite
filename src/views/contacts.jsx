import { useState, useEffect } from 'react';
import ContactForm from "../components/ContactForm";

export default function Contacts() {
   const [isLandscape, setIsLandscape] = useState(window.innerWidth > window.innerHeight);

   useEffect(() => {
      const handleOrientationChange = () => {
         setIsLandscape(window.innerWidth > window.innerHeight);
      };

      window.addEventListener('resize', handleOrientationChange);
      window.addEventListener('orientationchange', handleOrientationChange);

      return () => {
         window.removeEventListener('resize', handleOrientationChange);
         window.removeEventListener('orientationchange', handleOrientationChange);
      };
   }, []);

   // Apply h-[130vh] in landscape on mobile/tablet, h-[90vh] otherwise
   const heightClass = isLandscape && window.innerWidth < 1024 ? 'h-[130vh]' : 'h-[90vh]';

   return (
      <main className={`${heightClass} flex items-center justify-center pt-20 lg:pt-15`}>
         <ContactForm />
      </main>
   );
}
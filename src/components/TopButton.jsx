import { useState, useEffect } from 'react';
import { BiChevronUp } from 'react-icons/bi';

export default function BackToTopButton() {
   const [isVisible, setIsVisible] = useState(false);

   useEffect(() => {
      const toggleVisibility = () => {
         if (window.scrollY > 300) {
            setIsVisible(true);
         } else {
            setIsVisible(false);
         }
      };

      window.addEventListener('scroll', toggleVisibility);

      return () => window.removeEventListener('scroll', toggleVisibility);
   }, []);

   const scrollToTop = () => {
      window.scrollTo({
         top: 0,
         behavior: 'smooth'
      });
   };

   return (
      <button
         onClick={scrollToTop}
         className={`btn-top fixed bottom-8 right-6 z-50 bg-accent-content ${isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
         <BiChevronUp className='text-white text-[34px] bg-accent rounded-full' />
         <span className='text-md font-normal text-white ps-[42px]'>Back to top</span>
      </button>
   );
};
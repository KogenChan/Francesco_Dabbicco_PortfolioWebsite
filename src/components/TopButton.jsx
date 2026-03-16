import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BiChevronUp } from 'react-icons/bi';

export default function BackToTopButton() {
   const [isVisible, setIsVisible] = useState(false);
   const { t } = useTranslation();

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
         className={`btn-top fixed bottom-6 right-5 md:bottom-8 md:right-6 z-50 ${isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
         <BiChevronUp className='text-white text-[40px] bg-accent rounded-full' />
         <span className='text-sm font-normal text-white ps-[50px]'>{t("common.backToTop")}</span>
      </button>
   );
};

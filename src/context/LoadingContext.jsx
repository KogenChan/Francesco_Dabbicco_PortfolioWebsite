import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
   const [loadingCount, setLoadingCount] = useState(0);
   const [showLoader, setShowLoader] = useState(false);
   const [isVisible, setIsVisible] = useState(false);
   const timeoutRef = useRef(null);
   const showTimeoutRef = useRef(null);
   const startTimeRef = useRef(null);

   const startLoading = useCallback(() => {
      setLoadingCount((c) => c + 1);
   }, []);

   const stopLoading = useCallback(() => {
      setLoadingCount((c) => Math.max(0, c - 1));
   }, []);

   useEffect(() => {
      if (loadingCount > 0) {
         if (!showLoader && !showTimeoutRef.current) {
            startTimeRef.current = Date.now();

            // Wait 100ms before showing loader
            showTimeoutRef.current = setTimeout(() => {
               setShowLoader(true);
               requestAnimationFrame(() => {
                  setIsVisible(true);
               });
               showTimeoutRef.current = null;
            }, 100);
         }
      } else if (loadingCount === 0) {
         // Clear the show timeout if loading finished before 100ms
         if (showTimeoutRef.current) {
            clearTimeout(showTimeoutRef.current);
            showTimeoutRef.current = null;
         }

         // Only hide if loader is actually showing
         if (showLoader) {
            setIsVisible(false);
            timeoutRef.current = setTimeout(() => {
               setShowLoader(false);
            }, 100);
         }
      }

      return () => {
         if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
         }
         if (showTimeoutRef.current) {
            clearTimeout(showTimeoutRef.current);
         }
      };
   }, [loadingCount, showLoader]);

   return (
      <LoadingContext.Provider value={{ loadingCount, showLoader, isVisible, startLoading, stopLoading }}>
         {children}
      </LoadingContext.Provider>
   );
};

export const useGlobalLoading = () => useContext(LoadingContext);
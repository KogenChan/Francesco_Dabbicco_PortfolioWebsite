import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function useImageZoom() {
   const [zoomState, setZoomState] = useState(null);

   const handleImageClick = (e) => {
      const rect = e.target.getBoundingClientRect();
      const imageSrc = e.target.src;

      setZoomState({
         image: imageSrc,
         top: rect.top,
         left: rect.left,
         width: rect.width,
         height: rect.height,
      });
   };

   const closeZoom = () => setZoomState(null);

   const ZoomModal = () => (
      <AnimatePresence>
         {zoomState && (
            <>
               {/* Overlay */}
               <motion.div
                  className="fixed inset-0 bg-primary/80 z-40 cursor-pointer"
                  onClick={closeZoom}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
               />

               {/* Animated full-size image */}
               <motion.div
                  key={zoomState.image}
                  className="fixed z-50 cursor-pointer flex items-center justify-center"
                  initial={{
                     top: `${zoomState.top + zoomState.height / 2}px`,
                     left: `${zoomState.left + zoomState.width / 2}px`,
                     width: `${zoomState.width}px`,
                     height: `${zoomState.height}px`,
                     x: '-50%',
                     y: '-50%',
                  }}
                  animate={{
                     top: '50%',
                     left: '50%',
                     width: '90vw',
                     height: '90vh',
                     x: '-50%',
                     y: '-50%',
                  }}
                  exit={{
                     opacity: 0,
                  }}
                  transition={{
                     duration: 0.5,
                     ease: [0.25, 0.1, 0.25, 1],
                  }}
                  onClick={closeZoom}
               >
                  <img
                     src={zoomState.image}
                     alt="Full preview"
                     className="max-w-full max-h-full object-contain"
                  />
               </motion.div>
            </>
         )}
      </AnimatePresence>
   );

   return { handleImageClick, ZoomModal };
};
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CarouselButton from "./CarouselButton";

export default function Carousel({ items }) {
   const scrollRef = useRef(null);
   const [touchStart, setTouchStart] = useState(0);
   const [touchEnd, setTouchEnd] = useState(0);
   const [currentIndex, setCurrentIndex] = useState(0);
   const [itemsPerView, setItemsPerView] = useState(1);
   const [isAnimating, setIsAnimating] = useState(false);
   const [zoomState, setZoomState] = useState(null);

   const minSwipeDistance = 50;

   useEffect(() => {
      const calculateItemsPerView = () => {
         const container = scrollRef.current;
         if (!container) return;
         const containerWidth = container.offsetWidth;
         const item = container.firstElementChild;
         if (!item) return;
         const itemWidth = item.offsetWidth;
         const visible = Math.round(containerWidth / itemWidth);
         setItemsPerView(visible);
      };

      calculateItemsPerView();
      window.addEventListener("resize", calculateItemsPerView);
      return () => window.removeEventListener("resize", calculateItemsPerView);
   }, [items]);

   const maxIndex = Math.max(0, items.length - itemsPerView);

   const scrollByCards = (direction = 1) => {
      const container = scrollRef.current;
      if (!container) return;
      const item = container.firstElementChild;
      if (!item) return;
      const itemWidth = item.offsetWidth;
      container.scrollBy({ left: direction * itemWidth, behavior: "smooth" });

      setIsAnimating(direction);
      setTimeout(() => {
         setCurrentIndex((prev) => {
            const newIndex = prev + direction;
            return Math.max(0, Math.min(maxIndex, newIndex));
         });
         setIsAnimating(false);
      }, 200);
   };

   const onTouchStart = (e) => {
      setTouchEnd(0);
      setTouchStart(e.targetTouches[0].clientX);
   };

   const onTouchMove = (e) => {
      setTouchEnd(e.targetTouches[0].clientX);
   };

   const onTouchEnd = () => {
      if (!touchStart || !touchEnd) return;
      const distance = touchStart - touchEnd;
      const isLeftSwipe = distance > minSwipeDistance;
      const isRightSwipe = distance < -minSwipeDistance;
      if (isLeftSwipe && currentIndex < maxIndex) scrollByCards(1);
      else if (isRightSwipe && currentIndex > 0) scrollByCards(-1);
   };

   const totalPages = maxIndex + 1;
   const trackWidth = 120;
   const dotSize = 8;
   const dotPosition =
      totalPages > 1
         ? (currentIndex / (totalPages - 1)) * (trackWidth - 18) + 3
         : dotSize / 2;

   const nextIndex = isAnimating
      ? Math.max(0, Math.min(maxIndex, currentIndex + isAnimating))
      : currentIndex;
   const nextDotPosition =
      totalPages > 1
         ? (nextIndex / (totalPages - 1)) * (trackWidth - 18) + 3
         : dotSize / 2;
   const stretchDistance = Math.abs(nextDotPosition - dotPosition);
   const stretchWidth = dotSize + stretchDistance;

   const handleImageClick = (e, image) => {
      const rect = e.target.getBoundingClientRect();
      
      setZoomState({
         image,
         top: rect.top,
         left: rect.left,
         width: rect.width,
         height: rect.height,
      });
   };

   return (
      <div className="relative">
         <div className="hidden md:block">
            <CarouselButton
               direction="left"
               operation={scrollByCards}
               disabled={currentIndex === 0}
            />
            <CarouselButton
               direction="right"
               operation={scrollByCards}
               disabled={currentIndex === maxIndex}
            />
         </div>

         <div
            id="scroll-container"
            ref={scrollRef}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            className="flex scroll-smooth snap-x snap-mandatory -mx-4 min-h-[320px] overflow-x-hidden"
         >
            {items.map((item) => (
               <div
                  key={item.id}
                  className="snap-start shrink-0 w-full sm:w-[50%] lg:max-w-[33.33%] xl:w-[25%] px-4"
               >
                  <img
                     src={item.image}
                     alt={`Image ${item.id}`}
                     onClick={(e) => handleImageClick(e, item.image)}
                     className="w-full aspect-square object-cover cursor-pointer hover:opacity-80 transition"
                  />
               </div>
            ))}
         </div>

         <div className="flex justify-center items-center mt-[18px] h-[16px]">
            <div className="relative rounded-full border-2 border-gray-300 h-[16px] w-[120px]">
               <div
                  className="absolute top-1/2 -translate-y-1/2 h-[8px] bg-blue-500 rounded-full transition-all duration-200 ease-in-out"
                  style={{
                     left:
                        isAnimating === -1
                           ? `${nextDotPosition}px`
                           : `${dotPosition}px`,
                     width: isAnimating ? `${stretchWidth}px` : `${dotSize}px`,
                  }}
               />
            </div>
         </div>

         <AnimatePresence>
            {zoomState && (
               <>
                  {/* Overlay */}
                  <motion.div
                     className="fixed inset-0 bg-primary/80 z-40 cursor-pointer"
                     onClick={() => setZoomState(null)}
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
                     onClick={() => setZoomState(null)}
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
      </div>
   );
};
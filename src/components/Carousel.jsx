import { useRef, useState, useEffect } from "react";
import CarouselButton from "./CarouselButton";
import useImageZoom from "../hooks/useImageZoom";

export default function Carousel({ items }) {
   const scrollRef = useRef(null);
   const [touchStart, setTouchStart] = useState(0);
   const [touchEnd, setTouchEnd] = useState(0);
   const [currentIndex, setCurrentIndex] = useState(0);
   const [itemsPerView, setItemsPerView] = useState(1);
   const [isAnimating, setIsAnimating] = useState(false);
   const { handleImageClick, ZoomModal } = useImageZoom();

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

   const processedItems = items.map((item) => {
      if (item.image && typeof item.image === 'object') {
         const thumbnailUrl = item.image.sizes?.card?.url || item.image.sizes?.thumbnail?.url || item.image.url;
         const fullUrl = item.image.sizes?.card?.url || item.image.sizes?.thumbnail?.url || item.image.url;;

         return {
            ...item,
            thumbnailSrc: thumbnailUrl,
            fullSrc: fullUrl,
         };
      }

      return {
         ...item,
         thumbnailSrc: item.image,
         fullSrc: item.image,
      };
   });

   const handleCarouselImageClick = (e, index) => {
      const fullSrc = e.target.dataset.fullSrc;
      const originalSrc = e.target.src;
      e.target.src = fullSrc;
      handleImageClick(e, processedItems, index);
      setTimeout(() => {
         e.target.src = originalSrc;
      }, 100);
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
            {processedItems.map((item, index) => (
               <div
                  key={item.id}
                  className="snap-start shrink-0 w-full sm:w-[50%] lg:max-w-[33.33%] xl:w-[25%] px-4"
               >
                  <img
                     src={item.thumbnailSrc}
                     data-full-src={item.fullSrc}
                     alt={item.alt}
                     onClick={(e) => handleCarouselImageClick(e, index)}
                     className="w-full aspect-square object-cover cursor-pointer hover:opacity-80 transition"
                     loading="lazy"
                  />
               </div>
            ))}
         </div>

         <div className="flex justify-center items-center mt-[18px] h-[16px]">
            <div className="relative rounded-full border-2 border-gray-300 h-[16px] w-[120px]">
               <div
                  className="absolute top-1/2 -translate-y-1/2 h-[8px] bg-accent rounded-full transition-all duration-200 ease-in-out"
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

         <ZoomModal />
      </div>
   );
};
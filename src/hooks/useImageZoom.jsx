import { useState, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { IoClose, IoChevronBack, IoChevronForward } from "react-icons/io5";

export default function useImageZoom(onZoomedImageClick = null) {
   const [isZoomed, setIsZoomed] = useState(false);
   const [currentImgSrc, setCurrentImgSrc] = useState(null);
   const [currentIndex, setCurrentIndex] = useState(0);
   const [images, setImages] = useState([]);
   const touchStartX = useRef(null);
   const touchStartY = useRef(null);
   const isSwiping = useRef(false);
   const hasAnimated = useRef(false);

   const handleImageClick = useCallback((event, allImages, index) => {
      event.preventDefault();
      event.stopPropagation();

      const fullSrc = event.target.dataset.fullSrc || event.target.src;

      setImages(allImages);
      setCurrentImgSrc(fullSrc);
      setCurrentIndex(index);
      setIsZoomed(true);
      hasAnimated.current = false;
      document.body.classList.add("overflow-hidden");
   }, []);

   const closeZoom = useCallback(() => {
      setIsZoomed(false);
      document.body.classList.remove("overflow-hidden");
   }, []);

   const goPrev = useCallback(() => {
      if (!images.length) return;
      setCurrentIndex((i) => {
         const newIndex = i === 0 ? images.length - 1 : i - 1;
         setCurrentImgSrc(images[newIndex].fullSrc || images[newIndex].src);
         return newIndex;
      });
   }, [images]);

   const goNext = useCallback(() => {
      if (!images.length) return;
      setCurrentIndex((i) => {
         const newIndex = i === images.length - 1 ? 0 : i + 1;
         setCurrentImgSrc(images[newIndex].fullSrc || images[newIndex].src);
         return newIndex;
      });
   }, [images]);

   const handleZoomedImageClickInternal = useCallback(() => {
      if (onZoomedImageClick && images[currentIndex]) {
         closeZoom(); // Close modal before navigation
         onZoomedImageClick(images[currentIndex]);
      }
   }, [onZoomedImageClick, images, currentIndex, closeZoom]);

   // ————— Touch Swipe —————
   const onTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      isSwiping.current = false;
   };

   const onTouchMove = (e) => {
      if (!touchStartX.current || !touchStartY.current) return;

      const deltaX = e.touches[0].clientX - touchStartX.current;
      const deltaY = e.touches[0].clientY - touchStartY.current;

      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
         isSwiping.current = true;
      }
   };

   const onTouchEnd = (e) => {
      if (!touchStartX.current) return;

      const touchEndX = e.changedTouches[0].clientX;
      const distance = touchStartX.current - touchEndX;

      if (isSwiping.current && Math.abs(distance) > 50) {
         if (distance > 0) {
            goNext();
         } else {
            goPrev();
         }
      }

      touchStartX.current = null;
      touchStartY.current = null;
      isSwiping.current = false;
   };

   const handleOverlayClick = (e) => {
      if (!isSwiping.current) {
         closeZoom();
      }
   };

   // ————— Keyboard Controls —————
   useEffect(() => {
      const handleKeyDown = (e) => {
         if (!isZoomed) return;
         if (e.key === "Escape") closeZoom();
         if (e.key === "ArrowRight") goNext();
         if (e.key === "ArrowLeft") goPrev();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
   }, [isZoomed, closeZoom, goNext, goPrev]);

   // ————— Mark animation as complete after first render —————
   useEffect(() => {
      if (isZoomed && !hasAnimated.current) {
         const timer = setTimeout(() => {
            hasAnimated.current = true;
         }, 300);
         return () => clearTimeout(timer);
      }
   }, [isZoomed]);

   // ————— Modal Portal —————
   const ZoomModal = () => {
      if (!isZoomed) return null;

      return createPortal(
         <div
            className={`fixed inset-0 z-50 ${!hasAnimated.current ? 'animate-fadeIn' : ''}`}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
         >
            {/* Overlay (click to close) */}
            <div
               onClick={handleOverlayClick}
               className="absolute inset-0 bg-black/75 cursor-pointer"
            />

            {/* Image wrapper */}
            <div className="absolute inset-0 z-60 flex items-center justify-center p-4 pointer-events-none">
               <div className="pointer-events-auto relative w-full h-full flex items-center justify-center">
                  {/* Main Image - constrained to viewport */}
                  <img
                     src={currentImgSrc}
                     alt=""
                     onClick={handleZoomedImageClickInternal}
                     className={`max-w-full max-h-full w-auto h-auto object-contain select-none transition-opacity duration-200 ${onZoomedImageClick ? 'cursor-pointer' : ''
                        }`}
                     draggable="false"
                     style={{
                        maxWidth: '100%',
                        maxHeight: '100%'
                     }}
                  />

                  {/* Counter — always visible */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-base-content text-sm bg-white/60 px-3 py-1 rounded-full pointer-events-none">
                     {currentIndex + 1} / {images.length}
                  </div>

                  {/* Prev Button — hidden until lg */}
                  <button
                     onClick={(e) => {
                        e.stopPropagation();
                        goPrev();
                     }}
                     className="hidden lg:flex absolute left-2 top-1/2 -translate-y-1/2 z-70 bg-white/60 hover:bg-white/80 transition-colors rounded-full py-[8px] ps-[7px] pe-[9px] backdrop-blur-[1px] cursor-pointer"
                  >
                     <IoChevronBack size={28} />
                  </button>

                  {/* Next Button — hidden until lg */}
                  <button
                     onClick={(e) => {
                        e.stopPropagation();
                        goNext();
                     }}
                     className="hidden lg:flex absolute right-2 top-1/2 -translate-y-1/2 z-70 bg-white/60 hover:bg-white/80 transition-colors rounded-full py-[8px] pe-[7px] ps-[9px] backdrop-blur-[1px] cursor-pointer"
                  >
                     <IoChevronForward size={28} />
                  </button>

                  {/* Close button */}
                  <button
                     onClick={(e) => {
                        e.stopPropagation();
                        closeZoom();
                     }}
                     className="absolute top-3 right-3 z-70 bg-white/60 hover:bg-white/80 transition-colors rounded-full p-2 cursor-pointer"
                  >
                     <IoClose size={26} />
                  </button>
               </div>
            </div>

            <style>{`
               @keyframes fadeIn {
                  from { opacity: 0; }
                  to { opacity: 1; }
               }
               .animate-fadeIn {
                  animation: fadeIn 0.3s ease-in-out;
               }
            `}</style>
         </div>,
         document.body
      );
   };

   return { handleImageClick, ZoomModal };
}
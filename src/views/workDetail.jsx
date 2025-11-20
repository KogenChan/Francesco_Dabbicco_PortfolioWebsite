import { useParams } from 'react-router';
import { useRef, useState, useEffect } from 'react';
import usePhotos from '../hooks/usePhotos.min.js';

export default function WorkDetail() {
   const { itemName } = useParams();
   const { photos, loading, error } = usePhotos('/images.min.json', { waitForRender: false });
   const imgRef = useRef(null);
   const [imgWidth, setImgWidth] = useState(0);

   const photo = photos.find(p => p.key === Number(itemName));

   const updateWidth = () => {
      if (imgRef.current) {
         setImgWidth(imgRef.current.offsetWidth);
      }
   };

   useEffect(() => {
      if (!loading && photo) {
         updateWidth();
         window.addEventListener('resize', updateWidth);

         return () => {
            window.removeEventListener('resize', updateWidth);
         };
      }
   }, [loading, photo]);

   if (loading) {
      return (
         <div className="flex justify-center items-center h-screen">
            <div>Loading...</div>
         </div>
      );
   }

   if (error) {
      return (
         <div className="flex justify-center items-center h-screen">
            <div>Error loading image</div>
         </div>
      );
   }

   if (!photo) {
      return (
         <div className="flex justify-center items-center h-screen">
            <div>Work not found</div>
         </div>
      );
   }

   return (
      <main className="w-full flex justify-center items-center">
         <div className='pt-17 px-4 lg:px-0'>
            <img
               ref={imgRef}
               src={photo.src}
               alt={`Work ${itemName}`}
               className="h-auto detailImg object-contain"
               onLoad={updateWidth}
            />
            <p
               className="text-base-content italic text-xs mt-2 text-right"
               style={{ maxWidth: imgWidth ? `${imgWidth}px` : '100%' }}
            >
               Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
         </div>
      </main>
   );
};
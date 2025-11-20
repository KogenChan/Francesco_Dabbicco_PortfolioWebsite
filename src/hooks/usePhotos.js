import { useState, useEffect } from 'react';
import useFetchData from './useFetchData.min';
import { useGlobalLoading } from "../context/LoadingContext";

const loadPhotosWithDimensions = async (items) => {
   return Promise.all(
      items.map((item) =>
         new Promise((resolve) => {
            const img = new Image();

            img.onload = () => {
               resolve({
                  src: item.image,
                  width: img.naturalWidth,
                  height: img.naturalHeight,
                  key: item.id,
               });
            };

            img.onerror = () => {
               console.error('Image failed to load:', item.image);
               resolve({
                  src: item.image,
                  width: 800,
                  height: 600,
                  key: item.id,
               });
            };

            img.src = item.image;
         })
      )
   );
};

export default function usePhotos(jsonPath, options = {}) {
   const { 
      waitForRender = true, 
      imageSelector = '.react-photo-album--image' 
   } = options;
   
   const { startLoading, stopLoading } = useGlobalLoading();
   const { data, loading: fetchLoading, error: fetchError } = useFetchData(jsonPath);

   const [photos, setPhotos] = useState([]);
   const [loadingImages, setLoadingImages] = useState(false);
   const [imagesRendered, setImagesRendered] = useState(false);
   const [error, setError] = useState(null);

   // Load image dimensions
   useEffect(() => {
      if (fetchError) {
         setError(fetchError);
         return;
      }

      if (!data || data.length === 0) return;

      let mounted = true;
      setLoadingImages(true);
      setImagesRendered(false);
      setError(null);
      startLoading();

      loadPhotosWithDimensions(data)
         .then((result) => {
            if (mounted) setPhotos(result);
         })
         .catch(() => {
            if (mounted) setError("Failed loading images");
         })
         .finally(() => {
            if (mounted) setLoadingImages(false);
            if (!waitForRender) stopLoading();
         });

      return () => (mounted = false);
   }, [data, fetchError, startLoading, stopLoading, waitForRender]);

   // Wait for images to be rendered in the DOM
   useEffect(() => {
      if (!waitForRender) return;
      if (loadingImages || fetchLoading || photos.length === 0) return;
      if (imagesRendered) return;

      const checkImages = () => {
         const images = document.querySelectorAll(imageSelector);
         
         if (images.length === 0) {
            setTimeout(checkImages, 50);
            return;
         }

         const imageElements = Array.from(images);
         const allLoaded = imageElements.every(img => img.complete);

         if (allLoaded) {
            setImagesRendered(true);
            stopLoading();
         } else {
            Promise.all(
               imageElements.map(img => 
                  img.complete 
                     ? Promise.resolve() 
                     : new Promise(resolve => {
                        img.onload = resolve;
                        img.onerror = resolve;
                     })
               )
            ).then(() => {
               setImagesRendered(true);
               stopLoading();
            });
         }
      };

      checkImages();
   }, [loadingImages, fetchLoading, photos, imagesRendered, imageSelector, waitForRender, stopLoading]);

   return {
      photos,
      loading: fetchLoading || loadingImages || (waitForRender && !imagesRendered),
      error,
   };
};
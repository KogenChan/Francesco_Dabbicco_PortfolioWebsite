import { useState, useEffect } from "react";
import useFetchData from "./useFetchData";
import { useGlobalLoading } from "../context/LoadingContext";

const loadPhotosWithDimensions = async (items) =>
   Promise.all(
      items.map(
         (item) =>
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
                  resolve({ src: item.image, width: 800, height: 600, key: item.id });
               };
               img.src = item.image;
            })
      )
   );

const isInViewport = (el) => {
   const rect = el.getBoundingClientRect();
   return (
      rect.top < window.innerHeight &&
      rect.bottom > 0 &&
      rect.left < window.innerWidth &&
      rect.right > 0
   );
};

export default function usePhotos(url, options = {}) {
   const {
      waitForRender = true,
      imageSelector = ".react-photo-album--image",
   } = options;

   const { startLoading, stopLoading } = useGlobalLoading();
   const { data, loading: fetchLoading, error: fetchError } = useFetchData(url, { manageLoading: false });

   const [photos, setPhotos] = useState([]);
   const [processingImages, setProcessingImages] = useState(false);
   const [imagesRendered, setImagesRendered] = useState(false);
   const [error, setError] = useState(null);

   useEffect(() => {
      startLoading();
   }, [startLoading]);

   useEffect(() => {
      if (fetchError) {
         setError(fetchError);
         stopLoading();
         return;
      }

      if (!data || data.length === 0 || fetchLoading) return;

      let active = true;
      setProcessingImages(true);
      setImagesRendered(false);
      setError(null);

      loadPhotosWithDimensions(data)
         .then((processed) => {
            if (active) setPhotos(processed);
         })
         .catch(() => {
            if (active) setError("Failed loading images");
         })
         .finally(() => {
            if (active) setProcessingImages(false);
            if (!waitForRender) stopLoading();
         });

      return () => { active = false; };
   }, [data, fetchError, fetchLoading, waitForRender, stopLoading]);

   useEffect(() => {
      if (!waitForRender) return;
      if (processingImages || fetchLoading || photos.length === 0) return;
      if (imagesRendered) return;

      let attempts = 0;
      const maxAttempts = 10; // 50ms * 10 = 500ms max wait for DOM

      const checkVisibleImages = () => {
         const allImages = document.querySelectorAll(imageSelector);

         if (allImages.length === 0) {
            attempts++;
            if (attempts < maxAttempts) {
               setTimeout(checkVisibleImages, 50);
            } else {
               // No gallery rendered at all, stop loading
               setImagesRendered(true);
               stopLoading();
            }
            return;
         }

         // Only care about images currently in viewport
         const visibleImages = Array.from(allImages).filter(isInViewport);

         if (visibleImages.length === 0) {
            // Gallery exists but not in viewport, stop loading
            setImagesRendered(true);
            stopLoading();
            return;
         }

         if (visibleImages.every((img) => img.complete)) {
            setImagesRendered(true);
            stopLoading();
         } else {
            Promise.all(
               visibleImages.map((img) =>
                  img.complete
                     ? Promise.resolve()
                     : new Promise((resolve) => {
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

      checkVisibleImages();
   }, [processingImages, fetchLoading, photos, imagesRendered, imageSelector, waitForRender, stopLoading]);

   return {
      photos,
      loading: fetchLoading || processingImages || (waitForRender && !imagesRendered),
      error,
   };
};
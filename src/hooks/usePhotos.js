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

export default function usePhotos(url, options = {}) {
   const {
      waitForRender = true,
      imageSelector = ".react-photo-album--image",
   } = options;

   const { startLoading, stopLoading } = useGlobalLoading();
   // Tell useFetchData NOT to manage loading - we handle it here
   const { data, loading: fetchLoading, error: fetchError } = useFetchData(url, { manageLoading: false });

   const [photos, setPhotos] = useState([]);
   const [processingImages, setProcessingImages] = useState(false);
   const [imagesRendered, setImagesRendered] = useState(false);
   const [error, setError] = useState(null);

   // Start loading once on mount
   useEffect(() => {
      startLoading();
   }, [startLoading]);

   // Process images after fetch completes
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
            // If not waiting for render, stop loading now
            if (!waitForRender) stopLoading();
         });

      return () => { active = false; };
   }, [data, fetchError, fetchLoading, waitForRender, stopLoading]);

   // Wait for images to actually render in the DOM
   useEffect(() => {
      if (!waitForRender) return;
      if (processingImages || fetchLoading || photos.length === 0) return;
      if (imagesRendered) return;

      const checkImages = () => {
         const imgElements = document.querySelectorAll(imageSelector);
         
         if (imgElements.length === 0) {
            setTimeout(checkImages, 50);
            return;
         }

         const images = Array.from(imgElements);
         
         if (images.every((img) => img.complete)) {
            setImagesRendered(true);
            stopLoading();
         } else {
            Promise.all(
               images.map((img) =>
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

      checkImages();
   }, [processingImages, fetchLoading, photos, imagesRendered, imageSelector, waitForRender, stopLoading]);

   return {
      photos,
      loading: fetchLoading || processingImages || (waitForRender && !imagesRendered),
      error,
   };
}
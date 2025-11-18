import { useState, useEffect } from 'react';
import useFetchData from './useFetchData.min';

const loadPhotosWithDimensions = async (data) => {
   const photosWithDimensions = await Promise.all(
      data.map((item) => 
         new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
               resolve({
                  src: item.image,
                  width: img.naturalWidth,
                  height: img.naturalHeight,
                  key: item.id
               });
            };
            img.onerror = () => {
               console.error('Image failed to load:', item.image);
               resolve({
                  src: item.image,
                  width: 800,
                  height: 600,
                  key: item.id
               });
            };
            img.src = item.image;
         })
      )
   );
   
   return photosWithDimensions;
};

export default function usePhotos(jsonPath) {
   const { data, loading: fetchLoading, error } = useFetchData(jsonPath);
   const [photos, setPhotos] = useState([]);
   const [loadingImages, setLoadingImages] = useState(false);

   useEffect(() => {
      if (data.length === 0) return;
      
      setLoadingImages(true);
      loadPhotosWithDimensions(data).then((result) => {
         setPhotos(result);
         setLoadingImages(false);
      });
   }, [data]);

   return { 
      photos, 
      loading: fetchLoading || loadingImages, 
      error 
   };
};
import Gallery from '../components/Gallery.jsx';
import ProjectSection from '../components/ProjectSection.jsx';
import useProjectSection from '../hooks/useProjectSection.min.js';
import useGallery from '../hooks/useGallery.min.js';

export default function Works() {
   const { gallery, error: galleryError } = useGallery('main');
   const { project: project1, error: project1Error } = useProjectSection('opere_1');
   const { project: project2, error: project2Error } = useProjectSection('opere_2');
   const { project: project3, error: project3Error } = useProjectSection('opere_3');

   if (galleryError || project1Error || project2Error || project3Error) {
      return (
         <div className="flex justify-center my-20">
            <div>Error loading content</div>
         </div>
      );
   }

   return (
      <>
         <main className='pt-11 lg:pt-0 min-h-screen'>
            <Gallery content={gallery} detailRoute="/opere" />
         </main>
         {project1 && (
            <ProjectSection
               project={project1}
               mainImageClickable={true}
               reverse={true}
               className='lg:pb-0'
               galleryClassName='lg:mt-8 lg:mb-8'
               textClassName='pe-0 lg:pe-8'
            />
         )}

         {project2 && (
            <ProjectSection
               project={project2}
               reverse={false}
               className='lg:pb-0'
               galleryClassName='lg:mt-8 lg:mb-8'
               textClassName='ps-0 lg:ps-8'
            />
         )}

         {project3 && (
            <ProjectSection
               project={project3}
               reverse={true}
               className='lg:pb-0'
               galleryClassName='lg:mt-8 lg:mb-8'
               textClassName='pe-0 lg:pe-8'
            />
         )}
      </>
   );
};
import ProjectSection from '../components/ProjectSection.jsx';
import useProjectSection from '../hooks/useProjectSection.min.js';

export default function Installations() {
   const { project: project1, error: error1 } = useProjectSection('installazioni_1');
   const { project: project2, error: error2 } = useProjectSection('installazioni_2');

   if (error1 || error2) {
      return (
         <div className="flex justify-center my-20">
            <div>Error loading content</div>
         </div>
      );
   }

   return (
      <main>
         {project1 && (
            <ProjectSection
               project={project1}
               reverse={true}
               className='lg:pb-0 pt-10 lg:pt-16'
               galleryClassName='lg:mt-8'
               textClassName='pe-0 lg:pe-4'
               detailRoute="/installazioni"
               useZoomModal={true}
            />
         )}

         {project2 && (
            <ProjectSection
               project={project2}
               reverse={false}
               className='lg:pb-0'
               galleryClassName='lg:mt-8 lg:mb-8'
               textClassName='ps-0 lg:ps-8'
               detailRoute="/installazioni"
               useZoomModal={true}
            />
         )}
      </main>
   );
};
import usePhotos from '../hooks/usePhotos.min.js';
import ProjectSection from '../components/ProjectSection.jsx';

export default function Installations() {
   const { photos, error } = usePhotos('/images.min.json');

   if (error) {
      return (
         <div className="flex justify-center my-20">
            <div>Error loading images</div>
         </div>
      );
   }

   return (
      <>
         <main className='min-h-screen mt-8 lg:mt-0'>
            <ProjectSection
               title="Nome Progetto"
               description={[
                  "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
                  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium minima totam, fugiat modi perspiciatis suscipit dolores autem dolorum ipsam nam rem, porro odio laborum adipisci esse atque, mollitia earum ut? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam repellendus nemo provident, possimus natus accusamus numquam debitis officia ad rerum similique voluptatem ipsa, porro sit maiores expedita! Cumque, enim accusamus?",
                  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque dolorum in qui ipsum incidunt quam ratione, id eligendi? Quo consequatur voluptas cumque ullam, tenetur maiores esse omnis similique laborum itaque."
               ]}
               imageSrc="https://picsum.photos/id/12/650/800"
               imageAlt="Francesco Dabbicco"
               reverse={true}
               galleryPhotos={photos}
               className='lg:pb-0'
               galleryClassName='lg:mt-4'
               bg='primary'
            />
            <ProjectSection
               title="Nome Progetto"
               description={[
                  "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
                  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium minima totam, fugiat modi perspiciatis suscipit dolores autem dolorum ipsam nam rem, porro odio laborum adipisci esse atque, mollitia earum ut? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam repellendus nemo provident, possimus natus accusamus numquam debitis officia ad rerum similique voluptatem ipsa, porro sit maiores expedita! Cumque, enim accusamus?",
                  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque dolorum in qui ipsum incidunt quam ratione, id eligendi? Quo consequatur voluptas cumque ullam, tenetur maiores esse omnis similique laborum itaque."
               ]}
               imageSrc="https://picsum.photos/id/12/650/800"
               imageAlt="Francesco Dabbicco"
               reverse={false}
               galleryPhotos={photos}
               className='lg:pb-0'
               galleryClassName='lg:mt-4'
               bg='secondary'
            />
         </main>
      </>
   );
};
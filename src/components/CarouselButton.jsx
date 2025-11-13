import { BiChevronLeft } from 'react-icons/bi';
import { BiChevronRight } from 'react-icons/bi';

export default function CarouselButton({ direction, operation, disabled }) {
   const scroll = (direction === `left` ? -1 : 1);
   return (
      <button
         onClick={() => operation(scroll)}
         disabled={disabled}
         className={`btn btn-circle absolute top-[40%] ${direction === 'left' ? 'left-2' : 'right-2'} z-10 bg-base-200 border-0 text-5xl transition-all duration-200 ease-out ${disabled ? 'invisible opacity-0 cursor-not-allowed' : 'visible opacity-100'}`}
      >
         {direction === `left` ? <BiChevronLeft /> : <BiChevronRight />}
      </button>
   );
};
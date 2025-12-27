import { Link } from 'react-router';
import routes from '../routing/routes.min.js';

export default function Footer() {
   return (
      <div className='text-xs text-center text-base-content p-5 bg-base-200 over'>
         © 2025 Copyright:
         <Link 
            className='pl-1 text-base-content hover:underline' 
            to={routes.about}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
         >
            Francesco Dabbicco
         </Link>
      </div>
   );
};
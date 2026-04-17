import { Link } from 'react-router';
import routes from '../routing/routes.min.js';

export default function Footer() {
   return (
      <div className='text-xs text-center text-base-content p-5 bg-base-200 over'>
         © 2026 Copyright:
         <a 
            className='pl-1 text-base-content hover:underline' 
            href='https://evelynsimone.com'
         >
            Evelyn Simone
         </a>
      </div>
   );
};
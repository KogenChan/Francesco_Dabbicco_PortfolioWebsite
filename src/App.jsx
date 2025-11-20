import { RouterProvider } from 'react-router'
import router from './routing/router.min.js'
import './index.min.css'
import { LoadingProvider } from './context/LoadingContext.jsx';

function App() {
   return (
      <>
         <LoadingProvider>
            <RouterProvider router={router} />
         </LoadingProvider>
      </>
   );
};

export default App;
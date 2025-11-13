import { RouterProvider } from 'react-router'
import router from './routing/router.min.js'
import './index.min.css'

function App() {
   return (
      <>
         <RouterProvider router={router} />
      </>
   );
};

export default App;

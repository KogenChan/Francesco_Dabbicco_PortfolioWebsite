import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import Layout from "../layouts/GlobalLayout";
import routes from "./routes.min";
import Home from "../views/home";

const Works = lazy(() => import("../views/works"));
const Installations = lazy(() => import("../views/installations"));
const WorkDetail = lazy(() => import("../views/workDetail"));
const InstallationDetail = lazy(() => import("../views/installationDetail"));
const Contacts = lazy(() => import("../views/contacts"));
const About = lazy(() => import("../views/about"));

const LoadingFallback = () => (
   <div className="flex items-center justify-center min-h-screen">
      <div className="text-lg">Loading...</div>
   </div>
);

const router = createBrowserRouter([
   {
      path: routes.home,
      Component: Layout,
      children: [
         {
            index: true,
            Component: Home
         },
         {
            path: routes.works,
            element: (
               <Suspense fallback={<LoadingFallback />}>
                  <Works />
               </Suspense>
            )
         },
         {
            path: routes.installations,
            element: (
               <Suspense fallback={<LoadingFallback />}>
                  <Installations />
               </Suspense>
            )
         },
         {
            path: routes.workDetail,
            element: (
               <Suspense fallback={<LoadingFallback />}>
                  <WorkDetail />
               </Suspense>
            )
         },
         {
            path: routes.installationDetail,
            element: (
               <Suspense fallback={<LoadingFallback />}>
                  <InstallationDetail />
               </Suspense>
            )
         },
         {
            path: routes.contact,
            element: (
               <Suspense fallback={<LoadingFallback />}>
                  <Contacts />
               </Suspense>
            )
         },
         {
            path: routes.about,
            element: (
               <Suspense fallback={<LoadingFallback />}>
                  <About />
               </Suspense>
            )
         }
      ]
   }
]);

export default router;
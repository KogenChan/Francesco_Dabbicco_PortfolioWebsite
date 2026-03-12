import { useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { useGlobalLoading } from "../context/LoadingContext";

export default function useHashScroll() {
   const { hash } = useLocation();
   const { loadingCount } = useGlobalLoading();
   const hasScrolled = useRef(false);

   useEffect(() => {
      if (!hash) return;
      window.scrollTo(0, 0);
      hasScrolled.current = false;
   }, [hash]);

   useEffect(() => {
      if (!hash || loadingCount > 0 || hasScrolled.current) return;

      const id = hash.replace("#", "");

      setTimeout(() => {
         const el = document.getElementById(id);
         if (el) {
            hasScrolled.current = true;
            el.scrollIntoView({ behavior: "smooth" });
         }
      }, 300);
   }, [hash, loadingCount]);
};
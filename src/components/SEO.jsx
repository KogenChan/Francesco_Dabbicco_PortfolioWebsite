import { useEffect } from "react";
import { useLocation, useParams } from "react-router";

const SITE_URL = "https://francescodabbiccoart.com";

export default function SEO() {
  const { pathname } = useLocation();
  const params = useParams();

  useEffect(() => {
    let link = document.querySelector("link[rel='canonical']");
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }

    let canonical = `${SITE_URL}${pathname}`;

    if (pathname.startsWith("/opere/") && params.itemName) {
      canonical = `${SITE_URL}/opere/${params.itemName}`;
    } else if (pathname.startsWith("/installazioni/") && params.itemName) {
      canonical = `${SITE_URL}/installazioni/${params.itemName}`;
    }

    link.setAttribute("href", canonical);
  }, [pathname, params]);

  return null;
};
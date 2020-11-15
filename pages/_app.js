import "normalize.css";
import "../components/globalStyle.css";
import { loadI18n } from "../i18n";
import React, { useEffect } from "react";
import Router from "next/router";

export const dataContext = React.createContext({});

export default function App({ Component, pageProps }) {
  let { companiesList, tags, lang, langs, strings } = pageProps;

  loadI18n(lang, strings);

  useEffect(() => {
    Router.events.on("routeChangeStart", (url) => {
      if (window && window._paq) {
        window._paq.push(["setCustomUrl", url]);
        window._paq.push(["setDocumentTitle", document.title]);
        window._paq.push(["trackPageView"]);
      }
    });
  });

  return (
    <dataContext.Provider value={{ companiesList, tags, lang, langs }}>
      <Component {...pageProps} />
    </dataContext.Provider>
  );
}

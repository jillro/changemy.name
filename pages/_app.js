import "normalize.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../components/globalStyle.css";
import { loadI18n } from "../i18n";
import React from "react";

config.autoAddCss = false;

export const dataContext = React.createContext({});

export default function App({ Component, pageProps }) {
  let { companiesList, tags, lang, langs, strings } = pageProps;

  loadI18n(lang, strings);

  return (
    <dataContext.Provider value={{ companiesList, tags, lang, langs }}>
      <Component {...pageProps} />
    </dataContext.Provider>
  );
}

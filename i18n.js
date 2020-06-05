import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export function loadI18n(lang, strings) {
  return i18n.use(initReactI18next).init({
    resources: {
      [lang]: {
        translation: strings,
      },
    },
    lng: lang,
  });
}

export function localizePaths(paths) {
  return ["fr", "en"].flatMap((lang) =>
    paths.map(({ params }) => ({ params: { lang, ...params } }))
  );
}

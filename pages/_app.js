import "normalize.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import "../components/globalStyle.css";

export const dataContext = React.createContext({});

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

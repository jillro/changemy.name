import "normalize.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

import "../components/globalStyle.css";

export const dataContext = React.createContext({});

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

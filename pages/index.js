import IndexPage, { getStaticProps as langGetStaticProps } from "./[lang]";

export async function getStaticProps(context) {
  return langGetStaticProps({ params: { lang: "en" }, ...context });
}

export default IndexPage;

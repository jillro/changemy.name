import IndexPage, { getStaticProps as langGetStaticProps } from "./[lang]";
import { useRouter } from "next/router";
import { useEffect } from "react";

export async function getStaticProps(context) {
  return langGetStaticProps({ params: { lang: "en" }, ...context });
}

export default function Index(props) {
  const router = useRouter();

  useEffect(() => {
    router.push("/[lang]", "/en", { shallow: true });
  });

  return <IndexPage {...props} />;
}

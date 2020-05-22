import { getAboutPage, getAboutPages, getCompanies, getTags } from "../../lib";
import Layout from "../../components/Layout";
import React from "react";
import { dataContext } from "../_app";
import { Container } from "../../components/styleUtils";

export async function getStaticPaths() {
  return {
    paths: (await getAboutPages()).map((slug) => ({ params: { page: slug } })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  return {
    props: {
      companiesList: await getCompanies(),
      tags: await getTags(),
      page: await getAboutPage(context.params.page),
    },
  };
}

export default function CompanyPage({ companiesList, tags, page }) {
  return (
    <dataContext.Provider value={{ companiesList, tags }}>
      <Layout>
        <Container main dangerouslySetInnerHTML={{ __html: page.content }} />
      </Layout>
    </dataContext.Provider>
  );
}

import { getCompanies, getCompany, getTags } from "../lib";
import { Container } from "../components/styleUtils";
import Layout from "../components/Layout";
import Company from "../components/Company";
import React from "react";
import { dataContext } from "./_app";

export async function getStaticPaths() {
  return {
    paths: (await getCompanies()).map(({ slug }) => ({
      params: { company: slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  return {
    props: {
      companiesList: await getCompanies(),
      company: await getCompany(context.params.company),
      tags: await getTags(),
    },
  };
}

export default function CompanyPage({ companiesList, tags, company }) {
  return (
    <dataContext.Provider value={{ companiesList, tags }}>
      <Layout
        title={company.name}
        description={`Lean how to change your name and gender with ${company.name}.`}
      >
        <Container main>
          <Company company={company} />
        </Container>
      </Layout>
    </dataContext.Provider>
  );
}

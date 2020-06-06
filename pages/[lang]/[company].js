import { getCommonProps, getCompanies, getCompany } from "../../lib";
import { Container } from "../../components/styleUtils";
import Layout from "../../components/Layout";
import Company from "../../components/Company";
import React from "react";
import { localizeStaticPaths } from "../../i18n";

export async function getStaticPaths() {
  return {
    paths: localizeStaticPaths(
      (await getCompanies()).map(({ slug }) => ({
        params: { company: slug },
      }))
    ),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  return {
    props: {
      company: await getCompany(context.params.company, context.params.lang),
      ...(await getCommonProps(context)),
    },
  };
}

export default function CompanyPage({ company }) {
  return (
    <Layout
      title={company.name}
      description={`Lean how to change your name and gender with ${company.name}.`}
    >
      <Container main>
        <Company company={company} />
      </Container>
    </Layout>
  );
}

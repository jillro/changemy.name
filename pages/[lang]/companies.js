import Layout from "../../components/Layout";
import { Container } from "../../components/styleUtils";
import React from "react";
import { getCommonProps, getCompany } from "../../lib";
import { localizeStaticPaths } from "../../i18n";
import AllCompanies from "../../components/AllCompanies";

export async function getStaticPaths() {
  return {
    paths: localizeStaticPaths([{ params: {} }]),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  let commonProps = await getCommonProps(context);
  let { companiesList } = commonProps;

  let companies = await Promise.all(
    companiesList.map(({ slug }) => getCompany(slug))
  );

  return {
    props: { companies, ...commonProps },
  };
}

export default function Companies({ companies }) {
  return (
    <Layout description="prout">
      <Container main>
        <AllCompanies companies={companies} />
      </Container>
    </Layout>
  );
}

import { getCommonProps, getCompanies, getCompany } from "../../lib";
import { Container } from "../../components/styleUtils";
import Layout from "../../components/Layout";
import Company from "../../components/Company";
import React from "react";
import { localizeStaticPaths } from "../../i18n";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  return (
    <Layout
      title={company.name}
      description={t("company_meta_description", { company: company.name })}
    >
      <Container main>
        <Company company={company} />
      </Container>
    </Layout>
  );
}

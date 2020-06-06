import { getAboutPage, getAboutPages, getCommonProps } from "../../../lib";
import Layout from "../../../components/Layout";
import React from "react";
import { BlueWarning, Container } from "../../../components/styleUtils";
import { localizeStaticPaths } from "../../../i18n";
import { useTranslation } from "react-i18next";

export async function getStaticPaths() {
  return {
    paths: localizeStaticPaths(
      (await getAboutPages()).map((slug) => ({ params: { page: slug } }))
    ),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  return {
    props: {
      page: await getAboutPage(context.params.page, context.params.lang),
      ...(await getCommonProps(context)),
    },
  };
}

export default function AboutPage({ page }) {
  const { t } = useTranslation();

  return (
    <Layout title={page.title} description={page.description}>
      {page.noTranslation && (
        <Container>
          <BlueWarning>{t("no_translation")}</BlueWarning>
        </Container>
      )}
      <Container main dangerouslySetInnerHTML={{ __html: page.content }} />
    </Layout>
  );
}

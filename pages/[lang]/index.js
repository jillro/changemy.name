import {
  Card,
  Column,
  Container,
  LightCardBoard,
  Right,
  Row,
} from "../../components/styleUtils";
import Layout from "../../components/Layout";
import LastCompanies from "../../components/LastCompanies";
import { getAboutPage, getCommonProps, getCompany } from "../../lib";
import React from "react";
import { localizeStaticPaths } from "../../i18n";
import { LanguageSwitcher } from "../../components/LanguageSwitcher";

function HeaderContent({ text }) {
  return (
    <Container size="window" as="div">
      <Right>
        <LanguageSwitcher light />
      </Right>
      <Row>
        <Column collapse="600">
          <Card padding="30px">
            <img src="/logo.svg" align="left" alt=".name" />
            <style jsx>{`
              img {
                width: 185px;
                margin-top: 30px;
                margin-right: 30px;
                margin-bottom: 20px;
                display: inline;
              }
              @media (max-width: 400px) {
                img {
                  width: 100%;
                }
              }
            `}</style>
            <div dangerouslySetInnerHTML={{ __html: text }} />
          </Card>
        </Column>
        <Column
          size={1 / 4}
          style={{
            background: "url(/woman.png) no-repeat center center / contain",
          }}
        />
        <Column
          size={1 / 4}
          style={{
            background: "url(/man.png) no-repeat bottom center / contain",
          }}
        />
      </Row>
    </Container>
  );
}

export async function getStaticPaths() {
  return {
    paths: localizeStaticPaths([{ params: {} }]),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  let commonProps = await getCommonProps(context);
  let { companiesList } = commonProps;

  let homepageCompanies = (
    await Promise.all(companiesList.map(({ slug }) => getCompany(slug)))
  )
    .sort((c1, c2) => {
      return new Date(c2.updated) - new Date(c1.updated);
    })
    .slice(0, 9);

  let indexPage = await getAboutPage("index", context.params.lang);

  return {
    props: {
      homepageCompanies,
      indexPage,
      ...commonProps,
    },
  };
}

export default function Home({ homepageCompanies, indexPage }) {
  return (
    <Layout
      headerContent={<HeaderContent text={indexPage.content} />}
      description={indexPage.description}
    >
      <LightCardBoard>
        <Container main size="wide">
          <LastCompanies companiesData={homepageCompanies} />
        </Container>
      </LightCardBoard>
    </Layout>
  );
}

import Link from "next/link";
import { useRouter } from "next/router";

import {
  Bar,
  Column,
  Container,
  lightBackgound,
  PullRight,
  Row,
} from "./styleUtils";
import Footer from "./Footer";
import Search from "./Search";
import Head from "next/head";
import { dataContext } from "../pages/_app";
import React, { useContext } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";

const ToolbarLogo = (props) => (
  <div>
    <img src="/logo.svg" alt=".name" />
    <style jsx>{`
      div {
        border: 2px solid rgba(253, 246, 251, 0.3);
        padding: 0;
        border-radius: 5px;
      }

      img {
        height: 51px;
        background: ${lightBackgound};
        display: block;
        padding: 5px;
        border-radius: 3px;
      }
    `}</style>
  </div>
);

export default function Layout({
  headerContent,
  title,
  description,
  children,
}) {
  let router = useRouter();
  let { lang } = useContext(dataContext);

  let notIndex = !["/", "/[lang]"].includes(router.pathname);

  return (
    <>
      <Head>
        <title>{title ? `${title} - changemy.name` : "changemy.name"}</title>
        <meta property="og:title" content={title || "changemy.name"} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content="https://changemy.name/share_image.png?v=2"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Bar as="header">
        {headerContent}
        {notIndex && (
          <PullRight>
            <LanguageSwitcher light />
          </PullRight>
        )}
        <Container as="div">
          <Row>
            {notIndex && (
              <Column size="fixed">
                <Link href="/[lang]" as={`/${lang}`}>
                  <a>
                    <ToolbarLogo />
                  </a>
                </Link>
              </Column>
            )}
            <Column size="fill">
              <Search />
            </Column>
          </Row>
        </Container>
      </Bar>
      {children}
      <Footer />
    </>
  );
}

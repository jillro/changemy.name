import Link from "next/link";
import { useRouter } from "next/router";

import {
  Bar,
  Column,
  Container,
  Hide,
  lightBackgound,
  PullRight,
  Right,
  Row,
} from "./styleUtils";
import Footer from "./Footer";
import Search from "./Search";
import Head from "next/head";
import { dataContext } from "../pages/_app";
import React, { useContext } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { localizePath } from "../i18n";

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
  let { lang, langs } = useContext(dataContext);

  let notIndex = !["/", "/[lang]"].includes(router.pathname);

  return (
    <>
      <Head>
        <title>{title ? `${title} - changemy.name` : "changemy.name"}</title>
        <meta
          property="og:title"
          content={title ? `${title} - changemy.name` : "changemy.name"}
        />
        <meta property="og:description" content={description.trim()} />
        <meta
          property="og:image"
          content="https://changemy.name/share_image.png?v=2"
        />
        <meta name="twitter:card" content="summary_large_image" />
        {Object.keys(langs).map((code) => (
          <link
            key={code}
            rel="alternate"
            hrefLang={code}
            href={`https://changemy.name/${localizePath(router.asPath, code)}`}
          />
        ))}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
          var _paq = window._paq || [];
          /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
          _paq.push(['trackPageView']);
          _paq.push(['enableLinkTracking']);
          (function() {
          var u="//m.jillro.dev/";
          _paq.push(['setTrackerUrl', u+'matomo.php']);
          _paq.push(['setSiteId', '1']);
          var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
          g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
        })();`,
          }}
        />
      </Head>
      <Bar as="header">
        {headerContent}
        <Container as="div" style={{ marginTop: "15px", marginBottom: "15px" }}>
          <Row align="center" justify="flex-end">
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
            {notIndex && (
              <Hide under="530">
                <Column size="fixed">
                  <LanguageSwitcher light />
                </Column>
              </Hide>
            )}
          </Row>
        </Container>
      </Bar>
      {notIndex && (
        <Container style={{ marginTop: "15px" }}>
          <Hide over="530">
            <Right>
              <LanguageSwitcher />
            </Right>
          </Hide>
        </Container>
      )}
      {children}
      <Footer />
    </>
  );
}

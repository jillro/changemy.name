import Link from "next/link";
import {useRouter} from 'next/router'

import {Bar, lightBackgound} from "./styleUtils";
import Footer from "./Footer";
import {Column, Container, Row} from "./styleUtils";
import Search from "./Search";

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

export default function Layout({headerContent, companiesData, children}) {
  let router = useRouter();

  return (
    <>
      <Bar as="header">
        {headerContent}
        <Container as="div">
          <Row>
            {router.pathname !== "/" && <Column size="fixed">
              <Link href="/"><a><ToolbarLogo /></a></Link>
            </Column>}
            <Column>
              <Search companiesData={companiesData} />
            </Column>
          </Row>
        </Container>
      </Bar>
      {children}
      <Footer />
    </>
  )
}

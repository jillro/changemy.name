import React, { useContext } from "react";
import { Column, primaryColor, Row } from "./styleUtils";
import Link from "next/link";
import { dataContext } from "../pages/_app";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { CompanyGraph } from "./Company";

const ResultList = styled.ul`
  list-style: none;
  font-size: 1.5em;
  background-color: #fff;
  padding: 0;
  margin: 0 0 20px;

  li {
    margin-bottom: 22px;
  }
  a {
    color: ${primaryColor};
    text-decoration: none;
  }
`;

export const AllCompanies = ({ companies }) => {
  const { lang } = useContext(dataContext);
  const { t } = useTranslation();
  return (
    <>
      <h1>{t("all_companies")}</h1>
      <ResultList>
        {companies.map((company) => (
          <li key={company.slug}>
            <Row align="end">
              <Column size="fixed">
                <Link href="/[lang]/[company]" as={`/${lang}/${company.slug}`}>
                  <a>{company.name}</a>
                </Link>
              </Column>
              <Column size="fill">
                <div className="baseline">
                  <div className="line">
                    <CompanyGraph company={company} />
                  </div>
                </div>
                <style jsx>{`
                  .baseline::before {
                    display: inline-block;
                    height: 100%;
                    content: "";
                  }

                  .line {
                    display: inline-block;
                    width: 100%;
                    vertical-align: baseline;
                  }
                `}</style>
              </Column>
            </Row>
          </li>
        ))}
      </ResultList>
    </>
  );
};

export default AllCompanies;

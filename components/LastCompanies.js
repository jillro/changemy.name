import React, { useContext } from "react";
import { BrandName, CompanyGraph, FlagList, TagList } from "./Company";
import { Card, Column, MasonryRow, Right, Row } from "./styleUtils";
import Link from "next/link";
import { dataContext } from "../pages/_app";
import { useTranslation } from "react-i18next";

const LastCompanies = ({ companiesData }) => {
  const { lang } = useContext(dataContext);
  const { t } = useTranslation();
  return (
    <>
      <Row align="flex-end">
        <Column>
          <h1>{t("last_companies_heading")} </h1>
        </Column>
        <Column size="fill">
          <Right>
            <Link href="/[lang]/companies" as={`/${lang}/companies`}>
              <a>{t("all_companies")} ></a>
            </Link>
          </Right>
        </Column>
      </Row>
      <MasonryRow>
        {companiesData.map((company) => (
          <Column size={1 / 3} key={company.slug} collapse="300">
            <Card>
              <Link href="/[lang]/[company]" as={`/${lang}/${company.slug}`}>
                <a>
                  <BrandName>{company.name}</BrandName>
                </a>
              </Link>
              {company.countries && <FlagList countries={company.countries} />}
              <CompanyGraph company={company} />
              <TagList company={company} />
              <Right>
                <p>
                  <Link
                    href="/[lang]/[company]"
                    as={`/${lang}/${company.slug}`}
                  >
                    <a>{t("more_details")} ></a>
                  </Link>
                </p>
              </Right>
            </Card>
          </Column>
        ))}
      </MasonryRow>
    </>
  );
};

export default LastCompanies;

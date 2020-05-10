import React from 'react';
import {BrandName, CompanyGraph, TagList} from "./Company";
import {Card, Column, MasonryRow} from "./styleUtils";
import Link from "next/link";


const LastCompanies = ({companiesData, tagsData}) => (
  <>
    <h1>Last companies</h1>
    <MasonryRow>
      {Object.entries(companiesData).slice(0, 10).map(([slug, company]) => (
          <Column key={slug} collapse="300"><Card>
            <Link href="/[company]" as={`/${slug}`}><a><BrandName>{company.name}</BrandName></a></Link>
            <CompanyGraph company={company} tagsData={tagsData} />
            <TagList company={company} tagsData={tagsData} />
          </Card>
          </Column>
      ))}
    </MasonryRow>
  </>
);

export default LastCompanies;
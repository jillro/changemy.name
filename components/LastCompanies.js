import React, {useContext} from 'react';
import {BrandName, CompanyGraph, TagList} from "./Company";
import {Card, Column, MasonryRow, Right} from "./styleUtils";
import Link from "next/link";


const LastCompanies = ({companiesData}) => (
  <>
    <h1>Last companies</h1>
    <MasonryRow>
      {companiesData.map(company => (
          <Column size={1/3} key={company.slug} collapse="300"><Card>
            <Link href="/[company]" as={`/${company.slug}`}><a><BrandName>{company.name}</BrandName></a></Link>
            <CompanyGraph company={company} />
            <TagList company={company} />
            <p>
              <Right><Link href="/[company]" as={`/${company.slug}`}><a>More details ></a></Link></Right>
            </p>
          </Card></Column>
      ))}
    </MasonryRow>
  </>
);

export default LastCompanies;
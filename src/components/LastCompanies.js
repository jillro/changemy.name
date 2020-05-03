import React from 'react';
import {BrandName, TagList} from "./Company";
import {Card, Column, Row} from "./styleUtils";
import {Link} from "react-router-dom";


const LastCompanies = ({companiesData, tagsData}) => (
  <>
    <h1>Last companies</h1>
    <Row>
      {Object.entries(companiesData).slice(0, 2).map(([slug, company]) => (
          <Column key={slug} collapse="300"><Card>
            <Link to={`/${slug}`}><BrandName>{company.name}</BrandName></Link>
            <TagList company={company} tagsData={tagsData}/>
          </Card>
          </Column>
      ))}
    </Row>
  </>
);

export default LastCompanies;
import React from "react";
import styled from "styled-components";

import {badColor, blockingColor, neutralColor, okColor, primaryColor, warningColor} from './styleUtils';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBan, faCheck, faExclamationTriangle, faInfoCircle, faTimes} from "@fortawesome/free-solid-svg-icons";

export const BrandName = styled.h1`
  color: ${primaryColor};
  text-align: center;
`

const Logo = styled.img`
  max-width: 300px;
  height: auto;
  max-height: 150px;
  margin: auto;
  margin-top: 20px;
  display: block;
`

const icons = {
  "good": [faCheck, okColor],
  "information": [faInfoCircle, neutralColor],
  "warning": [faExclamationTriangle, warningColor],
  "bad": [faTimes, badColor],
  "blocking": [faBan, blockingColor],
}

const Tag = ({tag, className}) => {
  return (
    <div className={className}>
      <FontAwesomeIcon icon={icons[tag.type][0]} fixedWidth color={icons[tag.type][1]} />
      <p>{tag.labels.en}</p>
    </div>
  )
}

const TagDisplay = styled(Tag)`
  display: flex;
  justify-content: left;
  align-items: center;
  overflow: hidden;
  margin-bottom: 17px;
  
  > * {
    margin-left: 10px;
    margin-top: 0;
    margin-bottom: 0;
  }
`;

export const TagSet = ({company, tagSet}) => {
  let tags = Object.entries(tagSet.tags).filter(([slug,]) => company.tags.includes(slug));

  if (tags.length === 0) {
    return null;
  }

  return (
    <>
      <h3>{tagSet.name}</h3>
      {tags.map(([slug, tag]) => <TagDisplay key={slug} tag={tagSet.tags[slug]} />)}
    </>
  )
};

export const TagList = ({company, tagsData}) => (
  <>
    {tagsData.map(tagSet => <TagSet key={tagSet.name} company={company} tagSet={tagSet} /> )}
  </>
);

const Company = ({company, tagsData}) => {
  return (
    <>
      {company.logo && <Logo src={`/logos/${company.slug}.${company.logo}`}/>}
      <BrandName>{company.name}</BrandName>
      <TagList company={company} tagsData={tagsData} />
    </>
  )
}

export default Company;
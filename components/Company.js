import React, {useContext} from "react";
import styled from "styled-components";

import {
  badColor,
  blockingColor,
  Column,
  neutralColor,
  okColor,
  primaryColor,
  Right,
  Row,
  Separator,
  warningColor
} from './styleUtils';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBan, faCheck, faExclamationTriangle, faInfoCircle, faTimes} from "@fortawesome/free-solid-svg-icons";
import {dataContext} from "../pages/_app";

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

const TAG_TYPE_GOOD = "good"
const TAG_TYPE_INFORMATION = "information"
const TAG_TYPE_WARNING = "warning"
const TAG_TYPE_BAD = "bad"
const TAG_TYPE_BLOCKING = "blocking"

const TAG_TYPES = [
  TAG_TYPE_GOOD,
  TAG_TYPE_INFORMATION,
  TAG_TYPE_WARNING,
  TAG_TYPE_BAD,
  TAG_TYPE_BLOCKING
]

const COLORED_TAG_TYPES = [
  TAG_TYPE_GOOD,
  TAG_TYPE_WARNING,
  TAG_TYPE_BAD,
  TAG_TYPE_BLOCKING
]

const icons = {
  [TAG_TYPE_GOOD]: [faCheck, okColor],
  [TAG_TYPE_INFORMATION]: [faInfoCircle, neutralColor],
  [TAG_TYPE_WARNING]: [faExclamationTriangle, warningColor],
  [TAG_TYPE_BAD]: [faTimes, badColor],
  [TAG_TYPE_BLOCKING]: [faBan, blockingColor],
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

export const TagList = ({company}) => {
  let {tags} = useContext(dataContext);

  return (
    <>
      {tags.map(tagSet => <TagSet key={tagSet.name} company={company} tagSet={tagSet}/>)}
    </>
  )
};

export const CompanyGraph = ({company, tagsData}) => {
  let {tags} = useContext(dataContext);

  let allTags = tags.map(tagSet => tagSet.tags).reduce((tags, setTags) => ({...tags, ...setTags}), {});
  let companyColoredTagsC = company.tags.filter(tagSlug => COLORED_TAG_TYPES.includes(allTags[tagSlug].type)).length;
  let shares = {}
  for (let i = 0; i < COLORED_TAG_TYPES.length; i++) {
    let type = COLORED_TAG_TYPES[i];
    shares[type] = company.tags.filter(tagSlug => allTags[tagSlug].type === type).length / companyColoredTagsC;
  }
  return (
    <Row style={{height: '10px'}}>
      {Object.entries(shares).filter(([color, share]) => share > 0).map(([color, share]) =>
          <Column
            key={color}
            size={share}
            style={{backgroundColor: icons[color][1]}}
          />
      )}
    </Row>
  )
};

const Company = ({company}) => {
  return (
    <>
      {company.logo && <Logo src={`/logos/${company.slug}.${company.logo}`}/>}
      <BrandName>{company.name}</BrandName>
      <CompanyGraph company={company} />
      <TagList company={company} />
      <Separator />
      <div dangerouslySetInnerHTML={{__html: company.howTo }} />
      {company.updated && <Right>Last update on {(new Date(company.updated)).toLocaleDateString('en-US')}</Right>}
    </>
  )
}

export default Company;
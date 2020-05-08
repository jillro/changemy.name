import React from "react";
import styled from "styled-components";

import {primaryColor} from './styleUtils';
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
  "good": faCheck,
  "information": faInfoCircle,
  "warning": faExclamationTriangle,
  "bad": faTimes,
  "blocking": faBan,
}

const Tag = ({name, tagsData, className}) => {
  let tag = tagsData[name] || null;
  return ( tag &&
    <div className={className}>
      <FontAwesomeIcon icon={icons[tag.type]} fixedWidth />
      <p>{tagsData[name].labels.en}</p>
    </div>
  )
}

const TagDisplay = styled(Tag)`
  display: flex;
  justify-content: left;
  align-items: center;
  
  > * {
    margin-left: 10px;
  }
`;

export const TagList = ({company, tagsData}) => (
  <>
    {company.tags.map(tag => <TagDisplay key={tag} name={tag} tagsData={tagsData} />)}
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
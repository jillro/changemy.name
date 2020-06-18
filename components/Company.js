import React, { useContext } from "react";
import styled from "styled-components";

import {
  badColor,
  blockingColor,
  BlueWarning,
  Column,
  Container,
  neutralColor,
  okColor,
  primaryColor,
  PullRight,
  Right,
  Row,
  Separator,
  SROnly,
  warningColor,
} from "./styleUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faCheck,
  faExclamationTriangle,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { dataContext } from "../pages/_app";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export const BrandName = styled.h1`
  color: ${primaryColor};
  text-align: center;
`;

const Logo = styled.img`
  width: 300px;
  height: auto;
  max-height: 150px;
  margin: 30px auto;
  display: block;
`;

const TAG_TYPE_GOOD = "good";
const TAG_TYPE_INFORMATION = "information";
const TAG_TYPE_WARNING = "warning";
const TAG_TYPE_BAD = "bad";
const TAG_TYPE_BLOCKING = "blocking";

const TAG_TYPES = [
  TAG_TYPE_GOOD,
  TAG_TYPE_INFORMATION,
  TAG_TYPE_WARNING,
  TAG_TYPE_BAD,
  TAG_TYPE_BLOCKING,
];

const COLORED_TAG_TYPES = [
  TAG_TYPE_GOOD,
  TAG_TYPE_WARNING,
  TAG_TYPE_BAD,
  TAG_TYPE_BLOCKING,
];

const icons = {
  [TAG_TYPE_GOOD]: [faCheck, okColor],
  [TAG_TYPE_INFORMATION]: [faInfoCircle, neutralColor],
  [TAG_TYPE_WARNING]: [faExclamationTriangle, warningColor],
  [TAG_TYPE_BAD]: [faTimes, badColor],
  [TAG_TYPE_BLOCKING]: [faBan, blockingColor],
};

const Tag = ({ tag, className }) => {
  const { lang } = useContext(dataContext);
  return (
    <div className={className}>
      <FontAwesomeIcon
        icon={icons[tag.type][0]}
        fixedWidth
        color={icons[tag.type][1]}
      />
      <p>{tag.labels[lang]}</p>
    </div>
  );
};

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

export const TagSet = ({ company, tagSet }) => {
  const { lang } = useContext(dataContext);
  let tags = Object.entries(tagSet.tags).filter(([slug]) =>
    company.tags.includes(slug)
  );

  if (tags.length === 0) {
    return null;
  }

  return (
    <>
      <h3>{tagSet.labels[lang] || tagSet.name}</h3>
      {tags.map(([slug, tag]) => (
        <TagDisplay key={slug} tag={tagSet.tags[slug]} />
      ))}
    </>
  );
};

export const TagList = ({ company }) => {
  let { tags } = useContext(dataContext);

  return (
    <>
      {tags.map((tagSet) => (
        <TagSet key={tagSet.name} company={company} tagSet={tagSet} />
      ))}
    </>
  );
};

export const CompanyGraph = ({ company, tagsData }) => {
  let { tags } = useContext(dataContext);

  let allTags = tags
    .map((tagSet) => tagSet.tags)
    .reduce((tags, setTags) => ({ ...tags, ...setTags }), {});
  let types = company.tags
    .map((tagSlug) => allTags[tagSlug].type)
    .filter((type) => COLORED_TAG_TYPES.includes(type));

  let shares = Object.fromEntries(COLORED_TAG_TYPES.map((color) => [color, 0]));

  if (types.includes(TAG_TYPE_BLOCKING)) {
    shares[TAG_TYPE_BLOCKING] = 1;
  } else {
    for (let i = 0; i < COLORED_TAG_TYPES.length; i++) {
      let type = COLORED_TAG_TYPES[i];
      shares[type] =
        types.filter((tagType) => tagType === type).length / types.length;
    }
  }
  return (
    <Row style={{ height: "10px" }}>
      {Object.entries(shares)
        .filter(([color, share]) => share > 0)
        .map(([color, share]) => (
          <Column
            key={color}
            size={share}
            style={{ backgroundColor: icons[color][1] }}
          />
        ))}
    </Row>
  );
};

const Flag = styled.img`
  height: 16px;
  border-radius: 2px;
`;

export const FlagList = ({ countries }) => (
  <PullRight style={{ marginTop: "-26px" }}>
    {countries.map((country) => (
      <Flag
        alt={`${country} flag`}
        src={`/flags/${country}.svg`}
        key={country}
        title={country}
      />
    ))}
  </PullRight>
);

const Company = ({ company }) => {
  const { t } = useTranslation();
  const { lang } = useContext(dataContext);
  return (
    <>
      {company.logo && (
        <Logo
          src={`/logos/${company.slug}.${company.logo}`}
          alt={`${company.name} logo`}
        />
      )}
      {company.name_in_logo ? (
        <SROnly>
          <BrandName>{company.name}</BrandName>
        </SROnly>
      ) : (
        <BrandName>{company.name}</BrandName>
      )}

      {company.countries && <FlagList countries={company.countries} />}
      <CompanyGraph company={company} />
      <TagList company={company} />
      <Separator />
      {company.content && (
        <>
          {company.noTranslation && (
            <Container>
              <BlueWarning>{t("no_translation")}</BlueWarning>
            </Container>
          )}
          <div dangerouslySetInnerHTML={{ __html: company.content }} />
        </>
      )}
      {company.updated && (
        <Right>
          <p>
            {t("last_update", {
              date: new Date(company.updated).toLocaleDateString(lang, {
                day: "numeric",
                month: "long",
                year: "numeric",
              }),
            })}
          </p>
          <p>
            <Link href="/[lang]/about/[page]" as={`/${lang}/about/how`}>
              <a>{t("report_error")}</a>
            </Link>
          </p>
        </Right>
      )}
    </>
  );
};

export default Company;

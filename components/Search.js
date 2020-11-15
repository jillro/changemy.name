import React, { useContext, useState } from "react";
import styled from "styled-components";

import { primaryColor, SROnly } from "./styleUtils";
import { Search as SearchIcon } from "react-feather";
import Fuse from "fuse.js";
import Link from "next/link";
import { dataContext } from "../pages/_app";
import { useTranslation } from "react-i18next";

const ResultList = styled.ul`
  list-style: none;
  margin: 0;
  font-size: 1.5em;
  position: absolute;
  background-color: #fff;
  border: 1px solid #bababa;
  border-top: 0;
  border-radius: 3px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  margin-left: calc(50px / 3);
  padding-inline-start: calc(100px / 3);
  padding-inline-end: calc(100px / 3);

  a {
    color: ${primaryColor};
    text-decoration: none;
  }
`;
const InputContainer = styled.div`
  background-color: #fff;
  border: 1px solid #bababa;
  border-radius: 3px;
  transition: 0.2s;
  margin: 1px;
  min-height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: calc(50px / 3);
`;

const TextInput = styled.input`
  padding-left: calc(50px / 3);
  padding-right: calc(50px / 3);
  border: 0;
  width: 100%;
  min-height: 50px;
  display: flex;
  outline: none;
`;

const SearchInput = (props) => {
  return (
    <InputContainer>
      <SearchIcon />
      <SROnly>Search </SROnly>
      <TextInput {...props} size="1" />
    </InputContainer>
  );
};

const SearchResults = ({ query, resetSearch }) => {
  const { t } = useTranslation();
  let { companiesList, lang } = useContext(dataContext);
  let fuse = new Fuse(companiesList, { keys: ["name"], minMatchCharLength: 2 });
  let results = fuse.search(query).map((c) => c.item);

  return (
    <ResultList>
      <li key="resultCount">
        {t("search_results", { count: results.length })}
      </li>
      {results.map((c) => (
        <li key={c.slug}>
          <Link href="/[lang]/[company]" as={`/${lang}/${c.slug}`}>
            <a onClick={resetSearch}>{c.name}</a>
          </Link>
        </li>
      ))}
    </ResultList>
  );
};

const Search = () => {
  const [query, setQuery] = useState("");
  const { t } = useTranslation();

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <SearchInput
          type="text"
          placeholder={t("search_placeholder")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
      {query !== "" && (
        <SearchResults query={query} resetSearch={() => setQuery("")} />
      )}
    </>
  );
};

export default Search;

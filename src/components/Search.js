import {Link} from "react-router-dom";
import React from "react";
import styled from "styled-components";

import {primaryColor, SROnly} from './styleUtils';
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Fuse from "fuse.js";

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
`
const InputContainer = styled.div`
  background-color: #fff;
  border: 1px solid #bababa;
  border-radius: 3px;
  transition: .2s;
  margin: 1px;
  min-height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: calc(50px / 3);
`

const TextInput = styled.input`
  padding-left: calc(50px / 3);
  padding-right: calc(50px / 3);
  border: 0;
  width: 100%;
  min-height: 50px;
  display: flex;
  outline: none;
`

const SearchInput = (props) => {
  return (
    <InputContainer>
      <FontAwesomeIcon icon={faSearch}/>
      <SROnly>Search </SROnly>
      <TextInput {...props} />
    </InputContainer>
  )
}

const SearchResults = ({companies, query, resetSearch}) => {
  let list = Object.entries(companies).map(([slug, c]) => ({slug, ...c}));
  let fuse = new Fuse(list, {keys: ["name"], minMatchCharLength: 2});
  let results = fuse.search(query).map(c => c.item);

  return (
    <ResultList>
      <li key="resultCount">{results.length} results</li>
      {results.map(c =>
        <li key={c.slug}>
          <Link to={`/${c.slug}`} onClick={resetSearch}>{c.name}</Link>
        </li>
      )}
    </ResultList>
  )
}

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
  }

  queryChange = (e) => {
    this.setState({query: e.target.value});
  };

  render() {
    return (
      <>
        <form onSubmit={(e) => e.preventDefault()}>
          <SearchInput
            type="text"
            placeholder="Search company name..."
            value={this.state.query}
            onChange={this.queryChange}
          />
        </form>
        { this.props.dataReady && this.state.query !== '' &&
          <SearchResults companies={this.props.companies} query={this.state.query} resetSearch={() => this.setState({query: ''})}/>
        }
      </>
    )
  }
}

export default Search;
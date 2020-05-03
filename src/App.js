import React from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import YAML from "yaml";

import {Bar, Card, Column, Container, lightBackgound, LightCardBoard, Row} from "./components/styleUtils";
import Company from "./components/Company";
import Search from "./components/Search";
import Footer from "./components/Footer";

import companiesFile from "./data/companies.yml";
import tagsFile from "./data/tags.yml";

import './App.css';
import LastCompanies from "./components/LastCompanies";
import logo from './logo.svg';

const ToolbarLogo = (props) => (
  <div style={{
    border: '2px solid rgba(253, 246, 251, 0.3)',
    padding: 0,
    borderRadius: '5px'
  }}>
  <img src={logo}
       style={{
         height: '51px',
         background: lightBackgound,
         display: 'block',
         padding: '5px',
         borderRadius: '3px'
       }}
       alt=".name" />
  </div>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataReady: false
    }
  }

  componentDidMount = async () => {
    let responses = await Promise.all([
      fetch(companiesFile),
      fetch(tagsFile),
    ]);
    let [companies, tags] = await Promise.all(responses.map(async r => YAML.parse(await r.text())));

    this.setState({dataReady: true, companies, tags});
  }

  render() {
    return (
      <Router>
        <Bar as="header">
          <Route exact path="/">
            <Container size="window" as="div">
              <Row>
                <Column collapse="600"><Card padding="30px">
                  <img src={logo}
                       style={{
                         height: '200px',
                         marginTop: '30px',
                         marginRight: '30px',
                         marginBottom: '10px',
                         display: 'inline'
                       }}
                       align="left"
                       alt=".name" />
                  <p>
                    Hundreds of websites and companies keep our personal informations in their databases.
                    Those informations are sometimes public to other people on the Internet.
                  </p><p>
                    Changing public identity, names and gender, is one of the complicated tasks of gender transition.
                    In most countries in the world, there are many legal obstacles. But another difficulty is
                    that most companies assume their clients names and gender cannot change.
                  </p><p>
                    In our opinion, a company or service inclusive to trans people should&nbsp;:
                  </p><ul>
                    <li>allow people to change their names and gender with a simple form and without asking
                      legal proof</li>
                    <li>not force people to disclose they are trans to other users, clients or company
                      employees</li>
                    <li>in particular, never disclose their former name</li>
                  </ul>
                </Card></Column>
                <Column size={1/4} style={{background: 'url(/woman.png) no-repeat center center / contain'}} />
                <Column size={1/4} style={{background: 'url(/man.png) no-repeat bottom center / contain'}} />
              </Row>
            </Container>
          </Route>
          <Container as="div">
            <Row>
              <Switch><Route exact path="/" /><Route path="/">
                <Column size="fixed">
                  <Link to="/"><ToolbarLogo /></Link>
                </Column>
              </Route></Switch>
              <Column>
                <Search {...this.state} />
              </Column>
            </Row>
          </Container>
        </Bar>
        {this.state.dataReady &&
          <Switch>
            <Route exact path="/">
              <LightCardBoard>
                <Container main size="wide">
                  <LastCompanies companiesData={this.state.companies} tagsData={this.state.tags}/>
                </Container>
              </LightCardBoard>
            </Route>
            <Route path="/:slug">
              <Container main>
                <Company companiesData={this.state.companies} tagsData={this.state.tags}/>
              </Container>
            </Route>
          </Switch>
        }
        <Footer />
      </Router>
    );
  }
}

export default App;

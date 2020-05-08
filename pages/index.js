import {Card, Column, Container, LightCardBoard, Row} from "../components/styleUtils";
import Layout from "../components/Layout";
import LastCompanies from "../components/LastCompanies";
import {getData} from "../lib";


function HeaderContent() {
  return (
    <Container size="window" as="div">
        <Row>
          <Column collapse="600"><Card padding="30px">
            <img src="/logo.svg" align="left" alt=".name" />
            <style jsx>{`
              img {
                height: 200px;
                margin-top: 30px;
                margin-right: 30px;
                margin-bottom: 10px;
                display: inline;
              }
            `}</style>
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
  );
}

export async function getStaticProps(context) {
  return {props: getData()};
}

export default function Home({companies, tags}) {
  return (
    <Layout headerContent={<HeaderContent />} companiesData={companies} tagsData={tags}>
      <LightCardBoard>
        <Container main size="wide">
          <LastCompanies companiesData={companies} tagsData={tags}/>
        </Container>
      </LightCardBoard>
    </Layout>
  )
}

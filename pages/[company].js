import {getData} from "../lib";
import {Container} from "../components/styleUtils";
import Layout from "../components/Layout";
import Company from "../components/Company";

export async function getStaticPaths() {
  return {
    paths: Object.keys(getData().companies).map(slug => ({params: {company: slug}})),
    fallback: false
  }
}

export async function getStaticProps(context) {
  let data = getData();
  return {
    props: {
      company: {slug: context.params.company, ...data.companies[context.params.company]},
      ...data
    }
  }
}

export default function CompanyPage({tags, companies, company}) {
  return (
    <Layout tagsData={tags} companiesData={companies}>
      <Container main>
        <Company company={company} tagsData={tags}/>
      </Container>
    </Layout>
  )
}
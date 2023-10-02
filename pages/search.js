import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import axios from 'axios';

export default function Home({question,answer}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
    <form method='get' action='/search'>
    <input type="text" placeholder={question} id="question" name="question" />
    <button type="submit">Ask</button>
    </form>
    {answer && <div>The answer is {answer}</div>}
    </Layout>
  );
}

export async function getServerSideProps(ctx) {   
    let answer = false;
    let question = '';
    if(ctx.query.question) {
        question = ctx.query.question
        answer = await askQuestion(question)
    }
  return {
    props: {
        question,
      answer
    },
  };
}

async function askQuestion(question){
    const encoded = (question.replaceAll(" ","+").replaceAll("?",""))
    console.log(encoded)
    const url = "http://api.wolframalpha.com/v1/result?appid=YLHWUK-UXJLQR7LJ4&i="+encoded;
    const res = await axios.get(url).catch(error => {console.error(error)})
    if(res) return res.data;
    return false;
}
import Head from 'next/head';
import { useState, useEffect } from 'react';
import CKeditor from '../../components/CKeditor';
import styles from './write.module.css'
import Layout from '../../components/layout';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import awsExports from '../../src/aws-exports';
Amplify.configure(awsExports);

export default function Write() {
    const [title,setTitle] = useState("");
    const [id,setId] = useState('');
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [data, setData] = useState("");

    useEffect(() => {
      setEditorLoaded(true);
    }, []);

  return (
    <Layout>
      <Head>
        <title>Write a new blog post here</title>
      </Head>
        <Authenticator LoginMechanisms={['email']} hideSignUp={true}>
        <h1>Write a new blog post</h1>
        <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} className={styles.titleInput} placeholder='Type your title here'/>
        <input type="text" value={id} onChange={(e)=>setId(e.target.value)} className={styles.titleInput} placeholder='set a unique filename'/>
        <button name="post" onClick={()=>createPost(data)} className={styles.postButton}>Post</button>
        <div>
          <CKeditor
            name="description"
            onChange={(data) => {
              setData(data);
            }}
            editorLoaded={editorLoaded}
          />
          {JSON.stringify(data)}
        </div>
        </Authenticator>
    </Layout>
  );
}

async function createPost(data) {
  console.log(data)
  const res = await fetch('../api/write', {
    method: 'POST',
    body: data
  })

  if (!res.ok) console.error(await res.text())
}
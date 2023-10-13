import Head from 'next/head';
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react';
import CKeditor from '../../components/CKeditor';
import styles from './write.module.css'
import Layout from '../../components/layout';

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor").then((mod) => mod.default),
    { ssr: false }
  );
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
      <h1>Write a new blog post</h1>
      <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} className={styles.titleInput} placeholder='Type your title here'/>
      <input type="text" value={id} onChange={(e)=>setId(e.target.value)} className={styles.titleInput} placeholder='set a unique filename'/>
      <button name="post" onClick={()=>createPost(data)} className={styles.postButton}>Post</button>
      <div style={{minHeight:"600px"}}>
        <CKeditor
          name="description"
          onChange={(data) => {
            setData(data);
          }}
          editorLoaded={editorLoaded}
        />
         {JSON.stringify(data)}
      </div>
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
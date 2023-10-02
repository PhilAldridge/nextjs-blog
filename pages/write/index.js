import Head from 'next/head';
import dynamic from 'next/dynamic'
import { useState } from 'react';
import styles from './write.module.css'
import Layout from '../../components/layout';

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor").then((mod) => mod.default),
    { ssr: false }
  );
export default function Write() {
    const [value, setValue] = useState("**Hello world!!!**");
    const [title,setTitle] = useState("");
    const [id,setId] = useState('');

    const combinedMdString = `---
title: '` + title + `'
id: ` + id +`
date: '`+ (new Date).toISOString().split('T')[0] +`'
---
` + value;

  return (
    <Layout>
      <Head>
        <title>Write a new blog post here</title>
      </Head>
      <h1>Write a new blog post</h1>
      <h3>Write your post on the left side and see what the formatting will look like on the right</h3>
      <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} className={styles.titleInput} placeholder='Type your title here'/>
      <input type="text" value={id} onChange={(e)=>setId(e.target.value)} className={styles.titleInput} placeholder='set a unique filename'/>
      <button name="post" onClick={()=>createPost(combinedMdString)} className={styles.postButton}>Post</button>
      <div className="container">
        <MDEditor
            value={value}
            onChange={setValue}
            className={styles.mdEditor}
        />
      </div>
    </Layout>
  );
}

async function createPost(combinedMdString) {
  console.log(combinedMdString)
  const res = await fetch('../api/write', {
    method: 'POST',
    body: combinedMdString
  })

  if (!res.ok) console.error(await res.text())
}
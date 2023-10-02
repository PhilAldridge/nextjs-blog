import { writeFile } from 'fs/promises'
import { NextResponse } from 'next/server'
import matter from 'gray-matter'
import path from 'path'

export default async function POST(request,res) {
  const data = request.body;

  if (!data) {
    return res.json({ success: false })
  }

  const matterResult = matter(data);
  const newFileName = matterResult.data.id+".md"
  const postsDirectory = path.join(process.cwd(), 'posts');
  const fullPath = path.join(postsDirectory,newFileName);
  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  await writeFile(fullPath, data)
  console.log(`open ${path} to see the uploaded file`)

  res.json({ success: true })
}
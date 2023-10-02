import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'posts');

export default function createPost(mdString) {
    const matterResult = matter(mdString);
    const newFileName = matterResult.data.id+".md"
    fs.appendFileSync(path.join(postsDirectory,newFileName), mdString)
}
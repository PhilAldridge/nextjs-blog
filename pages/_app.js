import '../styles/globals.css';
//import '@uiw/react-md-editor/dist/markdown-editor.css';
//import '@uiw/react-markdown-preview/dist/markdown.css';
import '../styles/markdown.min.css'
import '../styles/mdeditor.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
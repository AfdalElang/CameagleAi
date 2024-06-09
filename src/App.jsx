
import './App.css';
import { requestToGroqAI } from "./util/groq";
import {useState} from "react";
import {Light as SyntaxHighlight} from "react-syntax-highlighter";
import {darcula} from"react-syntax-highlighter/dist/cjs/styles/prism";
function App() {
  const [data, setData] = useState("");
  const handleSubmit = async() => {
    const ai = await requestToGroqAI(content.value);
    setData(ai);
  };
  return (
    <main className="flex flex-col min-h-[80vh] justify-center items-center max-w-xl w-full mx-auto">
      <h1 className="text-4xl text-indigo-500">Cameagle      |     AI</h1>
      <form className="flex flex-col gap-4 py-4 w-full">
        <input placeholder="ketik perimintaan disini..."
        className="py-2 px-4 text-md rounded-md"
        id="content"
        type="text"
        />
        <button 
        className="bg-indigo-500 py-2 px-4 font-bold text-white rounded-md"
        onClick={handleSubmit}
        type="button"
        >
          Kirim
          </button>
      </form>
      <div className='max-w-xl w-full mx-auto'>
        {data ?
      <SyntaxHighlight style={darcula} className='text-white' wrapLongLines={true}>{data.toString()}</SyntaxHighlight> : null}
      </div>
    </main>
  )
}
export default App

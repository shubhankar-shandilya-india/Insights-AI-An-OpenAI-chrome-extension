import { useState } from 'react';
import './App.css';

function App() {
  const [result, setResult] = useState("");
  const [input, setInput] = useState("");
  const handleInput = (e) => {
    setInput(e.target.value);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const GPT_API_KEY = process.env.REACT_APP_GPT_API_KEY;
    const API_URL = 'https://api.openai.com/v1/completions';
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GPT_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo-instruct',
        prompt: input,
        max_tokens: 80,
        temperature: 0,
      }),
    })
      .then(response => response.json())
      .then(data => setResult(data.choices[0].text))
      .catch(error => console.error(error));
  };
  return (
    <div className='bg-slate-900 p-4 flex flex-col shadow-sm w-[22rem]'>
      <h1 className='text-2xl text-white font-bold mb-2'>Insights AI</h1>
      <h2 className='text-lg text-white mb-2'>Enter your Doubt/Query</h2>
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <input type="text" onChange={handleInput} value={input} className='border-2 border-slate-300 rounded-md p-2 focus:outline-none focus:border-slate-400 mb-2' />
        <p className='text-md text-white mb-2'>{result}</p>
        <button type="submit" className='bg-white text-slate-900 rounded-md py-2 hover:bg-slate-100 font-bold'>Submit</button>
      </form>
    </div>
  );
}

export default App;

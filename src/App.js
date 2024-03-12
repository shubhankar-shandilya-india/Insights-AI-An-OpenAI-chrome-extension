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
        max_tokens: 40,
        temperature: 0,
      }),
    })
      .then(response => response.json())
      .then(data => setResult(data.choices[0].text))
      .catch(error => console.error(error));
  };
  return (
    <div className='bg-rose-100 p-4 flex flex-col shadow-sm w-72'>
      <h1 className='text-2xl text-rose-500 font-bold mb-2'>Insights AI</h1>
      <h2 className='text-lg text-rose-400 mb-2'>Enter your Doubt/Query</h2>
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <input type="text" onChange={handleInput} value={input} className='border-2 border-rose-200 rounded-md p-2 focus:outline-none focus:border-rose-300 mb-2' />
        <p className='text-md text-neutral-700 mb-2'>{result}</p>
        <button type="submit" className='bg-rose-500 text-white rounded-md py-2 hover:bg-rose-400 transition-colors duration-300'>Submit</button>
      </form>
    </div>
  );
}

export default App;

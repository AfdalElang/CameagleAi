import './App.css'
import { requestToGroqAI } from './util/groq'
import { useState } from 'react'

function App() {
  const [inputValue, setInputValue] = useState('')
  const [data, setData] = useState('')

  const handleSubmit = async () => {
    try {
      const aiResponse = await requestToGroqAI(inputValue)
      setData(aiResponse)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <main className='flex flex-col min-h-[80vh] justify-center items-center max-w-xl w-full mx-auto'>
      <h1 className='text-4xl text-indigo-500'>Cameagle | AI</h1>
      <form
        className='flex flex-col w-full gap-4 py-4'
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        <input
          placeholder='Ketik permintaan di sini...'
          className='px-4 py-2 rounded-md text-md'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          type='text'
        />
        <button
          className='px-4 py-2 font-bold text-white bg-indigo-500 rounded-md'
          type='submit'
          onClick={handleSubmit}
        >
          Kirim
        </button>
      </form>
      <div className='w-full max-w-xl mx-auto'>
        {data ? (
          <div
            className='w-[100%] h-fit text-white bg-[#383A59] rounded-md p-5 text-left'
            dangerouslySetInnerHTML={{ __html: data }}
          />
        ) : null}
      </div>
    </main>
  )
}

export default App

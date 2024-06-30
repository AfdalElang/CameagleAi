import './App.css'
import { requestToGroqAI } from './util/groq'
import { useState } from 'react'

function App() {
  const [inputValue, setInputValue] = useState('')
  const [conversationHistory, setConversationHistory] = useState([])
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const prompt = conversationHistory.map(entry => `User: ${entry.user}\nAI: ${entry.ai}`).join('\n') + `\nUser: ${inputValue}`

    try {
      const aiResponse = await requestToGroqAI(prompt)
      setConversationHistory(prevHistory => [
        { user: inputValue, ai: aiResponse },
        ...prevHistory
      ])
      setInputValue('')
      setError('')
    } catch (error) {
      console.error('Error fetching data:', error)
      setError('Error fetching data. Please try again.')
    }
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  return (
    <main className='flex flex-col min-h-[80vh] justify-center items-center max-w-xl w-full mx-auto'>
      <h1 className='text-4xl text-indigo-500'>Cameagle | AI</h1>
      <form className='flex flex-col w-full gap-4 py-4' onSubmit={handleSubmit}>
        <input
          placeholder='Ketik permintaan di sini...'
          className='px-4 py-2 rounded-md text-md'
          value={inputValue}
          onChange={handleInputChange}
          type='text'
        />
        <button className='px-4 py-2 font-bold text-white bg-indigo-500 rounded-md' type='submit'>
          Kirim
        </button>
      </form>
      <div className='w-full max-w-xl mx-auto'>
        {conversationHistory.map((entry, index) => (
          <div key={index} className='mb-4'>
            <div className='w-[100%] h-fit text-[#F1FA8C] bg-[#44475A] rounded-md p-5 text-left mb-2'>
              {entry.user}
            </div>
            <div
              className='w-[100%] h-fit text-white bg-[#383A59] rounded-md p-5 text-left'
              dangerouslySetInnerHTML={{ __html: entry.ai }}
            ></div>
          </div>
        ))}
        {error && <p className='text-red-500'>{error}</p>}
      </div>
    </main>
  )
}

export default App

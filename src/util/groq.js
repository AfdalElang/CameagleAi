// Import necessary modules
import { Groq } from 'groq-sdk'
import { marked } from 'https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js'

// Retrieve the Groq API key from environment variables
const GROQ_API = import.meta.env.VITE_GROQ

// Initialize the Groq instance with the API key and allow browser usage
const groq = new Groq({
  apiKey: GROQ_API,
  dangerouslyAllowBrowser: true
})

// Initialize conversation history
let conversationHistory = [
  {
    role: 'system',
    content: 'you are cameagle AI, ai that created by afdal elang, your role is Everyone virtual boyfriend . You will answer questions with a little banter. You are an AI who can provide any solution that the user needs, and you always use Indonesian language. if anyone ask about your gf the answer is camel.'
  }
]

// Define the function to send a request to Groq AI and process the response
export const requestToGroqAI = async (content) => {
  try {
    // Add the new user message to the conversation history
    conversationHistory.push({
      role: 'user',
      content
    })

    // Send a chat completion request to the Groq API
    const reply = await groq.chat.completions.create({
      messages: conversationHistory,
      model: 'mixtral-8x7b-32768', // Specify the model to use
      temperature: 0.7 // Set the temperature for response variability
    })

    // Get the response message content
    const answerContent = reply.choices[0].message.content

    // Add the AI response to the conversation history
    conversationHistory.push({
      role: 'assistant',
      content: answerContent
    })

    // Parse the response content as Markdown
    const answer = marked(answerContent)

    // Return the formatted answer
    return answer
  } catch (error) {
    console.error('Error communicating with Groq AI:', error)
    throw error
  }
}

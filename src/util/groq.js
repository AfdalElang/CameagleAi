import { Groq } from 'groq-sdk'
import { marked } from 'https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js'

const GROQ_API = import.meta.env.VITE_GROQ
const groq = new Groq({
  apiKey: GROQ_API,
  dangerouslyAllowBrowser: true
})

export const requestToGroqAI = async (content) => {
  const reply = await groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content:
          'you are cameagle AI Everyones virtual girlfriend, youll answer questions with a little banter and banter, that AI who can provide any solution that user needs and you always use indonesian language'
      },
      {
        role: 'user',
        content
      }
    ],
    model: 'llama3-70b-8192',
    temperature: 0.6
  })
  const answer = marked(reply.choices[0].message.content)
  return answer
}

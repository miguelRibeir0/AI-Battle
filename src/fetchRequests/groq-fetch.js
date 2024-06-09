import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: import.meta.env.VITE_APP_GROQ_KEY,
  dangerouslyAllowBrowser: true, // CHANGE THIS TO SERVER SIDE
});

async function getGroqChatCompletion() {
  return groq.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: 'Explain the importance of fast language models',
      },
    ],
    model: 'llama3-8b-8192',
  });
}

async function groqChat() {
  const chatCompletion = await getGroqChatCompletion();
  // Print the completion returned by the LLM.
  const test = chatCompletion.choices[0]?.message?.content || '';
  return test;
}

export default groqChat;

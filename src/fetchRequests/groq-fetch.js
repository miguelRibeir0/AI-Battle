import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_KEY,
  dangerouslyAllowBrowser: true, // CHANGE THIS TO SERVER SIDE
});

async function getMetaChat() {
  return groq.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: 'Explain the importance of fast language models',
      },
    ],
    model: 'llama3-8b-8192',
    max_tokens: 200,
  });
}

async function getMetaChat2() {
  return groq.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: 'Why is the sky blue?',
      },
    ],
    model: 'llama3-70b-8192',
    max_tokens: 200,
  });
}

async function getMistralChat() {
  return groq.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: 'Explain the importance of fast language models',
      },
    ],
    model: 'mixtral-8x7b-32768',
    max_tokens: 200,
  });
}
async function getGoogleChat() {
  return groq.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: 'Why is the sky blue?',
      },
    ],
    model: 'gemma-7b-it',
    max_tokens: 200,
  });
}

async function metaChat() {
  const chatCompletion = await getMetaChat();
  // Print the completion returned by the LLM.
  const ans = chatCompletion.choices[0]?.message?.content || '';
  return ans;
}

async function metaChat2() {
  const chatCompletion = await getMetaChat2();
  // Print the completion returned by the LLM.
  const ans = chatCompletion.choices[0]?.message?.content || '';
  return ans;
}

async function mistralChat() {
  const chatCompletion = await getMistralChat();
  // Print the completion returned by the LLM.
  const ans = chatCompletion.choices[0]?.message?.content || '';
  return ans;
}

async function googleChat() {
  const chatCompletion = await getGoogleChat();
  // Print the completion returned by the LLM.
  const ans = chatCompletion.choices[0]?.message?.content || '';
  return ans;
}

export { metaChat, metaChat2, mistralChat, googleChat };

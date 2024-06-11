import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_KEY,
  dangerouslyAllowBrowser: true, // CHANGE THIS TO SERVER SIDE
});

// model list: LLaMA3 8b , LLaMA3 70b , Mixtral 8x7b , Gemma 7b

async function getGroqChat(model, prompt) {
  return groq.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: model,
    max_tokens: 200,
  });
}

async function groqChat(model, prompt) {
  const chatCompletion = await getGroqChat(model, prompt);
  // Print the completion returned by the LLM.
  const ans = chatCompletion.choices[0]?.message?.content || '';
  return ans;
}

export { groqChat };

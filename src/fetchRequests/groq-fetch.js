import Groq from 'groq-sdk';
import { system } from '../prompt-model';

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_KEY,
  dangerouslyAllowBrowser: true, // CHANGE THIS TO SERVER SIDE
});

const systemChange =
  'Criar programa que efetue cálculo de operações matemáticas simples (adição, subtração, multiplicação, divisão) de dois valores, em que o operador e os valores são recebidos por SYSIN, apresentando o resultado da operação via display.';

// model list: LLaMA3 8b , LLaMA3 70b , Mixtral 8x7b , Gemma 7b

async function getGroqChat(model, prompt) {
  return groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: systemChange == prompt ? system[1] : system[0],
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: model,
    max_tokens: undefined,
  });
}

async function groqChat(model, prompt) {
  const chatCompletion = await getGroqChat(model, prompt);
  // Print the completion returned by the LLM.
  const ans = chatCompletion.choices[0]?.message?.content || '';
  return ans;
}

export { groqChat };

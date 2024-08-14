import Groq from 'groq-sdk';
import { system } from '../prompt-model';

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_KEY,
  dangerouslyAllowBrowser: true, // CHANGE THIS TO SERVER SIDE
});

const systemChange = [
  `
UNLOAD de dados da tabela TAB01_TABELA01 para obter os campos CATEGORIA1, CATEGORIA2, CATEGORIA3, CATEGORIA4, CATEGORIA5 para o ficheiro de output TBLL.S.TBLLD001.TAB01. 
No acesso à tabela devem ser considerados os seguintes critérios:
campo TIPO = 'Contrato'
campo MONTANTE > 100000
campo DATA > '2024-01-01'
`,

  `Criar programa COBOL que efetue cálculo de operações matemáticas simples (adição, subtração, multiplicação, divisão) de dois valores, em que o operador e os valores são recebidos por SYSIN, apresentando o resultado da operação via display.`,
];

function getGroqChat(model, prompt) {
  const systemMatch = (prompt) => {
    if (systemChange[0] == prompt) {
      return system[0];
    }
    if (systemChange[1] == prompt) {
      return system[2];
    }
    return system[1];
  };

  return groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: systemMatch(prompt),
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

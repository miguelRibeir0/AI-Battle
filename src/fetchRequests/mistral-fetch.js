import MistralClient from '@mistralai/mistralai';

const apiKey = import.meta.env.VITE_APP_MISTRAL_KEY;

const client = new MistralClient(apiKey);

const chatResponse = async () => {
  const ans = await client.chat({
    model: 'mistral-large-latest',
    messages: [
      {
        role: 'user',
        content: 'Explain the importance of fast language models',
      },
    ],
  });
  return ans.choices[0].message.content;
};

export default chatResponse;

import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.AZURE_API_KEY;
const endpoint = process.env.AZURE_ENDPOINT;

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${apiKey}`,
};

const data = {
  model: 'gpt-4',
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'Hello, how can you assist me today?' },
  ],
  max_tokens: 150,
};

const testgpt = async () => {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log('Response:', result.choices[0].message.content);
  } catch (error) {
    console.error('Error:', error);
  }
};

testgpt();

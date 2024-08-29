const server = import.meta.env.VITE_SERVER;

const startBattle = async (
  modelA,
  modelB,
  winner,
  prompt,
  systemPrompt,
  a_answer,
  b_answer
) => {
  const ans = await fetch(`${server}/ai-battles/battles/new`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      modelA,
      modelB,
      winner,
      prompt,
      systemPrompt,
      a_answer,
      b_answer,
    }),
  });
  const data = await ans.json();

  return data;
};

// const updateBattle = async (
//   userId,
//   modelA,
//   modelB,
//   winner,
//   prompt,
//   a_answer,
//   b_answer
// ) => {
//   const ans = await fetch(`http://localhost:4242/ai-battles/battles/update`, {
//     method: 'PUT',
//     headers: {
//       'content-type': 'application/json',
//     },
//     body: JSON.stringify({
//       userId,
//       modelA,
//       modelB,
//       winner,
//       prompt,
//       a_answer,
//       b_answer,
//     }),
//   });

//   return ans;
// };

export { startBattle };

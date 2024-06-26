const server = import.meta.env.VITE_SERVER;

const startBattle = async () => {
  const ans = await fetch(`${server}/ai-battles/battles/new`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
  });
  const data = await ans.json();

  return data;
};

const updateBattle = async (
  userId,
  battleCount,
  round,
  modelA,
  modelB,
  winner,
  prompt,
  a_answer,
  b_answer
) => {
  const ans = await fetch(`${server}/ai-battles/battles/update`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      battleCount,
      round,
      modelA,
      modelB,
      winner,
      prompt,
      a_answer,
      b_answer,
    }),
  });

  return ans;
};

export { startBattle, updateBattle };

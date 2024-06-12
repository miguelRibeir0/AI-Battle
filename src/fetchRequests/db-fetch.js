const startBattle = async () => {
  const ans = await fetch('http://localhost:4242/battles/new', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
  });
  const data = await ans.json();

  return data;
};

export default startBattle;

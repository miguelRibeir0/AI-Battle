import { useState, useEffect, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { groqChat } from './fetchRequests/groq-fetch.js';
import { updateBattle } from './fetchRequests/db-fetch.js';
import { prompt, model } from './prompt-model.js';
import { BattleContext } from './Components/BattleId.jsx';
import Prompt from './Components/Prompt.jsx';
import BattleBox from './Components/BattleBox/BattleBox.jsx';
import BattleLoading from './Components/BattleBox/BattleBox(loading).jsx';
import Button from './Components/BattleBox/Button.jsx';
import GameOver from './Components/GameOver.jsx';
import ModelDisplay from './Components/ModelDisplay.jsx';

// Initial setup
const modelList = [...model]; // Copy the model array
let randomIndex = Math.floor(Math.random() * modelList.length);
let fighter = modelList.splice(randomIndex, 1)[0]; // Randomly select initial fighter
const previousFighter = []; // Array to keep track of previous fighters

const Battle = () => {
  // State variables
  const [count, setCount] = useState(0); // Track rounds
  const [finalCount, setFinalCount] = useState(0); // Track total battles
  const { userId } = useContext(BattleContext); // Get user ID from context
  const [updateCounter, setUpdateCounter] = useState(0); // Used for animation purposes only

  // State for query keys
  const [queryKeyA, setQueryKeyA] = useState([
    'modelA',
    fighter,
    prompt[count],
  ]);
  const [queryKeyB, setQueryKeyB] = useState([
    'modelB',
    modelList[count],
    prompt[count],
  ]);

  // Fetch model data
  const fetchModelData = (queryKey) => {
    return queryKey[1] && queryKey[2]
      ? groqChat(queryKey[1], queryKey[2])
      : Promise.resolve(null);
  };

  const { data: modelA, isLoading: isLoadingA } = useQuery({
    queryKey: queryKeyA,
    queryFn: () => fetchModelData(queryKeyA),
    enabled: !!queryKeyA[1] && !!queryKeyA[2],
  });

  const { data: modelB, isLoading: isLoadingB } = useQuery({
    queryKey: queryKeyB,
    queryFn: () => fetchModelData(queryKeyB),
    enabled: !!queryKeyB[1] && !!queryKeyB[2],
  });

  // State for content to be displayed
  const [content, setContent] = useState({
    prompt: <Prompt prompt={prompt[count]} />,
    boxA: <BattleBox model={null} id={'A'} />, // Placeholder until data is fetched
    boxB: <BattleBox model={null} id={'B'} />, // Placeholder until data is fetched
  });

  // Effect to update query keys and content based on count and fighter/model changes
  useEffect(() => {
    if (count >= modelList.length) {
      setCount(modelList.length - 1); // Ensure count stays within bounds
      return;
    }

    setQueryKeyA(['modelA', fighter, prompt[count]]);
    setQueryKeyB(['modelB', modelList[count], prompt[count]]);

    setContent({
      prompt: <Prompt prompt={prompt[count]} />,
      boxA: <BattleBox model={null} id={`A-${updateCounter}`} />, // Placeholder until data is fetched
      boxB: <BattleBox model={null} id={`B-${updateCounter}`} />, // Placeholder until data is fetched
    });
    // eslint-disable-next-line
  }, [count, fighter, modelList]);

  // Update content when model data changes
  const updateContent = (model, id) => {
    setContent((prevContent) => ({
      ...prevContent,
      [id]: <BattleBox model={model} id={`${id}-${updateCounter}`} />,
    }));
  };

  useEffect(() => {
    if (!isLoadingA && modelA !== null) {
      updateContent(modelA, 'boxA');
    }
    // eslint-disable-next-line
  }, [isLoadingA, modelA]);

  useEffect(() => {
    if (!isLoadingB && modelB !== null) {
      updateContent(modelB, 'boxB');
    }
    // eslint-disable-next-line
  }, [isLoadingB, modelB]);

  useEffect(() => {
    if (modelA || modelB) {
      setUpdateCounter((prev) => prev + 1); // Increment the counter to trigger animation
    }
  }, [modelA, modelB]);

  // Function to handle round changes
  const battleChange = () => {
    setCount((prevCount) => prevCount + 1); // Increment round count
  };

  // Logic to select new fighters and increment finalCount after 3 rounds
  useEffect(() => {
    if (count === 3) {
      // Add the current fighter back to modelList
      modelList.push(fighter);
      let newFighter;

      do {
        randomIndex = Math.floor(Math.random() * modelList.length);
        newFighter = modelList[randomIndex];
      } while (previousFighter.includes(newFighter));

      // Remove the newFighter from modelList to avoid re-selection in the immediate next round
      modelList.splice(randomIndex, 1);

      // Update previousFighter list
      previousFighter.push(newFighter);
      fighter = newFighter;

      setCount(0); // Reset round count
      setFinalCount((prevCount) => prevCount + 1); // Increment total battle count
    }
    // eslint-disable-next-line
  }, [count, finalCount, fighter, modelList, previousFighter]);

  // Alert user on page unload if battles are in progress
  useEffect(() => {
    if (finalCount !== 4) {
      const handleUnload = (event) => {
        event.preventDefault();
        event.returnValue = '';
      };

      window.addEventListener('beforeunload', handleUnload);

      return () => {
        window.removeEventListener('beforeunload', handleUnload);
      };
    }
  }, [finalCount]);

  const buttonAction = (winner) => {
    battleChange(); // Increment round count
    updateBattle(
      userId,
      finalCount,
      count,
      fighter,
      modelList[count],
      winner,
      prompt[count],
      modelA,
      modelB
    );
  };

  // Display game over message when finalCount reaches 4
  if (finalCount === 4) {
    return <GameOver />;
  }

  // Display loading indicator while fetching data
  if (isLoadingA || isLoadingB) {
    return <BattleLoading />;
  }

  return (
    <>
      {content.prompt}
      <section className="mt-10 h-screen pb-28">
        <section className="flex h-3/4 w-screen items-start justify-center gap-x-10">
          <ModelDisplay modelLabel={'MODEL A'} boxContent={content.boxA} />
          <ModelDisplay modelLabel={'MODEL B'} boxContent={content.boxB} />
        </section>
        <section className="mt-5 flex w-full items-start justify-center gap-x-10">
          <Button
            text={'I prefer Model A 🤖'}
            onClick={() => buttonAction('Model A')}
          />
          <Button text={'Tie ❌'} onClick={() => buttonAction('tie')} />
          <Button
            text={'I prefer Model B 🤖'}
            onClick={() => buttonAction('Model B')}
          />
        </section>
      </section>
    </>
  );
};

export default Battle;

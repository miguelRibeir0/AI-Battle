import { groqChat } from './fetchRequests/groq-fetch.js';
import { useState, useEffect, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { prompt, model } from './prompt-model.js';
import { updateBattle } from './fetchRequests/db-fetch.js';
import { BattleContext } from './Components/BattleId.jsx';
import Prompt from './Components/Prompt.jsx';
import BattleBox from './Components/BattleBox.jsx';
import BattleLoading from './Components/BattleBox(loading).jsx';
import Button from './Components/Button.jsx';
import GameOver from './Components/GameOver.jsx';
import ModelDisplay from './Components/ModelDisplay.jsx';

// Initial setup
const initialModel = [...model]; // Copy the model array
let randomIndex = Math.floor(Math.random() * initialModel.length);
let fighter = initialModel.splice(randomIndex, 1)[0]; // Randomly select initial fighter
const previousFighter = []; // Array to keep track of previous fighters

const Battle = () => {
  // State variables
  const [count, setCount] = useState(0); // Track rounds
  const [finalCount, setFinalCount] = useState(0); // Track total battles
  const { userId } = useContext(BattleContext); // Get user ID from context
  const [updateCounter, setUpdateCounter] = useState(0);

  // State for query keys
  const [queryKeyA, setQueryKeyA] = useState([
    'modelA',
    fighter,
    prompt[count],
  ]);
  const [queryKeyB, setQueryKeyB] = useState([
    'modelB',
    initialModel[count],
    prompt[count],
  ]);

  // State for content to be displayed
  const [content, setContent] = useState({
    prompt: <Prompt prompt={prompt[count]} />,
    boxA: <BattleBox model={null} id={'A'} />, // Placeholder until data is fetched
    boxB: <BattleBox model={null} id={'B'} />, // Placeholder until data is fetched
  });

  // Effect to update query keys and content based on count and fighter/model changes
  useEffect(() => {
    if (count >= initialModel.length) {
      setCount(initialModel.length - 1); // Ensure count stays within bounds
      return;
    }

    setQueryKeyA(['modelA', fighter, prompt[count]]);
    setQueryKeyB(['modelB', initialModel[count], prompt[count]]);

    setContent({
      prompt: <Prompt prompt={prompt[count]} />,
      boxA: <BattleBox model={null} id={`A-${updateCounter}`} />, // Placeholder until data is fetched
      boxB: <BattleBox model={null} id={`A-${updateCounter}`} />, // Placeholder until data is fetched
    });
    // eslint-disable-next-line
  }, [count, fighter, initialModel]);

  // Fetch model A data
  const {
    data: modelA,
    isLoading: isLoadingA,
    error: errorA,
  } = useQuery({
    queryKey: queryKeyA,
    queryFn: () => {
      if (queryKeyA[1] && queryKeyA[2]) {
        return groqChat(queryKeyA[1], queryKeyA[2]);
      } else {
        return Promise.resolve(null);
      }
    },
    enabled: !!queryKeyA[1] && !!queryKeyA[2], // Enable query when necessary data is available
  });

  // Fetch model B data
  const {
    data: modelB,
    isLoading: isLoadingB,
    error: errorB,
  } = useQuery({
    queryKey: queryKeyB,
    queryFn: () => {
      if (queryKeyB[1] && queryKeyB[2]) {
        return groqChat(queryKeyB[1], queryKeyB[2]);
      } else {
        return Promise.resolve(null);
      }
    },
    enabled: !!queryKeyB[1] && !!queryKeyB[2], // Enable query when necessary data is available
  });

  // Update content when model A data changes
  useEffect(() => {
    if (errorA) {
      console.error('Error fetching modelA:', errorA);
    }
    if (!isLoadingA && modelA !== null) {
      setContent((prevContent) => ({
        ...prevContent,
        boxA: <BattleBox model={modelA} id={`A-${updateCounter}`} />,
      }));
    }
    // eslint-disable-next-line
  }, [isLoadingA, modelA, errorA]);

  // Update content when model B data changes
  useEffect(() => {
    if (errorB) {
      console.error('Error fetching modelB:', errorB);
    }
    if (!isLoadingB && modelB !== null) {
      setContent((prevContent) => ({
        ...prevContent,
        boxB: <BattleBox model={modelB} id={`B-${updateCounter}`} />,
      }));
    }
    // eslint-disable-next-line
  }, [isLoadingB, modelB, errorB]);

  useEffect(() => {
    if (modelA || modelB) {
      // Check if either modelA or modelB has new data
      setUpdateCounter((prev) => prev + 1); // Increment the counter to trigger animation
    }
  }, [modelA, modelB]); // Depend on modelA and modelB

  // Function to handle round changes
  const battleChange = () => {
    setCount((prevCount) => prevCount + 1); // Increment round count
  };

  // Logic to select new fighters and increment finalCount after 3 rounds
  useEffect(() => {
    if (count === 3) {
      let newFighter;
      do {
        randomIndex = Math.floor(Math.random() * initialModel.length);
        newFighter = initialModel[randomIndex];
      } while (previousFighter.includes(newFighter));

      previousFighter.push(fighter);
      fighter = newFighter;
      setCount(0); // Reset round count
      setFinalCount((prevCount) => prevCount + 1); // Increment total battle count
      console.log('New fighter selected:', fighter);
      console.log('Final count incremented:', finalCount);
    }
    // eslint-disable-next-line
  }, [count, finalCount, fighter, initialModel, previousFighter]);

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
      initialModel[count],
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

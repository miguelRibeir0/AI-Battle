import { groqChat } from './fetchRequests/groq-fetch.js';
import { useState, useEffect, useContext } from 'react';
import BattleModel from './Components/BattleModel.jsx';
import Prompt from './Components/Prompt.jsx';
import BattleBox from './Components/BattleBox.jsx';
import { useQuery } from '@tanstack/react-query';
import BattleLoading from './Components/BattleBox(loading).jsx';
import Button from './Components/Button.jsx';
import { prompt, model } from './prompt-model.js';
import { updateBattle } from './fetchRequests/db-fetch.js';
import { BattleContext } from './Components/BattleId.jsx';

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

  // Effect to update query keys and content based on count and fighter/model changes
  useEffect(() => {
    if (count >= initialModel.length) {
      setCount(initialModel.length - 1); // Ensure count stays within bounds
      return;
    }

    if (fighter && initialModel[count]) {
      setQueryKeyA(['modelA', fighter, prompt[count]]);
      setQueryKeyB(['modelB', initialModel[count], prompt[count]]);
      setContent({
        prompt: <Prompt prompt={prompt[count]} />,
        boxA: <BattleBox model={null} id={'A'} />, // Placeholder until data is fetched
        boxB: <BattleBox model={null} id={'B'} />, // Placeholder until data is fetched
      });
    }
    // eslint-disable-next-line
  }, [count, fighter]);

  // Fetch model A data
  const { data: modelA, isLoading: isLoadingA } = useQuery({
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
  const { data: modelB, isLoading: isLoadingB } = useQuery({
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

  // State for content to be displayed
  const [content, setContent] = useState({
    prompt: <Prompt prompt={prompt[count]} />,
    boxA: <BattleBox model={modelA} id={'A'} />, // Display fetched data for model A
    boxB: <BattleBox model={modelB} id={'B'} />, // Display fetched data for model B
  });

  // Update content when model A data changes
  useEffect(() => {
    if (!isLoadingA && modelA !== null) {
      setContent((prevContent) => ({
        ...prevContent,
        boxA: <BattleBox model={modelA} id={'A'} />,
      }));
    }
  }, [isLoadingA, modelA]);

  // Update content when model B data changes
  useEffect(() => {
    if (!isLoadingB && modelB !== null) {
      setContent((prevContent) => ({
        ...prevContent,
        boxB: <BattleBox model={modelB} id={'B'} />,
      }));
    }
  }, [isLoadingB, modelB]);

  // Function to handle round changes
  const battleChange = () => {
    setCount((prevCount) => prevCount + 1); // Increment round count
  };

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

  // Display game over message when finalCount reaches 4
  if (finalCount === 4) {
    return <h1 className="text-white">Game Over</h1>;
  }

  // Display loading indicator while fetching data
  if (isLoadingA || isLoadingB) {
    return <BattleLoading />;
  }

  // Logic to select new fighters and increment finalCount after 3 rounds
  if (count === 3) {
    let newFighter;
    do {
      randomIndex = Math.floor(Math.random() * initialModel.length);
      newFighter = initialModel.splice(randomIndex, 1)[0];
    } while (previousFighter.includes(newFighter));

    initialModel.push(fighter);
    previousFighter.push(fighter);
    fighter = newFighter;
    setCount(0);
    setFinalCount((prevCount) => prevCount + 1);
  }

  // JSX to render battle components
  return (
    <>
      {content.prompt}
      <section className="mt-10 h-screen pb-28">
        <section className="flex h-3/4 w-screen items-start justify-center">
          <div className="h-full w-5/12">
            <div className="relative h-full w-full rounded-lg border-2 border-lime-500 p-6">
              <BattleModel model={'Model A'} />
              {content.boxA}
            </div>
          </div>
          <div className="ml-10 h-full w-5/12">
            <div className="relative h-full w-full rounded-lg border-2 border-lime-500 p-6">
              <BattleModel model={'Model B'} />
              {content.boxB}
            </div>
          </div>
        </section>
        <section className="mt-7 flex w-full items-start justify-center gap-x-10">
          <Button
            text={'I prefer Model A 🤖'}
            onClick={() => {
              battleChange(); // Increment round count
              updateBattle(
                // Update battle data in database
                userId,
                finalCount,
                count,
                fighter,
                initialModel[count],
                'Model A',
                prompt[count],
                modelA,
                modelB
              );
            }}
          />
          <Button
            text={'Tie ❌'}
            onClick={() => {
              battleChange(); // Increment round count
              updateBattle(
                // Update battle data in database
                userId,
                finalCount,
                count,
                fighter,
                initialModel[count],
                'tie',
                prompt[count],
                modelA,
                modelB
              );
            }}
          />
          <Button
            text={'I prefer Model B 🤖'}
            onClick={() => {
              battleChange(); // Increment round count
              updateBattle(
                // Update battle data in database
                userId,
                finalCount,
                count,
                fighter,
                initialModel[count],
                'Model B',
                prompt[count],
                modelA,
                modelB
              );
            }}
          />
        </section>
      </section>
    </>
  );
};

export default Battle;

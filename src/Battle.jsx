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

// Randomly select a model to be the fighter
const initialModel = [...model]; // Create a copy of the model array
let randomIndex = Math.floor(Math.random() * initialModel.length);
let fighter = initialModel.splice(randomIndex, 1)[0];
const previousFighter = [];

const Battle = () => {
  // Keeping track of rounds
  let [count, setCount] = useState(0);
  // Keeping track of battles
  let [finalCount, setFinalCount] = useState(0);
  // Getting user id
  const { userId } = useContext(BattleContext);

  // A way to update fetch requests
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

  useEffect(() => {
    // Ensure count is within bounds of initialModel array (undefined was giving bad requests)
    if (count >= initialModel.length) {
      setCount(initialModel.length - 1);
      return;
    }

    // Updating content and fetch requests on count change
    setQueryKeyA(['modelA', fighter, prompt[count]]);
    setQueryKeyB(['modelB', initialModel[count], prompt[count]]);
    setContent({
      prompt: <Prompt prompt={prompt[count]} />,
      boxA: <BattleBox model={null} id={'A'} />,
      boxB: <BattleBox model={null} id={'B'} />,
    });
    //eslint-disable-next-line
  }, [count, fighter]);

  // Initial fetch of data
  const { data: modelA, isLoading: isLoadingA } = useQuery({
    queryKey: queryKeyA,
    queryFn: () => {
      return groqChat(queryKeyA[1], queryKeyA[2]);
    },
  });

  const { data: modelB, isLoading: isLoadingB } = useQuery({
    queryKey: queryKeyB,
    queryFn: () => {
      return groqChat(queryKeyB[1], queryKeyB[2]);
    },
  });

  // Initial round
  const [content, setContent] = useState({
    prompt: <Prompt prompt={prompt[count]} />,
    boxA: <BattleBox model={modelA} id={'A'} />,
    boxB: <BattleBox model={modelB} id={'B'} />,
  });

  useEffect(() => {
    // Updating content when fetch requests are done
    if (!isLoadingA) {
      setContent((prevContent) => ({
        ...prevContent,
        boxA: <BattleBox model={modelA} id={'A'} />,
      }));
    }
    if (!isLoadingB) {
      setContent((prevContent) => ({
        ...prevContent,
        boxB: <BattleBox model={modelB} id={'B'} />,
      }));
    }
  }, [isLoadingA, isLoadingB, modelA, modelB]);

  const battleChange = () => {
    // Updating count to change round
    setCount((prevCount) => prevCount + 1);
  };

  // Alerting loss of progress on page reload
  useEffect(() => {
    if (finalCount != 4) {
      const handleUnload = (event) => {
        event.preventDefault();
        event.returnValue = '';
      };

      window.addEventListener('beforeunload', handleUnload);

      return () => {
        window.removeEventListener('beforeunload', handleUnload);
      };
    }
    //eslint-disable-next-line
  }, []);

  // End-game
  if (finalCount === 4) {
    return <h1 className="text-white">Game Over</h1>;
  }

  if (isLoadingA || isLoadingB) {
    return <BattleLoading />;
  }

  // Choosing a new model
  if (count === 3) {
    let newFighter = initialModel.splice(randomIndex, 1)[0];

    // Making sure the same model is not selected again
    while (previousFighter.includes(newFighter)) {
      randomIndex = Math.floor(Math.random() * initialModel.length);
      newFighter = initialModel.splice(randomIndex, 1)[0];
    }
    initialModel.push(fighter);
    previousFighter.push(fighter);
    fighter = newFighter;
    setCount(0);
    setFinalCount((prevCount) => prevCount + 1);
  }

  return (
    <>
      {content.prompt}
      <section className="mt-10 h-screen pb-28">
        <section className="flex h-3/4 w-screen items-start justify-center">
          <div className="h-full w-5/12">
            <div className="relative h-full w-full rounded-lg border-2 border-lime-500 p-6">
              <BattleModel model="MODEL A" />
              {content.boxA}
            </div>
          </div>
          <div className="ml-10 h-full w-5/12">
            <div className="relative h-full w-full rounded-lg border-2 border-lime-500 p-6">
              <BattleModel model="MODEL B" />
              {content.boxB}
            </div>
          </div>
        </section>
        <section className="mt-7 flex w-full items-start justify-center gap-x-10">
          <Button
            text={'I prefer Model A 🤖'}
            onClick={() => {
              battleChange();
              updateBattle(
                userId,
                finalCount,
                count,
                fighter,
                initialModel[count],
                fighter,
                prompt[count],
                modelA,
                modelB
              );
            }}
          />
          <Button
            text={'I prefer Neither ❌'}
            onClick={() => {
              battleChange();
              updateBattle(
                userId,
                finalCount,
                count,
                fighter,
                initialModel[count],
                'Draw',
                prompt[count],
                modelA,
                modelB
              );
            }}
          />
          <Button
            text={'I prefer Model B 🤖'}
            onClick={() => {
              battleChange();
              updateBattle(
                userId,
                finalCount,
                count,
                fighter,
                initialModel[count],
                initialModel[count],
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

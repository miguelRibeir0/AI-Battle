import { useState, useEffect, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { groqChat } from './fetchRequests/groq-fetch.js';
import { startBattle } from './fetchRequests/db-fetch.js';
import { prompt, model } from './prompt-model.js';
import Prompt from './Components/Prompt.jsx';
import BattleBox from './Components/BattleBox/BattleBox.jsx';
import BattleLoading from './Components/BattleBox/BattleBox(loading).jsx';
import Button from './Components/BattleBox/Button.jsx';
import GameOver from './Components/GameOver.jsx';
import ModelDisplay from './Components/ModelDisplay.jsx';

const Battle = () => {
  const fighterIndex = Math.floor(Math.random() * model.length); // Select a random index for fighter
  const [count, setCount] = useState(0);
  const [finalCount, setFinalCount] = useState(0);
  const [fighter, setFighter] = useState(() => model[fighterIndex]); // Use the index to set fighter

  const [modelList, setModelList] = useState(() => {
    return [
      ...model.slice(0, fighterIndex), // Elements before the fighter
      ...model.slice(fighterIndex + 1), // Ensuring duplicates of fighter remain if present // for testing only
    ];
  });

  const [isLoading, setIsLoading] = useState(false);
  const [modelAData, setModelAData] = useState(null);
  const [modelBData, setModelBData] = useState(null);

  const queryClient = useQueryClient();

  const fetchModelData = useCallback(async () => {
    const retryFetch = async (retries) => {
      try {
        setIsLoading(true);
        const fetchedModelAData = await groqChat(fighter, prompt[finalCount]);
        const fetchedModelBData = await groqChat(
          modelList[count % modelList.length],
          prompt[finalCount]
        );
        // Update the state with the fetched data
        setModelAData(fetchedModelAData);
        setModelBData(fetchedModelBData);
        setIsLoading(false);
      } catch (error) {
        if (retries > 0) {
          console.error(
            `Fetch failed, retrying in 3 seconds... (${retries} retries left)`
          );
          setTimeout(() => retryFetch(retries - 1), 3000);
        } else {
          console.error('Fetch failed after multiple retries:', error);
          setIsLoading(false);
        }
      }
    };

    retryFetch(3); // Try up to 3 times

    //eslint-disable-next-line
  }, [fighter, modelList, count, finalCount, queryClient]);

  useEffect(() => {
    fetchModelData();
  }, [fetchModelData]);

  const battleChange = () => {
    let nextCount = count + 1;
    if ([4, 7, 9].includes(nextCount)) {
      const nextFighter = modelList[0];
      setFighter(nextFighter);
      // Updating model list
      setModelList((prevList) => prevList.filter((_, index) => index !== 0));
    }
    if (nextCount === 10) {
      setFinalCount((prevFinalCount) => prevFinalCount + 1);
      setCount(0);
    } else {
      // Only increment count if not resetting
      setCount(nextCount);
    }
  };

  const buttonAction = (winner) => {
    battleChange();
    startBattle(
      fighter,
      modelList[count % modelList.length],
      winner,
      prompt[finalCount],
      modelAData,
      modelBData
    );
  };

  useEffect(() => {
    // Reset modelList to include all models except the current fighter on reset
    const fighterIndex = model.indexOf(fighter);
    setModelList([
      ...model.slice(0, fighterIndex),
      ...model.slice(fighterIndex + 1),
    ]); //eslint-disable-next-line
  }, [finalCount]);

  // Alert user on page unload if battles are in progress
  useEffect(() => {
    if (finalCount !== 5) {
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

  if (finalCount === 5) {
    return <GameOver />;
  }

  if (isLoading) {
    return <BattleLoading />;
  }

  return (
    <>
      <Prompt
        prompt={prompt[finalCount]}
        count={count}
        finalCount={finalCount}
      />
      <section className="mt-10 h-screen pb-28">
        <section className="flex h-3/4 w-screen items-start justify-center gap-x-10">
          <ModelDisplay
            modelLabel={'MODEL A'}
            boxContent={<BattleBox model={modelAData} id={'A' + count} />}
          />
          <ModelDisplay
            modelLabel={'MODEL B'}
            boxContent={<BattleBox model={modelBData} id={'B' + count} />}
          />
        </section>
        <section className="mt-5 flex w-full items-start justify-center gap-x-10">
          <Button
            text={'I prefer Model A 🤖'}
            onClick={() => buttonAction('model_a')}
          />
          <Button text={'Tie ❌'} onClick={() => buttonAction('tie')} />
          <Button
            text={'I prefer Model B 🤖'}
            onClick={() => buttonAction('model_b')}
          />
        </section>
      </section>
    </>
  );
};

export default Battle;

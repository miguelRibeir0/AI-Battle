import { groqChat } from './fetchRequests/groq-fetch.js';
import { useState, useEffect } from 'react';
import BattleModel from './Components/BattleModel.jsx';
import Prompt from './Components/Prompt.jsx';
import BattleBox from './Components/BattleBox.jsx';
import { useQuery } from '@tanstack/react-query';
import BattleLoading from './Components/BattleBox(loading).jsx';
import Button from './Components/Button.jsx';

const prompt = [
  'Explain the importance of language models',
  'Why is the sky blue?',
  'What is the meaning of life?',
  'What is the best programming language?',
];
const model = [
  'llama3-8b-8192',
  'mixtral-8x7b-32768',
  'mixtral-8x7b-32768',
  'llama3-70b-8192',
];
// Randomly select a model to be the fighter
let randomIndex = Math.floor(Math.random() * model.length);
let fighter = model.splice(randomIndex, 1)[0];
const previousFighter = [];

const Battle = () => {
  //kepping track of rounds
  let [count, setCount] = useState(0);
  //keeping track of battles
  let [finalCount, setFinalCount] = useState(0);

  if (count === 3) {
    let newFighter = model.splice(randomIndex, 1)[0];

    //making sure the same model is not selected again
    while (previousFighter.includes(newFighter)) {
      randomIndex = Math.floor(Math.random() * model.length);
      newFighter = model.splice(randomIndex, 1)[0];
    }
    model.push(fighter);
    previousFighter.push(fighter);
    fighter = newFighter;
    setCount(0);
    setFinalCount((prevCount) => prevCount + 1);
  }

  //a way to update fetch requests
  const [queryKeyA, setQueryKeyA] = useState([
    'modelA',
    fighter,
    prompt[count],
  ]);
  const [queryKeyB, setQueryKeyB] = useState([
    'modelB',
    model[count],
    prompt[count],
  ]);

  useEffect(() => {
    //updating content and fetch requests on count change
    setQueryKeyA(['modelA', fighter, prompt[count]]);
    setQueryKeyB(['modelB', model[count], prompt[count]]);
    setContent({
      prompt: <Prompt prompt={prompt[count]} />,
      boxA: <BattleBox model={null} id={'A'} />,
      boxB: <BattleBox model={null} id={'B'} />,
    });
  }, [count]);
  //inital fetch of data
  const { data: modelA, isLoading: isLoadingA } = useQuery({
    queryKey: queryKeyA,
    queryFn: () => groqChat(queryKeyA[1], queryKeyA[2]),
  });
  const { data: modelB, isLoading: isLoadingB } = useQuery({
    queryKey: queryKeyB,
    queryFn: () => groqChat(queryKeyB[1], queryKeyB[2]),
  });
  //inital round
  const [content, setContent] = useState({
    prompt: <Prompt prompt={prompt[count]} />,
    boxA: <BattleBox model={modelA} id={'A'} />,
    boxB: <BattleBox model={modelB} id={'B'} />,
  });

  useEffect(() => {
    //updating content when fetch requests are done
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
    //updating count to change round
    setCount((prevCount) => prevCount + 1);
  };

  if (isLoadingA || isLoadingB) {
    return <BattleLoading />;
  }
  if (finalCount === 4) {
    return <h1 className="text-white">Game Over</h1>;
  }

  console.log(previousFighter);
  console.log(queryKeyA[1], queryKeyA[2]);
  console.log(queryKeyB[1], queryKeyB[2]);
  console.log(count);
  return (
    <>
      {content.prompt}
      <section className="mt-10 flex h-screen w-screen items-start justify-center pb-28">
        <div className="h-96 w-5/12">
          <div className="relative h-96 w-full rounded-lg border-2 border-lime-500 p-6">
            <BattleModel model={fighter} />
            {content.boxA}
          </div>
          <Button text={'I prefer Model A'} onClick={battleChange} />
        </div>
        <div className="ml-10 h-96 w-5/12">
          <div className="relative h-96 w-full rounded-lg border-2 border-lime-500 p-6">
            <BattleModel model={model[count]} />
            {content.boxB}
          </div>
          <Button text={'I prefer Model B'} onClick={battleChange} />
        </div>
      </section>
    </>
  );
};

export default Battle;

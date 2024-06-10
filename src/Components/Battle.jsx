import {
  metaChat,
  metaChat2,
  mistralChat,
  googleChat,
} from '../fetchRequests/groq-fetch.js';
import { useState, useEffect } from 'react';
import BattleModel from './BattleModel.jsx';
import Prompt from './Prompt.jsx';
import BattleBox from './BattleBox.jsx';
import { useQuery } from '@tanstack/react-query';
import BattleLoading from './BattleBox(loading).jsx';
import Button from './Button.jsx';

const Battle = () => {
  const { data: modelA, isLoading: isLoadingA } = useQuery({
    queryKey: ['modelA'],
    queryFn: metaChat,
  });
  const { data: modelB, isLoading: isLoadingB } = useQuery({
    queryKey: ['modelB'],
    queryFn: mistralChat,
  });
  const { data: modelC, isLoading: isLoadingC } = useQuery({
    queryKey: ['modelC'],
    queryFn: googleChat,
  });
  const { data: modelD, isLoading: isLoadingD } = useQuery({
    queryKey: ['modelD'],
    queryFn: metaChat2,
  });

  const prompt = ['Explain the importance of language models', 'test'];

  const [content, setContent] = useState({
    prompt: <Prompt prompt={prompt} />,
    boxA: <BattleBox model={modelA} id={'A'} />,
    boxB: <BattleBox model={modelB} id={'B'} />,
    boxC: <BattleBox model={modelC} id={'C'} />,
    boxD: <BattleBox model={modelD} id={'D'} />,
  });

  useEffect(() => {
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

  const battleChange = (prompt, model1, model2) => {
    setContent({
      prompt: <Prompt prompt={prompt} />,
      boxA: <BattleBox model={model1} id={model1} />,
      boxB: <BattleBox model={model2} id={model2} />,
    });
  };
  console.log(isLoadingA, isLoadingB, isLoadingC, isLoadingD);
  if (isLoadingA || isLoadingB || isLoadingC || isLoadingD) {
    return <BattleLoading />;
  }

  return (
    <>
      {content.prompt}
      <section className="mt-10 flex h-screen w-screen items-start justify-center pb-28">
        <div className="h-96 w-5/12">
          <div className="relative h-96 w-full rounded-lg border-2 border-lime-500 p-6">
            <BattleModel model="MODEL A" />
            {content.boxA}
          </div>
          <Button
            text={'I prefer Model A'}
            onClick={() => battleChange(prompt[1], modelC, modelD)}
          />
        </div>
        <div className="ml-10 h-96 w-5/12">
          <div className="relative h-96 w-full rounded-lg border-2 border-lime-500 p-6">
            <BattleModel model="MODEL B" />
            {content.boxB}
          </div>
          <Button text={'I prefer Model B'} />
        </div>
      </section>
    </>
  );
};

export default Battle;

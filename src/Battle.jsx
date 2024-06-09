import { useState, useEffect } from 'react';
import groqChat from './fetchRequests/groq-fetch.js';
import chatResponse from './fetchRequests/mistral-fetch.js';
import BattleModel from './Components/BattleModel';

const Battle = () => {
  const [modelA, setModelA] = useState('');
  const [modelB, setModelB] = useState('');

  const apiResponseA = async () => {
    const A = await groqChat();
    setModelA(A);
  };
  const apiResponseB = async () => {
    const B = await chatResponse();
    setModelB(B);
  };

  useEffect(() => {
    apiResponseA();
    apiResponseB();
  }, []);
  return (
    <>
      <section className=" flex items-center justify-center">
        <h2 className="text-white text-xl text-center border-lime-500 border-2 rounded-lg py-2 px-3">
          <span className=" font-bold">PROP:</span> Explain the importance of
          fast language models
        </h2>
      </section>
      <section className="h-screen w-screen flex items-start mt-10 justify-center pb-28">
        <div className="w-2/6 h-96 p-6 border-lime-500 border-2 rounded-lg relative">
          <BattleModel model="MODEL A"></BattleModel>
          <div className=" overflow-y-scroll h-full scrollbar scrollbar-thumb-lime-500 scrollbar-track-transparent ">
            <p key={'A'} className="text-white pr-3 animate-fadeIn">
              {modelA}
            </p>
          </div>
        </div>
        <div className="w-2/6 h-96 p-6 border-lime-500 border-2 rounded-lg relative ml-5">
          <BattleModel model="MODEL B"></BattleModel>
          <div className=" overflow-y-scroll h-full scrollbar scrollbar-thumb-lime-500 scrollbar-track-transparent ">
            <p key={'B'} className="text-white pr-3 animate-fadeIn">
              {modelB}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Battle;

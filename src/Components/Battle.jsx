import { metaChat, mistralChat } from '../fetchRequests/groq-fetch.js';
import BattleModel from './BattleModel.jsx';
import Prompt from './Prompt.jsx';
import BattleBox from './BattleBox.jsx';
import { useQuery } from '@tanstack/react-query';
import BattleLoading from './BattleBox(loading).jsx';

const Battle = () => {
  const { data: modelA, isLoadingA } = useQuery({
    queryKey: ['modelA'],
    queryFn: metaChat,
  });
  const { data: modelB, isLoadingB } = useQuery({
    queryKey: ['modelB'],
    queryFn: mistralChat,
  });

  if (isLoadingA || isLoadingB) {
    return (
      <>
        <Prompt></Prompt>
        <section className="mt-10 flex h-screen w-screen items-start justify-center pb-28">
          <div className="relative box-border h-96 w-2/6 rounded-lg border-2 border-lime-500 p-6 shadow-md">
            <BattleModel model="MODEL A"></BattleModel>
            <BattleLoading></BattleLoading>
          </div>
          <div className="relative ml-5 h-96 w-2/6 rounded-lg border-2 border-lime-500 p-6">
            <BattleModel model="MODEL B"></BattleModel>
            <BattleLoading></BattleLoading>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Prompt></Prompt>
      <section className="mt-10 flex h-screen w-screen items-start justify-center pb-28">
        <div className="h-96 w-5/12">
          <div className="relative h-96 w-full rounded-lg border-2 border-lime-500 p-6">
            <BattleModel model="MODEL A"></BattleModel>
            <BattleBox model={modelA} id={'A'}></BattleBox>
          </div>
          <button className="mt-5 w-full rounded border-2 border-lime-500 py-2 text-white shadow-lime-500 transition duration-200 ease-in-out hover:bg-lime-500">
            I prefer Model A
          </button>
        </div>
        <div className="ml-10 h-96 w-5/12">
          <div className="relative h-96 w-full rounded-lg border-2 border-lime-500 p-6">
            <BattleModel model="MODEL B"></BattleModel>
            <BattleBox model={modelB} id={'B'}></BattleBox>
          </div>
          <button className="mt-5 w-full rounded border-2 border-lime-500 py-2 text-white transition duration-200 ease-in-out hover:bg-lime-500">
            I prefer Model B
          </button>
        </div>
      </section>
    </>
  );
};

export default Battle;

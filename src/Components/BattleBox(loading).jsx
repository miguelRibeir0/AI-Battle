import LoadingAnimation from './LoadingAnimation';
import Prompt from './Prompt';
import BattleModel from './BattleModel';

//eslint-disable-next-line
const BattleLoading = () => {
  return (
    <>
      <Prompt></Prompt>
      <section className="mt-10 flex h-screen w-screen items-start justify-center pb-28">
        <div className="relative box-border h-96 w-2/6 rounded-lg border-2 border-lime-500 p-6 shadow-md">
          <BattleModel model="MODEL A" />
          <LoadingAnimation />
        </div>
        <div className="relative ml-5 h-96 w-2/6 rounded-lg border-2 border-lime-500 p-6">
          <BattleModel model="MODEL B" />
          <LoadingAnimation />
        </div>
      </section>
    </>
  );
};

export default BattleLoading;

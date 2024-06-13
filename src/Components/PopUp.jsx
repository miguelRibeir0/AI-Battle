import { startBattle } from '../fetchRequests/db-fetch';
import { useContext } from 'react';
import { BattleContext } from './BattleId';
//eslint-disable-next-line
const PopUp = ({ onClose }) => {
  const { setUserId } = useContext(BattleContext);

  return (
    <section className="absolute z-10 h-screen w-screen bg-black bg-opacity-80 text-white">
      <div className="absolute left-1/2 top-1/2 z-20 flex h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center gap-y-5 border-2 border-lime-500 bg-gray-900">
        <h1 className="text-2xl">AI BATTLE ⚔️</h1>
        <p className="w-2/3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed nam
          perferendis iusto nisi quam, ullam laudantium? Officiis dicta
          cupiditate odio, facere omnis praesentium! Sapiente assumenda pariatur
          libero debitis fugiat corporis!
        </p>
        <p className="w-2/3">
          Officiis dicta cupiditate odio, facere omnis praesentium! Sapiente
          assumenda pariatur libero debitis fugiat corporis!
        </p>
        <button
          onClick={async () => {
            onClose();
            const id = await startBattle();
            setUserId(id);
          }}
          className="rounded-xl border-2 border-lime-500 px-4 py-2 hover:bg-lime-500"
        >
          Start
        </button>
      </div>
    </section>
  );
};

export default PopUp;

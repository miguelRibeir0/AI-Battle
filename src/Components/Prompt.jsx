import { useState } from 'react';
import { system } from '../prompt-model';

//eslint-disable-next-line
const Prompt = ({ prompt }) => {
  let [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <>
      <section className="flex items-center justify-center gap-x-7">
        <h2 className="rounded-lg border-2 border-lime-500 px-5 py-2 text-center text-xl font-bold text-white">
          PROMPT:
        </h2>
        <p className="relative min-w-96 rounded-lg border-2 border-lime-500 px-3 py-2 text-center text-xl text-white">
          Cobolt tabble management
        </p>
        <button
          className="ease-in-ou h-full cursor-pointer rounded border-2 border-lime-500 bg-opacity-0 p-2 text-white transition duration-200 hover:bg-lime-500"
          onClick={toggleVisibility}
        >
          Full Prompt Here
        </button>
      </section>
      {/* Pop-up */}
      {visible && (
        <section
          className="fixed inset-0 z-10 flex h-screen w-screen items-center justify-center bg-black bg-opacity-70"
          onClick={toggleVisibility}
        >
          <div className="max-h-3/4 w-1/2 overflow-y-auto border-2 border-lime-500 bg-gray-900">
            <p className="p-10 pb-0 text-white">
              <span className="font-bold">System:</span> {system}
            </p>
            <p className="p-10 text-white">
              <span className="font-bold">Prompt:</span> {prompt}
            </p>
          </div>
          <span></span>
        </section>
      )}
    </>
  );
};

export default Prompt;

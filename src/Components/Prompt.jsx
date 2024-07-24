import { useState } from 'react';
import { system } from '../prompt-model';

//eslint-disable-next-line
const Prompt = ({ prompt, count, finalCount }) => {
  let [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  function formatText(text) {
    // Split the text into lines
    const lines = text.split('\n');

    // Process each line
    const formattedLines = lines.map((line) => {
      // Check if the line contains a colon or //
      if (line.includes(':') || line.includes('//')) {
        // Split the line at the colon or //
        const [before, after] = line.includes(':')
          ? line.split(':')
          : line.split('//');
        const separator = line.includes(':') ? ':' : '//';
        return `${before}${separator}<br>&nbsp;&nbsp;&nbsp;&nbsp;${after.trim()}`;
      }
      // Return the line as is if it doesn't contain a colon or //
      return line;
    });

    // Join the lines back together with <br> tags
    return formattedLines.join('<br>');
  }

  return (
    <>
      <section className="flex items-center justify-center gap-x-7">
        <h2 className="rounded-lg border-2 border-lime-500 px-5 py-2 text-center text-xl font-bold text-white">
          PROMPT: {isNaN(finalCount) ? '' : finalCount + 1}
        </h2>
        <h2 className="rounded-lg border-2 border-lime-500 px-5 py-2 text-center text-xl font-bold text-white">
          Round: {isNaN(count) ? '' : count + 1}
        </h2>

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
              <span className="font-bold">Prompt:</span> <br />
              <span dangerouslySetInnerHTML={{ __html: formatText(prompt) }} />
            </p>
            <p className="p-10 text-white">
              <span className="font-bold">System:</span>{' '}
              {finalCount === 0
                ? system[0]
                : finalCount === 1
                  ? system[1]
                  : system[2]}
            </p>
          </div>
          <span></span>
        </section>
      )}
    </>
  );
};

export default Prompt;

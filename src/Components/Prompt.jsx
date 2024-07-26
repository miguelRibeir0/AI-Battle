import { useState } from 'react';
import { system } from '../prompt-model';

//eslint-disable-next-line
const Prompt = ({ prompt, count, finalCount }) => {
  let [visible, setVisible] = useState(false);

  const systemMatch = () => {
    if (finalCount == 0) {
      return system[0];
    }
    if (finalCount == 4) {
      return system[2];
    }
    return system[1];
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  function formatText(text) {
    // Split the text into lines
    const lines = text.split('\n');

    // Function to pad a string to a specific length
    function padToLength(str, length) {
      return str.length < length ? str + ' '.repeat(length - str.length) : str;
    }

    // Process each line
    const formattedLines = lines
      .map((line, index) => {
        // Check if the line contains a colon or //
        if (line.includes(':') || line.includes('//')) {
          // Split the line at the colon or //
          const [before, after] = line.includes(':')
            ? line.split(':', 2)
            : line.split('//', 2);
          const separator = line.includes(':') ? ':' : '//';
          // Format the line and ensure proper indentation and alignment
          return `${before.trim()}${separator} ${after.trim()}`;
        }
        // Remove extra line breaks before comment sections
        if (
          line.trim() === '//' &&
          lines[index + 1] &&
          lines[index + 1].trim() === ''
        ) {
          return '';
        }
        // Return the line as is if it doesn't contain a colon or //
        return line;
      })
      .filter((line) => line !== ''); // Remove empty lines
    // Ensure each line is exactly 72 characters long
    const paddedLines = formattedLines.map((line) => padToLength(line, 72));
    // Join the lines back together with <br> tags
    return paddedLines.join('<br>');
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
          <div className="max-h-[75vh] w-1/2 overflow-y-auto border-2 border-lime-500 bg-gray-900 scrollbar scrollbar-track-transparent scrollbar-thumb-lime-500">
            <p className="p-10 pb-0 text-white">
              <span className="font-bold">Prompt:</span> <br />
              <span dangerouslySetInnerHTML={{ __html: formatText(prompt) }} />
            </p>
            <p className="p-10 text-white">
              <span className="font-bold">System:</span>
              <br />
              <span
                dangerouslySetInnerHTML={{
                  __html: formatText(systemMatch(prompt)),
                }}
              />
            </p>
          </div>
          <span></span>
        </section>
      )}
    </>
  );
};

export default Prompt;

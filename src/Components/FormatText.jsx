const formatText = (text) => {
  if (typeof text !== 'string') {
    return [];
  }

  const formatCodeBlock = (block, index) => {
    const formattedBlock = block
      .split('\n')
      .map((line) => {
        if (
          line.startsWith('//') ||
          line.trim().startsWith('IF') ||
          line.trim().startsWith('SELECT')
        ) {
          return '  ' + line;
        }
        return line;
      })
      .join('\n');

    return (
      <pre
        key={index}
        className="mb-5 mt-5 overflow-x-auto rounded bg-gray-950 p-4 text-white"
      >
        {formattedBlock}
      </pre>
    );
  };

  const formatBestPractices = (text) => {
    return text.replace(/\* (.*?):/g, '<h3>$1:</h3>');
  };

  const formatNoteTopics = (text) => {
    return text.replace(/\* (.*?):/g, '<h3>$1:</h3>');
  };

  const formatListItems = (text) => {
    return text.replace(
      /(^|\n)\* (.*?)(?=\n|$)/g,
      '$1<h3 class="mt-3 mb-1">$2</h3>'
    );
  };

  const blocks = text
    .split(/(```[\s\S]*?```)/)
    .map((block, index) => {
      if (block.startsWith('```') && block.endsWith('```')) {
        const codeContent = block.slice(3, -3).trim();
        return formatCodeBlock(codeContent, index);
      } else {
        return block.split('\n\n').map((paragraph, pIndex) => {
          let formattedParagraph = formatBestPractices(paragraph);
          formattedParagraph = formatNoteTopics(formattedParagraph).replace(
            /\*\*(.*?)\*\*/g,
            '<div class="mt-5 mb-5"><strong>$1</strong></div>'
          );
          formattedParagraph = formatListItems(formattedParagraph);
          return (
            <p
              key={`${index}-${pIndex}`}
              dangerouslySetInnerHTML={{ __html: formattedParagraph }}
            />
          );
        });
      }
    })
    .flat();

  return blocks;
};

export default formatText;

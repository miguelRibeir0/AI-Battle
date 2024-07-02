const formatText = (text) => {
  if (typeof text !== 'string') {
    return [];
  }

  const formatCOBOLCode = (code) => {
    const lines = code.split('\n');
    const keywords = [
      'IDENTIFICATION DIVISION',
      'PROGRAM-ID',
      'ENVIRONMENT DIVISION',
      'DATA DIVISION',
      'PROCEDURE DIVISION',
      'WORKING-STORAGE SECTION',
      'FILE SECTION',
      'READ',
      'WRITE',
      'ADD',
      'SUBTRACT',
      'MULTIPLY',
      'DIVIDE',
      'END-IF',
      'IF',
      'ELSE',
      'PERFORM',
      'UNTIL',
      'STOP RUN',
      'ACCEPT',
      'STRING',
      'COMPUTE',
      'SELECT',
      'ASSIGN',
      'FROM',
      'INTO',
      'PIC',
      'VALUE',
      'ZERO',
      'NOT',
      'EQUAL',
      'THEN',
      'OR',
      'BY',
      'SPACE',
    ];

    const formattedLines = lines.map((line) => {
      let highlightedLine = line;
      keywords.forEach((keyword) => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'g');
        highlightedLine = highlightedLine.replace(
          regex,
          `<span class="cobol-keyword">${keyword}</span>`
        );
      });
      return highlightedLine;
    });
    return formattedLines.join('\n');
  };

  const formatCodeBlock = (block, index, language = '') => {
    let formattedBlock = block;
    if (language.toLowerCase() === 'cobol') {
      formattedBlock = formatCOBOLCode(block);
    }
    return (
      <pre
        key={index}
        className={`mb-5 mt-5 overflow-x-auto rounded bg-gray-950 p-4 text-white ${language}`}
        style={{ whiteSpace: 'pre-wrap' }}
      >
        <code dangerouslySetInnerHTML={{ __html: formattedBlock }}></code>
      </pre>
    );
  };

  const formatBestPractices = (text) =>
    text.replace(/\* (.*?):/g, '<h3>$1:</h3>');
  const formatNoteTopics = (text) => text.replace(/\* (.*?):/g, '<h3>$1:</h3>');
  const formatListItems = (text) =>
    text.replace(/(^|\n)\* (.*?)(?=\n|$)/g, '$1<h3 class="mt-3 mb-1">$2</h3>');
  const formatBoldText = (text) =>
    text.replace(/\*\*(.*?)\*\*/g, '<strong class="mt-2 mb-2">$1</strong>');

  const blocks = [];
  let codeBlock = [];
  let inCodeBlock = false;
  let language = '';

  const lines = text.split('\n');
  const containsFormattingMarkers = lines.some((line) =>
    line.trim().match(/^\*|\*\*|```/)
  );

  if (!containsFormattingMarkers) {
    return [formatCodeBlock(text, 0, 'cobol')];
  }

  lines.forEach((line, index) => {
    const codeBlockStartMatch = line.trim().match(/^```(\S*)/);
    if (codeBlockStartMatch) {
      if (inCodeBlock) {
        blocks.push(
          formatCodeBlock(codeBlock.join('\n'), blocks.length, language)
        );
        codeBlock = [];
        inCodeBlock = false;
        language = '';
      } else {
        inCodeBlock = true;
        language = codeBlockStartMatch[1];
      }
    } else if (inCodeBlock) {
      codeBlock.push(line);
    } else {
      blocks.push(
        <p
          key={`${index}`}
          dangerouslySetInnerHTML={{
            __html: formatListItems(
              formatNoteTopics(formatBestPractices(formatBoldText(line)))
            ),
          }}
        />
      );
    }
  });

  if (codeBlock.length > 0) {
    blocks.push(formatCodeBlock(codeBlock.join('\n'), blocks.length, language));
  }

  return blocks;
};

export default formatText;

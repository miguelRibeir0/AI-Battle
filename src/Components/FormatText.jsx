const formatText = (text) => {
  if (typeof text !== 'string') {
    return [];
  }
  const paragraphs = text.split('\n\n').map((paragraph, index) => {
    // Handle lists
    if (/^\d+\.\s/.test(paragraph)) {
      const items = paragraph.split(/\n(?=\d+\.\s)/);
      return (
        <ol key={index} className="my-2 list-inside list-decimal">
          {items.map((item, idx) => {
            // Replace everything after a bullet point until a colon with bold text
            let formattedItem = item.replace(
              /(\d+\.\s)(.*?)(:)/,
              '$1<strong>$2</strong>$3'
            );
            // Remove any remaining ** characters
            formattedItem = formattedItem.replace(/\*\*/g, '');
            return (
              <li
                key={idx}
                className="mb-2" // Increase the bottom margin
                dangerouslySetInnerHTML={{
                  __html: formattedItem.replace(/^\d+\.\s*/, ''),
                }}
              ></li>
            );
          })}
        </ol>
      );
    } else if (paragraph.startsWith('**')) {
      // Handle headings
      return (
        <h2
          key={index}
          className="mb-2 mt-4 text-lg font-bold"
          dangerouslySetInnerHTML={{
            __html: paragraph.replace(/^\*\*(.*)\*\*$/, '$1'),
          }}
        ></h2>
      );
    } else {
      // Replace markdown for bold text with HTML tags
      let formattedParagraph = paragraph.replace(
        /\*\*(.*?)\*\*/g,
        '<strong>$1</strong>'
      );
      // Remove any remaining ** characters
      formattedParagraph = formattedParagraph.replace(/\*\*/g, '');
      // Handle regular paragraphs
      return (
        <p
          key={index}
          className="my-2"
          dangerouslySetInnerHTML={{ __html: formattedParagraph }}
        ></p>
      );
    }
  });

  return paragraphs;
};

export default formatText;

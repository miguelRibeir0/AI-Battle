/* eslint-disable */
import React from 'react';

const formatText = (text) => {
  if (typeof text !== 'string') {
    return [];
  }

  const paragraphs = text.split('\n\n').map((paragraph, index) => {
    // Handle headings
    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
      return (
        <h2
          key={index}
          className="mb-2 mt-4 text-lg font-bold"
          dangerouslySetInnerHTML={{
            __html: paragraph.replace(/^\*\*(.*)\*\*$/, '$1'),
          }}
        ></h2>
      );
    }
    // Handle numbered lists
    else if (/^\d+\.\s/.test(paragraph)) {
      const items = paragraph.split(/\n(?=\d+\.\s)/);
      return (
        <ol key={index} className="my-2 list-inside list-decimal">
          {items.map((item, idx) => {
            let formattedItem = item.replace(
              /\*\*(.*?)\*\*/g,
              '<strong>$1</strong>'
            );
            return (
              <li
                key={idx}
                className="mb-2"
                dangerouslySetInnerHTML={{
                  __html: formattedItem.replace(/^\d+\.\s*/, ''),
                }}
              ></li>
            );
          })}
        </ol>
      );
    }
    // Handle bulleted lists with asterisks or hyphens
    else if (/^(\*\s|-\s)/.test(paragraph)) {
      const items = paragraph.split(/\n(?=\*\s|-\s)/);
      return (
        <ul key={index} className="my-2 list-inside list-disc">
          {items.map((item, idx) => {
            let formattedItem = item.replace(/^(\*\s|-\s)/, '');
            formattedItem = formattedItem.replace(
              /\*\*(.*?)\*\*/g,
              '<strong>$1</strong>'
            );
            return (
              <li
                key={idx}
                className="mb-2"
                dangerouslySetInnerHTML={{
                  __html: formattedItem,
                }}
              ></li>
            );
          })}
        </ul>
      );
    }
    // Handle regular paragraphs
    else {
      let formattedParagraph = paragraph.replace(
        /\*\*(.*?)\*\*/g,
        '<strong>$1</strong>'
      );
      return (
        <div
          key={index}
          className="my-2"
          dangerouslySetInnerHTML={{ __html: formattedParagraph }}
        ></div>
      );
    }
  });

  // Insert space between topics
  const spacedParagraphs = [];
  paragraphs.forEach((para, index) => {
    spacedParagraphs.push(para);
    if (index < paragraphs.length - 1) {
      spacedParagraphs.push(
        <div key={`space-${index}`} className="my-4"></div>
      );
    }
  });

  return spacedParagraphs;
};

export default formatText;

import React from 'react';

// Controlled answer card: selection is driven by parent via `isSelected`.
const AnswerCard = ({ text, onSelect, index, isSelected }) => {
  function handleClick() {
    if (onSelect) onSelect(index);
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyPress={(e) => (e.key === 'Enter' ? handleClick() : null)}
      onClick={handleClick}
      style={{
        border: isSelected ? '2px solid #333' : '1px solid #ccc',
        padding: 14,
  minWidth: 120,
  maxWidth: 420,
        boxSizing: 'border-box',
        cursor: 'pointer',
        background: isSelected ? '#fafafa' : 'white',
        whiteSpace: 'normal',
        wordBreak: 'break-word',
        flex: '1 1 0%'
      }}
    >
      {text}
    </div>
  );
};

export default AnswerCard;

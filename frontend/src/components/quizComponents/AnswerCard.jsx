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
      style={{ border: isSelected ? '2px solid #333' : '1px solid #ccc', padding: 12, width: 200, cursor: 'pointer', background: isSelected ? '#fafafa' : 'white' }}
    >
      {text}
    </div>
  );
};

export default AnswerCard;

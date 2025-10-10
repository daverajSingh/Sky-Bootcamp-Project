import React, { useState } from 'react';

const AnswerCard = ({ text, onSelect, index }) => {
  const [selected, setSelected] = useState(false);

  function handleClick() {
    setSelected(true);
    if (onSelect) onSelect(index);
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyPress={(e) => (e.key === 'Enter' ? handleClick() : null)}
      onClick={handleClick}
      style={{ border: selected ? '2px solid #333' : '1px solid #ccc', padding: 12, width: 200, cursor: 'pointer' }}
    >
      {text}
    </div>
  );
};

export default AnswerCard;

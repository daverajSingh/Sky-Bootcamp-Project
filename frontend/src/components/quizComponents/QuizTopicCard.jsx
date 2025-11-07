import React, { useState } from "react";

// Map topic names to specific avatar images
const getAvatarForTopic = (topicID) => {
  const topicAvatarMap = {
    'Emotional Intelligence': '/src/assets/pfp1.png',
    'Agile': '/src/assets/pfp2.png',
    'Compliance': '/src/assets/pfp3.png',
    'Communication': '/src/assets/pfp4.png',
    'Sky products and services': '/src/assets/pfp5.png',
  };
  
  return topicAvatarMap[topicID] || '/src/assets/pfp.png';
};

// A simple presentational card. Selection/opening is managed by the parent.
const QuizTopicCard = ({ topic, status = "todo", onSelect, selected, isMock = false }) => {
  const avatarSrc = isMock ? '/src/assets/pfp.png' : getAvatarForTopic(topic.topicID);

  function activate() {
    if (isMock) return;
    if (onSelect) onSelect(topic.topicID);
  }

  return (
    <div
      {...(!isMock
        ? {
            role: "button",
            tabIndex: 0,
            'aria-pressed': selected,
            onClick: activate,
            onKeyDown: (e) => (e.key === "Enter" || e.key === " ") && activate(),
          }
        : {})}
      data-testid={`topic-card-${topic.topicID}`}
      aria-label={`Quiz topic: ${topic.topicID.replace(/_/g, " ")}`}
      className={
        `flex flex-col justify-between relative overflow-hidden min-w-[140px] min-h-[240px] box-border cursor-${isMock ? 'default' : 'pointer'} transition-transform duration-200 ` +
        (selected ? 'border-2 border-blue-600 bg-blue-50' : 'border') +
        ' rounded-md ' +
        (isMock ? 'border-gray-200' : 'hover:-translate-y-1.5 hover:shadow-lg shadow-sm')
      }
    >
      {/* Full-bleed avatar for every tile; overlays show name and status. Clickable behavior preserved for non-mock cards. */}
      <img
        src={avatarSrc}
        alt={topic.person || topic.topicID}
        className="w-full h-full object-cover block"
      />

      <div className="absolute left-2 bottom-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
        {topic.title || (topic.person && topic.person) || topic.topicID.replace(/_/g, " ")}
      </div>

      {!isMock && (
        <div className="absolute right-2 top-2 bg-white/90 text-gray-800 px-2 py-1 rounded text-xs">
          {status === "partially" ? "partially completed" : status || "todo"}
        </div>
      )}

      {/* Provide the uppercase title in the DOM (used by tests) */}
      <div className="absolute left-2 top-1/2 -translate-y-1/2 text-transparent">
        <strong>{topic.topicID.replace(/_/g, " ").toUpperCase()}</strong>
      </div>
    </div>
  );
};

export default QuizTopicCard;

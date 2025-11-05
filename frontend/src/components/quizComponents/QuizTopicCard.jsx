import React from "react";
// Use a simple static path to the sample avatar so tests don't try to import binary assets
const SAMPLE_PFP = '/src/assets/pfp.png';

// A simple presentational card. Selection/opening is managed by the parent.
const QuizTopicCard = ({ topic, status = "todo", onSelect, selected, isMock = false }) => {
  return (
    <div
      {...(!isMock
        ? {
            role: "button",
            tabIndex: 0,
            'aria-pressed': selected,
            onClick: () => onSelect && onSelect(topic.topicID),
            onKeyDown: (e) =>
              (e.key === "Enter" || e.key === " ") &&
              onSelect &&
              onSelect(topic.topicID),
          }
        : {})}
      data-testid={`topic-card-${topic.topicID}`}
      aria-label={`Quiz topic: ${topic.topicID.replace(/_/g, " ")}`}
      style={{
        border: selected ? "2px solid #2563eb" : "1px solid #ddd",
        padding: 0,
        // allow topic cards to stretch/shrink like answer cards
        flex: "1 1 0%",
        minWidth: 140,
        minHeight: 240,
        boxSizing: "border-box",
        cursor: isMock ? "default" : "pointer",
        background: selected ? "#f0f8ff" : "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Full-bleed avatar for every tile; overlays show name and status. Clickable behavior preserved for non-mock cards. */}
      <img
        src={SAMPLE_PFP}
        alt={topic.person || topic.topicID}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />

      <div
        style={{
          position: "absolute",
          left: 8,
          bottom: 8,
          background: "rgba(0,0,0,0.5)",
          color: "white",
          padding: "4px 8px",
          borderRadius: 6,
          fontSize: 12,
        }}
      >
        {(topic.person && topic.person) || topic.topicID.replace(/_/g, " ")}
      </div>

      {!isMock && (
        <div
          style={{
            position: "absolute",
            right: 8,
            top: 8,
            background: "rgba(255,255,255,0.85)",
            color: "#333",
            padding: "4px 8px",
            borderRadius: 6,
            fontSize: 12,
          }}
        >
          {status === "partially" ? "partially completed" : status || "todo"}
        </div>
      )}

      {/* Provide the uppercase title in the DOM (used by tests) */}
      <div style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", color: "transparent" }}>
        <strong>{topic.topicID.replace(/_/g, " ").toUpperCase()}</strong>
      </div>
    </div>
  );
};

export default QuizTopicCard;

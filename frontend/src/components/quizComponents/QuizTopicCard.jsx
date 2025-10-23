import React from "react";

// A simple presentational card. Selection/opening is managed by the parent.
const QuizTopicCard = ({ topic, status = "todo", onSelect, selected }) => {
  return (
    <div
      role="button"
      tabIndex={0}
      data-testid={`topic-card-${topic.topicID}`}
      aria-label={`Quiz topic: ${topic.topicID.replace(/_/g, " ")}`}
      aria-pressed={selected}
      onClick={() => onSelect && onSelect(topic.topicID)}
      onKeyDown={(e) =>
        (e.key === "Enter" || e.key === " ") &&
        onSelect &&
        onSelect(topic.topicID)
      }
      style={{
        border: selected ? "2px solid #2563eb" : "1px solid #ddd",
        padding: 12,
        // allow topic cards to stretch/shrink like answer cards
        flex: "1 1 0%",
        minWidth: 140,
        minHeight: 240,
        boxSizing: "border-box",
        cursor: "pointer",
        background: selected ? "#f0f8ff" : "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <strong style={{ display: "block", marginBottom: 8 }}>
          {topic.topicID.replace(/_/g, " ").toUpperCase()}
        </strong>
      </div>

      <div style={{ fontSize: 12, color: "#999", marginTop: 12 }}>
        {topic.description || ""}
      </div>

      <div style={{ textAlign: "center", marginTop: 8, color: "#666" }}>
        {status === "partially" ? "partially completed" : status || "todo"}
      </div>
    </div>
  );
};

export default QuizTopicCard;

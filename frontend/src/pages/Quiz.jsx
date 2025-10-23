import { Link } from "react-router";
import { QuizTopicSelector } from "../components/index";

const Quiz = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 24,
      }}
    >
      {/* ensure header takes full width */}
      <div style={{ width: "100%" }}></div>
      {/* simple header */}
      <header
        style={{
          width: "100%",
          maxWidth: 1300,
          padding: "12px 0",
          marginBottom: 8,
          borderBottom: "1px solid #eee",
        }}
      >
        <h1 style={{ textAlign: "center", margin: 0 }}>Are you Sky ready</h1>
      </header>

      <div style={{ width: "100%", maxWidth: 1300, marginTop: 12 }}>
        <QuizTopicSelector />
        <div style={{ marginTop: 12 }}>
          <Link to="/">Go to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Quiz;

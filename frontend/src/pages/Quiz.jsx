import { useNavigate } from "react-router";
import { QuizTopicSelector, Button } from "../components/index";

const Quiz = () => {
  let navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 24,
      }}
    >
      <div style={{ width: "100%", maxWidth: 1300, marginTop: 12 }}>
        <QuizTopicSelector navigate={navigate} />
      </div>
    </div>
  );
};

export default Quiz;

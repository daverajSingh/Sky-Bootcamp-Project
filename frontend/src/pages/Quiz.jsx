import { useNavigate } from "react-router";
import { QuizTopicSelector, Button } from "../components/index";

const Quiz = () => {
  let navigate = useNavigate();
  return (
    <div className="flex flex-col items-center p-3 md:p-6">
      <div className="w-full max-w-[1300px] mt-3">
        <QuizTopicSelector navigate={navigate} />
      </div>
    </div>
  );
};

export default Quiz;

import { Link } from 'react-router-dom';
import QuizTopicSelector from '../components/quizComponents/QuizTopicSelector';

const Quiz = () => {
    return (
        <div>
            <h1>Quiz Page</h1>
            <QuizTopicSelector />
            <Link to="/">Go to Home</Link>
        </div>
    );
};

export default Quiz;
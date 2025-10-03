import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/quiz">Go to Quiz</Link>
      <Link to="/simulator">Go to Simulator</Link>
      <Link to="/admin">Go to Admin</Link>
      <Link to="/faq">Go to FAQ</Link>
    </div>
  );
}
export default Home;
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
        <h1 class="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">sky Immersion</h1>
    </div>
  );
}

const Home = () => {
  return (
    <div>
      {/* <h1>Home</h1>
      <Link to="/quiz">Go to Quiz</Link>
      <Link to="/simulator">Go to Simulator</Link>
      <Link to="/admin">Go to Admin</Link> */}
      <Header></Header>
    </div>
  );
}


export default Home;
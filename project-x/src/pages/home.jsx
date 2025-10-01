import { Link } from 'react-router-dom';

import Header from '../components/header.jsx';

const Home = () => {
  return (
    <div>
      {/* <h1>Home</h1>
      <Link to="/quiz">Go to Quiz</Link>
      <Link to="/simulator">Go to Simulator</Link>
      <Link to="/admin">Go to Admin</Link> */}
      <Header />
    </div>
  );
}


export default Home;
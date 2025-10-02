import { Link } from 'react-router-dom';

import Header from '../components/header.jsx';
import Card from '../components/card.jsx';

const Home = () => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Card title="Explore the Sky" />
        <Card title="Are you Sky ready?" />
      </div>
    </div>
  );
}


export default Home;
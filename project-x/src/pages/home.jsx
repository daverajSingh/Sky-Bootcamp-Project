import Header from '../components/header.jsx';
import Card from '../components/card.jsx';

const Home = () => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Card title="Explore a day at Sky" link="/simulator"/>
        <Card title="Are you Sky ready?" link="/quiz"/>
      </div>
    </div>
  );
}


export default Home;
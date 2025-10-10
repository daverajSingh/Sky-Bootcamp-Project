import Header from '../components/Header.jsx';
import WelcomeSection from '../components/WelcomeSection.jsx';
import Card from '../components/Card.jsx';
import FAQPage from '../components/FAQ.jsx';

const Home = () => {
  return (
    <div>
        <Header />
        <WelcomeSection/>
      <div className="p-6 grid grid-cols-2 gap-6">
        <Card title="Explore a day at Sky" link="/simulator" description={"Experience our culture, live a day at Sky "}/>
        <Card title="Are you Sky ready?" link="/quiz" description={"Take the quiz to find out"}/>
      </div>
        <FAQPage />
    </div>
  );
}


export default Home;
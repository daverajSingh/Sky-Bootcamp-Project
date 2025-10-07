import Header from '../components/header.jsx';
import WelcomeSection from '../components/welcomeSection.jsx';
import Card from '../components/card.jsx';
import FAQPage from '../components/faq.jsx';

const Home = () => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="p-6">
        <WelcomeSection></WelcomeSection>
      </div>
      <div className="p-6 grid grid-cols-2 gap-6">
        <Card title="Explore a day at Sky" link="/simulator" description={"Experience our culture, live a day at Sky "}/>
        <Card title="Are you Sky ready?" link="/quiz" description={"Take the quiz to find out"}/>
      </div>
      <div>
        <FAQPage />
      </div>
    </div>
  );
}


export default Home;
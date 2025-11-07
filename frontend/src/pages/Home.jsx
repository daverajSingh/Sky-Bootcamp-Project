import { WelcomeSection, Card, FAQ } from "../components/index.jsx";

const Home = () => {
  return (
    <>
      <WelcomeSection />
      <div className="p-6 grid grid-cols-2 gap-6">
        <div id="simulator">
          <Card
            title="Explore a day at Sky"
            link="/simulator"
            description={"Experience our culture, live a day at Sky "}
            imageURL="src/assets/simulator_card.png"
          />
        </div>
        <div id="quiz">
          <Card
            title="Are you Sky ready?"
            link="/quiz"
            description={"Take the quiz to find out"}
            imageURL="src/assets/quiz_card.png"
          />
        </div>
      </div>
      <div id="faq">
        <FAQ />
      </div>
    </>
  );
};

export default Home;

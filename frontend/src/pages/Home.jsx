import { WelcomeSection, Card, FAQ, Container } from "../components/index.jsx";

const Home = () => {
  return (
    <>
      <Container className="p-6 mx-6 mb-6 mt-6">
        <WelcomeSection />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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
      </Container>
      <div id="faq">
        <FAQ />
      </div>
    </>
  );
};

export default Home;

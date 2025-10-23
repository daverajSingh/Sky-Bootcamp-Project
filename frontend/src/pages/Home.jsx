import { WelcomeSection, Card, FAQ } from "../components/index.jsx";

const Home = () => {
  return (
    <>
      <WelcomeSection />
      <div className="p-6 grid grid-cols-2 gap-6">
        <Card
          title="Explore a day at Sky"
          link="/simulator"
          description={"Experience our culture, live a day at Sky "}
        />
        <Card
          title="Are you Sky ready?"
          link="/quiz"
          description={"Take the quiz to find out"}
        />
      </div>
      <FAQ />
    </>
  );
};

export default Home;

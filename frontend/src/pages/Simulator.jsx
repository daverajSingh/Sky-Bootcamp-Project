import { Card } from "../components";

const Simulator = () => {
  return (
    <>
      <section className="text-s md:text-xl text-center p-4">Explore a day at Sky</section>
      <div className="grid grid-flow-col grid-rows-1 gap-4 p-6">
        <Card title="Agile" link="/simulator/2" />
        <Card title="Compilance" link="/simulator/3" />
        <Card title="Emotional Intelligence" link="/simulator/1" />
        <Card title="Communication" link="/simulator/4" />
        <Card title="Sky Products & Services" link="/simulator/5" />
      </div>
    </>
  );
};
export default Simulator;

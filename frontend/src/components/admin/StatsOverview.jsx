import StatCard from "./StatCard.jsx";

const StatsOverview = ({ data }) => (
  <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-11/12 mx-auto">
    <StatCard title="Daily Users" value={data.dailyUsers} />
    <StatCard title="Average Time Per Use" value={data.avgTimePerUse} />
    <StatCard
      title="Average Questions Correct"
      value={data.avgQuestionsCorrect}
    />
  </section>
);

export default StatsOverview;

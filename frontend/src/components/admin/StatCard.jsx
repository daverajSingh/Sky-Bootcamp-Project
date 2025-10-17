const StatCard = ({ title, value }) => (
  <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-sky-100 shadow-md hover:shadow-lg transition p-6 text-center">
    <h3 className="text-gray-500 text-sm">{title}</h3>
    <p className="text-2xl font-bold text-sky-700 mt-1">{value}</p>
  </div>
);

export default StatCard;

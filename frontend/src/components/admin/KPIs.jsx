export function KPIs({ data }) {
  const formatTimeSpent = (seconds) => {
    if (seconds == null) return null;
    const mins = Math.round(seconds / 60);
    const value = Number(mins);
    if (!Number.isFinite(value)) return null;
    if (value >= 60) {
      const hours = Math.floor(value / 60);
      const minutes = value % 60;
      return `${hours}h ${minutes}m`;
    }
    return `${value}m`;
  };

  const formatPercent = (value) => {
    if (value == null) return null;
    const num = Number(value);
    if (!Number.isFinite(num)) return null;
    const pct = num <= 1 ? num * 100 : num;
    return `${Math.round(pct)}%`;
  };

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white p-4 rounded-lg">
        <h3 className="m-0 text-sm text-slate-600">Total Time Spent</h3>
        <p className="text-2xl mt-2">
          {formatTimeSpent(data?.timeSpent) ?? "—"}
        </p>
      </div>
      <div className="bg-white p-4 rounded-lg">
        <h3 className="m-0 text-sm text-slate-600">
          Simulator Questions Asked
        </h3>
        <p className="text-2xl mt-2">{data?.totalSimulatorQuestions ?? "—"}</p>
      </div>
      <div className="bg-white p-4 rounded-lg">
        <h3 className="m-0 text-sm text-slate-600">Quizzes Answered</h3>
        <p className="text-2xl mt-2">{data?.totalSessions ?? "—"}</p>
      </div>
      <div className="bg-white p-4 rounded-lg">
        <h3 className="m-0 text-sm text-slate-600">Average Quiz Score</h3>
        <p className="text-2xl mt-2">
          {formatPercent(data?.averageScore) ?? "—"}
        </p>
      </div>
    </section>
  );
}

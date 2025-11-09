export function KPIs({ data }) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white p-4 rounded-lg">
        <h3 className="m-0 text-sm text-slate-600">Total Users</h3>
        <p className="text-2xl mt-2">{data?.totalUsers ?? "—"}</p>
      </div>
      <div className="bg-white p-4 rounded-lg">
        <h3 className="m-0 text-sm text-slate-600">Simulator Sessions</h3>
        <p className="text-2xl mt-2">{data?.simulatorSessions ?? "—"}</p>
      </div>
      <div className="bg-white p-4 rounded-lg">
        <h3 className="m-0 text-sm text-slate-600">Quizzes Answered</h3>
        <p className="text-2xl mt-2">{data?.quizzesAnswered ?? "—"}</p>
      </div>
      <div className="bg-white p-4 rounded-lg">
        <h3 className="m-0 text-sm text-slate-600">Average Quiz Score</h3>
        <p className="text-2xl mt-2">{data?.averageQuizScore ?? "—"}</p>
      </div>
    </section>
  );
}

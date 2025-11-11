function SimulationSummary({ simulationQuestions }) {
  return (
    <div className="bg-white/80 backdrop-blur-lg border border-sky-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition">
      <h4 className="text-xl font-semibold text-sky-700 mb-4">
        Simulation Questions Asked
      </h4>
      {Array.isArray(simulationQuestions) && simulationQuestions.length > 0 ? (
        <ul className="space-y-3 text-gray-700">
          {simulationQuestions.map(
            ({ topic_id, topic_name, questions_asked_count }) => (
              <li
                key={topic_id}
                className="flex justify-between bg-gradient-to-r from-sky-50 to-indigo-50 rounded-md px-3 py-2"
              >
                <span>{topic_name}</span>
                <span className="font-semibold text-sky-600">
                  {questions_asked_count}{" "}
                  {questions_asked_count === 1 ? "Question" : "Questions"}
                </span>
              </li>
            )
          )}
        </ul>
      ) : (
        <p className="text-gray-500">No simulation questions.</p>
      )}
    </div>
  );
}

export default SimulationSummary;

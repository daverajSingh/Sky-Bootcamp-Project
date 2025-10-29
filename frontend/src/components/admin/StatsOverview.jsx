import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const StatsOverview = ({ data }) => {
  const [period, setPeriod] = useState("daily");

  if (!data?.userActivity || !data?.quizPerformance)
    return (
      <p className="text-center text-gray-600 mt-10">
        Loading charts...
      </p>
    );

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-11/12 mx-auto">
      {/* USER ENGAGEMENT CHART */}
      <div className="bg-white/80 backdrop-blur-lg border border-sky-100 rounded-2xl p-6 shadow-md">
        <h3 className="text-xl font-semibold text-sky-700 mb-4 text-center">
          User Engagement
        </h3>

        <div className="flex justify-center gap-2 mb-4">
          {["daily", "weekly", "monthly", "yearly"].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1 text-sm rounded-full ${
                period === p
                  ? "bg-sky-600 text-white"
                  : "bg-sky-100 text-sky-700 hover:bg-sky-200"
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data.userActivity[period]}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#0284c7"
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* QUIZ PERFORMANCE CHART */}
      <div className="bg-white/80 backdrop-blur-lg border border-sky-100 rounded-2xl p-6 shadow-md">
        <h3 className="text-xl font-semibold text-sky-700 mb-4 text-center">
          Quiz Performance by Topic
        </h3>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data.quizPerformance}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="topic" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="correct" fill="#22c55e" name="Correct" />
            <Bar dataKey="incorrect" fill="#ef4444" name="Incorrect" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default StatsOverview;

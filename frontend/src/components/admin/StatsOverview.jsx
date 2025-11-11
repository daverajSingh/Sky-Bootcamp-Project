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
    return <p className="text-center text-gray-600 mt-10">Loading charts...</p>;

  const CustomTick = ({ x, y, payload }) => {
    const label = payload.value || "";
    if (label.length <= 12) {
      return (
        <text x={x} y={y + 10} textAnchor="middle" fill="#374151" fontSize={12}>
          {label}
        </text>
      );
    }
    const words = label.split(" ");
    if (words.length === 1) {
      const mid = Math.ceil(label.length / 2);
      const lines = [label.slice(0, mid), label.slice(mid)];
      return (
        <text x={x} y={y + 4} textAnchor="middle" fill="#374151" fontSize={12}>
          <tspan x={x} dy="0">
            {lines[0]}
          </tspan>
          <tspan x={x} dy="12">
            {lines[1]}
          </tspan>
        </text>
      );
    }
    const midWord = Math.ceil(words.length / 2);
    const lines = [
      words.slice(0, midWord).join(" "),
      words.slice(midWord).join(" "),
    ];
    return (
      <text x={x} y={y + 4} textAnchor="middle" fill="#374151" fontSize={12}>
        <tspan x={x} dy="0">
          {lines[0]}
        </tspan>
        <tspan x={x} dy="12">
          {lines[1]}
        </tspan>
      </text>
    );
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-12/12 mx-auto mb-8">
      <div className="bg-white/80 backdrop-blur-lg border border-sky-100 rounded-2xl p-6 shadow-md">
        <h3 className="text-xl font-semibold text-sky-700 mb-4 text-center">
          User Engagement
        </h3>

        <div className="flex justify-center gap-2 mb-4">
          {["daily", "weekly", "monthly"].map((p) => (
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

        {(() => {
          const source = data.userEngagementChart || data.userActivity || {};
          const raw = source[period] || [];
          const chartData = raw.map((item) => {
            if (period === "daily") {
              const d = new Date(item.date);
              return {
                label: d.toLocaleDateString("en-US", { weekday: "short" }),
                fullLabel: d.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }),
                count: item.quiz_count ?? item.users ?? 0,
              };
            }
            if (period === "weekly") {
              return {
                label: item.week_label,
                fullLabel: "Week Beginning " + item.week_start_date,
                count: item.quiz_count ?? item.users ?? 0,
              };
            }
            return {
              label: item.month_label,
              fullLabel: item.month_start_date,
              count: item.quiz_count ?? item.users ?? 0,
            };
          });

          const CustomTooltip = ({ active, payload, label }) => {
            if (active && payload?.length) {
              const full = payload[0].payload.fullLabel;
              return (
                <div className="bg-white border border-sky-200 rounded-md px-3 py-2 text-sm shadow">
                  <p className="font-medium text-sky-700">{full}</p>
                  <p className="text-gray-600">
                    Quizzes:{" "}
                    <span className="font-semibold">{payload[0].value}</span>
                  </p>
                </div>
              );
            }
            return null;
          };

          return (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="label" />
                <YAxis allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#0284c7"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          );
        })()}
      </div>

      {/* QUIZ PERFORMANCE CHART */}
      <div className="bg-white/80 backdrop-blur-lg border border-sky-100 rounded-2xl p-6 shadow-md">
        <h3 className="text-xl font-semibold text-sky-700 mb-4 text-center">
          Quiz Performance by Topic
        </h3>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data.quizPerformance} margin={{ bottom: 35 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey="topic_name"
              interval={0}
              tickLine={false}
              tick={<CustomTick />}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="total_correct_answers"
              fill="#22c55e"
              name="Correct"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default StatsOverview;

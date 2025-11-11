import React, { useState, useEffect } from "react";
import Container from "../components/Container.jsx";
import axios from "axios";
import {
  QuestionManager,
  SimulationSummary,
  StatsOverview,
} from "../components/index.jsx";
import { API_BASE } from "../env.js";
import { KPIs } from "../components/admin/KPIs.jsx";

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${API_BASE}/api/admin/get_stats`);
        setAdminData(response.data);
        console.log("Admin data loaded:", response.data);
      } catch (err) {
        console.error("Failed to load admin data:", err);
      }
    })();
  }, []);

  if (!adminData)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-sm text-gray-500">Loading...</p>
        </div>
      </div>
    );

  return (
    <Container className="m-3 sm:m-4 lg:m-6 px-4 sm:px-6 lg:px-8 py-8">
      <KPIs data={adminData.overallKPIs[0]} />
      <StatsOverview data={adminData.charts} />
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-3 items-stretch">
        <QuestionManager />
        <SimulationSummary
          simulationQuestions={adminData.simulationQuestions}
        />
      </section>
    </Container>
  );
};

export default AdminDashboard;

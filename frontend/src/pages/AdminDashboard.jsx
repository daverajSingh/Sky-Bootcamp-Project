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
  const [adminData, setAdminData] = useState({});
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${API_BASE}/api/admin/dashboard`);
        console.log("Fetched admin data:", response.data);
        setAdminData(response.data);
      } catch (err) {
        console.error("Failed to load admin data:", err);
      }
    })();
  }, []);
  return (
    <Container className="m-3 sm:m-4 lg:m-6 px-4 sm:px-6 lg:px-8 py-8">
      <KPIs data={adminData.kpiData} />
      <StatsOverview data={adminData} />
      <section className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">
        <QuestionManager adminData={adminData.questionsData} />
        <SimulationSummary
          simulationQuestions={adminData.simulationQuestions}
        />
      </section>
    </Container>
  );
};

export default AdminDashboard;

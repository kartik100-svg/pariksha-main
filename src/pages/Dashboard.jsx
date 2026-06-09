import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

import {
  FaUserGraduate,
  FaClipboardCheck,
  FaVideo,
  FaChartLine,
  FaBell,
  FaCode,
  FaLaptopCode,
  FaCalendarAlt
} from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await API.get("/dashboard");
        setData(res.data);
      } catch (error) {
        console.log(error.response?.data || error.message);
        navigate("/");
      }
    };

    fetchDashboard();
  }, [navigate]);

  if (!data) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="dashboard-layout">
     

      <div className="dashboard-main">
        <div className="dashboard-header">
          <div>
            <h2>Welcome Back, {data.user.name}</h2>
            <p>Track your assessments and interviews</p>
          </div>

          <div className="profile-box">
            <FaBell />

            <div
              className="profile-avatar"
              onClick={() => navigate("/profile")}
            >
              {data.user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <FaClipboardCheck className="dashboard-icon" />
            <h3>{data.stats.assessments}</h3>
            <p>Assessments</p>
          </div>

          <div className="stat-card">
            <FaVideo className="dashboard-icon" />
            <h3>{data.stats.interviews}</h3>
            <p>Interviews</p>
          </div>

          <div className="stat-card">
            <FaChartLine className="dashboard-icon" />
            <h3>{data.stats.performance}</h3>
            <p>Performance</p>
          </div>

          <div className="stat-card">
            <FaUserGraduate className="dashboard-icon" />
            <h3>{data.stats.completed}</h3>
            <p>Completed</p>
          </div>
        </div>

        <div className="dashboard-sections">
          <div className="recent-tests">
            <div className="section-title">
              <FaCode />
              <h3>Recent Assessments</h3>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Test</th>
                  <th>Score</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {data.recentAssessments.map((test, index) => (
                  <tr key={index}>
                    <td>{test.title}</td>
                    <td>{test.score}</td>
                    <td
                      className={
                        test.status === "Completed"
                          ? "status-success"
                          : "status-pending"
                      }
                    >
                      {test.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="upcoming-interviews">
            <div className="section-title">
              <FaCalendarAlt />
              <h3>Upcoming Interviews</h3>
            </div>

            {data.upcomingInterviews.map((interview, index) => (
              <div className="interview-card" key={index}>
                <div>
                  <h4>{interview.title}</h4>
                  <p>{interview.time}</p>
                </div>

                <FaLaptopCode />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
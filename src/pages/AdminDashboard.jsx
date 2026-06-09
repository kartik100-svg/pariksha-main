import { useNavigate } from "react-router-dom";

import {
  FaClipboardList,
  FaVideo,
  FaUsers,
  FaChartBar,
} from "react-icons/fa";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <div className="admin-grid">
        <div className="admin-card">
          <FaClipboardList className="admin-icon" />

          <h3>Create Assessment</h3>
          <p>Add MCQ and coding questions</p>

          <button onClick={() => navigate("/create-assessment")}>
            Manage Tests
          </button>
        </div>

        <div className="admin-card">
          <FaVideo className="admin-icon" />

          <h3>Conduct Interviews</h3>
          <p>Schedule and manage interviews</p>

          <button onClick={() => navigate("/schedule-interview")}>
            Schedule Interview
          </button>

          <button
            onClick={() => navigate("/admin-interviews")}
            style={{ marginTop: "12px" }}
          >
            View Interviews
          </button>
        </div>

        <div className="admin-card">
          <FaUsers className="admin-icon" />

          <h3>Student Management</h3>
          <p>View all registered students</p>

          <button onClick={() => navigate("/students")}>
            View Students
          </button>
        </div>

        <div className="admin-card">
          <FaChartBar className="admin-icon" />

          <h3>Publish Results</h3>
          <p>Upload grades and feedback</p>

          <button onClick={() => navigate("/results")}>
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AdminInterviews() {
  const [interviews, setInterviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const res = await API.get("/interviews/admin");
        setInterviews(res.data.interviews || []);
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };

    fetchInterviews();
  }, []);

  return (
    <div className="interview-list-page">
      <h2>Scheduled Interviews</h2>

      {interviews.length === 0 ? (
        <div className="no-interview-card">
          <h3>No Interviews Scheduled</h3>
        </div>
      ) : (
        interviews.map((interview) => (
          <div key={interview._id} className="interview-card">
            <h3>{interview.title}</h3>
            <p>{interview.description}</p>
            <p><strong>Date:</strong> {interview.date}</p>
            <p><strong>Time:</strong> {interview.time}</p>
            <p><strong>Status:</strong> {interview.status}</p>

            <button
              className="join-btn"
              onClick={() =>
                navigate(`/interview-room/${interview._id}?role=interviewer`)
              }
            >
              Join as Interviewer
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminInterviews;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Interview() {
  const [interviews, setInterviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const res = await API.get("/interviews/my");
        setInterviews(res.data.interviews || []);
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };

    fetchInterviews();
  }, []);

  const handleJoinInterview = (interview) => {
    const interviewTime = new Date(`${interview.date}T${interview.time}`);
    const now = new Date();

    const startWindow = new Date(
      interviewTime.getTime() - 10 * 60 * 1000
    );

    const endWindow = new Date(
      interviewTime.getTime() + 10 * 60 * 1000
    );

    if (now < startWindow) {
      alert("Interview has not started yet.");
      return;
    }

    if (now > endWindow) {
      alert("Sorry, you are late for joining interview.");
      return;
    }

    navigate(`/interview-room/${interview._id}`);
  };

  return (
    <div className="interview-list-page">
      <h2>Upcoming Interviews</h2>

      {interviews.length === 0 ? (
        <div className="no-interview-card">
          <h3>No Interviews Scheduled</h3>
          <p>You don't have any upcoming interviews right now.</p>
        </div>
      ) : (
        interviews.map((interview) => (
          <div key={interview._id} className="interview-card">
            <h3>{interview.title}</h3>

            <p>{interview.description}</p>

            <p>
              <strong>Date:</strong> {interview.date}
            </p>

            <p>
              <strong>Time:</strong> {interview.time}
            </p>

            <p>
              <strong>Status:</strong> {interview.status}
            </p>

            <button
              className="join-btn"
              onClick={() => handleJoinInterview(interview)}
            >
              Join Interview
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Interview;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AssessmentList() {
  const [assessments, setAssessments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssessments = async () => {
      const res = await API.get("/assessments");
      setAssessments(res.data.assessments);
    };

    fetchAssessments();
  }, []);

  return (
    <div>
      <h2>Available Assessments</h2>

      {assessments.map((assessment) => (
        <div key={assessment._id}>
          <h3>{assessment.title}</h3>
          <p>{assessment.description}</p>
          <p>Type: {assessment.type}</p>
          <p>Duration: {assessment.duration} minutes</p>

          <button onClick={() => navigate(`/assessment/${assessment._id}`)}>
            Start Test
          </button>
        </div>
      ))}
    </div>
  );
}

export default AssessmentList;
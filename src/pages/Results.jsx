import { useEffect, useState } from "react";
import API from "../services/api";

function Results() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const res = await API.get("/submissions/my-results");
      setResults(res.data.results);
    };

    fetchResults();
  }, []);

  return (
    <div>
      <h2>My Results</h2>

      {results.map((item) => (
        <div key={item._id}>
          <h3>{item.assessmentId.title}</h3>
          <p>Type: {item.assessmentId.type}</p>
          <p>Score: {item.score} / {item.assessmentId.totalMarks}</p>
        </div>
      ))}
    </div>
  );
}

export default Results;
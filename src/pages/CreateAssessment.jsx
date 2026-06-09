import { useState } from "react";
import API from "../services/api";

function CreateAssessment() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("mcq");
  const [duration, setDuration] = useState("");
  const [totalMarks, setTotalMarks] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/assessments", {
        title,
        description,
        type,
        duration,
        totalMarks,
      });

      console.log(res.data);
      alert("Assessment Created Successfully");
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Assessment Creation Failed");
    }
  };

  return (
    <div>
      <h2>Create Assessment</h2>

      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Assessment Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br /><br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br /><br />

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="mcq">MCQ</option>
          <option value="coding">Coding</option>
        </select>

        <br /><br />

        <input
          type="number"
          placeholder="Duration in minutes"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <br /><br />

        <input
          type="number"
          placeholder="Total Marks"
          value={totalMarks}
          onChange={(e) => setTotalMarks(e.target.value)}
        />

        <br /><br />

        <button type="submit">Create Assessment</button>
      </form>
    </div>
  );
}

export default CreateAssessment;
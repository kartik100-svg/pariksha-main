import { useState } from "react";
import API from "../services/api";

function ScheduleInterview() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSchedule = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/interviews", {
        title,
        description,
        studentEmail,
        date,
        time,
      });

      alert("Interview Scheduled Successfully");
      alert(
        `Interview Scheduled!\nMeet Link: ${res.data.interview.meetingLink}`
      );

      console.log(res.data);

      setTitle("");
      setDescription("");
      setStudentEmail("");
      setDate("");
      setTime("");
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Failed to Schedule Interview");
    }
  };

  return (
    <div>
      <h2>Schedule Interview</h2>

      <form onSubmit={handleSchedule}>
        <input
          type="text"
          placeholder="Interview Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br />
        <br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br />
        <br />

        <input
          type="email"
          placeholder="Student Email"
          value={studentEmail}
          onChange={(e) => setStudentEmail(e.target.value)}
        />

        <br />
        <br />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <br />
        <br />

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">
          Schedule Interview
        </button>
      </form>
    </div>
  );
}

export default ScheduleInterview;
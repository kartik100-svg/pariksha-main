import { useState } from "react";
import API from "../services/api";

function AddQuestion() {

  const [assessmentId, setAssessmentId] = useState("");

  const [questionText, setQuestionText] = useState("");

  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");

  const [correctAnswer, setCorrectAnswer] = useState("");

  const [marks, setMarks] = useState(1);

  const [type, setType] = useState("mcq");

  const handleAddQuestion = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post("/questions", {

        assessmentId,

        questionText,

        options: [
          option1,
          option2,
          option3,
          option4,
        ],

        correctAnswer,

        marks,

        type,

      });

      console.log(res.data);

      alert("Question Added Successfully");
      console.log(res.data);

alert("Question Added Successfully");

setQuestionText("");
setOption1("");
setOption2("");
setOption3("");
setOption4("");
setCorrectAnswer("");
setMarks(1);
setType("mcq");

    } catch (error) {

      console.log(
        error.response?.data || error.message
      );

      alert("Failed to Add Question");

    }

  };

  return (

    <div>

      <h2>Add Question</h2>

      <form onSubmit={handleAddQuestion}>

        <input
          type="text"
          placeholder="Assessment ID"
          value={assessmentId}
          onChange={(e)=>
            setAssessmentId(e.target.value)
          }
        />

        <br /><br />

        <textarea
          placeholder="Question Text"
          value={questionText}
          onChange={(e)=>
            setQuestionText(e.target.value)
          }
        />

        <br /><br />

        <input
          type="text"
          placeholder="Option 1"
          value={option1}
          onChange={(e)=>
            setOption1(e.target.value)
          }
        />

        <br /><br />

        <input
          type="text"
          placeholder="Option 2"
          value={option2}
          onChange={(e)=>
            setOption2(e.target.value)
          }
        />

        <br /><br />

        <input
          type="text"
          placeholder="Option 3"
          value={option3}
          onChange={(e)=>
            setOption3(e.target.value)
          }
        />

        <br /><br />

        <input
          type="text"
          placeholder="Option 4"
          value={option4}
          onChange={(e)=>
            setOption4(e.target.value)
          }
        />

        <br /><br />

        <input
          type="text"
          placeholder="Correct Answer"
          value={correctAnswer}
          onChange={(e)=>
            setCorrectAnswer(e.target.value)
          }
        />

        <br /><br />

        <input
          type="number"
          placeholder="Marks"
          value={marks}
          onChange={(e)=>
            setMarks(e.target.value)
          }
        />

        <br /><br />

        <select
          value={type}
          onChange={(e)=>
            setType(e.target.value)
          }
        >

          <option value="mcq">
            MCQ
          </option>

          <option value="coding">
            Coding
          </option>

        </select>

        <br /><br />

        <button type="submit">
          Add Question
        </button>

      </form>

    </div>

  );

}

export default AddQuestion;
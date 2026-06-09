import { useState, useEffect } from "react"
import WebcamBox from "../components/WebcamBox"
function Assessment() {

  const questions = [

    {
      id: 1,

      type: "mcq",

      title: "HTML Basics",

      question:
        "What does HTML stand for?",

      options: [
        "Hyper Text Markup Language",
        "High Transfer Machine Language",
        "Hyper Transfer Markup Language",
        "Home Tool Markup Language"
      ],

      answer:
        "Hyper Text Markup Language"
    },

    {
      id: 2,

      type: "mcq",

      title: "CSS Basics",

      question:
        "Which language is used for styling?",

      options: [
        "Python",
        "CSS",
        "Java",
        "C++"
      ],

      answer: "CSS"
    },

    {
      id: 3,

      type: "coding",

      title: "Add Two Numbers",

      question:
        "Write a function to add two numbers.",

      description:
        "Create a function that returns the sum of two integers.",

      constraints:
        "1 <= a,b <= 1000",

      example:
        "Input: 2,3 Output: 5",

      starterCode:
`function add(a, b){

  return a + b

}`
    }

  ]

  const [currentQuestion,
    setCurrentQuestion] = useState(0)

  const [answers,
    setAnswers] = useState({})

  const [score,
    setScore] = useState(0)

  const [showResult,
    setShowResult] = useState(false)

  const [timeLeft,
    setTimeLeft] = useState(300)

  const [code,
    setCode] = useState("")

  const [output,
    setOutput] = useState("")

  const [language,
    setLanguage] = useState("JavaScript")

  const [testStarted,
    setTestStarted] = useState(false)


    function handleFinalSubmit() {
      let finalScore = 0;
    
      questions.forEach((q, index) => {
        if (
          q.type === "mcq" &&
          answers[index] === q.answer
        ) {
          finalScore++;
        }
      });
    
      setScore(finalScore);
      setShowResult(true);
    
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    }

  useEffect(() => {

    if (
      testStarted &&
      !showResult &&
      timeLeft > 0
    ) {

      const timer =
        setTimeout(() => {

          setTimeLeft(
            prev => prev - 1
          )

        }, 1000)

      return () =>
        clearTimeout(timer)

    }

    else if (timeLeft === 0) {

      handleFinalSubmit()

    }

  }, [timeLeft, showResult, testStarted])


  useEffect(() => {

  const handleVisibilityChange = () => {

    if (document.hidden) {

      alert("Tab Switching Detected!");

    }

  };

  document.addEventListener(
    "visibilitychange",
    handleVisibilityChange
  );

  return () => {

    document.removeEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

  };

}, []);


useEffect(() => {

  const handleFullscreenChange = () => {

    if (!document.fullscreenElement) {

      alert(
        "Fullscreen mode exited!"
      );

    }

  };

  document.addEventListener(
    "fullscreenchange",
    handleFullscreenChange
  );

  return () => {

    document.removeEventListener(
      "fullscreenchange",
      handleFullscreenChange
    );

  };

}, []);



  function handleOptionSelect(option) {

    setAnswers({

      ...answers,

      [currentQuestion]: option

    })

  }

  function handleNext() {

    if (
      currentQuestion <
      questions.length - 1
    ) {

      setCurrentQuestion(
        currentQuestion + 1
      )

    }

  }

  function handlePrevious() {

    if (currentQuestion > 0) {

      setCurrentQuestion(
        currentQuestion - 1
      )

    }

  }

  function handleRunCode() {

    setOutput(
      "Code Executed Successfully"
    )

  }

 

  return (

    <div>

      <h2>
        Assessment Module
      </h2>

      {

        !testStarted ?

        (

          <div className="assessment-start">

            <h2>
              Frontend Assessment Test
            </h2>

            <p>
              Total Questions :
              {questions.length}
            </p>

            <p>
              Duration : 5 Minutes
            </p>

            <p>
              MCQ + Coding Round
            </p>

            <button
  onClick={() => {

    document.documentElement
      .requestFullscreen();

    setTestStarted(true);

  }}
>
  Start Assessment
</button>

          </div>

        )

        :

        showResult ?

        (

          <div className="result-box">

            <h2>
              Assessment Completed
            </h2>

            <h3>
              MCQ Score :
              {score} / 2
            </h3>

            <p>
              Coding Question Submitted
            </p>

          </div>

        )

        :

        (

          <div>

            <h3>

              Timer :
              {timeLeft} sec

            </h3>

            {

              timeLeft <= 60 &&

              <p className="warning-text">

                Less than 1 minute left!

              </p>

            }

            <div className="assessment-layout">

              <div className="question-sidebar">

                <h3>
                  Questions
                </h3>

                <div className="question-numbers">

                  {

                    questions.map(

                      (q, index) => (

                        <button

                          key={q.id}

                          className={

                            currentQuestion === index

                            ?

                            "question-btn active-question"

                            :

                            "question-btn"

                          }

                          onClick={() =>
                            setCurrentQuestion(index)
                          }

                        >

                          Q{q.id}

                        </button>

                      )

                    )

                  }

                </div>

              </div>

              <div className="proctoring-panel">

                <WebcamBox />

                </div>

              <div className="question-panel">

                <h2>

                  {
                    questions[
                      currentQuestion
                    ].title
                  }

                </h2>

                <p>

                  {
                    questions[
                      currentQuestion
                    ].question
                  }

                </p>

                {

                  questions[
                    currentQuestion
                  ].type === "mcq"

                  &&

                  questions[
                    currentQuestion
                  ].options.map(

                    (option, index) => (

                      <label
                        key={index}
                        className="option"
                      >

                        <input
                          type="radio"
                          name="option"
                          value={option}

                          checked={
                            answers[currentQuestion]
                            === option
                          }

                          onChange={()=>

                            handleOptionSelect(
                              option
                            )

                          }
                        />

                        <span>
                          {option}
                        </span>

                      </label>

                    )

                  )

                }

                {

                  questions[
                    currentQuestion
                  ].type === "coding"

                  &&

                  <div>

                    <div className="problem-box">

                      <h3>
                        Description
                      </h3>

                      <p>

                        {
                          questions[
                            currentQuestion
                          ].description
                        }

                      </p>

                      <h3>
                        Constraints
                      </h3>

                      <p>

                        {
                          questions[
                            currentQuestion
                          ].constraints
                        }

                      </p>

                      <h3>
                        Example
                      </h3>

                      <p>

                        {
                          questions[
                            currentQuestion
                          ].example
                        }

                      </p>

                    </div>

                    <select
                      value={language}

                      onChange={(e)=>
                        setLanguage(
                          e.target.value
                        )
                      }
                    >

                      <option>
                        JavaScript
                      </option>

                      <option>
                        Python
                      </option>

                      <option>
                        Java
                      </option>

                      <option>
                        C++
                      </option>

                    </select>

                    <textarea

                      className="code-editor"

                      value={
                        code ||
                        questions[
                          currentQuestion
                        ].starterCode
                      }

                      onChange={(e)=>
                        setCode(
                          e.target.value
                        )
                      }

                    />

                    <div className="code-buttons">

                      <button
                        onClick={
                          handleRunCode
                        }
                      >

                        Run Code

                      </button>

                      <button
                        onClick={
                          handleFinalSubmit
                        }
                      >

                        Submit Test

                      </button>

                    </div>

                    <div
                      className="output-box"
                    >

                      {output}

                    </div>

                  </div>

                }

                <div className="navigation-buttons">

                  <button
                    onClick={
                      handlePrevious
                    }
                  >

                    Previous

                  </button>

                  {

                    currentQuestion <
                    questions.length - 1

                    &&

                    <button
                      onClick={
                        handleNext
                      }
                    >

                      Next

                    </button>

                  }

                </div>

              </div>

            </div>

          </div>

        )

      }

    </div>

  )

}

export default Assessment
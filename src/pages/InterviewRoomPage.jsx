import { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { io } from "socket.io-client";
import Editor from "@monaco-editor/react";
import VideoCall from "../components/VideoCall";

function InterviewRoomPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "student";

  const socketRef = useRef(null);
  const [socketReady, setSocketReady] = useState(false);

  const [studentConnected, setStudentConnected] = useState(role === "student");
  const [interviewerConnected, setInterviewerConnected] = useState(
    role === "interviewer"
  );

  const [copyCount, setCopyCount] = useState(0);
  const [pasteCount, setPasteCount] = useState(0);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [focusLossCount, setFocusLossCount] = useState(0);

  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("Run your code to see output");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [code, setCode] = useState(`function reverseString(str) {
  return str.split("").reverse().join("");
}`);

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socketRef.current = socket;

    socket.on("connect", () => {
      setSocketReady(true);

      socket.emit("join-interview-room", {
        roomId: id,
        userRole: role,
      });
    });

    socket.on("presence-update", (presence) => {
      setStudentConnected(presence.student);
      setInterviewerConnected(presence.interviewer);
    });

    socket.on("code-updated", (newCode) => {
      setCode(newCode);
    });

    socket.on("receive-message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
      setSocketReady(false);
    };
  }, [id, role]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) setTabSwitchCount((prev) => prev + 1);
    };

    const handleBlur = () => {
      setFocusLossCount((prev) => prev + 1);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  const handleEditorMount = (editor) => {
    editor.onDidPaste(() => setPasteCount((prev) => prev + 1));

    editor.onKeyDown((e) => {
      if ((e.ctrlKey || e.metaKey) && e.code === "KeyC") {
        setCopyCount((prev) => prev + 1);
      }
    });
  };

  const handleCodeChange = (value) => {
    const newCode = value || "";
    setCode(newCode);

    if (role === "student") {
      socketRef.current?.emit("code-change", {
        roomId: id,
        code: newCode,
      });
    }
  };

  const sendMessage = () => {
    if (!message.trim()) return;

    socketRef.current?.emit("send-message", {
      roomId: id,
      message,
      sender: role,
    });

    setMessage("");
  };

  const runCode = () => {
    try {
      const fn = new Function(`
        ${code}
        return reverseString("hello");
      `);

      const result = fn();

      if (result === "olleh") {
        setOutput(`✅ Correct Answer\nOutput: ${result}`);
      } else {
        setOutput(`❌ Wrong Answer\nExpected: olleh\nYour Output: ${result}`);
      }
    } catch (error) {
      setOutput(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div className="interview-page">
      <div className="interview-layout">
        <div className="interview-left">
          <div className="interviewer-screen">
            {role === "interviewer" ? "Student Video" : "Interviewer Video"}
          </div>

          <div className="webcam-box-area">
            {socketReady ? (
              <VideoCall roomId={id} role={role} socketRef={socketRef} />
            ) : (
              <p>Connecting video...</p>
            )}
          </div>
        </div>

        <div className="interview-right">
          <div className="presence-box">
            <span>{studentConnected ? "🟢" : "🔴"} Student</span>
            <span>{interviewerConnected ? "🟢" : "🔴"} Interviewer</span>
          </div>

          <div className="problem-section">
            <h3>Coding Problem</h3>
            <p>Write a function to reverse a string.</p>

            <h4>Example</h4>
            <div className="example-box">
              <p>Input: hello</p>
              <p>Output: olleh</p>
            </div>

            <div className="interview-chat-inline">
              <h4>Discussion</h4>

              <div className="chat-messages">
                {messages.length === 0 ? (
                  <p className="chat-empty">No messages yet.</p>
                ) : (
                  messages.map((msg, index) => (
                    <div key={index} className="chat-message">
                      <strong>{msg.sender}:</strong> {msg.message}
                    </div>
                  ))
                )}
              </div>

              <div className="chat-input">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") sendMessage();
                  }}
                  placeholder="Ask or reply here..."
                />

                <button onClick={sendMessage}>Send</button>
              </div>
            </div>

            <div className="proctor-report">
              <p>Paste Events: {pasteCount}</p>
              <p>Copy Events: {copyCount}</p>
              <p>Tab Switches: {tabSwitchCount}</p>
              <p>Focus Loss: {focusLossCount}</p>
            </div>
          </div>

          <div className="editor-box">
            <div className="editor-header">
              <span>Code {role === "interviewer" ? "(Live View)" : ""}</span>

              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                disabled={role === "interviewer"}
              >
                <option value="javascript">JavaScript</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
                <option value="python">Python</option>
              </select>
            </div>

            <Editor
              height="215px"
              language={language}
              theme="vs-dark"
              value={code}
              onChange={handleCodeChange}
              onMount={handleEditorMount}
              options={{
                fontSize: 15,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                automaticLayout: true,
                wordWrap: "on",
                readOnly: role === "interviewer",
              }}
            />
          </div>

          {role === "student" && (
            <>
              <button className="run-code-btn" onClick={runCode}>
                Run Code
              </button>

              <div className="output-console">
                <pre>{output}</pre>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default InterviewRoomPage;
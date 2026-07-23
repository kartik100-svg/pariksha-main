import "./App.css";

import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./routes/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

import Assessment from "./pages/Assessment";
import AssessmentList from "./pages/AssessmentList";
import CreateAssessment from "./pages/CreateAssessment";
import AddQuestion from "./pages/AddQuestion";

import Interview from "./pages/Interview";
import InterviewRoomPage from "./pages/InterviewRoomPage";
import ScheduleInterview from "./pages/ScheduleInterview";
import AdminInterviews from "./pages/AdminInterviews";
import AdminDashboard from "./pages/AdminDashboard";
import Results from "./pages/Results";


function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <BrowserRouter>
      <div className={darkMode ? "container dark" : "container light"}>
        <h1>PARIKSHA</h1>
        <h3>"Let's Crack It"</h3>

        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        <div className="section">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/assessment"
              element={
                <ProtectedRoute>
                  <AssessmentList />
                </ProtectedRoute>
              }
            />

            <Route
              path="/assessment/:id"
              element={
                <ProtectedRoute>
                  <Assessment />
                </ProtectedRoute>
              }
            />

            <Route
              path="/interview"
              element={
                <ProtectedRoute>
                  <Interview />
                </ProtectedRoute>
              }
            />

<Route
  path="/interview-room/:id"
  element={
    <ProtectedRoute>
      <InterviewRoomPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin-interviews"
  element={
    <ProtectedRoute allowedRole="admin">
      <AdminInterviews />
    </ProtectedRoute>
  }
/>

            <Route
              path="/results"
              element={
                <ProtectedRoute>
                  <Results />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/create-assessment"
              element={
                <ProtectedRoute allowedRole="admin">
                  <CreateAssessment />
                </ProtectedRoute>
              }
            />

            <Route
              path="/add-question"
              element={
                <ProtectedRoute allowedRole="admin">
                  <AddQuestion />
                </ProtectedRoute>
              }
            />

            <Route
              path="/schedule-interview"
              element={
                <ProtectedRoute allowedRole="admin">
                  <ScheduleInterview />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
import './index.css'
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
      <div className={darkMode ? "min-h-screen w-full bg-[#0a0d16] text-white font-sans transition-colors duration-300" : "min-h-screen w-full bg-slate-900 text-white font-sans transition-colors duration-300"}>
        <header className="pt-5 pb-2 px-4 text-center flex flex-col items-center justify-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent m-0">PARIKSHA</h1>
          <h3 className="text-xs sm:text-sm font-medium text-slate-400 italic mt-0.5">"Let's Crack It"</h3>
        </header>

        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        <main className="w-full max-w-7xl mx-auto p-2 sm:p-6 lg:p-8">
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
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
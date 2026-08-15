import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

import {
  FaUserGraduate,
  FaClipboardCheck,
  FaVideo,
  FaChartLine,
  FaBell,
  FaCode,
  FaLaptopCode,
  FaCalendarAlt
} from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await API.get("/dashboard");
        setData(res.data);
      } catch (error) {
        console.log(error.response?.data || error.message);
        // Fallback demo data if API not running locally
        setData({
          user: { name: "John Doe" },
          stats: { assessments: 12, interviews: 4, performance: "88%", completed: 10 },
          recentAssessments: [
            { title: "React Fundamentals", score: "92%", status: "Completed" },
            { title: "Node.js & Express", score: "84%", status: "Completed" },
            { title: "Data Structures", score: "In Progress", status: "Pending" }
          ],
          upcomingInterviews: [
            { title: "Frontend Engineering Round", time: "Tomorrow at 2:00 PM" },
            { title: "System Architecture Review", time: "Friday at 4:30 PM" }
          ]
        });
      }
    };

    fetchDashboard();
  }, [navigate]);

  if (!data) {
    return (
      <div className="w-full py-16 px-4 flex items-center justify-center">
        <div className="p-8 bg-slate-900/90 border border-slate-800 rounded-3xl text-center flex flex-col items-center gap-4 shadow-2xl">
          <div className="w-10 h-10 border-3 border-violet-600/20 border-t-purple-500 rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-slate-300">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  const initial = data.user?.name ? data.user.name.charAt(0).toUpperCase() : "U";

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 text-left font-sans py-2">
      
      {/* HEADER SECTION */}
      <div className="bg-[#111624]/90 border border-slate-800/90 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex flex-col">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight m-0">Welcome Back, {data.user.name}</h2>
          <p className="text-xs sm:text-sm text-slate-400 m-0 mt-1">Track your assessments and interviews in real-time</p>
        </div>

        <div className="flex items-center gap-4 self-start sm:self-auto">
          <button className="w-10 h-10 rounded-2xl bg-[#1a2133] border border-slate-700/80 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow">
            <FaBell className="text-base" />
          </button>

          <div
            onClick={() => navigate("/profile")}
            className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-violet-600 to-purple-600 p-0.5 shadow-lg shadow-purple-950/40 cursor-pointer hover:scale-105 transition-all"
            title="View Profile"
          >
            <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center text-lg font-bold text-white">
              {initial}
            </div>
          </div>
        </div>
      </div>

      {/* STATS GRID (RESPONSIVE) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        {/* Assessments Card */}
        <div className="bg-[#111624]/90 border border-slate-800/90 rounded-2xl p-5 flex flex-col gap-3 shadow-lg hover:border-violet-500/40 transition-all">
          <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-800/40 text-purple-400 flex items-center justify-center text-lg">
            <FaClipboardCheck />
          </div>
          <div className="flex flex-col">
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight m-0">{data.stats.assessments}</h3>
            <p className="text-xs text-slate-400 font-medium m-0 mt-1">Assessments</p>
          </div>
        </div>

        {/* Interviews Card */}
        <div className="bg-[#111624]/90 border border-slate-800/90 rounded-2xl p-5 flex flex-col gap-3 shadow-lg hover:border-indigo-500/40 transition-all">
          <div className="w-10 h-10 rounded-xl bg-indigo-950/60 border border-indigo-800/40 text-indigo-400 flex items-center justify-center text-lg">
            <FaVideo />
          </div>
          <div className="flex flex-col">
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight m-0">{data.stats.interviews}</h3>
            <p className="text-xs text-slate-400 font-medium m-0 mt-1">Interviews</p>
          </div>
        </div>

        {/* Performance Card */}
        <div className="bg-[#111624]/90 border border-slate-800/90 rounded-2xl p-5 flex flex-col gap-3 shadow-lg hover:border-violet-500/40 transition-all">
          <div className="w-10 h-10 rounded-xl bg-violet-950/60 border border-violet-800/40 text-violet-400 flex items-center justify-center text-lg">
            <FaChartLine />
          </div>
          <div className="flex flex-col">
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight m-0">{data.stats.performance}</h3>
            <p className="text-xs text-slate-400 font-medium m-0 mt-1">Performance</p>
          </div>
        </div>

        {/* Completed Card */}
        <div className="bg-[#111624]/90 border border-slate-800/90 rounded-2xl p-5 flex flex-col gap-3 shadow-lg hover:border-emerald-500/40 transition-all">
          <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 flex items-center justify-center text-lg">
            <FaUserGraduate />
          </div>
          <div className="flex flex-col">
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight m-0">{data.stats.completed}</h3>
            <p className="text-xs text-slate-400 font-medium m-0 mt-1">Completed</p>
          </div>
        </div>

      </div>

      {/* LOWER DASHBOARD GRID (RECENT ASSESSMENTS & UPCOMING INTERVIEWS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        
        {/* RECENT ASSESSMENTS TABLE (7 COLS ON DESKTOP) */}
        <div className="lg:col-span-7 bg-[#111624]/90 border border-slate-800/90 rounded-3xl p-5 sm:p-7 flex flex-col gap-5 shadow-xl">
          <div className="flex items-center gap-2.5 text-white font-bold text-base sm:text-lg border-b border-slate-800/80 pb-3.5">
            <FaCode className="text-violet-400" />
            <h3 className="m-0 text-base sm:text-lg font-bold">Recent Assessments</h3>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[480px]">
              <thead>
                <tr className="border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-3">Test</th>
                  <th className="py-3 px-3">Score</th>
                  <th className="py-3 px-3">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800/60 text-xs sm:text-sm">
                {data.recentAssessments.map((test, index) => (
                  <tr key={index} className="hover:bg-slate-800/40 transition-all">
                    <td className="py-3.5 px-3 font-medium text-slate-200">{test.title}</td>
                    <td className="py-3.5 px-3 text-slate-300 font-semibold">{test.score}</td>
                    <td className="py-3.5 px-3">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase inline-block ${
                        test.status === "Completed"
                          ? "bg-emerald-950/80 border border-emerald-700/60 text-emerald-300"
                          : "bg-amber-950/80 border border-amber-700/60 text-amber-300"
                      }`}>
                        {test.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* UPCOMING INTERVIEWS (5 COLS ON DESKTOP) */}
        <div className="lg:col-span-5 bg-[#111624]/90 border border-slate-800/90 rounded-3xl p-5 sm:p-7 flex flex-col gap-5 shadow-xl">
          <div className="flex items-center gap-2.5 text-white font-bold text-base sm:text-lg border-b border-slate-800/80 pb-3.5">
            <FaCalendarAlt className="text-purple-400" />
            <h3 className="m-0 text-base sm:text-lg font-bold">Upcoming Interviews</h3>
          </div>

          <div className="flex flex-col gap-3.5">
            {data.upcomingInterviews.map((interview, index) => (
              <div key={index} className="bg-[#171e30] border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-3 hover:border-slate-700 transition-all">
                <div className="flex flex-col">
                  <h4 className="text-sm font-semibold text-white m-0">{interview.title}</h4>
                  <p className="text-xs text-slate-400 m-0 mt-1 font-medium">{interview.time}</p>
                </div>

                <div className="w-9 h-9 rounded-xl bg-purple-950/60 text-purple-300 flex items-center justify-center shrink-0">
                  <FaLaptopCode className="text-base" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;
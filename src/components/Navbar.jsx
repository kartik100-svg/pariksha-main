import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaSun, FaMoon, FaRightFromBracket } from "react-icons/fa6";

function Navbar({ darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const role = user?.role;

  function handleLogout() {
    logout();
    navigate("/");
  }

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="w-full max-w-7xl mx-auto my-3 px-4 py-3 bg-[#111624]/90 border border-slate-800/90 rounded-2xl sm:rounded-3xl shadow-xl flex flex-wrap items-center justify-between gap-4 backdrop-blur-md">
      
      {/* NAVIGATION LINKS */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium">
        {!user && (
          <>
            <Link 
              to="/" 
              className={`px-3 py-1.5 rounded-xl transition-all ${
                isActive("/") ? "bg-violet-600 text-white font-semibold" : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className={`px-3 py-1.5 rounded-xl transition-all ${
                isActive("/register") ? "bg-violet-600 text-white font-semibold" : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              Register
            </Link>
          </>
        )}

        <Link 
          to={role === "admin" ? "/admin" : "/dashboard"} 
          className={`px-3.5 py-1.5 rounded-xl transition-all ${
            isActive("/dashboard") || isActive("/admin") ? "bg-violet-600 text-white font-semibold shadow-md" : "text-slate-300 hover:text-white hover:bg-slate-800/60"
          }`}
        >
          Dashboard
        </Link>

        <Link 
          to="/profile" 
          className={`px-3.5 py-1.5 rounded-xl transition-all ${
            isActive("/profile") ? "bg-violet-600 text-white font-semibold shadow-md" : "text-slate-300 hover:text-white hover:bg-slate-800/60"
          }`}
        >
          Profile
        </Link>

        {role === "student" && (
          <>
            <Link 
              to="/assessment" 
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                isActive("/assessment") ? "bg-violet-600 text-white font-semibold shadow-md" : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              Assessment
            </Link>

            <Link 
              to="/interview" 
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                isActive("/interview") ? "bg-violet-600 text-white font-semibold shadow-md" : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              Interview
            </Link>

            <Link 
              to="/results" 
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                isActive("/results") ? "bg-violet-600 text-white font-semibold shadow-md" : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              Results
            </Link>
          </>
        )}

        {role === "admin" && (
          <>
            <Link 
              to="/create-assessment" 
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                isActive("/create-assessment") ? "bg-violet-600 text-white font-semibold shadow-md" : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              Create Assessment
            </Link>

            <Link 
              to="/add-question" 
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                isActive("/add-question") ? "bg-violet-600 text-white font-semibold shadow-md" : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              Add Question
            </Link>

            <Link 
              to="/results" 
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                isActive("/results") ? "bg-violet-600 text-white font-semibold shadow-md" : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              Student Results
            </Link>
          </>
        )}
      </div>

      {/* RIGHT ACTION CONTROLS */}
      <div className="flex items-center gap-2.5 shrink-0">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-9 h-9 rounded-xl bg-[#1b2336] border border-slate-700/80 text-amber-400 hover:text-amber-300 flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105"
          title="Toggle Theme"
        >
          {darkMode ? <FaSun className="text-sm" /> : <FaMoon className="text-sm text-indigo-400" />}
        </button>

        {user && (
          <button
            onClick={handleLogout}
            className="px-3.5 py-1.5 rounded-xl bg-rose-950/60 border border-rose-800/60 text-rose-300 hover:text-white hover:bg-rose-900 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
          >
            <FaRightFromBracket className="text-xs" />
            <span>Logout</span>
          </button>
        )}
      </div>

    </nav>
  );
}

export default Navbar;
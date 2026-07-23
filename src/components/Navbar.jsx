import { Link, useNavigate } from "react-router-dom";

function Navbar({ darkMode, setDarkMode }) {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const role = user?.role;

  function handleLogout() {

    localStorage.clear();

    navigate("/");

  }

  return (

    <nav className="navbar">

      <div className="nav-links">

      {!user && (
     <>
      <Link to="/">Login</Link>
      <Link to="/register">Register</Link>
     </>
     )}

        <Link to={role === "admin" ? "/admin" : "/dashboard"}>
         Dashboard
        </Link>

        <Link to="/profile">
          Profile
        </Link>

        {role === "student" && (
          <>
            <Link to="/assessment">
              Assessment
            </Link>

            <Link to="/interview">
              Interview
            </Link>

            <Link to="/results">
              Results
            </Link>
          </>
        )}

        {role === "admin" && (
          <>
            <Link to="/create-assessment">
              Create Assessment
            </Link>

            <Link to="/add-question">
              Add Question
            </Link>

            <Link to="/results">
              Student Results
            </Link>
          </>
        )}

      </div>

      <div className="nav-right">

        <button
          className="theme-btn"
          onClick={() =>
            setDarkMode(!darkMode)
          }
        >

          {
            darkMode
              ? "☀"
              : "🌙"
          }

        </button>

        <button
          onClick={handleLogout}
        >

          Logout

        </button>

      </div>

    </nav>

  );

}

export default Navbar;
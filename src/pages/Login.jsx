import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext"; // Context import

function Login() {

  const navigate = useNavigate();
  const { login } = useAuth(); // Context se login function lo

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post("/auth/login", {
        email,
        password,
        role,
      });

      // ✅ Context API me user store karo (state + localStorage dono)
      login(res.data.user, res.data.token);

      alert("Login Successful");

      if (res.data.user.role === "admin") {

        navigate("/admin");

      } else {

        navigate("/dashboard");

      }

    } catch (error) {

      console.log(error.response?.data);

      alert(
        error.response?.data?.message || "Login Failed"
      );

    }

  };

  return (

    <div className="login-page">

      <div className="login-card">

        <h2>Login</h2>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
          >

            <option value="student">
              Student
            </option>

            <option value="admin">
              Admin / Teacher
            </option>

          </select>

          <button type="submit">
            Login
          </button>

        </form>

      </div>

    </div>

  );

}


export default Login;
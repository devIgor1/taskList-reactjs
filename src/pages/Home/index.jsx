import { useState } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import { auth } from "../../FirebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    if (email !== "" && password !== "") {
      await signInWithEmailAndPassword(auth, email, password)
        //navigate to admin
        .then(() => {
          navigate("/admin", { replace: true });
        })
        .catch(() => {
          alert("Error");
        });
    } else {
      alert("Fill in the form correctly!");
    }
  }

  return (
    <div className="home-container">
      <h1>Task List</h1>
      <h3>
        MAKE WORK <span>EASIER</span>
      </h3>
      <form className="form" onSubmit={handleLogin}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Write your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="*******"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button type="submit">Access</button>
      </form>

      <h4>
        You don't have an account? <Link to="/register">Register here!</Link>
      </h4>
    </div>
  );
}

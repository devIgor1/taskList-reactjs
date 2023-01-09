import { useState } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../FirebaseConnection";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    if (email !== "" && password !== "") {
      await createUserWithEmailAndPassword(auth, email, password)
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
      <h1>Register</h1>
      <h3>Let's create your account!</h3>
      <form className="form" onSubmit={handleRegister}>
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

        <h4>
          Already have an account?{" "}
          <Link to="/" className="login">
            Login
          </Link>
        </h4>
      </form>
    </div>
  );
}

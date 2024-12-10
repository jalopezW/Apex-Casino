import { useAuthentication } from "../Services/authService";
import { Link } from "react-router-dom";
import { SignIn, SignOut } from "./auth";
import "./GameHeader.css";

export default function GameHeader({ title, score }) {
  const user = useAuthentication();

  return (
    <header>
      <Link to="/">
        <button className="home-button">Home</button>
      </Link>

      <h1>{title}</h1>

      <div className="auth-actions">
        {!user ? <SignIn /> : <SignOut score={score} />}
      </div>
    </header>
  );
}

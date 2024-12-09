import { useAuthentication } from "../Services/authService";
import { Link } from "react-router-dom";
import { SignIn, SignOut } from "./auth";
import "./GameHeader.css";

export default function GameHeader({ title, score }) {
  const user = useAuthentication();

  return (
    <header className="casino-header">
      <div className="casino-header-content">
        <Link to="/">
          <button className="nav-button">Home</button>
        </Link>

        <h1 className="casino-header-title">{title}</h1>

        <div className="auth-actions">
          {!user ? (
            <div id="sign-in">
              <p>Sign in to play!</p>
              <SignIn />
            </div>
          ) : (
            <SignOut score={score} />
          )}
        </div>
      </div>
    </header>
  );
}

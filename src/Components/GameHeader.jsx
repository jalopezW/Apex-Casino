import { useAuthentication } from "../Services/authService";
import { Link } from "react-router-dom";
import { SignIn, SignOut } from "./auth";
import "./GameHeader.css"; // Ensure the CSS is imported

export default function GameHeader({ title }) {
    const user = useAuthentication();

    return (
        <header className="casino-header">
            <div className="casino-header-content">

                <button className="nav-button">
                    <Link to="/">Home</Link>
                </button>

                <h1 className="casino-header-title">{title}</h1>

                <div className="auth-actions">
                    {!user ? <SignIn /> : <SignOut />}
                </div>
            </div>
        </header>
    );
}

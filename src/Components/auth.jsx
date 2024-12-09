import {
  login,
  logout,
  loggedInUserDisplayName,
} from "../Services/authService.js";
import "./App.css";

export function SignIn() {
  return <button onClick={login}>Sign In</button>;
}

export function SignOut({ score }) {
  return (
    <div id="sign-out">
      <p>
        {loggedInUserDisplayName()}: ${score.toLocaleString()}{" "}
      </p>
      <SignOutButton />
    </div>
  );
}

export function SignOutButton() {
  return <button onClick={logout}>Sign Out</button>;
}

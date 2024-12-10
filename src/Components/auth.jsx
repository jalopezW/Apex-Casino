import {
  login,
  logout,
  loggedInUserDisplayName,
} from "../Services/authService.js";
import "./auth.css";

export function SignInButton() {
  return <button onClick={login}>Sign In</button>;
}
export function SignIn() {
  return (
    <div id="sign-in">
      <p>Sign in to play!</p>
      <SignInButton />
    </div>
  );
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

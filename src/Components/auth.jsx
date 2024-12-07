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
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <p style={{ marginRight: "10px" }}>
        Hello, {loggedInUserDisplayName()}! You have {score.toLocaleString()}{" "}
        LionBucks{" "}
      </p>
      <SignOutButton />
    </div>
  );
}

export function SignOutButton() {
  return <button onClick={logout}>Sign Out</button>;
}

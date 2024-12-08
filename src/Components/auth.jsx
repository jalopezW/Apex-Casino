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
      <div
        style={{
          marginRight: "10px",
          display: "flex",
          flexDirection: "column",
          fontSize: "10px",
        }}
      >
        <p>Hello, {loggedInUserDisplayName()}!</p>
        <p> You have {score.toLocaleString()} LionBucks </p>
      </div>
      <SignOutButton />
    </div>
  );
}

export function SignOutButton() {
  return <button onClick={logout}>Sign Out</button>;
}

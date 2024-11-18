import { login, logout, loggedInUserDisplayName } from "../Services/authService.js"

export function SignIn() {
  return <button onClick={login}>Sign In</button>
}

export function SignOut({ user }) {
  return (
    <div className="signout-profile-photo">
      Hello, {loggedInUserDisplayName()}
      <img src={user.photoURL} alt="User's Email Profile Photo" className="profile-photo" />
      <button onClick={logout}>Sign Out</button>
    </div>
  );
}

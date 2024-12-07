import { login, logout, loggedInUserDisplayName } from "../Services/authService.js"

export function SignIn() {
  
  return <button onClick={login}>Sign In</button>
}

export function SignOut({score}) {
  return (
    <div>
      Hello, {loggedInUserDisplayName()}! You have {score} LionBucks   
      <SignOutButton />
    </div>
  );
}

export function SignOutButton(){
 return <button onClick={logout}>Sign Out</button>
}

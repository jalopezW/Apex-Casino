import { useAuthentication } from "../Services/authService"
import { Link } from "react-router-dom"
import { SignIn, SignOut } from "./auth"

export default function GameHeader({title}){

    const user = useAuthentication()

    return(
        <header>
        <button>
            <Link to="/">Home</Link>
        </button>
        <h1>{title}</h1>
        {!user ? <SignIn /> : <SignOut />}
        </header>
    )
}
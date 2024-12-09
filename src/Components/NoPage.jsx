import { Link } from "react-router-dom";

export default function NoPage() {
  return (
    <>
      <h1>404</h1>
      <Link to="/">
        <button>Home</button>
      </Link>
    </>
  );
}

import { Link } from "react-router-dom";

export default function NoPage() {
  return (
    <>
      <h1>404</h1>
      <button>
        <Link to="/">Home</Link>
      </button>
    </>
  );
}

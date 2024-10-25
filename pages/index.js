import Link from "next/link";

export default function Home() {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Welcome to the Contact Management System</h1>
      <p>This application allows you to manage your contacts efficiently.</p>
      <div>
        <Link href="/login">
          <button style={{ margin: "10px", padding: "10px 20px" }}>
            Login
          </button>
        </Link>
        <Link href="/register">
          <button style={{ margin: "10px", padding: "10px 20px" }}>
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}

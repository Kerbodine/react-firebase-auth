import { useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Loader from "./Loader";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const { login } = useAuth();

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(email, password);
      setLoading(false);
      setMessage("Password reset successful, check your email!");
    } catch (err) {
      console.log(err);
      setError("Failed to login account");
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-slate-400 grid place-items-center">
      <div className="w-[300px] rounded-2xl shadow-xl bg-white p-8">
        {loading ? (
          <Loader />
        ) : (
          <form onSubmit={handleSubmit}>
            <h1 className="text-2xl font-semibold">Log In</h1>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={updateEmail}
              required
              className="form-input mt-3"
            />
            <input
              id="passwordInput"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
              required
              className="form-input mt-3"
            />
            <Link
              className="mt-1 w-full text-right block text-sm text-gray-500 hover:underline"
              to="/forgot-password"
            >
              Forgot password?
            </Link>
            {error && (
              <div className="mt-4 w-full box-border border-[1px] border-red-400 bg-red-100 text-red-400 text-sm px-1 py-0.5 rounded-md flex items-center gap-1">
                <BiInfoCircle className="text-lg" />
                {error}
              </div>
            )}
            {message && (
              <div className="mt-4 w-full box-border border-[1px] border-green-400 bg-green-100 text-green-400 text-sm px-1 py-0.5 rounded-md flex items-center gap-1">
                <BiInfoCircle className="text-lg" />
                {message}
              </div>
            )}
            <button type="submit" className="mt-8 form-button">
              Log in
            </button>
            <p className="mt-2 block text-sm text-gray-500">
              Need an account?{" "}
              <Link to="/signup" className="hover:underline cursor-pointer">
                Sign up
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

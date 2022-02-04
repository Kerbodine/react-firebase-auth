import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { useAuth } from "./AuthContext";
import { BiInfoCircle } from "react-icons/bi";

export default function Signup() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { signup } = useAuth();

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

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
      await signup(email, password);
      setLoading(false);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError("Failed to create an account");
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
            <h1 className="text-2xl font-semibold">Sign Up</h1>
            <div className="mt-6 flex gap-3">
              <input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={updateFirstName}
                required
                className="form-input"
              />
              <input
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={updateLastName}
                required
                className="form-input"
              />
            </div>
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
              placeholder="Create password"
              value={password}
              onChange={updatePassword}
              required
              className="form-input mt-3"
            />
            {error && (
              <div className="mt-4 w-full box-border border-[1px] border-red-400 bg-red-100 text-red-400 text-sm px-1 py-0.5 rounded-md flex items-center gap-1">
                <BiInfoCircle className="text-lg" />
                {error}
              </div>
            )}
            <button type="submit" className="mt-8 form-button">
              Sign Up
            </button>
            <p className="mt-2 block text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="hover:underline cursor-pointer">
                Log in
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

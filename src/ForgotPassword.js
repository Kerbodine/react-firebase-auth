import { useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Loader from "./Loader";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { resetPassword } = useAuth();

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      await resetPassword(email);
      setLoading(false);
      // navigate("/");
    } catch (err) {
      console.log(err);
      setError("Failed to reset password for this account");
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
            <h1 className="text-2xl font-semibold">Reset Password</h1>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={updateEmail}
              required
              className="form-input mt-3"
            />
            <Link
              className="mt-1 w-full text-right block text-sm text-gray-500 hover:underline"
              to="/login"
            >
              Back to login page
            </Link>
            {error && (
              <div className="mt-4 w-full box-border border-[1px] border-red-400 bg-red-100 text-red-400 text-sm px-1 py-0.5 rounded-md flex items-center gap-1">
                <BiInfoCircle className="text-lg" />
                {error}
              </div>
            )}
            <button type="submit" className="mt-8 form-button">
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

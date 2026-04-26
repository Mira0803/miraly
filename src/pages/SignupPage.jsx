import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { supabase } from "../lib/supabase";
import * as Motion from "framer-motion";
import { FcGoogle } from "react-icons/fc";


export function SignupPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (!error) {
      alert("Check your email to confirm your account!");
      navigate("/login");
    } else {
      alert(error.message);
    }
  };

  const handleGoogleSignup = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
        options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] text-white px-6">
      <Motion.motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        
        className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl"
      >
        <h1 className="text-3xl font-bold mb-8 text-center">
          Create your account
        </h1>

        {/* Email Signup */}
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-3 rounded-xl bg-white/10 border border-white/10 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-3 rounded-xl bg-white/10 border border-white/10 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-linear-to-r from-purple-500 to-blue-500 rounded-3xl font-semibold shadow-lg hover:opacity-90 transition cursor-pointer"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/40 text-sm">or</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Google Signup */}
        <button
          onClick={handleGoogleSignup}
          className="flex items-center justify-center gap-3 w-full py-3 bg-white text-black rounded-3xl font-medium hover:opacity-90 transition cursor-pointer"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>

        {/* Login redirect */}
        <p className="text-sm text-white/50 mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-400 hover:underline cursor-pointer">
            Login
          </Link>
        </p>
      </Motion.motion.div>
    </div>
  );
}
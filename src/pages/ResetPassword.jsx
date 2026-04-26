import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import * as Motion from "framer-motion";

export function ResetPassword() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Password updated!");
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] text-white px-4">

      <Motion.motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
      >
        <h1 className="text-2xl font-bold mb-2">
          Reset Password
        </h1>

        <p className="text-white/60 mb-6">
          Enter your new password
        </p>

        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-2xl placeholder-white/40 focus:ring-2 focus:ring-purple-500"
          />

          <button className="w-full py-3 bg-linear-to-r from-purple-500 to-blue-500 rounded-2xl font-semibold hover:opacity-90 transition">
            Update Password
          </button>
        </form>
      </Motion.motion.div>
    </div>
  );
}
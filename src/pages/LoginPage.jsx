import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import * as Motion from "framer-motion";

export function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Email login
    const handleLogin = async (e) => {
        e.preventDefault();

        const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
        });

        if (!error) {
        navigate("/dashboard");
        } else {
        alert(error.message);
        }
    };

    // Google login
    const handleGoogleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
            redirectTo: `${window.location.origin}/dashboard`,
            },
        });
    }

const handleForgotPassword = async () => {
    const email = prompt("Enter your email");

    if (!email) return;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
        alert(error.message);
    } else {
        alert("Check your email to reset password");
    }
    };
 
    return (
        <div

            
            className="min-h-screen flex items-center justify-center bg-[#0f0f0f] text-white p-6">
            <Motion.motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="bg-white/5 p-8 rounded-2xl w-full max-w-md"
                >
                <h1 className="text-2xl font-bold mb-8 text-center">Login</h1>

                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 rounded-xl bg-white/10"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 rounded-xl bg-white/10"
                    />

                    <button className="w-full py-3 bg-linear-to-r from-purple-500 to-blue-500 
                            rounded-3xl font-semibold shadow-lg hover:opacity-90 transition cursor-pointer">
                        Login
                    </button>
                </form>

                <div className="flex items-center gap-3 my-6">
                    <div className="flex-1 h-px bg-white/10" />
                        <span className="text-white/40 text-sm">or</span>
                    <div className="flex-1 h-px bg-white/10" />
                </div>


                <button
                    onClick={handleGoogleLogin}
                    className="flex items-center justify-center gap-3 w-full py-3 bg-white text-black rounded-3xl font-medium hover:opacity-90 transition cursor-pointer"
                >
                    <FcGoogle
                        size={20} 
                    />
                    Continue with Google
                </button>
                
                <button
                    className="text-sm mt-3 cursor-pointer text-purple-400 hover:underline"
                    onClick={handleForgotPassword}>
                    Forgot Password?
                </button>

                <p className="text-sm text-white/50 mt-6 text-center">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-purple-400 hover:underline cursor-pointer">
                        Sign Up
                    </Link>
                </p>
            </Motion.motion.div>
        </div>
    );
}
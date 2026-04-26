
import { NavLink } from "react-router-dom";
import * as Motion from "framer-motion";


export default function Navbar() {
  return (
    <nav
      role="navigation"
      className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f0f]/80 backdrop-blur-lg border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex gap-1">
            <img 
                className="w-9 h-9 items-center justify-center"
                src="/Miraly logo.png" 
                alt="miraly-logo"/>
            <span className="text-xl font-bold text-white">Miraly</span>
            </NavLink>

        {/* Menu */}
        <div className="flex items-center gap-4">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "px-6 py-2 text-white font-semibold transition-colors"
                : "px-6 py-2 text-white/70 hover:text-white transition-colors"
            }
          >
            <Motion.motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Login
            </Motion.motion.button>
          </NavLink>

          <NavLink to="/generate">
                <Motion.motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2.5 bg-linear-to-r from-purple-500 to-blue-500 text-white rounded-4xl font-medium shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all cursor-pointer"
                >
                  Get Started
                </Motion.motion.button>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
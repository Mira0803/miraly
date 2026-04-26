// src/components/Sidebar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Plus, LogOut, X } from "lucide-react";
import * as Motion from "framer-motion";
import { supabase } from "../lib/supabase";


export default function Sidebar({ open, setOpen }) {
  const navigate = useNavigate();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Plus, label: "Create Link", path: "/generate" },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

    return (
      <>
          {/* Overlay (mobile background) */}
          {open && (
            <div
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />
          )}
        <Motion.motion.aside
          initial={false}
          animate={{ x: open ? 0 : -300 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        
          className="
            fixed md:static top-0 left-0 z-50 md:translate-x-0 md:transform-none!
            md:w-64 min-h-screen bg-[#0f0f0f] border-r border-white/5  p-6 flex flex-col"
        >
          
          {/* Logo */}
          <div className="flex items-center justify-between mb-8">
            <NavLink to="/" className=" flex items-center">
                <img 
                        className="w-9 h-9 mr-5 md:mr-0"
                        src="/Miraly logo.png" 
                        alt="miraly-logo"
                />
                <span className="hidden md:block text-lg font-bold text-white">Miraly</span>
            </NavLink>

            <button
              onClick={() => setOpen(false)}
              className="md:hidden mb-4 text-white"
              >
                <X size={22} />
            </button>
          </div>
          {/* Menu */}
          <nav className="flex-1 space-y-2 gap-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink key={item.path} to={item.path}>
                  {({ isActive }) => (
                    <Motion.motion.div
                      whileHover={{ x: 4 }}
                      className={`flex items-center gap-3 px-4 py-3 my-2 rounded-3xl transition-all cursor-pointer
                        ${
                          isActive
                            ? "bg-white/10 text-white"
                            : "text-white/70 hover:text-white hover:bg-white/5"
                        }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="hidden md:block font-medium">{item.label}</span>
                    </Motion.motion.div>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Logout */}
          <Motion.motion.button
            whileHover={{ x: 4 }}
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-white/50 hover:text-red-400 hover:bg-red-400/5 transition-colors mt-4"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden md:block font-medium">Logout</span>
          </Motion.motion.button>

        </Motion.motion.aside>
      </>

    );
} 
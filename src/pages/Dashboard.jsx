
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { supabase } from "../lib/supabase";

import {
  Copy,
  Trash2,
  CheckCircle2,
  Plus,
  Menu
} from "lucide-react";

import * as Motion from "framer-motion";

export default function Dashboard() {
  const navigate = useNavigate();
  const [copiedId, setCopiedId] = useState(null);
  const [links, setLinks] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchLinks = async () => {
      const { data: userData } = await supabase.auth.getUser();

      const user = userData.user;

      const { data, error } = await supabase
        .from("links")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        return;
      }

      setLinks(data);
    };

    fetchLinks();
  }, []);


  const handleCopy = async (link, id) => {
    await navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase
    .from("links")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    alert("Failed to delete");
    return;
  }

  // update UI after delete
  setLinks((prev) => prev.filter((link) => link.id !== id));
  };

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        navigate("/login");
      }
    };

    checkUser();
  }, [navigate]);


  const totalClicks = links.reduce(
    (sum, link) => sum + link.clicks,
    0
  );

  

  return (
    <div className="flex min-h-screen bg-[#0f0f0f] text-white">
      <Sidebar open={open} setOpen={setOpen} />

      <main className="flex-1 p-8">

        {/*handbuger menu */}
        <div className="flex items-center justify-between mb-6 md:hidden">
          <button
            onClick={() => setOpen(true)}
            className="p-2 bg-white/10 rounded-xl"
          >
            <Menu size={20} />
          </button>

          <h1 className="text-lg font-bold">Dashboard</h1>
        </div>

        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="flex justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">
                Your Links
              </h1>
              <p className="text-white/60">
                Manage your shortened URLs
              </p>
            </div>

            <Motion.motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/generate")}
              className="px-4 md:px-6 md:py-3 bg-linear-to-r from-purple-500 to-blue-500 rounded-4xl flex items-center gap-2 hover:shadow-purple-500/10 transition-all"
            >
              <div>
                <Plus size={18} />
              </div>
              <span className="hidden md:inline">New Link</span>
            </Motion.motion.button>

          </div>

          {/* Table */}
          {/*Mobile table */}

          <div className="md:hidden space-y-4">
                {links.map((link) => (
                <Motion.motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}

                  key={link.id}
                  className="bg-white/5 p-4 rounded-2xl border border-white/10 overflow-hidden max-w-80"
                >
                  <p className="text-purple-400 font-semibold break-all">
                    {link.short_code}
                  </p>

                  <p className="text-white/60 text-sm truncate ">
                    {link.original_url}
                  </p>

                  <div className="flex justify-between items-center mt-3">
                    <span className="text-sm">
                      {link.clicks} clicks
                    </span>

                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleCopy(
                            `${window.location.origin}/r/${link.short_code}`,
                            link.id
                          )
                        }
                        className="p-2 bg-white/10 rounded-xl"
                      >
                        {copiedId === link.id ? (
                          <CheckCircle2 size={16} className="text-green-400" />
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>

                      <button
                        onClick={() => handleDelete(link.id)}
                        className="p-2 bg-red-500/20 rounded-xl"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </Motion.motion.div>
              ))}
            </div>

            {/*Destop table */}            
          <div className="hidden md:block bg-white/5 rounded-3xl border border-white/10 overflow-hidden">
            
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 text-left text-sm text-white/70">
                    <th className="px-6 py-4">Short Link</th>
                    <th className="px-6 py-4">Original URL</th>
                    <th className="px-6 py-4">Clicks</th>
                    <th className="px-6 py-4 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {links.map((link) => (
                    <tr
                      key={link.id}
                      className="border-b border-white/5 hover:bg-white/5"
                    >
                      <td className="px-6 py-4 font-semibold">
                          <a
                            href={`/r/${link.short_code}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-400 hover:underline"
                          >
                            {link.short_code}
                          </a>
                      </td>

                      <td className="px-6 py-4 text-sm text-white/60 truncate max-w-sm">
                        {link.original_url}
                      </td>

                      <td className="px-6 py-4">
                        {link.clicks}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">

                          {/* Copy */}
                          <button
                            onClick={() =>
                              handleCopy(
                                `${window.location.origin}/r/${link.short_code}`, 
                                link.id
                              )
                            }
                            className="p-2 bg-white/10 rounded-xl"
                          >
                            {copiedId === link.id ? (
                              <CheckCircle2 className="text-green-400" size={16} />
                            ) : (
                              <Copy size={16} />
                            )}
                          </button>


                          {/* Delete */}
                          <button
                            onClick={() =>
                              handleDelete(link.id)
                            }
                            className="p-2 bg-red-500/20 rounded-xl cursor-pointer"
                          >
                            <Trash2 size={16} />
                          </button>

                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>

          {/* Stats */}
          <Motion.motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }} 
            className="flex md:grid-cols-3 gap-6 mt-8"
          >

            <div className="bg-purple-500/10 p-6 rounded-2xl">
              <p className="text-white/60">Total Links</p>
              <h2 className="text-3xl font-bold">
                {links.length}
              </h2>
            </div>

            <div className="bg-blue-500/10 p-6 rounded-2xl">
              <p className="text-white/60">Total Clicks</p>
              <h2 className="text-3xl font-bold">
                {totalClicks}
              </h2>
            </div>

            <div className="bg-green-500/10 p-6 rounded-2xl">
              <p className="text-white/60">Avg Clicks</p>
              <h2 className="text-3xl font-bold">
                {Math.round(totalClicks / links.length || 0)}
              </h2>
            </div>

          </Motion.motion.div>
        </div>
      </main>
    </div>
  );
}
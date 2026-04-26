
import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { supabase } from "../lib/supabase";

import {
  Copy,
  ExternalLink,
  CheckCircle2,
  Download,
  Share2,
} from "lucide-react";

import { AnimatePresence } from "framer-motion";
import * as Motion from "framer-motion"
import { QRCodeSVG } from "qrcode.react";


export default function GenerateLink() {
  const navigate = useNavigate();
  const location = useLocation();

  const locationState = location.state || {};

  const [longUrl, setLongUrl] = useState(locationState.longUrl || "");
  const [customAlias, setCustomAlias] = useState(
    locationState.customAlias || ""
  );
  const [generatedLink, setGeneratedLink] = useState(null);
  const [copied, setCopied] = useState(false);

  const qrRef = useRef(null);

  const handleGenerate = async (e) => {
    e.preventDefault();

    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    const alias = customAlias || Math.random().toString(36).substring(7);
    const baseUrl = import.meta.env.VITE_APP_URL || window.location.origin;

    let formattedUrl = longUrl;
    if (!formattedUrl.startsWith("http")) {
      formattedUrl = "https://" + formattedUrl;
    }

    // check duplicate
    const { data: existing } = await supabase
      .from("links")
      .select("id")
      .eq("short_code", alias)
      .single();

    if (existing) {
      alert("Alias already taken");
      return;
    }

    // save link
    const { error } = await supabase.from("links").insert([
      {
        original_url: formattedUrl,
        short_code: alias,
        user_id: user?.id || null,
        clicks: 0,
      },
    ]);

    if (error) {
      alert("Error creating link");
      console.error(error);
      return;
    }

    setGeneratedLink(`${baseUrl}/r/${alias}`);
  };

  const handleCopy = async () => {
    if (!generatedLink) return;

    await navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenLink = () => {
    if (generatedLink) {
      window.open(generatedLink, "_blank");
    }
  };

  const handleDownloadQR = () => {
    if (!qrRef.current) return;

    const svg = qrRef.current.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    canvas.width = 1000;
    canvas.height = 1000;

    img.onload = () => {
      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        const png = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.download =
          generatedLink?.replace("miraly/", "") ||
          "qrcode";
        link.href = png;
        link.click();
      }
    };

    img.src =
      "data:image/svg+xml;base64," + btoa(svgData);
  };

  const handleGoToDashboard = async () => {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      navigate("/login");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <Navbar />

      <div className="pt-32 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {!generatedLink ? (
              <Motion.motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/10 shadow-2xl"
              >
                <h1 className="text-3xl font-bold mb-8">
                  Create Your Short Link
                </h1>

                <form
                  onSubmit={handleGenerate}
                  className="space-y-6"
                >
                  <input
                    type="url"
                    placeholder="https://example.com/..."
                    value={longUrl}
                    onChange={(e) =>
                      setLongUrl(e.target.value)
                    }
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl placeholder-white/40 focus:ring-2 focus:ring-purple-500"
                    required
                  />

                  <div className="flex items-center gap-3">
                    <span className="text-white/50">
                      {window.location.host}/r/
                    </span>
                    <input
                      type="text"
                      placeholder="my-link"
                      value={customAlias}
                      onChange={(e) =>
                        setCustomAlias(e.target.value)
                      }
                      className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl placeholder-white/40 focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <Motion.motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }} 
                    
                    className="w-full py-4 bg-linear-to-r from-purple-500 to-blue-500 rounded-4xl font-semibold cursor-pointer">
                    Generate Link
                  </Motion.motion.button>
                </form>
              </Motion.motion.div>
            ) : (
              <Motion.motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/10 shadow-2xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle2 className="text-green-400" />

                  <h2 className="text-2xl font-bold">
                      Your link is ready!
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">

                  {/* Link */}
                  <div className="bg-white/5 p-6 rounded-2xl">
                    <p className="text-sm text-white/50">
                      Your link
                    </p>

                    <p className="text-lg font-bold mt-2 mb-4 break-all">
                      {generatedLink}
                    </p>

                    <div className="flex gap-2">
                      <button
                        onClick={handleCopy}
                        className="flex-1 bg-purple-500 py-2 rounded-xl flex items-center justify-center gap-2 cursor-poniter"
                      >
                        {copied ? "Copied!" : "Copy"}
                      </button>

                      <button
                        onClick={handleOpenLink}
                        className="px-4 bg-white/10 rounded-xl cursor-pointer"
                      >
                        <ExternalLink size={18} />
                      </button>
                    </div>
                  </div>

                  {/* QR */}
                  <div className="bg-white/5 p-6 rounded-2xl text-center">
                    <div
                      ref={qrRef}
                      className="bg-white p-4 rounded-xl inline-block mb-4"
                    >
                      <QRCodeSVG
                        value={generatedLink}
                        size={140}
                      />
                    </div>

                    <button
                      onClick={handleDownloadQR}
                      className="w-full bg-purple-500 py-2 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Download size={16} />
                      Download QR
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleGoToDashboard}
                  className="w-full mt-6 bg-white/10 py-3 rounded-xl cursor-pointer"
                >
                  Go to Dashboard
                </button>
              </Motion.motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
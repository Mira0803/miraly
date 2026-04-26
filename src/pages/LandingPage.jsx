// src/pages/LandingPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import LinkForm from "../components/LinkForm";
import FeatureCard from "../components/FeatureCard";
import Footer from "../components/Footer";

import { Link2, Zap, Sparkles, QrCode } from "lucide-react";
import * as Motion from "framer-motion";


export default function LandingPage() {
  
  const navigate = useNavigate();

  const [longUrl, setLongUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");

  const handleShorten = (e) => {
    e.preventDefault();
    navigate("/generate", {
      state: { longUrl, customAlias },
    });
  };

  const features = [
    {
      icon: Link2,
      title: "Custom Aliases",
      description:
        "Create memorable, branded short links that match your identity.",
    },
    {
      icon: Zap,
      title: "Instant Redirects",
      description:
        "Lightning-fast redirects with high reliability.",
    },
    {
      icon: QrCode,
      title: "QR Code Generation",
      description:
        "Instantly generate QR codes for every link.",
    },
    {
      icon: Sparkles,
      title: "Clean Branding",
      description:
        "Professional short URLs that enhance your brand.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white font-sans">
      
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero onGetStarted={() => navigate("/generate")} />

      {/* Link Form */}
      <LinkForm
        longUrl={longUrl}
        setLongUrl={setLongUrl}
        customAlias={customAlias}
        setCustomAlias={setCustomAlias}
        onSubmit={handleShorten}
      />

      {/* Features Section */}
      <Motion.motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}

        className="py-20 px-6"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </Motion.motion.section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <Motion.motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center bg-linear-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-xl rounded-3xl p-16 border border-white/10 shadow-2xl"
        >
          <h2 className="text-4xl font-bold mb-6">
            Start creating clean links today
          </h2>

          <p className="text-xl text-white/60 mb-8">
            Join thousands of users who trust MiracleLinks
          </p>

          <Motion.motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/generate")}
            className="px-10 py-4 bg-white/90 text-purple-900 rounded-4xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all cursor-pointer"
          >
            Get Started
          </Motion.motion.button>
        </Motion.motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
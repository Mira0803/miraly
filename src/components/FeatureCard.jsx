// src/components/FeatureCard.jsx
import * as Motion from "framer-motion";

export default function FeatureCard({ icon: Icon, title, description }) {
  return (
    <Motion.motion.div
      whileHover={{ y: -8 }}
      className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-xl hover:border-purple-500/30 transition-all"
    >
      <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6">
        <Icon className="w-6 h-6 text-white" />
      </div>

      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>

      <p className="text-white/60">{description}</p>
    </Motion.motion.div>
  );
}
// src/components/LinkForm.jsx
import { motion } from "framer-motion";

export default function LinkForm({
  longUrl,
  setLongUrl,
  customAlias,
  setCustomAlias,
  onSubmit,
}) {
  return (
    <section className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl space-y-4"
        >
          <input
            type="url"
            placeholder="Paste your long URL..."
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <input
            type="text"
            placeholder="Custom alias (optional)"
            value={customAlias}
            onChange={(e) => setCustomAlias(e.target.value)}
            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <motion.button
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-4xl font-semibold shadow-lg hover:shadow-purple-500/10 transition-all text-white"
          >
            Shorten Link
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
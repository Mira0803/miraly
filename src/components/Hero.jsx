
import * as Motion from "framer-motion";
import { QRCodeSVG } from "qrcode.react";

export default function Hero({ onGetStarted }) {
    
    return (
        <section className="pt-32 pb-20 px-6">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left */}
            <Motion.motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            >
                <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
                    Turn Long Links Into{" "}
                    <span className="bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Clean, Branded URLs
                    </span>
                </h1>

                <p className="text-xl text-white/60 mb-8">
                    Create custom short links and QR codes instantly.
                </p>

                <Motion.motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onGetStarted}
                    className="px-8 py-4 bg-linear-to-r from-purple-500 to-blue-500 rounded-4xl font-semibold text-lg shadow-xl hover:shadow-purple-500/10 transition-all"
                >
                    Get Started
                </Motion.motion.button>

            </Motion.motion.div>

            {/* Right (Preview Card) */}
            <Motion.motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl"
            >
                <div className="space-y-6">
                    <div>
                        <p className="text-sm text-white/40 mb-2">Before</p>
                        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl px-4 py-3 text-red-300 text-sm break-all">
                            https://vercel.app/my-portfolio-12345
                        </div>
                    </div>

                    <div>
                        <p className="text-sm text-white/40 mb-2">After</p>
                        <div className="bg-green-500/10 border border-green-500/20 rounded-2xl px-4 py-3 text-green-300 text-sm font-semibold">
                            miraly/miracle-portfolio
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <p className="text-xs text-white/40">
                                Share via link or QR code
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-3 shadow-lg">
                            <QRCodeSVG
                                value="https://miraly.netlify.app/"
                                size={80}
                                level="M"
                            />
                        </div>
                    </div>
                
                </div>
            </Motion.motion.div>
        </div>
        </section>
    );
}
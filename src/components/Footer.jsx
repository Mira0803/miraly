
export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="border-t border-white/5 py-8 mt-20 bg-[#0f0f0f]"
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Logo */}
        <div className="flex items-center gap-1">
            <img 
                className="w-9 h-9 items-center jutisfy-center"
                src="/Miraly logo.png" 
                alt="miraly-logo"
            />
          <span className="text-sm font-medium text-white/50">
            Miraly
          </span>
        </div>

        {/* Copyright */}
        <p className="text-sm text-white/30 text-center sm:text-right">
          © {new Date().getFullYear()} MiracleLinks. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
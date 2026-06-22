export default function Footer() {
  return (
    <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 border-t border-slate-900/60 mt-16 text-center text-xs font-mono text-slate-600 flex flex-col sm:flex-row justify-between items-center gap-4">
      <div>
        <span>© 2026 CODEWAR ARENA. ALL SYSTEMS OPERATIONAL.</span>
      </div>
      <div className="flex gap-6">
        <a href="#privacy" className="hover:text-cyan-500 transition-colors">PRIVACY_POLICY</a>
        <a href="#terms" className="hover:text-cyan-500 transition-colors">SECURITY_MANIFEST</a>
      </div>
    </footer>
  );
}
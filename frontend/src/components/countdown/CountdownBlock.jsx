export default function CountdownBlock({ value, label }) {
  return (
    <div className="glass-panel border border-slate-900 rounded-lg p-4 text-center">
      <h2 className="text-5xl font-black text-cyan-400">
        {String(value).padStart(2, "0")}
      </h2>

      <p className="text-xs text-slate-500 mt-2">
        {label}
      </p>
    </div>
  );
}
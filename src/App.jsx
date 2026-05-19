import { useEffect, useState } from "react";

export default function DevSession() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#0b0c0f] flex items-center justify-center px-5 font-sans">

      {/* grid texture */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.036) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.036) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div
        className={`relative z-10 flex flex-col items-center text-center gap-5 transition-all duration-500 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
      >
        {/* badge */}
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#f13c20] animate-pulse" />
          <span className="text-[11px] font-semibold tracking-[.18em] uppercase text-[#f13c20]">
            Dev session active
          </span>
        </div>

        {/* logo */}
        <h1 className="text-[72px] sm:text-[96px] font-extrabold tracking-tight leading-none select-none">
          <span className="text-white">crew</span>
          <span className="text-[#f13c20]">mate</span>
        </h1>

        {/* divider */}
        <div className="w-10 h-px bg-white/10" />

        {/* dev lines */}
        <div className="flex flex-col gap-2 text-[15px] sm:text-[17px] leading-[1.85] text-white/30 tracking-wide">

          <p>
            env:{" "}
            <code className="font-mono text-[14px] sm:text-[15px] text-[#f13c20]/80 bg-[#f13c20]/10 px-2 py-0.5 rounded">
              development
            </code>
            &nbsp;·&nbsp; branch:{" "}
            <code className="font-mono text-[14px] sm:text-[15px] text-[#f13c20]/80 bg-[#f13c20]/10 px-2 py-0.5 rounded">
              dev
            </code>
          </p>

          <p>
            server <span className="text-white/60">running</span>
            {" · "}
            db <span className="text-white/60">connected</span>
            {" · "}
            auth <span className="text-white/60">ready</span>
          </p>

          <p>
            <span className="text-white/20">$ </span>
            <span className="text-white/60">npm run dev</span>
            <span className="inline-block w-[9px] h-[17px] bg-[#f13c20] align-[-3px] ml-1 animate-[blink_1s_step-end_infinite]" />
          </p>

        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
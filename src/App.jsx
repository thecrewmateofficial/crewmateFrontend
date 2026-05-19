
import { useState, useEffect } from "react";

/**
 * crewmate.in — Coming Soon Page
 * Stack : React + Tailwind CSS
 * Font  : Anthropic Sans (all weights) via jsdelivr CDN
 */

export default function ComingSoon() {
  const [email, setEmail]         = useState("");
  const [status, setStatus]       = useState("idle"); // idle | success | error
  const [fontReady, setFontReady] = useState(false);

  /* Load Anthropic Sans from CDN */
  useEffect(() => {
    const link = document.createElement("link");
    link.rel    = "stylesheet";
    link.href   = "https://cdn.jsdelivr.net/gh/devchauhann/fonts@v1.1.0/cdn/v1/css/all.css";
    link.onload = () => setFontReady(true);
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const submit = () => {
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    setStatus(ok ? "success" : "error");
  };

  return (
    <>
      {/* ── Keyframes + grid + glow ─────────────────────── */}
      <style>{`
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(22px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        @keyframes pulseDot {
          0%,100% { opacity:1;   transform:scale(1);   }
          50%     { opacity:0.4; transform:scale(0.7); }
        }
        @keyframes toastPop {
          from { opacity:0; transform:translateX(-50%) translateY(14px); }
          to   { opacity:1; transform:translateX(-50%) translateY(0);    }
        }

        /* staggered reveals */
        .a1 { animation: fadeUp .65s ease .05s both; }
        .a2 { animation: fadeUp .65s ease .14s both; }
        .a3 { animation: fadeUp .65s ease .22s both; }
        .a4 { animation: fadeUp .65s ease .30s both; }
        .a5 { animation: fadeUp .65s ease .38s both; }
        .a6 { animation: fadeUp .65s ease .46s both; }
        .a7 { animation: fadeUp .65s ease .54s both; }

        .pulse-dot  { animation: pulseDot 2s ease-in-out infinite; }
        .toast-anim { animation: toastPop .4s cubic-bezier(.34,1.56,.64,1) both; }

        /* ── Background grid — responsive density ── */
        .bg-grid {
          background-image:
            linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px);
          /* tightest on mobile, relaxes on wider screens */
          background-size: 36px 36px;
        }
        @media (min-width: 640px)  { .bg-grid { background-size: 44px 44px; } }
        @media (min-width: 1024px) { .bg-grid { background-size: 52px 52px; } }
        @media (min-width: 1280px) { .bg-grid { background-size: 60px 60px; } }

        /*
         * ── Responsive red top glow ────────────────────────────────────────────
         *
         * Mobile   : glow is narrow + compact — doesn't bleed into content area
         * Tablet   : medium spread, slightly taller reach
         * Desktop  : wide cinematic bloom matching original screenshot intent
         * XL+      : full immersive glow, softer fall-off for large screens
         *
         * We scale THREE things responsively:
         *   1. Ellipse width  (how wide the bloom fans out)
         *   2. Ellipse height (how far down the glow reaches into the page)
         *   3. Opacity/stop positions (intensity tuned per breakpoint)
         */

        /* Mobile — tight, punchy, centred */
        .top-glow {
          background: radial-gradient(
            ellipse 110% 38% at 50% 0%,
            rgba(165,22,4,.72)   0%,
            rgba(130,16,3,.38)  22%,
            rgba(100,12,2,.12)  48%,
            transparent         72%
          );
        }

        /* Small tablet (≥ 480px) */
        @media (min-width: 480px) {
          .top-glow {
            background: radial-gradient(
              ellipse 100% 48% at 50% 2%,
              rgba(165,22,4,.68)   0%,
              rgba(130,16,3,.34)  20%,
              rgba(100,12,2,.10)  50%,
              transparent         76%
            );
          }
        }

        /* Tablet (≥ 640px) */
        @media (min-width: 640px) {
          .top-glow {
            background: radial-gradient(
              ellipse 90% 60% at 50% 5%,
              rgba(165,22,4,.65)   0%,
              rgba(130,16,3,.32)  18%,
              rgba(100,12,2,.09)  52%,
              transparent         78%
            );
          }
        }

        /* Laptop (≥ 1024px) */
        @media (min-width: 1024px) {
          .top-glow {
            background: radial-gradient(
              ellipse 80% 75% at 50% 8%,
              rgba(165,22,4,.63)   -5%,
              rgba(130,16,3,.31)  12%,
              rgba(100,12,2,.08)  50%,
              transparent         78%
            );
          }
        }

        /* Desktop (≥ 1280px) — original cinematic feel */
        @media (min-width: 1280px) {
          .top-glow {
            background: radial-gradient(
              ellipse 72% 90% at 50% 10%,
              rgba(165,22,4,.62)  -40%,
              rgba(130,16,3,.30)   8%,
              transparent         80%
            );
          }
        }

        /* Ultra-wide (≥ 1920px) — softer so it doesn't look burnt */
        @media (min-width: 1920px) {
          .top-glow {
            background: radial-gradient(
              ellipse 60% 100% at 50% 12%,
              rgba(165,22,4,.55)  -30%,
              rgba(130,16,3,.26)  10%,
              transparent         82%
            );
          }
        }

        /* Anthropic Sans utility */
        .font-anthropic { font-family: 'Anthropic Sans', system-ui, sans-serif; }

        /* Input: kill browser default outline */
        .email-input:focus { outline: none; }

        /* Notify button states */
        .notify-btn:hover:not(:disabled)  { background: #c93516 !important; }
        .notify-btn:active:not(:disabled) { transform: scale(.97); }
      `}</style>

      {/* ══════════════════ PAGE ROOT ══════════════════════ */}
      <div
        className={`font-anthropic relative min-h-screen w-full overflow-hidden
                    flex flex-col items-center justify-center
                    bg-[#0b0c0f] text-white
                    px-5 py-20 sm:px-10 md:px-16
                    transition-opacity duration-500
                    ${fontReady ? "opacity-100" : "opacity-0"}`}
      >

        {/* Grid texture */}
        <div className="bg-grid absolute inset-0 pointer-events-none z-[1]" />

        {/* Red glow top */}
        <div className="top-glow absolute inset-0 pointer-events-none z-0" />

        {/* ── Corner brackets ── */}
        {[
          "top-7 left-7 sm:top-9 sm:left-9   border-t-[1.5px] border-l-[1.5px]",
          "top-7 right-7 sm:top-9 sm:right-9  border-t-[1.5px] border-r-[1.5px]",
          "bottom-7 left-7 sm:bottom-9 sm:left-9   border-b-[1.5px] border-l-[1.5px]",
          "bottom-7 right-7 sm:bottom-9 sm:right-9  border-b-[1.5px] border-r-[1.5px]",
        ].map((cls, i) => (
          <span
            key={i}
            className={`absolute ${cls} border-[#f13c20]/38
                        w-[22px] h-[22px] sm:w-7 sm:h-7 z-10`}
          />
        ))}

        {/* ══════════════════ CONTENT ════════════════════════ */}
        <div className="relative z-10 flex flex-col items-center text-center
                        w-full max-w-[700px]">

          {/* ── Badge ── */}
          <div className="a1 inline-flex items-center gap-2.5
                          border border-[#f13c20]/42 rounded-full
                          px-[18px] py-[6px] mb-10 sm:mb-14">
            <span className="pulse-dot w-[7px] h-[7px] rounded-full
                             bg-[#f13c20] flex-shrink-0" />
            <span className="font-anthropic text-[10px] sm:text-[11px]
                             font-semibold tracking-[.16em] uppercase
                             text-[#f13c20]">
              Something big is coming
            </span>
          </div>

          {/* ── Logo ── */}
          <h1
            className="font-anthropic a2 select-none leading-[.95] mb-3"
            style={{
              fontSize     : "clamp(52px, 13.5vw, 104px)",
              fontWeight   : 800,
              letterSpacing: "-0.03em",
            }}
          >
            <span className="text-white">crew</span>
            <span className="text-[#f13c20]">mate</span>
          </h1>

          {/* ── Domain ── */}
          <p className="font-anthropic a3
                        text-[13px] sm:text-sm
                        tracking-[.10em] font-normal
                        text-white/30 mb-7 sm:mb-9">
            crewmate.in
          </p>

          {/* ── Tagline ── */}
          <p
            className="font-anthropic a4
                       text-white/55 leading-[1.68]
                       max-w-[740px] mb-9 sm:mb-11"
            style={{
              fontSize  : "clamp(15px, 2.8vw, 19px)",
              fontWeight: 300,
            }}
          >
            The smarter way to manage your team.{" "}
            Built for speed, designed for clarity.
          </p>

          {/* ── Feature bullets ── */}
          <div className="a5 flex flex-wrap justify-center
                          gap-x-8 gap-y-3 mb-10 sm:mb-12">
            {["Team collaboration", "Real-time updates", "Smart workflows"].map((feat) => (
              <span
                key={feat}
                className="font-anthropic flex items-center gap-2
                           text-[12.5px] sm:text-[13px]
                           font-normal text-white/45"
              >
                <span className="w-[5px] h-[5px] rounded-full
                                 bg-[#f13c20] flex-shrink-0" />
                {feat}
              </span>
            ))}
          </div>

          {/* ── Email form ── */}
          <div
            className={`a6 flex w-full max-w-[460px] rounded-xl overflow-hidden
                        border transition-colors duration-200
                        ${status === "error"
                          ? "border-red-500/60"
                          : "border-white/[.11] focus-within:border-[#f13c20]/45"
                        }`}
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              disabled={status === "success"}
              className="email-input font-anthropic flex-1 min-w-0
                         bg-white/[.04] border-none
                         px-5 py-[14px] sm:py-4
                         text-[13px] sm:text-sm font-normal
                         text-white placeholder:text-white/[.28]
                         disabled:opacity-60"
            />
            <button
              onClick={submit}
              disabled={status === "success"}
              className={`notify-btn font-anthropic flex-shrink-0
                          border-none cursor-pointer
                          font-semibold tracking-[.07em]
                          text-[12px] sm:text-[13px] text-white
                          px-5 sm:px-6 py-[14px] sm:py-4
                          transition-all duration-150
                          disabled:opacity-60 disabled:cursor-default
                          ${status === "success"
                            ? "bg-green-600"
                            : "bg-[#f13c20]"
                          }`}
            >
              {status === "success" ? "You're in ✓" : "Notify me"}
            </button>
          </div>

          {/* Validation hint */}
          {status === "error" && (
            <p className="font-anthropic mt-2.5 text-[11.5px]
                          text-red-400 tracking-wide">
              Please enter a valid email address.
            </p>
          )}

          {/* ── Divider ── */}
          <div className="a7 w-10 h-px bg-white/[.11]
                          mt-11 sm:mt-14 mb-5" />

          {/* ── Footer ── */}
          <p className="font-anthropic a7
                        text-[11px] sm:text-[12px]
                        font-normal tracking-[.06em]
                        text-white/[.22]">
            © 2025 crewmate.in &nbsp;·&nbsp; All rights reserved
          </p>

        </div>
        {/* ════════════════ END CONTENT ════════════════════ */}

        {/* ── Toast ── */}
        {status === "success" && (
          <div
            className="toast-anim font-anthropic
                       fixed bottom-8 left-1/2 z-50
                       bg-green-600 text-white rounded-full
                       px-6 py-3 text-[13px] font-medium
                       tracking-wide whitespace-nowrap"
          >
            🎉 You're on the list! We'll notify you at launch.
          </div>
        )}

      </div>
    </>
  );
}
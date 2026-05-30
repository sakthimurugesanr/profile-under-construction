export default function UnderConstruction() {
    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cal+Sans&family=Outfit:wght@300;400;600&display=swap');

        @keyframes gradient-move {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink-bar {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%       { transform: scale(1.5); opacity: 0.5; }
        }
        @keyframes spin-ring {
          to { transform: rotate(360deg); }
        }

        .gradient-text {
          background: linear-gradient(90deg, #a78bfa, #f472b6, #fb923c, #facc15, #34d399, #60a5fa, #a78bfa);
          background-size: 300% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-move 5s linear infinite;
        }
        .gradient-text-sub {
          background: linear-gradient(90deg, #60a5fa, #a78bfa, #f472b6, #60a5fa);
          background-size: 300% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-move 6s linear infinite reverse;
        }
        .fade-up-1 { animation: fade-up 0.7s ease both 0.1s; }
        .fade-up-2 { animation: fade-up 0.7s ease both 0.3s; }
        .fade-up-3 { animation: fade-up 0.7s ease both 0.5s; }
        .fade-up-4 { animation: fade-up 0.7s ease both 0.7s; }
        .fade-up-5 { animation: fade-up 0.7s ease both 0.9s; }

        .progress-shimmer {
          background: linear-gradient(90deg, #a78bfa, #f472b6, #fb923c, #facc15);
          background-size: 200% auto;
          animation: gradient-move 3s linear infinite;
        }
        .spin-ring {
          animation: spin-ring 6s linear infinite;
        }
        .blink { animation: blink-bar 1.2s step-end infinite; }
        .pulse-dot { animation: pulse-dot 1.5s ease infinite; }

        .card-glow {
          box-shadow: 0 0 0 1px rgba(167,139,250,0.15), 0 24px 80px rgba(0,0,0,0.7);
        }
      `}</style>

            <div
                className="w-full flex items-center justify-center bg-black px-4 py-16"
                style={{ minHeight: "100vh", fontFamily: "'Outfit', sans-serif" }}
            >
                {/* Subtle radial glow behind card */}


                <div
                    className="card-glow relative w-full max-w-xl rounded-3xl  backdrop-blur-sm border  px-8 py-14 sm:px-14 flex flex-col items-center text-center"
                >
                    <p
                        className="fade-up-1 text-sm sm:text-base font-light tracking-[0.25em] uppercase text-white/30 mb-3"
                    >
                        Hey there
                    </p>

                    {/* Main name */}
                    <h1
                        className="fade-up-2 gradient-text font-black tracking-tight leading-none mb-4"
                        style={{
                            fontFamily: "'Cal Sans', 'Outfit', sans-serif",
                            fontSize: "clamp(3rem, 12vw, 6.5rem)",
                        }}
                    >
                        I'm Sakthi
                    </h1>

                    {/* Under construction line */}
                    <p
                        className="fade-up-3 gradient-text-sub font-semibold tracking-widest uppercase mb-3"
                        style={{ fontSize: "clamp(0.75rem, 3vw, 1rem)" }}
                    >
                        This page is under construction
                    </p>

                    {/* Divider */}
                    <div
                        className="fade-up-3 my-6 w-16 h-px"
                        style={{
                            background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.5), transparent)",
                        }}
                    />

                    {/* Coming soon */}
                    <div className="fade-up-4 flex items-center gap-2 mb-8">
                        <span className="text-white/20 text-xs tracking-[0.3em] uppercase font-light">
                            Coming Soon
                        </span>
                        <span className="blink text-violet-400 font-light">|</span>
                    </div>

                    {/* Progress bar */}
                    <div className="fade-up-5 w-full max-w-xs">
                        <div className="flex justify-between mb-2">
                            <span className="text-white/20 text-[11px] tracking-widest uppercase">Progress</span>
                            <span className="text-white/20 text-[11px] tracking-widest">74%</span>
                        </div>
                        <div className="w-full h-[3px] rounded-full bg-white/[0.06] overflow-hidden">
                            <div className="progress-shimmer h-full rounded-full" style={{ width: "74%" }} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
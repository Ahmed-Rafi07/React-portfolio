import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const bootLines = [
  "Initializing system...",
  "Loading modules...",
  "Connecting to database...",
  "Access granted."
];

function useTypedBoot(lines, active) {
  const [lineIndex, setLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [completedLines, setCompletedLines] = useState([]);

  useEffect(() => {
    if (!active) {
      return undefined;
    }

    if (lineIndex >= lines.length) {
      return undefined;
    }

    const fullLine = lines[lineIndex];
    let cursor = 0;

    const typeTimer = window.setInterval(() => {
      cursor += 1;
      setCurrentText(fullLine.slice(0, cursor));

      if (cursor >= fullLine.length) {
        window.clearInterval(typeTimer);

        const lineDoneTimer = window.setTimeout(() => {
          setCompletedLines((prev) => [...prev, fullLine]);
          setCurrentText("");
          setLineIndex((prev) => prev + 1);
        }, 170);

        return () => window.clearTimeout(lineDoneTimer);
      }

      return undefined;
    }, 26);

    return () => {
      window.clearInterval(typeTimer);
    };
  }, [active, lineIndex, lines]);

  return { completedLines, currentText };
}

function Loader({ active, onComplete }) {
  const [progress, setProgress] = useState(0);
  const [showGlitch, setShowGlitch] = useState(false);
  const completionFiredRef = useRef(false);
  const { completedLines, currentText } = useTypedBoot(bootLines, active);
  const displayLines = useMemo(() => [...completedLines, currentText].filter(Boolean), [completedLines, currentText]);
  const hasAccessGranted = displayLines.some((line) => line.toLowerCase().includes("access granted"));

  useEffect(() => {
    if (!active) {
      completionFiredRef.current = false;
      setProgress(0);
      return undefined;
    }

    const startedAt = Date.now();
    const duration = 2500;

    const progressTimer = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const next = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(next);
    }, 40);

    return () => {
      window.clearInterval(progressTimer);
    };
  }, [active]);

  useEffect(() => {
    if (!active || progress < 100 || !hasAccessGranted) {
      return undefined;
    }

    if (!showGlitch) {
      setShowGlitch(true);
      return undefined;
    }

    if (completionFiredRef.current) {
      return undefined;
    }

    completionFiredRef.current = true;

    const doneTimer = window.setTimeout(() => {
      onComplete?.();
    }, 400);

    return () => {
      window.clearTimeout(doneTimer);
    };
  }, [active, onComplete, progress, hasAccessGranted, showGlitch]);

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.7, filter: "blur(12px)" }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[120] overflow-hidden bg-[#020403] text-[#00ff9f]"
      aria-live="polite"
      aria-label="System boot loader"
    >
      <AnimatePresence>
        {showGlitch && hasAccessGranted && (
          <motion.div
            key="screen-shake"
            initial={{ opacity: 0 }}
            animate={{ x: [0, -2, 2, -2, 0], opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-50 pointer-events-none"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
      <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_3px)]" />
      <motion.div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,255,159,0.12),transparent_45%),radial-gradient(circle_at_80%_75%,rgba(0,255,159,0.09),transparent_40%)]"
        animate={{ opacity: [0.65, 0.9, 0.65] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto flex h-full w-[min(980px,92vw)] items-center justify-center">
        <div className="w-full max-w-3xl rounded-2xl border border-[#00ff9f]/35 bg-black/60 p-6 shadow-[0_0_60px_rgba(0,255,159,0.16)] backdrop-blur-sm md:p-8">
          <div className="mb-5 flex items-center justify-between gap-4 border-b border-[#00ff9f]/25 pb-3 text-xs uppercase tracking-[0.24em] text-[#00ff9f]/70">
            <span>Secure Boot Terminal</span>
            <span>v1.0.7</span>
          </div>

          <div className="min-h-[160px] space-y-2 font-mono text-sm md:text-base">
            {displayLines.map((line, index) => {
              const isGranted = line.toLowerCase().includes("access granted");
              const shouldGlitch = showGlitch && isGranted;

              return (
                <motion.p
                  key={`${line}-${index}`}
                  animate={shouldGlitch ? { textShadow: ["0 0 0px rgba(0,255,159,1)", "2px 0 0px rgba(255,0,0,0.7), -2px 0 0px rgba(0,255,255,0.7)", "0 0 0px rgba(0,255,159,1)", "2px 0 0px rgba(255,0,0,0.7), -2px 0 0px rgba(0,255,255,0.7)", "0 0 0px rgba(0,255,159,1)"], opacity: [1, 0.8, 1, 0.8, 1] } : { textShadow: "0 0 0px rgba(0,255,159,1)", opacity: 1 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className={isGranted ? "text-[#96ffd4]" : "text-[#00ff9f]/88"}
                >
                  <span className="mr-3 text-[#00ff9f]/55">&gt;</span>
                  {line}
                  {index === displayLines.length - 1 ? <span className="ml-1 inline-block animate-pulse">_</span> : null}
                </motion.p>
              );
            })}
          </div>

          <div className="mt-7">
            <div className="mb-2 flex items-center justify-between text-xs text-[#00ff9f]/75">
              <span>Boot Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full border border-[#00ff9f]/35 bg-[#001e14]">
              <motion.div
                className="h-full bg-[linear-gradient(90deg,rgba(0,255,159,0.35),rgba(0,255,159,0.95))]"
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear", duration: 0.08 }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Loader;
import { useEffect, useMemo, useState } from "react";

function TypingHeadline({ words, typeSpeed = 70, deleteSpeed = 38, holdTime = 1400 }) {
  const safeWords = useMemo(() => words?.length ? words : ["Crafted to feel premium"], [words]);
  const [wordIndex, setWordIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = safeWords[wordIndex % safeWords.length];
    const atFullText = typedText === fullText;
    const atEmpty = typedText.length === 0;

    const delay = atFullText && !isDeleting
      ? holdTime
      : isDeleting
        ? deleteSpeed
        : typeSpeed;

    const timer = window.setTimeout(() => {
      if (!isDeleting && atFullText) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && atEmpty) {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % safeWords.length);
        return;
      }

      setTypedText((prev) => {
        if (isDeleting) {
          return fullText.slice(0, Math.max(0, prev.length - 1));
        }

        return fullText.slice(0, prev.length + 1);
      });
    }, delay);

    return () => window.clearTimeout(timer);
  }, [deleteSpeed, holdTime, isDeleting, safeWords, typeSpeed, typedText, wordIndex]);

  return (
    <span className="inline-flex items-center">
      <span>{typedText}</span>
      <span className="ml-1 inline-block h-[1.1em] w-[0.08em] animate-pulse bg-cyan-100/90" aria-hidden="true" />
    </span>
  );
}

export default TypingHeadline;

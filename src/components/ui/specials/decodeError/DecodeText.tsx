"use client";

import { useEffect, useState } from "react";

const randomChars = "!@#$%^&*()_+-=<>?/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function getRandomChar() {
  return randomChars[Math.floor(Math.random() * randomChars.length)];
}

export function DecodeText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState<string[]>(() =>
    text.split("").map((ch) => (ch === " " ? " " : getRandomChar()))
  );

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) =>
        prev.map((ch, idx) => {
          if (idx < i) return text[idx];
          if (text[idx] === " ") return " ";
          return getRandomChar();
        })
      );
      i++;
      if (i > text.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className="font-mono tracking-wide text-red-600 dark:text-red-500 text-xs">
      {displayed.map((ch, i) => (
        <span key={i}>{ch}</span>
      ))}
    </span>
  );
}

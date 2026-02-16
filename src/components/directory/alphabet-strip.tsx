"use client";

import { cn } from "@/lib/utils/cn";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

interface AlphabetStripProps {
  availableLetters: string[];
  selectedLetter: string | null;
  onSelect: (letter: string | null) => void;
}

export function AlphabetStrip({
  availableLetters,
  selectedLetter,
  onSelect,
}: AlphabetStripProps) {
  return (
    <div className="flex flex-wrap gap-1 no-print">
      <button
        onClick={() => onSelect(null)}
        className={cn(
          "px-2 py-1 text-xs font-medium rounded transition-all duration-200",
          selectedLetter === null
            ? "bg-primary-800 text-white"
            : "text-neutral-700 hover:bg-neutral-200"
        )}
      >
        All
      </button>
      {ALPHABET.map((letter) => {
        const isAvailable = availableLetters.includes(letter);
        const isSelected = selectedLetter === letter;
        return (
          <button
            key={letter}
            onClick={() => isAvailable && onSelect(isSelected ? null : letter)}
            disabled={!isAvailable}
            className={cn(
              "w-7 h-7 text-xs font-medium rounded transition-all duration-200 flex items-center justify-center",
              isSelected
                ? "bg-primary-800 text-white"
                : isAvailable
                ? "text-neutral-700 hover:bg-neutral-200"
                : "text-neutral-300 cursor-not-allowed"
            )}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
}

'use client';

import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";

export default function SearchBar({ onSearch }: { onSearch: (term: string) => void }) {
  const [term, setTerm] = useState("");
  const debouncedTerm = useDebounce(term, 600);

  useEffect(() => {
    onSearch(debouncedTerm);
  }, [debouncedTerm, onSearch]);

  return (
    <div className="flex w-full">
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search for podcasts..."
        className="flex-1 px-4 py-2 rounded bg-[#2a2a2a] text-sm text-white focus:outline-none"
      />
    </div>
  );
}

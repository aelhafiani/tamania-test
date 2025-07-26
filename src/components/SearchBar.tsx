'use client';

import { useState } from "react";

export default function SearchBar({ onSearch }: { onSearch: (term: string) => void }) {
  const [term, setTerm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(term);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full ">
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search for podcasts..."
        className="flex-1 px-4 py-2 rounded-l bg-[#2a2a2a] text-sm text-white focus:outline-none"
      />
      <button type="submit" className="px-4 py-2 bg-pink-500 text-white rounded-r">
        Search
      </button>
    </form>
  );
}

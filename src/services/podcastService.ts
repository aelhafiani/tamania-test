const BASE_URL = "/api";

export async function fetchPodcasts(term: string) {
  const res = await fetch(`${BASE_URL}/podcasts?term=${encodeURIComponent(term)}`);
  if (!res.ok) throw new Error("Failed to fetch podcasts");
  return res.json();
}

export async function fetchEpisodes(term: string, limit: number, offset: number) {
  const res = await fetch(
    `${BASE_URL}/episodes?term=${encodeURIComponent(term)}&limit=${limit}&offset=${offset}`
  );
  if (!res.ok) throw new Error("Failed to fetch episodes");
  return res.json();
}
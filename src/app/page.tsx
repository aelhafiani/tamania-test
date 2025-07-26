'use client';

import { useState, useCallback, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import PodcastCard from "@/components/PodcastCard";
import EpisodeRow from "@/components/EpisodeRow";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchEpisodes, fetchPodcasts } from "@/services/podcastService";

export default function HomePage() {
  const [podcasts, setPodcasts] = useState<any[]>([]);
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const PAGE_SIZE = 20;
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); 

  const handleSearch = useCallback(async (term: string) => {
    setSearchTerm(term); // store the current search term
    setLoading(true);
    setError(null);
    setEpisodes([]);
    setOffset(0);
    setHasMore(true);

    try {
      const podcastsData = await fetchPodcasts(term);
      setPodcasts(podcastsData.podcasts || []);

      const episodesData = await fetchEpisodes(term, PAGE_SIZE, 0);
      setEpisodes(episodesData.episodes || []);

      if (episodesData.resultCount < PAGE_SIZE) {
        setHasMore(false);
      }
      setOffset(PAGE_SIZE);
    } catch (err) {
      console.error(err);
      setError("Failed to load search results.");
    } finally {
      setLoading(false);
    }
  }, []);
  const mergeUniqueEpisodes = (prev: any[], newEpisodes: any[]) => {
    const map = new Map(prev.map((e) => [e.trackId, e]));
    newEpisodes.forEach((e) => {
      if (!map.has(e.trackId)) {
        map.set(e.trackId, e);
      }
    });
    return Array.from(map.values());
  };
  const fetchMoreEpisodes = async () => {
    try {
      const data = await fetchEpisodes(searchTerm, PAGE_SIZE, offset);
      setEpisodes((prev) => mergeUniqueEpisodes(prev, data.episodes || []));
      
      if (data.resultCount < PAGE_SIZE) {
        setHasMore(false);
      }
      setOffset((prev) => prev + PAGE_SIZE);
    } catch (err) {
      console.error(err);
      setError("Failed to load more episodes.");
    }
  };

  useEffect(() => {
    handleSearch(""); // load default data on first render
  }, [handleSearch]);

  return (
    <div className="relative">
      {/* Fixed Search Bar */}
      <div className="fixed top-14 left-0 right-0 z-40 bg-[#121212] px-6 py-3 md:static md:top-auto md:px-6">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Content */}
      <div className="p-6 pt-[120px] md:pt-6">
        {loading && episodes.length === 0 && (
          <p className="text-center text-blue-500">Loading...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        {podcasts.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg sm:text-xl text-white font-bold mb-4">Top podcasts</h2>
            <div className="flex space-x-4 overflow-x-auto pb-4 
                            scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
              {podcasts.map((podcast) => (
                <PodcastCard key={podcast.collectionId} podcast={podcast} />
              ))}
            </div>
          </section>
        )}

        {episodes.length > 0 && (
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
              Top episodes
            </h2>
            <InfiniteScroll
              dataLength={episodes.length}
              next={fetchMoreEpisodes}
              hasMore={hasMore}
              loader={<p className="text-center text-blue-500">Loading more episodes...</p>}
              endMessage={<p className="text-center mt-4">No more episodes</p>}
              scrollableTarget="scrollableMain"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {episodes.map((episode) => (
                  <div key={episode.trackId}>
                    <EpisodeRow episode={episode} />
                  </div>
                ))}
              </div>
            </InfiniteScroll>
          </section>
        )}
      </div>
    </div>
  );
}

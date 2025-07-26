export default function EpisodeListItem({ episode }: { episode: any }) {
  return (
    <div className="bg-[#1e1e1e] p-3 rounded flex items-center justify-between">
      <div>
        <h3 className="font-bold text-white text-sm truncate">{episode.trackName}</h3>
        <p className="text-gray-400 text-xs">{episode.artistName}</p>
      </div>
    </div>
  );
}
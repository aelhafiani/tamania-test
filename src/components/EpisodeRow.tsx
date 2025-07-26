export default function EpisodeRow({ episode }: { episode: any }) {
  return (
    <div className="flex items-center bg-[#1e1e1e] p-3 rounded 
      hover:bg-[#2a2a2a] hover:shadow transition cursor-pointer">
      <img
        src={episode.artworkUrl60 || "/placeholder.png"}
        alt={episode.trackName}
        className="w-12 h-12 rounded mr-3"
      />
      <div className="flex-1">
        <h3 className="text-sm text-whepisodesite text-white  font-bold truncate">{episode.trackName}</h3>
        <p className="text-xs text-gray-400 truncate">{episode.collectionName}</p>
      </div>
    </div>
  );
}

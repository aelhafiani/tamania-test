export default function PodcastCard({ podcast }: { podcast: any }) {
  return (
    <div className="bg-[#1e1e1e] p-4 rounded w-36 sm:w-44 flex-shrink-0 
      hover:scale-105 hover:shadow-lg transition-transform duration-200 cursor-pointer">
      <img
        src={podcast.artworkUrl100}
        alt={podcast.collectionName}
        className="w-full h-28 sm:h-32 object-cover rounded mb-3"
      />
      <h3 className="font-bold text-white text-sm truncate">{podcast.collectionName}</h3>
      <p className="text-gray-400 text-xs truncate">{podcast.artistName}</p>
    </div>
  );
}

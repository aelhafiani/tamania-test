interface SongCardProps {
  song: any;
}

export default function SongCard({ song }: SongCardProps) {
  return (
    <div className="border rounded shadow p-4 flex flex-col items-center text-center">
      <img src={song.artworkUrl100} alt={song.trackName} className="rounded mb-2" />
      <h3 className="font-bold text-sm">{song.trackName}</h3>
      <p className="text-gray-600 text-xs">{song.artistName}</p>
      <audio controls className="mt-2 w-full">
        <source src={song.previewUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

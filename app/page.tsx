'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

type Song = {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
};

export default function Home() {
  const [song, setSong] = useState<Song>({ isPlaying: false });

  useEffect(() => {
    const fetchSong = async () => {
      const res = await fetch('/api/now-playing');
      const data = await res.json();
      setSong(data);
    };

    fetchSong();
    const interval = setInterval(fetchSong, 10000); // fetch every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="p-8 font-sans">
      <h1 className="text-2xl font-bold">🎵 Now Playing on Spotify</h1>

      {!song.isPlaying ? (
        <p className="mt-4 text-gray-500">Nothing is currently playing.</p>
      ) : (
        <a href={song.songUrl} target="_blank" rel="noopener noreferrer">
          <div className="mt-4 flex items-center gap-4">
            {song.albumImageUrl && (
              <Image
                src={song.albumImageUrl}
                alt={song.album || "Album cover"}
                width={64}
                height={64}
                className="rounded shadow"
              />
            )}
            <div>
              <p className="font-semibold">{song.title}</p>
              <p className="text-gray-500">{song.artist}</p>
            </div>
          </div>
        </a>
      )}
    </main>
  );
}

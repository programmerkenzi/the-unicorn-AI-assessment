import { useRef, useState } from "react";

interface AudioPlayerProps {
  audioURL: string;
}

const AudioPlayer = ({ audioURL }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleAudioEnd = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset to the start
      setIsPlaying(false); // Set play state to false
    }
  };

  return (
    <div className="">
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={audioURL}
        onEnded={handleAudioEnd}
        className="hidden"
      />

      {/* Play Button */}
      <button onClick={togglePlay} className={`action-button`}>
        {isPlaying ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 9v6m4-6v6"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.5 4.5l13 7-13 7V4.5z"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default AudioPlayer;

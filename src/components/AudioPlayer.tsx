import { useEffect, useRef, useState } from "react";
import PauseIcon from "./icons/PauseIcon";
import PlayIcon from "./icons/PlayIcon";

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

  useEffect(() => {
    if (audioURL) {
      togglePlay(); // auto play audio when audioURL is set
    }
  }, [audioURL]);

  return (
    <div>
      <audio
        ref={audioRef}
        src={audioURL}
        onEnded={handleAudioEnd}
        className="hidden"
      />

      <button onClick={togglePlay} className={`action-button`}>
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
    </div>
  );
};

export default AudioPlayer;

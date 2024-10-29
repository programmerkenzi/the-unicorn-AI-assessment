import { useEffect, useRef, useState } from "react";

export type RecordMode = "text-preview" | "on-click" | "auto";

interface RecordButtonProps {
  onRecord: (transcript: string) => void;
  onRecordEnd: () => void;
  recordMode: RecordMode;
}

const RecordButton = ({
  onRecord,
  onRecordEnd,
  recordMode,
}: RecordButtonProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<SpeechRecognition>();

  const initializeSpeechRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const speechRecognition = new SpeechRecognition();
    speechRecognition.continuous = true;
    speechRecognition.interimResults = false;
    speechRecognition.lang = "en-US";

    // Set up event handlers
    speechRecognition.onstart = () => {
      setIsRecording(true);
      console.log("Speech recognition started");
    };
    speechRecognition.onend = () => {
      console.log("Speech recognition stopped");
      onRecordEnd();
    };
    speechRecognition.onresult = (event) => {
      const results = event.results;

      let transcript = "";

      for (const [_, value] of Object.entries(results)) {
        transcript += value[0].transcript;
      }

      onRecord(transcript);
    };
    speechRecognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    return speechRecognition;
  };

  const handleOnRecord = async () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current = initializeSpeechRecognition();
      recognitionRef.current.start();
    }
  };

  return (
    <button
      type="button"
      onClick={handleOnRecord}
      className={`relative w-12 h-12 bg-[#D8BB83] hover:bg-[#E2C99A] focus:ring-4 focus:outline-none 
        focus:ring-[#C4A373] font-medium rounded-full p-3 inline-flex items-center justify-center 
        group transition-all duration-1000`}
    >
      {isRecording && (
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#C4A373] opacity-75 animate-ping" />
      )}
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        className="text-black group-hover:text-gray-700"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 9v3a5.006 5.006 0 0 1-5 5h-4a5.006 5.006 0 0 1-5-5V9m7 9v3m-3 0h6M11 3h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Z"
        />
      </svg>
    </button>
  );
};

export default RecordButton;

import { useRef, useState } from "react";

export type RecordMode = "text-preview" | "on-click" | "auto";

interface RecordButtonProps {
  onRecordStart: () => void;
  onResult: (transcript: string) => void;
  onSaveAudio: (audioURL: string) => void;
  onRecordEnd: () => void;
  recordMode: RecordMode;
}

const RecordButton = ({
  onRecordStart,
  onResult,
  onRecordEnd,
  onSaveAudio,
}: RecordButtonProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<SpeechRecognition>();
  const mediaRecorderRef = useRef<MediaRecorder>();
  const audioChunksRef = useRef<Blob[]>([]); // Store audio chunks

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
      onRecordStart();
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

      onResult(transcript);
    };
    speechRecognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    return speechRecognition;
  };

  const handleStartRecording = async () => {
    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Initialize speech recognition
      recognitionRef.current = initializeSpeechRecognition();
      recognitionRef.current.start();

      // Initialize media recorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/mpeg",
        });
        const audioURL = URL.createObjectURL(audioBlob);
        onSaveAudio(audioURL);
        audioChunksRef.current = [];
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const handleStopRecording = () => {
    recognitionRef.current?.stop();
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const handleOnRecord = () => {
    if (isRecording) {
      handleStopRecording();
    } else {
      handleStartRecording();
    }
  };

  return (
    <button
      type="button"
      onClick={handleOnRecord}
      className={`relative transition-all duration-1000 action-button group`}
    >
      {isRecording && (
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#C4A373] opacity-75 animate-ping" />
      )}
      <svg
        width="24"
        height="24"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
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

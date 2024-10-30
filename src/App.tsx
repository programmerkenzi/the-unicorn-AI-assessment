import { useEffect, useRef, useState } from "react";
import UnicornGirl from "/unicorn_girl.svg";

import "./App.css";
import ChatBubble from "./components/ChatBubble";
import SendBox from "./components/SendBox";
import RecordButton from "./components/RecordButton";
import AudioPlayer from "./components/AudioPlayer";
import RemoveButton from "./components/RemoveButton";
import { RecordMode } from "./types";
import RecordModeTabs from "./components/RecordModeTabs";
import RecordModeDrawdown from "./components/RecordModeDrawdown";
import UnicornGirlAnimation from "./components/UnicornGirlAnimation";

const mockData = [
  {
    id: "1",
    createdAt: "2021-09-01T00:00:00.000Z",
    ai: false,
    message: "Hello, World!",
    opacity: 1,
  },
  {
    id: "2",
    createdAt: "2021-09-01T00:01:30.000Z",
    ai: true,
    message:
      "Hi there! How can I assist you today? If you have any questions or need guidance with a project, feel free to let me know.",
    opacity: 1,
  },
  {
    id: "3",
    createdAt: "2021-09-01T00:02:15.000Z",
    ai: false,
    message:
      "I need help with my project. I'm not sure how to proceed with integrating the front-end and back-end. The API calls seem to fail, and I’m stuck debugging it.",
    opacity: 1,
  },
  {
    id: "4",
    createdAt: "2021-09-01T00:03:00.000Z",
    ai: true,
    opacity: 1,
    message:
      "Sure! It sounds like a challenging task, but I'm here to help. Can you provide more details, like the error messages you're seeing or the type of API you're working with?",
  },
  {
    id: "5",
    createdAt: "2021-09-01T00:04:25.000Z",
    ai: false,
    opacity: 1,
    message:
      "I'm building a web app using React for the front-end and Node.js with Express for the back-end. The issue is that I'm getting a CORS error when trying to fetch data from the server.",
  },
  {
    id: "6",
    createdAt: "2021-09-01T00:05:10.000Z",
    ai: true,
    opacity: 1,

    message:
      "CORS errors can be tricky! It usually happens when the server and client are running on different domains. You might need to configure your server to allow requests from your front-end domain using the appropriate headers.",
  },
  {
    id: "7",
    createdAt: "2021-09-01T00:06:45.000Z",
    ai: false,
    opacity: 1,
    message:
      "That makes sense. I also read about using a CORS middleware, but I'm not sure how to set it up correctly in Express.",
  },
  {
    id: "8",
    createdAt: "2021-09-01T00:07:30.000Z",
    ai: true,
    opacity: 1,
    message:
      "No problem! You can use the `cors` package in Express to handle this. Just install it via npm and use it as middleware in your app. Here’s a quick example:\n\n```javascript\nconst cors = require('cors');\napp.use(cors());\n```",
  },
  {
    id: "9",
    createdAt: "2021-09-01T00:08:05.000Z",
    ai: false,
    opacity: 1,

    message:
      "That’s helpful! I’ll try adding it to my server setup. Also, I want to implement JWT authentication for secure login and registration. Do you have any tips for that?",
  },
  {
    id: "10",
    createdAt: "2021-09-01T00:09:00.000Z",
    ai: true,
    opacity: 1,
    message:
      "JWT authentication is a great choice for securing your application! Start by generating tokens during login or signup. You'll then validate these tokens on each request to protected routes. Make sure to keep your secret keys safe, and set reasonable expiration times for the tokens to enhance security.",
  },
];

function App() {
  // const [isRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string>("");
  const [chatHistory, setChatHistory] = useState(mockData);
  const [message, setMessage] = useState<string>("");
  const [recordMode, setRecordMode] = useState<RecordMode>("text-preview");
  const [isFetchingResponse, setIsFetchingResponse] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const pushMessage = (message: string, ai: boolean) => {
    setChatHistory((prev) => [
      ...prev,
      {
        id: String(chatHistory.length + 1),
        createdAt: new Date().toISOString(),
        ai,
        message,
        opacity: 1,
      },
    ]);
  };

  const handleOnSend = () => {
    pushMessage(message, false);

    setMessage("");

    // Simulate AI response

    setTimeout(() => {
      setIsFetchingResponse(true);
    }, 1000);

    setTimeout(() => {
      setIsFetchingResponse(false);
      pushMessage(
        "I'm sorry, I'm just a demo chatbot. I don't have real-time capabilities.",
        true
      );
    }, 5000);
  };

  const handleOnAutoSend = (message: string) => {
    pushMessage(message, false);

    // Simulate AI response
    setTimeout(() => {
      setIsFetchingResponse(true);
    }, 1000);

    setTimeout(() => {
      setIsFetchingResponse(false);
      pushMessage(
        "I'm sorry, I'm just a demo chatbot. I don't have real-time capabilities.",
        true
      );
    }, 5000);
  };

  const handleOnResult = (text: string) => {
    if (recordMode === "text-preview") {
      setMessage((prev) => `${prev} ${text}`);
    } else {
      console.log("Recording result:", text);
      handleOnAutoSend(text);
    }
  };

  const handleOnRecordEnd = () => {
    console.log("Recording ended.");
  };

  const handleOnRecordStart = () => {
    console.log("Recording started.");
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory.length, isFetchingResponse]);

  const handleScroll = () => {
    if (!chatContainerRef.current) return;

    const data = [...chatHistory];

    const containerChildren = chatContainerRef.current.children;
    Array.from(containerChildren).map((child, index) => {
      const rect = (child as HTMLElement).getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const topPercentage = (rect.top / viewportHeight) * 100;

      if (topPercentage <= 15) {
        data[index].opacity = 0.2;
      } else if (topPercentage <= 25) {
        data[index].opacity = 0.5;
      } else {
        data[index].opacity = 1;
      }
    });

    setChatHistory(data);
  };

  return (
    <div className="bg-[url('/background.svg')] bg-cover w-dvw h-dvh grid xl:gap-8 xl:grid-cols-[40%_1fr] xl:pl-10">
      <div className="hidden justify-end xl:flex-col xl:flex">
        <UnicornGirlAnimation playMouthAnimation={isFetchingResponse} />
      </div>
      <div className="flex flex-row justify-between w-full items-start h-16 xl:hidden bg-[rgba(0,0,0,0.20)]  px-1 pt-2">
        <img src={UnicornGirl} className="h-full" />
        <div className="">
          <RecordModeDrawdown
            onSelect={(mode) => setRecordMode(mode)}
            selected={recordMode}
          />
        </div>
      </div>
      <div className="relative overflow-hidden h-full pb-[80px] xl:pb-[155px]">
        <div
          className="flex overflow-y-scroll flex-col gap-5 h-full xl:gap-8 xl:pr-10"
          ref={chatContainerRef}
          onScroll={handleScroll}
        >
          {chatHistory.map((data, index) => (
            <ChatBubble
              key={`${index}-${data.id}`}
              message={data.message}
              ai={data.ai}
              opacity={data.opacity}
            />
          ))}
          {isFetchingResponse && (
            <ChatBubble message="" ai={true} isLoading={true} />
          )}
        </div>
        {/* actions */}
        <div className="flex absolute bottom-0 left-0 flex-col gap-6 p-4 w-full xl:pr-10">
          <div className="flex flex-row gap-2 justify-between items-center xl:gap-4">
            <SendBox
              message={message}
              setMessage={(message) => setMessage(message)}
              onSend={handleOnSend}
            />

            {audioURL ? (
              <>
                <AudioPlayer audioURL={audioURL} />
                <RemoveButton onClick={() => setAudioURL("")} />
              </>
            ) : (
              <>
                <RecordButton
                  onResult={handleOnResult}
                  onRecordEnd={handleOnRecordEnd}
                  recordMode={recordMode}
                  onRecordStart={handleOnRecordStart}
                  onSaveAudio={(audioURL) => setAudioURL(audioURL)}
                />
              </>
            )}
          </div>
          <div className="hidden self-end w-1/3 min-w-[300px] max-w-96 xl:flex">
            <RecordModeTabs selected={recordMode} onSelect={setRecordMode} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

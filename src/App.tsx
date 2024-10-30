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
import { motion } from "framer-motion";
import ThemeToggleButton from "./components/ThemeToggleButton";

const mockData = [
  {
    id: "1",
    createdAt: "2021-09-01T00:00:00.000Z",
    ai: true,
    message: "Hi, I'm a demo chatbot! How can I help you today?",
    opacity: 1,
  },
  {
    id: "2",
    createdAt: "2021-09-01T00:01:30.000Z",
    ai: false,
    message: "I want to improve my English speaking skills. Can you help me?",
    opacity: 1,
  },
  {
    id: "3",
    createdAt: "2021-09-01T00:02:15.000Z",
    ai: true,
    message:
      "Of course! We can start with basic conversations or focus on vocabulary and pronunciation. What would you like to begin with?",
    opacity: 1,
  },
  {
    id: "4",
    createdAt: "2021-09-01T00:03:00.000Z",
    ai: false,
    opacity: 1,
    message: "Let's start with vocabulary. I struggle with phrasal verbs.",
  },
  {
    id: "5",
    createdAt: "2021-09-01T00:04:25.000Z",
    ai: true,
    opacity: 1,
    message:
      "Phrasal verbs can be tricky! How about we start with common ones like 'give up,' 'look forward to,' and 'get along'? Would you like examples?",
  },
  {
    id: "6",
    createdAt: "2021-09-01T00:05:10.000Z",
    ai: false,
    opacity: 1,
    message: "Yes, please. Examples would be helpful.",
  },
  {
    id: "7",
    createdAt: "2021-09-01T00:06:45.000Z",
    ai: true,
    opacity: 1,
    message:
      "Sure! 'Give up' means to stop trying. For example: 'I won’t give up learning English.' 'Look forward to' means to be excited about something. For example: 'I look forward to our next lesson.'",
  },
  {
    id: "8",
    createdAt: "2021-09-01T00:07:30.000Z",
    ai: false,
    opacity: 1,
    message:
      "Thanks! I often confuse the usage of 'get along.' Could you clarify it?",
  },
  {
    id: "9",
    createdAt: "2021-09-01T00:08:05.000Z",
    ai: true,
    opacity: 1,
    message:
      "'Get along' means to have a good relationship with someone. For example: 'I get along well with my colleagues.' It’s often used to talk about friendly relationships.",
  },
  {
    id: "10",
    createdAt: "2021-09-01T00:09:00.000Z",
    ai: false,
    opacity: 1,
    message:
      "Got it! Can we also practice pronunciation for some difficult words?",
  },
  {
    id: "11",
    createdAt: "2021-09-01T00:09:45.000Z",
    ai: true,
    opacity: 1,
    message:
      "Absolutely! Let’s try words like 'schedule,' 'rural,' and 'entrepreneur.' I’ll say them one by one, and you can repeat after me.",
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

  // Simulate AI response
  const simulateFetching = () => {
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

  const handleOnSend = () => {
    pushMessage(message, false);

    setMessage("");

    simulateFetching();
  };

  const handleOnAutoSend = (message: string) => {
    pushMessage(message, false);

    simulateFetching();
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
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
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

  useEffect(() => {
    // initial scroll
    handleScroll();

    // mock welcome message
    if (chatHistory.length === mockData.length) {
      let timer = setTimeout(() => {
        pushMessage("Hi, I'm a demo chatbot! How can I help you today?", true);
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, []);

  return (
    <div className="relative bg-[url('/background.svg')] bg-cover w-dvw h-dvh grid xl:gap-8 xl:grid-cols-[40%_1fr] xl:pl-10">
      <ThemeToggleButton />
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
      <div className="relative overflow-hidden h-full px-2 pb-[80px] xl:pb-[155px]">
        <motion.div
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
        </motion.div>
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

import { useState } from "react";
import UnicornGirl from "./assets/unicorn_girl.svg";

import "./App.css";
import ChatBubble from "./components/ChatBubble";
import SendBox from "./components/SendBox";
import RecordButton from "./components/RecordButton";

const mockData = [
  {
    id: "1",
    createdAt: "2021-09-01T00:00:00.000Z",
    ai: false,
    message: "Hello, World!",
  },
  {
    id: "2",
    createdAt: "2021-09-01T00:01:30.000Z",
    ai: true,
    message:
      "Hi there! How can I assist you today? If you have any questions or need guidance with a project, feel free to let me know.",
  },
  {
    id: "3",
    createdAt: "2021-09-01T00:02:15.000Z",
    ai: false,
    message:
      "I need help with my project. I'm not sure how to proceed with integrating the front-end and back-end. The API calls seem to fail, and I’m stuck debugging it.",
  },
  {
    id: "4",
    createdAt: "2021-09-01T00:03:00.000Z",
    ai: true,
    message:
      "Sure! It sounds like a challenging task, but I'm here to help. Can you provide more details, like the error messages you're seeing or the type of API you're working with?",
  },
  {
    id: "5",
    createdAt: "2021-09-01T00:04:25.000Z",
    ai: false,
    message:
      "I'm building a web app using React for the front-end and Node.js with Express for the back-end. The issue is that I'm getting a CORS error when trying to fetch data from the server.",
  },
  {
    id: "6",
    createdAt: "2021-09-01T00:05:10.000Z",
    ai: true,
    message:
      "CORS errors can be tricky! It usually happens when the server and client are running on different domains. You might need to configure your server to allow requests from your front-end domain using the appropriate headers.",
  },
  {
    id: "7",
    createdAt: "2021-09-01T00:06:45.000Z",
    ai: false,
    message:
      "That makes sense. I also read about using a CORS middleware, but I'm not sure how to set it up correctly in Express.",
  },
  {
    id: "8",
    createdAt: "2021-09-01T00:07:30.000Z",
    ai: true,
    message:
      "No problem! You can use the `cors` package in Express to handle this. Just install it via npm and use it as middleware in your app. Here’s a quick example:\n\n```javascript\nconst cors = require('cors');\napp.use(cors());\n```",
  },
  {
    id: "9",
    createdAt: "2021-09-01T00:08:05.000Z",
    ai: false,
    message:
      "That’s helpful! I’ll try adding it to my server setup. Also, I want to implement JWT authentication for secure login and registration. Do you have any tips for that?",
  },
  {
    id: "10",
    createdAt: "2021-09-01T00:09:00.000Z",
    ai: true,
    message:
      "JWT authentication is a great choice for securing your application! Start by generating tokens during login or signup. You'll then validate these tokens on each request to protected routes. Make sure to keep your secret keys safe, and set reasonable expiration times for the tokens to enhance security.",
  },
];

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-[url('src/assets/background.svg')] w-screen h-screen grid xl:gap-8 xl:grid-cols-[40%_1fr] xl:pl-10">
      <div className="hidden flex-col justify-end xl:flex">
        <img src={UnicornGirl} />
      </div>
      <div className="flex flex-col w-full items-start h-16 xl:hidden bg-[rgba(0,0,0,0.20)]  px-1 pt-2">
        <img src={UnicornGirl} className="h-full" />
      </div>
      <div className="relative overflow-hidden h-full pb-[70px]">
        <div className="flex overflow-y-scroll flex-col gap-5 p-4 h-full xl:gap-8 xl:pr-10">
          {mockData.map((data, index) => (
            <ChatBubble key={data.id} message={data.message} ai={data.ai} />
          ))}
        </div>
        {/* actions */}
        <div className="flex absolute bottom-0 left-0 flex-row gap-2 justify-between items-center px-4 py-2 w-full xl:pr-10">
          <SendBox />
          <RecordButton />
        </div>
      </div>
    </div>
  );
}

export default App;

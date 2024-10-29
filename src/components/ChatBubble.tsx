interface ChatBubbleProps {
  message: string;
  ai: boolean;
}

const ChatBubble = ({ message, ai }: ChatBubbleProps) => {
  const bubbleStyles = ai
    ? "bg-[#D8BB83] text-[#333333] z-10"
    : "bg-white self-end z-10";
  const tailStyles = ai
    ? "bg-[#D8BB83] -rotate-45 -left-[5px] z-[-1]"
    : "bg-white rotate-45 -right-[5px] z-[-1]";

  return (
    <div
      className={`relative flex xl:px-8 xl:py-4 px-4 py-2 ml-2 rounded-[32px] w-[90%] xl-min-content ${bubbleStyles} `}
    >
      <p>{message}</p>
      <div
        className={`hidden xl:block absolute h-[25px] aspect-square  max-h-full top-[calc(50%-12.5px)] ${tailStyles}`}
      />
    </div>
  );
};

export default ChatBubble;
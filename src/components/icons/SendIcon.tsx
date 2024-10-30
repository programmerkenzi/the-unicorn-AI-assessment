import { SVGIconProps } from "../../types";

const SendIcon = ({ ...props }: SVGIconProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 42 43"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M41 1.5L19 23.5M41 1.5L27 41.5L19 23.5M41 1.5L1 15.5L19 23.5"
      stroke="currentColor"
      className="text-[#1E1E1E] dark:text-gray-200"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SendIcon;

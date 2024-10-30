import { SVGIconProps } from "../../types";

const PlayIcon = ({ ...props }: SVGIconProps) => (
  <svg
    width="24"
    height="24"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.5 4.5l13 7-13 7V4.5z"
    />
  </svg>
);

export default PlayIcon;

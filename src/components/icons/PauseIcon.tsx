import { SVGIconProps } from "../../types";

const PauseIcon = ({ ...props }: SVGIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 9v6m4-6v6" />
  </svg>
);

export default PauseIcon;

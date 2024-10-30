import { SVGIconProps } from "../../types";

const GarbageCanIcon = ({ ...props }: SVGIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 3H15M4 6H20M6 6V18C6 19.1 6.9 20 8 20H16C17.1 20 18 19.1 18 18V6M9 6V18M15 6V18"
    />
  </svg>
);

export default GarbageCanIcon;

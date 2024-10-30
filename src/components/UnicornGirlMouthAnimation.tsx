import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import MouthOpen from "../assets/mouth_open.svg";
import MouthClosed from "../assets/mouth_closed.svg";

interface UnicornGirlMouthAnimationProps {
  mouthPosition: {
    bottom: number;
    left: number;
    width: number;
  };
  playAnimation: boolean; // Prop to trigger animation
}

function UnicornGirlMouthAnimation({
  mouthPosition,
  playAnimation,
}: UnicornGirlMouthAnimationProps) {
  const [isMouthOpen, setIsMouthOpen] = useState(true); // Default state is open

  useEffect(() => {
    if (playAnimation) {
      // Start toggling between open and closed mouth
      const interval = setInterval(() => {
        setIsMouthOpen((prev) => !prev);
      }, 700); // Duration of each open-close cycle

      // Cleanup on component unmount or when animation stops
      return () => clearInterval(interval);
    } else {
      // Ensure mouth stays open when not animating
      setIsMouthOpen(true);
    }
  }, [playAnimation]);

  return (
    <motion.div
      className="absolute"
      style={{
        width: `${mouthPosition.width}px`,
        left: `${mouthPosition.left}px`,
        bottom: `${mouthPosition.bottom}px`,
      }}
    >
      {isMouthOpen ? (
        <motion.img
          src={MouthOpen}
          alt="Unicorn Girl Mouth Open"
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ position: "absolute" }}
        />
      ) : (
        <motion.img
          src={MouthClosed}
          alt="Unicorn Girl Mouth Closed"
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ position: "absolute" }}
        />
      )}
    </motion.div>
  );
}

export default UnicornGirlMouthAnimation;

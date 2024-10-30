import UnicornGirlFace from "/unicorn_girl_face.svg";
import Horn from "/horn.svg";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import UnicornGirlMouthAnimation from "./UnicornGirlMouthAnimation";

interface UnicornGirlAnimationProps {
  playMouthAnimation: boolean;
}

function UnicornGirlAnimation({
  playMouthAnimation,
}: UnicornGirlAnimationProps) {
  const unicornGirlContainer = useRef<HTMLDivElement>(null);

  const [containerHeight, setContainerHeight] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const updateHornPosition = () => {
    if (unicornGirlContainer.current) {
      const containerHeight = unicornGirlContainer.current.offsetHeight;
      const containerWidth = unicornGirlContainer.current.offsetWidth;

      setContainerHeight(containerHeight);
      setContainerWidth(containerWidth);
    }
  };

  useEffect(() => {
    // Update container dimensions on mount
    setTimeout(() => {
      updateHornPosition();
    }, 200);

    window.addEventListener("resize", updateHornPosition);

    return () => {
      window.removeEventListener("resize", updateHornPosition);
    };
  }, []);

  return (
    <div className="flex relative" ref={unicornGirlContainer}>
      <img src={UnicornGirlFace} alt="Unicorn Girl Face" />

      <motion.div
        className="absolute"
        initial={{ width: 0, opacity: 0 }}
        style={{
          left: `${containerHeight / 2}px`,
          bottom: `${containerHeight * 0.8}px`,
        }}
        animate={{
          width: `${containerWidth * 0.15}px`,
          opacity: 1,
          transition: {
            delay: 0.5,
            duration: 1,
          },
        }}
      >
        <img src={Horn} alt="Horn" />
      </motion.div>

      <UnicornGirlMouthAnimation
        containerHeight={containerHeight}
        containerWidth={containerWidth}
        playAnimation={playMouthAnimation}
      />
    </div>
  );
}

export default UnicornGirlAnimation;

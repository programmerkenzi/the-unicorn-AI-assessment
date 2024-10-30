import UnicornGirlFace from "../assets/unicorn_girl_face.svg";
import Horn from "../assets/horn.svg";
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
  const [hornPosition, setHornPosition] = useState({
    bottom: 0,
    left: 0,
    width: 0,
  });

  const [mouthPosition, setMouthPosition] = useState({
    bottom: 0,
    left: 0,
    width: 0,
  });

  const updateHornPosition = () => {
    if (unicornGirlContainer.current) {
      const containerHeight = unicornGirlContainer.current.offsetHeight;
      const containerWidth = unicornGirlContainer.current.offsetWidth;
      setHornPosition({
        bottom: containerHeight * 0.8,
        left: containerWidth * 0.43,
        width: containerWidth * 0.15,
      });

      setMouthPosition({
        bottom: containerHeight * 0.415,
        left: containerWidth * 0.468,
        width: containerWidth * 0.1,
      });
    }
  };

  useEffect(() => {
    // Set initial position
    updateHornPosition();

    // Add resize event listener
    window.addEventListener("resize", updateHornPosition);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateHornPosition);
    };
  }, []);

  return (
    <div className="relative" ref={unicornGirlContainer}>
      <img src={UnicornGirlFace} alt="Unicorn Girl Face" />

      <motion.div
        className="absolute"
        initial={{ width: 0, opacity: 0 }}
        style={{
          left: `${hornPosition.left}px`,
          bottom: `${hornPosition.bottom}px`,
        }}
        animate={{
          width: `${hornPosition.width}px`,
          opacity: 1,
          transition: {
            delay: 1,
            duration: 1,
          },
        }}
      >
        <img src={Horn} alt="Horn" />
      </motion.div>

      <UnicornGirlMouthAnimation
        mouthPosition={mouthPosition}
        playAnimation={playMouthAnimation}
      />
    </div>
  );
}

export default UnicornGirlAnimation;

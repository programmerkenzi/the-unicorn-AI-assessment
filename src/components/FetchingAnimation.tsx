import { motion } from "framer-motion";

export const FetchingAnimation = () => {
  return (
    <div className="flex justify-center items-center mt-1">
      <p className="mr-2 font-semibold text-gray-700 dark:text-gray-300">
        Please, wait a moment
      </p>
      {[...Array(3)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 1,
            delay: index * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-1.5 h-1.5 bg-gray-500 dark:bg-white rounded-full mx-0.5"
        />
      ))}
    </div>
  );
};

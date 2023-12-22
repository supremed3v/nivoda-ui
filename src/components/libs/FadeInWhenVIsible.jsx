import { motion } from "framer-motion";
import React from "react";

export const FadeInWhenVisible = ({ children, animationVariants }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      variants={animationVariants}
    >
      {children}
    </motion.div>
  );
};
